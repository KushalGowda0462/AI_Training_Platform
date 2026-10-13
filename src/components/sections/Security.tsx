
const securityCards = [
  {
    icon: "🏗️",
    title: "Private Deployment Options",
    desc: "Deploy Aurilearn within your infrastructure or dedicated cloud environment — keeping all training data inside your perimeter.",
  },
  {
    icon: "🔐",
    title: "Controlled Access",
    desc: "Administrators manage which teams and individual users can access the AI instructor and training programs.",
  },
  {
    icon: "🏢",
    title: "Organization-Isolated Environments",
    desc: "Each company operates in a fully isolated environment. No cross-tenant data sharing at any layer.",
  },
  {
    icon: "🛡️",
    title: "Secure Training Data",
    desc: "Runbooks, labs, and infrastructure interactions remain fully protected and never leave your controlled environment.",
  },
  {
    icon: "🔑",
    title: "Enterprise Identity Integration",
    desc: "Integrate with corporate SSO, authentication systems, and access policies for seamless and secure onboarding.",
  },
];

/* ─── SECTION 6: ENTERPRISE DEPLOYMENT CONTROL ─── */
export default function Security() {
  return (
    <section id="security" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8]">
      <div className="container-content w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
          <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <div className="gold-divider mx-auto" />
            <h2 className="section-title text-[#0F172A] mb-4">Security</h2>
            <p className="text-[#64748B] text-base max-w-xl mx-auto">
              Aurilearn runs within your controlled environment ensuring that you have full enterprise
              governance, security and access management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {securityCards.map((card) => (
              <div key={card.title} className="bg-white border border-[#E7E2D8] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                <div className="w-14 h-14 rounded-full bg-[#F3EEE2] border border-[var(--gold)]/30 flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{card.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
