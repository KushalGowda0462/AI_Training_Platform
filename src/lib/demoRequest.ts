/**
 * Demo request delivery.
 *
 * The browser posts to /contact.php, which runs on the Apache/cPanel host
 * beside the static site. The recipients live in that PHP file, server
 * side, so no inbox is shipped to the browser and none can be scraped
 * from the page source.
 *
 * Override the endpoint with NEXT_PUBLIC_DEMO_FORM_ENDPOINT if the form
 * ever needs to point somewhere else; the default is correct for the
 * cPanel deployment.
 */

const DEFAULT_ENDPOINT = "/contact.php";

const ENDPOINT =
    process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT?.trim() || DEFAULT_ENDPOINT;

export const isDemoFormConfigured = () => ENDPOINT.length > 0;

/**
 * The address shown if delivery fails. Deliberately the one the contact
 * section already publishes — a mailto is readable by anyone, so there is
 * no reason to put a personal inbox in front of scrapers.
 */
export const FALLBACK_CONTACT = "sales@aurilearn.ai";

export type DemoRequest = {
    firstName: string;
    lastName: string;
    workEmail: string;
    jobRole: string;
    jobRoleOther: string;
    telephone: string;
    country: string;
};

/** The role we report — the typed one wins when "Other" was chosen. */
export const resolvedJobRole = (r: DemoRequest) =>
    r.jobRole === "Other" && r.jobRoleOther.trim()
        ? r.jobRoleOther.trim()
        : r.jobRole;

/** Plain-text copy of the request, used for the mailto fallback. */
export const formatDemoRequest = (r: DemoRequest) =>
    [
        `Name:      ${r.firstName} ${r.lastName}`,
        `Email:     ${r.workEmail}`,
        `Job role:  ${resolvedJobRole(r)}`,
        `Telephone: ${r.telephone}`,
        `Country:   ${r.country}`,
    ].join("\n");

export const demoMailtoHref = (r: DemoRequest) =>
    `mailto:${FALLBACK_CONTACT}` +
    `?subject=${encodeURIComponent(
        `Enterprise demo request — ${r.firstName} ${r.lastName}`
    )}` +
    `&body=${encodeURIComponent(formatDemoRequest(r))}`;

/**
 * Sends the request. Resolves on success, throws otherwise — the caller
 * must only show the thank-you when this resolves.
 *
 * @param honeypot value of the hidden spam-trap field; forwarded so the
 *                 server can drop bot submissions.
 */
export async function submitDemoRequest(
    r: DemoRequest,
    honeypot = ""
): Promise<void> {
    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
            first_name: r.firstName,
            last_name: r.lastName,
            work_email: r.workEmail,
            job_role: resolvedJobRole(r),
            telephone: r.telephone,
            country: r.country,
            company: honeypot,
        }),
    });

    /* The endpoint reports the real outcome in the body. A 2xx alone is
       not proof of delivery, and showing a thank-you for a message nobody
       received is the failure this whole path exists to prevent. */
    const result = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            (result && result.message) || `Endpoint returned ${response.status}`
        );
    }

    /* A 200 is not proof of anything on its own. If PHP is not running the
       handler — the Next dev server serves contact.php as a text file, and a
       misconfigured host would too — the reply is a 200 carrying the file's
       source, not JSON. Treating that as success showed a thank-you for a
       message that was never sent. Delivery is only believed when the
       handler explicitly says so. */
    if (!result || typeof result !== "object" || !("success" in result)) {
        throw new Error(
            "The server did not confirm delivery. If this is a local build, " +
            "the form needs the PHP host to run."
        );
    }
    if (result.success !== true && result.success !== "true") {
        throw new Error(result.message || "Endpoint reported failure.");
    }
}
