/**
 * "Try it for Free" sign-ups.
 *
 * Posts to the same PHP handler as demo requests, tagged with
 * request_type "free_trial" so the handler can tell them apart. Only
 * company email addresses are accepted; public/contact.php enforces the
 * same rule with the same lists, so the check cannot be skipped by
 * bypassing the browser. Keep the two lists in step.
 */

import { postToFormEndpoint, FALLBACK_CONTACT } from "@/lib/demoRequest";

/** Free mail providers, matched on the exact domain. */
export const PERSONAL_EMAIL_DOMAINS = [
    "gmail.com", "googlemail.com", "ymail.com", "rocketmail.com",
    "msn.com", "icloud.com", "me.com", "mac.com", "aol.com",
    "proton.me", "protonmail.com", "pm.me", "mail.com", "email.com",
    "zoho.com", "zohomail.com", "rediffmail.com", "qq.com", "163.com",
    "126.com", "sina.com", "inbox.com", "fastmail.com", "tutanota.com",
    "tuta.io", "hey.com", "gmx.com", "gmx.net", "yandex.com", "yandex.ru",
    "mail.ru", "web.de", "hushmail.com",
];

/** Providers that run a domain per country (yahoo.co.uk, hotmail.fr…),
    matched on the first label of the domain. */
export const PERSONAL_EMAIL_PROVIDERS = [
    "yahoo", "hotmail", "outlook", "live", "gmx", "yandex",
];

export const PERSONAL_EMAIL_MESSAGE =
    "Please use your company email address. Personal email addresses " +
    "(Gmail, Outlook, Yahoo, etc.) are not accepted.";

export const isPersonalEmail = (email: string) => {
    const domain = email.trim().toLowerCase().split("@").pop() ?? "";
    return (
        PERSONAL_EMAIL_DOMAINS.includes(domain) ||
        PERSONAL_EMAIL_PROVIDERS.includes(domain.split(".")[0])
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
