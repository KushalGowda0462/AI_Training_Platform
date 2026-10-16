import Link from "next/link";

/** Company footer band, shown at the foot of every page (see layout.tsx). */
export default function Footer() {
  return (
    <footer className="w-full border-t border-[#162035] bg-[#060D1A]">
      <div className="container-content py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-5">
          {/* Brand + tagline */}
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--gold)] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-white text-base font-bold tracking-tight">AURILEARN.AI</span>
            </div>
            <p className="text-[#475569] text-xs leading-relaxed">
              AI-powered 1:1 instructor agents for enterprise technical training at scale.
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              {[
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Security", href: "/security" },
                { label: "Analytics", href: "/security#analytics" },
                { label: "Scalability", href: "/platform#scalability" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "Documentation", href: "#" },
                { label: "Support", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "Status", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-[#162035] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#334155] text-xs">© {new Date().getFullYear()} AURILEARN.AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="text-xs text-[#334155] hover:text-[var(--gold)] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
