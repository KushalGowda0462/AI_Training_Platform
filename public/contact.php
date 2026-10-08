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

    /* TEMPORARY — added so delivery can be verified without access to the
       four inboxes above. Remove once a test email has been confirmed as
       received. */
    'jathin@dctech.cloud',
];

/* The address mail is sent FROM. Must be on this domain or the host's
   mail server will refuse it and receivers will mark it as spam. */
$MAIL_FROM      = 'noreply@aurilearn.ai';
$MAIL_FROM_NAME = 'Aurilearn Website';

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
foreach ($RECIPIENTS as $to) {
    if (@mail($to, $subject, $body, $headers, '-f' . $MAIL_FROM)) {
        $delivered++;
    } else {
        $failed[] = $to;
    }
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
