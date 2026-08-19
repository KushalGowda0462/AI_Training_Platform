/**
 * Central contact details.
 *
 * TODO: replace WHATSAPP_NUMBER with the real number once the client provides it.
 * Format: full international number, digits only, no "+", no spaces (e.g. "919876543210").
 * WHATSAPP_DISPLAY is what users see on the page.
 */
export const WHATSAPP_NUMBER = "910000000000";
export const WHATSAPP_DISPLAY = "+91 XXXXX XXXXX";

/** Prefilled message that opens in WhatsApp when a user taps "Contact Us". */
export const WHATSAPP_MESSAGE =
  "Hi AURILEARN.AI, I have a query about your AI training platform.";

/** wa.me deep link — opens the WhatsApp app on mobile and WhatsApp Web on desktop. */
export const whatsappLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
