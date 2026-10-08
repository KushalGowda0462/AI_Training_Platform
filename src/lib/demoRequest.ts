/**
 * Demo request delivery.
 *
 * The site ships two ways — Vercel and a static export for cPanel — and the
 * static build cannot run server code, so submissions go to a hosted form
 * endpoint rather than a Next.js API route. That keeps one code path working
 * on both.
 *
 * Configure with two environment variables:
 *   NEXT_PUBLIC_DEMO_FORM_ENDPOINT    the POST url from the form provider
 *   NEXT_PUBLIC_DEMO_FORM_ACCESS_KEY  only if the provider needs one
 *
 * Until the endpoint is set the form refuses to pretend it worked: it shows
 * an error with a direct mailto fallback, so a request is never silently
 * lost the way it was before.
 */

/**
 * Who receives a demo request.
 *
 * The FIRST address is the primary — it is the one the form endpoint is
 * registered to and the one that must confirm the endpoint on first use.
 * The rest are copied in via `_cc` on every submission.
 */
export const DEMO_RECIPIENTS = [
    "James@aurilearn.ai",
    "Arjun@aurilearn.ai",
    "Rashmi@aurilearn.ai",
    "vijay@aurilearn.ai",
] as const;

const ENDPOINT = process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT ?? "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_DEMO_FORM_ACCESS_KEY ?? "";

export const isDemoFormConfigured = () => ENDPOINT.trim().length > 0;

export type DemoRequest = {
    firstName: string;
    lastName: string;
    workEmail: string;
    jobRole: string;
    jobRoleOther: string;
    telephone: string;
    country: string;
};

/** The role we actually report — the typed one wins when "Other" was chosen. */
export const resolvedJobRole = (r: DemoRequest) =>
    r.jobRole === "Other" && r.jobRoleOther.trim() ? r.jobRoleOther.trim() : r.jobRole;

/** A plain-text copy of the request, used in the email body and the fallback. */
export const formatDemoRequest = (r: DemoRequest) =>
    [
        `Name:      ${r.firstName} ${r.lastName}`,
        `Email:     ${r.workEmail}`,
        `Job role:  ${resolvedJobRole(r)}`,
        `Telephone: ${r.telephone}`,
        `Country:   ${r.country}`,
    ].join("\n");

/** Fallback used when the endpoint is unset or unreachable. */
export const demoMailtoHref = (r: DemoRequest) =>
    `mailto:${DEMO_RECIPIENTS.join(",")}` +
    `?subject=${encodeURIComponent(`Enterprise demo request — ${r.firstName} ${r.lastName}`)}` +
    `&body=${encodeURIComponent(formatDemoRequest(r))}`;

/**
 * Sends the request. Resolves on success, throws otherwise — the caller must
 * only show the thank-you screen when this resolves.
 */
export async function submitDemoRequest(r: DemoRequest): Promise<void> {
    if (!isDemoFormConfigured()) {
        throw new Error("Demo form endpoint is not configured.");
    }

    const [primary, ...copied] = DEMO_RECIPIENTS;

    const payload: Record<string, string> = {
        ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),

        /* FormSubmit fields. `_cc` is what gets the request to everyone
           rather than just the address the endpoint is registered to —
           the primary is in the endpoint url, the rest are copied here.
           Ignored harmlessly by providers that do not use them. */
        _cc: copied.join(","),
        _subject: `Enterprise demo request — ${r.firstName} ${r.lastName}`,
        _template: "table",
        _captcha: "false",
        _replyto: r.workEmail,

        subject: `Enterprise demo request — ${r.firstName} ${r.lastName}`,
        from_name: `${r.firstName} ${r.lastName}`,
        // most providers key the reply-to off one of these
        email: r.workEmail,
        replyto: r.workEmail,
        first_name: r.firstName,
        last_name: r.lastName,
        work_email: r.workEmail,
        job_role: resolvedJobRole(r),
        telephone: r.telephone,
        country: r.country,
        message: formatDemoRequest(r),
    };

    const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
    });

    // Web3Forms (and similar providers) also report the outcome in the body,
    // so a 200 with { success: false } still counts as a failure.
    const body: { success?: boolean; message?: string } = await res.json().catch(() => ({}));

    if (!res.ok || body.success === false) {
        throw new Error(`Form endpoint returned ${res.status}${body.message ? `: ${body.message}` : ""}`);
    }
}
