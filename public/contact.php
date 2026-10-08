<?php
/**
 * Demo request handler — Aurilearn.
 *
 * Runs on the Apache/cPanel host (GoDaddy) alongside the static site. The
 * browser posts here; this file decides who receives the request, so the
 * recipients' addresses are never shipped to the browser and cannot be
 * scraped from the page source.
 *
 * Returns JSON: {"success": true} or {"success": false, "message": "..."}
 */

/* ─── Who receives a demo request ──────────────────────────────────────
   Server side only. Never sent to the browser. Edit this list to add or
   remove people; nothing else needs changing. */
$RECIPIENTS = [
    'James@aurilearn.ai',
    'Arjun@aurilearn.ai',
    'Rashmi@aurilearn.ai',
    'vijay@aurilearn.ai',
];

/* The address mail is sent FROM. Must be on this domain or the host's
   mail server will refuse it and receivers will mark it as spam. */
$MAIL_FROM      = 'noreply@aurilearn.ai';
$MAIL_FROM_NAME = 'Aurilearn Website';


/* ─── SMTP (recommended) ───────────────────────────────────────────────
   aurilearn.ai mail runs on Microsoft 365 and the domain publishes
   "v=spf1 include:spf.protection.outlook.com -all" with DMARC p=quarantine.
   That means only Microsoft's servers may send as @aurilearn.ai; mail sent
   straight from this web server fails SPF and gets quarantined, so PHP's
   mail() will appear to work while the message never reaches anyone.

   Sending through Microsoft 365 with a real mailbox login fixes that: the
   message leaves Microsoft's own servers, so SPF and DMARC both pass.

   Credentials are read from a file OUTSIDE the web root so they are never
   downloadable and never committed to git. Create it one level above
   public_html as smtp-config.php:

       <?php return [
           'host' => 'smtp.office365.com',
           'port' => 587,
           'user' => 'noreply@aurilearn.ai',
           'pass' => 'THE-MAILBOX-PASSWORD',
       ];

   With no such file this falls back to mail(), which still works on hosts
   where the domain's SPF permits it. */
$SMTP = null;
foreach ([__DIR__ . '/../smtp-config.php', __DIR__ . '/smtp-config.php'] as $cfgPath) {
    if (is_readable($cfgPath)) {
        $maybe = include $cfgPath;
        if (is_array($maybe) && !empty($maybe['user']) && !empty($maybe['pass'])) {
            $SMTP = $maybe;
        }
        break;
    }
}

/**
 * Minimal SMTP client with STARTTLS and AUTH LOGIN.
 * Returns true on success; on failure sets $error and returns false.
 */
function smtp_send(array $cfg, string $from, string $fromName, string $to, string $subject, string $body, string $replyTo, &$error = null) {
    $host = $cfg['host'] ?? 'smtp.office365.com';
    $port = (int) ($cfg['port'] ?? 587);

    $fp = @stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, 20);
    if (!$fp) { $error = "connect failed: {$errstr}"; return false; }
    stream_set_timeout($fp, 20);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($line, $expect) use ($fp, $read, &$error) {
        if ($line !== null) fwrite($fp, $line . "\r\n");
        $res = $read();
        if (strpos($res, (string) $expect) !== 0) {
            $error = trim($line === null ? $res : "{$line} -> {$res}");
            return false;
        }
        return true;
    };

    $ehlo = 'EHLO ' . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost');

    if (!$cmd(null, '220')) { fclose($fp); return false; }
    if (!$cmd($ehlo, '250')) { fclose($fp); return false; }
    if (!$cmd('STARTTLS', '220')) { fclose($fp); return false; }
    if (!@stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        $error = 'TLS negotiation failed'; fclose($fp); return false;
    }
    if (!$cmd($ehlo, '250')) { fclose($fp); return false; }
    if (!$cmd('AUTH LOGIN', '334')) { fclose($fp); return false; }
    if (!$cmd(base64_encode($cfg['user']), '334')) { fclose($fp); return false; }
    if (!$cmd(base64_encode($cfg['pass']), '235')) { fclose($fp); return false; }
    if (!$cmd('MAIL FROM:<' . $from . '>', '250')) { fclose($fp); return false; }
    if (!$cmd('RCPT TO:<' . $to . '>', '250')) { fclose($fp); return false; }
    if (!$cmd('DATA', '354')) { fclose($fp); return false; }

    $headers = "From: {$fromName} <{$from}>\r\n"
             . "To: <{$to}>\r\n"
             . "Reply-To: <{$replyTo}>\r\n"
             . "Subject: {$subject}\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n"
             . "X-Mailer: Aurilearn-Website\r\n";
    // dot-stuffing: a lone "." would end the message early
    $safeBody = preg_replace('/^\./m', '..', $body);
    fwrite($fp, $headers . "\r\n" . $safeBody . "\r\n.\r\n");

    if (!$cmd(null, '250')) { fclose($fp); return false; }
    $cmd('QUIT', '221');
    fclose($fp);
    return true;
}

