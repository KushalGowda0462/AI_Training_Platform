/**
 * Central contact details.
 *
 * Format: full international number, digits only, no "+", no spaces (e.g. "6592388578").
 * WHATSAPP_DISPLAY is what users see on the page.
 */
export const WHATSAPP_NUMBER = "6592388578";
export const WHATSAPP_DISPLAY = "+65 9238 8578";
export const WHATSAPP_NAME = "James Furneaux";

/** Prefilled message that opens in WhatsApp when a user taps "Contact Us". */
export const WHATSAPP_MESSAGE =
  "Hi AURILEARN.AI, I have a query about your AI training platform.";

/** wa.me deep link — opens the WhatsApp app on mobile and WhatsApp Web on desktop. */
export const whatsappLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
