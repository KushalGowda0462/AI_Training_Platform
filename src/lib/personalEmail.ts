/**
 * Both website forms accept company email addresses only.
 *
 * The refused domains live in public/personal-email-domains.json, which
 * public/contact.php reads too, so the check cannot be skipped by
 * bypassing the browser and the two sides cannot drift apart.
 */

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
