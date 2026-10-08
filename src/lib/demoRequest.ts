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
 * Everyone here is an equal recipient. Each address is sent its own
 * message addressed directly to it — nobody is CC'd, so no one appears
 * as an afterthought and nobody sees the others' addresses.
 *
 * Each address confirms itself once, the first time a request is sent to
 * it. Adding or removing someone is a change to this list alone.
 */
export const DEMO_RECIPIENTS = [
    "James@aurilearn.ai",
    "Arjun@aurilearn.ai",
    "Rashmi@aurilearn.ai",
    "vijay@aurilearn.ai",
] as const;

/**
 * Default delivery endpoint.
 *
 * Deliberately a constant rather than env-only. NEXT_PUBLIC_ values are
 * compiled into the bundle at build time, so an env var that someone
 * forgets to set when producing the cPanel zip would ship a form that
 * silently fails on the live site. Nothing here is secret — the base url
 * is public and the recipient addresses are already in the bundle for the
 * mailto fallback — so defaulting costs nothing and removes that risk.
 *
 * Set NEXT_PUBLIC_DEMO_FORM_ENDPOINT to override, e.g. to point a local
 * build at a test endpoint.
 */
const DEFAULT_ENDPOINT = "https://formsubmit.co/ajax";

const ENDPOINT = process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT?.trim() || DEFAULT_ENDPOINT;
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

    const base = ENDPOINT.trim();

    /** One endpoint per recipient, so each gets their own direct email. */
    const endpointFor = (email: string) =>
        base.includes("{email}")
            ? base.replace("{email}", encodeURIComponent(email))
            : `${base.replace(/\/+$/, "")}/${encodeURIComponent(email)}`;

    const body = (email: string) => ({
        ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
        _subject: `Enterprise demo request — ${r.firstName} ${r.lastName}`,
        _template: "table",
        _captcha: "false",
        _replyto: r.workEmail,
        subject: `Enterprise demo request — ${r.firstName} ${r.lastName}`,
        from_name: `${r.firstName} ${r.lastName}`,
        email: r.workEmail,
        replyto: r.workEmail,
        recipient: email,
        first_name: r.firstName,
        last_name: r.lastName,
        work_email: r.workEmail,
        job_role: resolvedJobRole(r),
        telephone: r.telephone,
        country: r.country,
        message: formatDemoRequest(r),
    });

    const results = await Promise.allSettled(
        DEMO_RECIPIENTS.map(async (email) => {
            const response: Response = await fetch(endpointFor(email), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(body(email)),
            });
            if (!response.ok) throw new Error(`${email}: endpoint returned ${response.status}`);

            /* FormSubmit answers 200 even when it refuses the submission and
               reports the real outcome in the body as {"success":"false"}.
               Trusting the status code alone would show a thank-you for a
               message that was never sent, which is the exact failure this
               whole change exists to prevent. */
            const result = await response.json().catch(() => null);
            if (result && typeof result === "object" && "success" in result) {
                const ok = result.success === true || result.success === "true";
                if (!ok) {
                    throw new Error(
                        `${email}: ${result.message ?? "endpoint reported failure"}`
                    );
                }
            }
            return email;
        })
    );

    const failed = results
        .map((res, i) => (res.status === "rejected" ? DEMO_RECIPIENTS[i] : null))
        .filter(Boolean);

    if (failed.length) {
        // Partial delivery still means the lead reached someone, so the
        // visitor is not shown an error — but this must not pass silently.
        console.error("Demo request not delivered to:", failed.join(", "));
    }

    // Only a total failure is an error the visitor should see.
    if (failed.length === DEMO_RECIPIENTS.length) {
        throw new Error("Demo request could not be delivered to any recipient.");
    }
}
