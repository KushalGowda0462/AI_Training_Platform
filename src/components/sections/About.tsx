
/** Partner logos for the trust strip, which is hidden for now (see below). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logos = [
  {
    name: "Cisco",
    svg: (
      <svg viewBox="0 0 170 50" fill="currentColor" className="h-9 w-auto">
        <path d="M12.5 35h5v-20h-5v20zM3.5 25h5V15h-5v10zM21.5 40h5V10h-5v30zM30.5 45h5V5h-5v40zM39.5 40h5V10h-5v30zM48.5 25h5V15h-5v10zM57.5 35h5v-20h-5v20z" className="text-[#0F172A] opacity-60" />
        <text x="75" y="34" fontSize="28" fontWeight="800" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">CISCO</text>
      </svg>
    )
  },
  {
    name: "VMware",
    svg: (
      <svg viewBox="0 0 150 50" fill="currentColor" className="h-9 w-auto">
        <text x="5" y="34" fontSize="28" fontWeight="700" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">vmware</text>
      </svg>
    )
  },
  {
    name: "NetApp",
    svg: (
      <svg viewBox="0 0 170 50" fill="currentColor" className="h-9 w-auto">
        <path d="M20 15c-8 0-15 6-15 15s7 15 15 15 15-6 15-15-7-15-15-15zm-5 22v-14l10 7-10 7z" className="text-[#0F172A] opacity-60" />
        <text x="45" y="34" fontSize="28" fontWeight="800" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">NetApp</text>
      </svg>
    )
  },
  {
    name: "Microsoft",
    svg: (
      <svg viewBox="0 0 180 50" fill="currentColor" className="h-8 w-auto">
        <path d="M5 12h12v12H5zM19 12h12v12H19zM5 26h12v12H5zM19 26h12v12H19z" className="text-[#0F172A] opacity-60" />
        <text x="40" y="33" fontSize="26" fontWeight="600" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">Microsoft</text>
      </svg>
    )
  },
  {
    name: "Kubernetes",
    svg: (
      <svg viewBox="0 0 210 50" fill="currentColor" className="h-9 w-auto">
        <path d="M20 10l12 7v14l-12 7-12-7V17l12-7z" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#0F172A] opacity-60" />
        <circle cx="20" cy="24" r="5" className="text-[#0F172A] opacity-60" />
        <text x="45" y="33" fontSize="24" fontWeight="700" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">kubernetes</text>
      </svg>
    )
  }
];

/* ─── SECTION 2: ABOUT + TRUST LOGOS (full-screen snap) ─── */
export default function About() {
  return (
    <section id="about" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8] flex flex-col">
      {/* Main content — grows to push logos down */}
      <div className="container-content flex-1 flex flex-col justify-center py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <div className="gold-divider mx-auto" />
            <h2 className="section-title text-[#0F172A] mb-6">About</h2>
            <p className="text-lg md:text-xl font-serif text-[#0F172A] leading-snug mb-6 italic">
              &quot;Built on decades of deep real-world IT training experience and applying LLMs to
              narrow, high value training use cases.&quot;
            </p>
            <div className="text-base text-[#64748B] leading-relaxed space-y-3 max-w-2xl mx-auto text-center">
              <p>
                Aurilearn was created, architected and engineered by professionals who have
                worked for top-tier global IT training companies, bringing together decades of
                combined experience in the classroom and content development.
              </p>
              <p>
                We recognize that general LLM based chatbots have failed to teach effectively. By building a specialized
                LLM IT training platform we have created a system that dynamically and efficiently interprets the complex, stateful environments of modern engineering.              </p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-4 max-w-2xl mx-auto w-full">
              {[
                { value: "Decades", label: "of IT Training Experience" },
                { value: "1:1", label: "AI Mentorship" },
                { value: "94%", label: "Lab Pass Rate" },
              ].map((stat) => (
                <div key={stat.label} className="sm:col-span-4 text-center p-4 rounded-xl bg-white border border-[#E7E2D8] shadow-sm">
                  <div className="text-2xl font-900 text-[#0F172A] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#64748B] font-semibold leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logo strip — hidden for now, can be re-enabled later */}
      {/* <div className="w-full mt-auto border-t border-black/[0.06] bg-white py-6">
        <p className="text-center text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4">
          Trusted by engineering teams at
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] items-center">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="px-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                title={logo.name}
                aria-label={logo.name}
                role="img"
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