/* Simple abuse limit: submissions allowed per IP per hour. */
$RATE_LIMIT        = 5;
$RATE_WINDOW_SECS  = 3600;

/* ─────────────────────────────────────────────────────────────────── */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed.', 405);
}

$raw = file_get_contents('php://input') ?: '';
$in  = json_decode($raw, true);
if (!is_array($in)) {
    // also accept a normal form post
    $in = $_POST;
}
if (!is_array($in) || !$in) {
    fail('No data received.');
}

$get = static function ($key) use ($in) {
    return trim((string) ($in[$key] ?? ''));
};

/* ─── Spam trap ───
   The form carries a hidden "company" field. People never fill it in. */
if ($get('company') !== '') {
    // Pretend it worked so the bot does not retry with a different shape.
    echo json_encode(['success' => true]);
    exit;
}

/* ─── Rate limit by IP ─── */
$ip   = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$file = sys_get_temp_dir() . '/aurilearn_demo_' . sha1($ip) . '.txt';
$hits = [];
if (is_readable($file)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($file))),
        static function ($t) use ($RATE_WINDOW_SECS) { return $t > time() - $RATE_WINDOW_SECS; }
    );
}
if (count($hits) >= $RATE_LIMIT) {
    fail('Too many requests. Please try again later, or email us directly.', 429);
}
$hits[] = time();
@file_put_contents($file, implode(',', $hits));

/* ─── Validate ─── */
$firstName = $get('first_name');
$lastName  = $get('last_name');
$email     = $get('work_email');
$jobRole   = $get('job_role');
$telephone = $get('telephone');
$country   = $get('country');

foreach ([
    'first name' => $firstName,
    'last name'  => $lastName,
    'work email' => $email,
    'job role'   => $jobRole,
    'telephone'  => $telephone,
    'country'    => $country,
] as $label => $value) {
    if ($value === '') {
        fail("Please provide your {$label}.");
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('That work email does not look valid.');
}

/* Header injection guard: a newline in a value that reaches a mail header
   would let an attacker add their own headers and relay mail through us. */
$clean = static function ($v) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v));
};

$firstName = $clean($firstName);
$lastName  = $clean($lastName);
$jobRole   = $clean($jobRole);
$telephone = $clean($telephone);
$country   = $clean($country);
$email     = $clean($email);

/* ─── Compose ─── */
$subject = "Enterprise demo request — {$firstName} {$lastName}";
$body = "A new demo request came in from the Aurilearn website.\n\n"
      . "Name:      {$firstName} {$lastName}\n"
      . "Email:     {$email}\n"
      . "Job role:  {$jobRole}\n"
      . "Telephone: {$telephone}\n"
      . "Country:   {$country}\n\n"
      . "Reply to this email to reach them directly.\n";

$headers = implode("\r\n", [
    'From: ' . $MAIL_FROM_NAME . ' <' . $MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: Aurilearn-Website',
]);

/* ─── Send one message per recipient, so nobody is CC'd and nobody sees
       the others' addresses ─── */
$delivered = 0;
$failed    = [];
$lastError = '';

foreach ($RECIPIENTS as $to) {
    $ok = false;

    if ($SMTP) {
        // Preferred: authenticated send through the domain's own mail
        // provider, so SPF and DMARC pass.
        $err = '';
        $ok = smtp_send($SMTP, $MAIL_FROM, $MAIL_FROM_NAME, $to, $subject, $body, $email, $err);
        if (!$ok && $err !== '') {
            $lastError = $err;
        }
    } else {
        // Fallback. Note this will be quarantined on any domain whose SPF
        // does not permit this server — mail() returning true is not proof
        // the message was accepted by the recipient's provider.
        $ok = @mail($to, $subject, $body, $headers, '-f' . $MAIL_FROM);
    }

    if ($ok) {
        $delivered++;
    } else {
        $failed[] = $to;
    }
}

if ($lastError !== '') {
    error_log('Aurilearn demo request SMTP error: ' . $lastError);
}

if ($delivered === 0) {
    error_log('Aurilearn demo request: delivery failed for all recipients.');
    fail('We could not send your request just now.', 502);
}

if ($failed) {
    // Partial delivery still means the lead arrived; log who missed it.
    error_log('Aurilearn demo request: not delivered to ' . implode(', ', $failed));
}

echo json_encode(['success' => true]);
