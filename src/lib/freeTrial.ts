/**
 * "Try it for Free" sign-ups.
 *
 * Posts to the same PHP handler as demo requests, tagged with
 * request_type "free_trial" so the handler can tell them apart. Only
 * company email addresses are accepted. The refused domains live in
 * public/personal-email-domains.json, which public/contact.php reads too,
 * so the check cannot be skipped by bypassing the browser and the two
 * sides cannot drift apart.
 */

import { postToFormEndpoint, FALLBACK_CONTACT } from "@/lib/demoRequest";
import blocked from "../../public/personal-email-domains.json";

export const PERSONAL_EMAIL_MESSAGE =
    "Please use your company email address. Personal email addresses " +
    "(Gmail, Outlook, Yahoo, etc.) are not accepted.";

export const isPersonalEmail = (email: string) => {
    const domain = email.trim().toLowerCase().split("@").pop() ?? "";
    return (
        blocked.domains.includes(domain) ||
        blocked.providers.includes(domain.split(".")[0])
    );
};

export type FreeTrialRequest = {
    firstName: string;
    lastName: string;
    jobTitle: string;
    workEmail: string;
};

export const freeTrialMailtoHref = (r: FreeTrialRequest) =>
    `mailto:${FALLBACK_CONTACT}` +
    `?subject=${encodeURIComponent(
        `Free trial request — ${r.firstName} ${r.lastName}`
    )}` +
    `&body=${encodeURIComponent(
        [
            `Name:      ${r.firstName} ${r.lastName}`,
            `Job title: ${r.jobTitle}`,
            `Email:     ${r.workEmail}`,
        ].join("\n")
    )}`;

/**
 * Sends the sign-up. Resolves on success, throws otherwise — the caller
 * must only show the thank-you when this resolves.
 */
export async function submitFreeTrialRequest(
    r: FreeTrialRequest,
    honeypot = ""
): Promise<void> {
    await postToFormEndpoint({
        request_type: "free_trial",
        first_name: r.firstName,
        last_name: r.lastName,
        job_title: r.jobTitle,
        work_email: r.workEmail,
        company: honeypot,
    });
}
