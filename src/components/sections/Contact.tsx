import { whatsappLink } from "@/lib/contact";

/**
 * Temporarily hidden pending security review. Set to true to restore the
 * "Contact Us on WhatsApp" button (and its divider) in the contact panel.
 */
const SHOW_WHATSAPP_BUTTON = false;

/* ─── SECTION 8: FINAL CTA / CONTACT (full-screen snap, flex-col) ─── */
export default function Contact() {
  return (
    <section id="contact" className="flex-1 flex flex-col bg-[#FAFAF8]">
      <div className="container-content w-full flex-1 flex flex-col justify-center py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 max-w-xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="gold-divider mx-auto" />
              <p className="text-[#475569] text-lg leading-relaxed">
                Book a 30-minute discovery call with an AURILEARN.AI Customer Service Representative
              </p>
            </div>

            <div className="contact-card bg-white rounded-2xl p-8 text-center border border-[#E7E2D8] shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-widest mb-5">
                Contact us at
              </h3>

              <div className="flex flex-col gap-6 items-center justify-center">
                <a
                  href="mailto:contact@aurilearn.ai"
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 group-hover:bg-[var(--gold)]/20 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="text-xl sm:text-2xl font-800 text-[#0F172A] group-hover:text-[var(--gold-hover)] transition-colors">
                    sales@aurilearn.ai
                  </span>
                </a>

                {SHOW_WHATSAPP_BUTTON && (
                <>
                <div className="w-12 h-px bg-[#E7E2D8]" />

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-3.5 font-700 text-[#0B1220] shadow-lg shadow-[#25D366]/20 hover:bg-[#1EBE5A] hover:scale-[1.03] transition-all duration-300"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.199-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.943c0 2.096.549 4.14 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 0 0-3.421-8.4" />
                  </svg>
                  <span className="text-base">Contact Us on WhatsApp</span>
                </a>
                </>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E7E2D8]">
                <p className="text-[#64748B] text-xs font-600">
                  We&apos;ll get back to you within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
