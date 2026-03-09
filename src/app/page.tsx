"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
import { testimonials } from "@/lib/mock/testimonials";

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Contact form state
  const [form, setForm] = useState({ email: "", stack: "", teamSize: "" });
  const [submitted, setSubmitted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const securityBlocks = [
    {
      icon: "🔒",
      title: "Data Secure at Rest",
      desc: "All proprietary runbooks, documentation, and user data are fully encrypted at rest within our SOC2-compliant architecture.",
    },
    {
      icon: "🛡️",
      title: "Data Secure in Transit",
      desc: "End-to-end TLS encryption ensures that interactions with the AI instructor remain strictly confidential in transit.",
    },
    {
      icon: "🔑",
      title: "Secure Authentication",
      desc: "Enterprise SSO integrations guarantee secure logon and isolated tenant environments for every customer.",
    },
  ];

  const logos = [
    {
      name: "Cisco",
      svg: (
        <svg viewBox="0 0 170 50" fill="currentColor" className="h-10 md:h-12 w-auto">
          <path d="M12.5 35h5v-20h-5v20zM3.5 25h5V15h-5v10zM21.5 40h5V10h-5v30zM30.5 45h5V5h-5v40zM39.5 40h5V10h-5v30zM48.5 25h5V15h-5v10zM57.5 35h5v-20h-5v20z" className="text-[#0F172A] opacity-60" />
          <text x="75" y="34" fontSize="28" fontWeight="800" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">CISCO</text>
        </svg>
      )
    },
    {
      name: "VMware",
      svg: (
        <svg viewBox="0 0 150 50" fill="currentColor" className="h-10 md:h-12 w-auto">
          <text x="5" y="34" fontSize="28" fontWeight="700" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">vmware</text>
        </svg>
      )
    },
    {
      name: "NetApp",
      svg: (
        <svg viewBox="0 0 170 50" fill="currentColor" className="h-10 md:h-12 w-auto">
          <path d="M20 15c-8 0-15 6-15 15s7 15 15 15 15-6 15-15-7-15-15-15zm-5 22v-14l10 7-10 7z" className="text-[#0F172A] opacity-60" />
          <text x="45" y="34" fontSize="28" fontWeight="800" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">NetApp</text>
        </svg>
      )
    },
    {
      name: "Microsoft",
      svg: (
        <svg viewBox="0 0 180 50" fill="currentColor" className="h-9 md:h-11 w-auto">
          <path d="M5 12h12v12H5zM19 12h12v12H19zM5 26h12v12H5zM19 26h12v12H19z" className="text-[#0F172A] opacity-60" />
          <text x="40" y="33" fontSize="26" fontWeight="600" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">Microsoft</text>
        </svg>
      )
    },
    {
      name: "Kubernetes",
      svg: (
        <svg viewBox="0 0 210 50" fill="currentColor" className="h-10 md:h-12 w-auto">
          <path d="M20 10l12 7v14l-12 7-12-7V17l12-7z" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#0F172A] opacity-60" />
          <circle cx="20" cy="24" r="5" className="text-[#0F172A] opacity-60" />
          <text x="45" y="33" fontSize="24" fontWeight="700" className="text-[#0F172A] opacity-80" fontFamily="sans-serif">kubernetes</text>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* ───────────── SECTION 1: HERO ───────────── */}
      <section id="hero" className="hero-bg overflow-hidden flex flex-col justify-center pt-[100px] lg:pt-[120px] pb-10 lg:pb-12 shrink-0">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold-light)] text-[var(--gold-hover)] text-sm font-700 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block animate-pulse" />
                AI delivered training – 1:1 mentorship
              </div>

              <h1 className="text-4.5xl md:text-5xl lg:text-6xl font-900 text-[#0F172A] leading-[1.05] tracking-tight mb-4">
                With Aurilearn, you will <span className="text-gradient-gold">exceed your own limitations.</span>
              </h1>

              <p className="text-lg text-[#475569] leading-relaxed mb-5 font-medium">
                The Aurilearn AI instructor transforms legacy training into a 1:1 mentorship experience leading to class mastery. Secure, scalable, and easily integrated into your current training management platform.
              </p>

              <ul className="space-y-2 mb-6 text-[#64748B]">
                {[
                  "AI agent instructing 1:1 just for you",
                  "Ask as many questions as you want",
                  "Receive context-aware expert answers",
                  "Go entirely at your own speed",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--gold)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                <Link href="/#contact" className="btn-gold flex items-center justify-center text-base font-bold px-8 h-14 rounded-xl shadow-[0_4px_20px_rgba(169,128,42,0.25)] min-w-[240px] w-full sm:w-auto transition-transform hover:-translate-y-0.5">
                  Request Enterprise Demo
                </Link>
                <Link href="/#contact" className="btn-outline flex items-center justify-center text-base font-bold px-8 h-14 rounded-xl bg-white border-2 min-w-[200px] w-full sm:w-auto transition-all hover:bg-[#FAFAF8] hover:-translate-y-0.5">
                  Try for Free
                </Link>
              </div>
              <p className="text-xs text-[#64748B] font-semibold ml-1">
                Included: 10 free minutes of AI instruction with &quot;Try for Free&quot;
              </p>

              <div className="mt-3">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="text-sm font-bold text-[#0F172A] hover:text-[var(--gold)] flex items-center gap-2 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-[#E7E2D8] flex items-center justify-center group-hover:bg-[var(--gold-light)] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-current ml-0.5">
                      <path d="M4 3L9 6L4 9V3Z" fill="currentColor" />
                    </svg>
                  </span>
                  Watch 30-Second Demo
                </button>
              </div>
            </div>

            {/* Right: Video Placeholder */}
            <div className="relative z-10 lg:ml-auto w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#162035] aspect-[4/3] shadow-2xl border-4 border-white">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,var(--gold),transparent_60%)]" />
                </div>

                {/* Simulated UI Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/80 to-transparent p-6 pt-20">
                  <div className="space-y-4">
                    <div className="flex gap-3 items-end opacity-90">
                      <div className="w-8 h-8 rounded-full bg-[#1E2D45] flex items-center justify-center shrink-0">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="bg-[#1E2D45] text-white text-sm py-2 px-3 rounded-2xl rounded-bl-sm max-w-[85%]">
                        I&apos;m stuck on this security group routing. Why isn&apos;t traffic passing?
                      </div>
                    </div>
                    <div className="flex gap-3 items-end justify-end">
                      <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-white text-sm py-2 px-4 rounded-2xl rounded-br-sm max-w-[90%] backdrop-blur-sm">
                        <span className="text-[var(--gold)] font-bold block mb-1">Aurilearn Instructor</span>
                        I see in your YAML that port 443 is undefined. Let&apos;s fix that. Here&apos;s a hint on how ingress rules work in this context...
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center shrink-0 shadow-[0_0_15px_var(--gold)]">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pb-10">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:bg-white/20 hover:scale-105 transition-all group"
                    aria-label="Play video"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 6l10 6-10 6V6z" fill="var(--ink)" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(circle,var(--gold-light)_2px,transparent_2px)] [background-size:12px_12px] opacity-60 -z-10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[radial-gradient(circle,var(--border)_2px,transparent_2px)] [background-size:12px_12px] opacity-80 -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 8: TRUST STRIP ───────────── */}
      <section className="py-6 border-y border-[#E7E2D8] bg-[#FAFAF8]">
        <div className="container-content">
          <p className="text-center text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4">
            Trusted by engineering teams at
          </p>
          <div className="relative overflow-hidden flex w-full max-w-6xl mx-auto items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
              {/* Double set for seamless infinite loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="px-12 md:px-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  title={logo.name}
                  aria-label={logo.name}
                  role="img"
                >
                  {/* Notice: Increased SVG presentation scale class sizes via the container context if needed, but SVGs natively handle sizing gracefully. */}
                  {logo.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 6: ABOUT US ───────────── */}
      <section id="about" className="section-pad bg-[#FAFAF8] border-y border-[#E7E2D8] text-center min-h-[100svh] flex flex-col justify-center shrink-0">
        <div className="container-content text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[var(--gold)] shadow-xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">A</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-8">About Aurilearn</h2>

            <p className="text-xl md:text-2xl font-serif text-[#0F172A] leading-snug mb-10 text-balance">
              &quot;Built on deep real-world IT training experience. Informed by 16 years in technical training. Experienced in applying modern LLMs to narrow, high-value training use cases.&quot;
            </p>

            <div className="text-lg text-[#64748B] leading-relaxed">
              <p className="mb-6">
                Aurilearn is engineered by professionals who have worked for top-tier global IT training companies, bringing together decades of combined experience in the classroom and curriculum architecture.
              </p>
              <p>
                We recognize that general chatbots fail to teach effectively. By leveraging narrow, specialized LLM implementations, we&apos;ve created a platform fluent in interpreting the complex, stateful environments of modern engineering — delivering the world&apos;s first true automated 1:1 technical mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 2: EASE OF USE ───────────── */}
      <section id="ease-of-use" className="section-pad bg-white border-y border-[#E7E2D8] min-h-[100svh] flex flex-col justify-center shrink-0">
        <div className="container-content text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <div className="gold-divider mx-auto" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-4">Easy to use</h2>
            <p className="text-lg text-[#64748B]">
              Click, type, or use voice to interact naturally with your AI instructor. No complex dashboards to learn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="group rounded-3xl p-8 bg-[#FAFAF8] border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_10px_40px_rgba(212,160,23,0.1)] transition-all flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#E7E2D8] flex items-center justify-center text-3xl group-hover:-translate-y-2 transition-transform duration-300">
                🖱️
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">Click</h3>
              <p className="text-[#64748B] text-sm">Select concepts, highlight code segments, and navigate your labs visually.</p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl p-8 bg-[#FAFAF8] border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_10px_40px_rgba(212,160,23,0.1)] transition-all flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#E7E2D8] flex items-center justify-center text-3xl group-hover:-translate-y-2 transition-transform duration-300">
                ⌨️
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">Type</h3>
              <p className="text-[#64748B] text-sm">Chat naturally to ask follow-up questions or paste code errors for immediate analysis.</p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl p-8 bg-[#FAFAF8] border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_10px_40px_rgba(212,160,23,0.1)] transition-all flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#E7E2D8] flex items-center justify-center text-3xl group-hover:-translate-y-2 transition-transform duration-300">
                🎙️
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">Voice</h3>
              <p className="text-[#64748B] text-sm">Talk through your logic aloud. The agent listens and corrects your reasoning conversationally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 3: SCALABILITY ───────────── */}
      <section id="scalability" className="section-pad bg-[#FAFAF8] relative overflow-hidden min-h-[100svh] flex flex-col justify-center shrink-0">
        {/* Background visual element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[var(--gold-light)]/40 to-transparent hidden lg:block" />

        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="gold-divider" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-6">Scalable when you need it</h2>
              <p className="text-lg text-[#64748B] leading-relaxed mb-8">
                Aurilearn’s architecture is built to adapt to your operational reality. Scale up or down instantly based on demand, eliminating the rigid scheduling bottlenecks of human-led cohorts.
              </p>
              <ul className="space-y-5">
                {[
                  { title: "Zero Wait Times", desc: "Suitable for small ad-hoc cohorts or enterprise-wide rollouts of thousands of concurrent learners." },
                  { title: "Flexible Delivery", desc: "Engineers train when they want, where they want. No instructor bottlenecks or timezone conflicts." },
                  { title: "Cost Efficiency", desc: "Pay for the mentorship compute you use, rather than locking into expensive fixed-rate instructor contracts." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E7E2D8] shadow-sm flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual representation */}
            <div className="relative h-[450px] rounded-3xl bg-white border border-[#E7E2D8] shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-8 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-[#0F172A]">Concurrent Mentorship Sessions</div>
                <div className="text-[var(--gold)] font-bold bg-[var(--gold-light)]/50 px-3 py-1 rounded-full text-xs">Auto-scaling</div>
              </div>

              <div className="flex-1 flex items-end gap-2">
                {[30, 45, 25, 60, 85, 40, 75, 95, 100, 80, 50, 70, 90, 65, 85, 45].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[var(--gold)]/20 to-[var(--gold)] rounded-t-sm" style={{ height: `${h}%`, opacity: (i / 16) * 0.5 + 0.5 }} />
                ))}
              </div>

              <div className="mt-6 flex justify-between text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 4: SECURITY ───────────── */}
      <section id="security" className="section-pad bg-[#0B1220] min-h-[100svh] flex flex-col justify-center shrink-0">
        <div className="container-content">
          <div className="text-center mb-16">
            <div className="gold-divider mx-auto" />
            <h2 className="text-3xl md:text-4xl font-800 text-white mb-4">Security built in</h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Data remains protected at rest, in transit, and throughout secure user authentication, meeting the strict requirements of global enterprise IT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-[40px] left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[#1E2D45] to-transparent z-0" />

            {securityBlocks.map((b) => (
              <div key={b.title} className="bg-[#162035] border border-[#1E2D45] rounded-3xl p-8 flex flex-col gap-5 text-center relative z-10 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#0B1220] border-2 border-[var(--gold)]/30 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(169,128,42,0.15)]">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{b.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 5: ANALYTICS ───────────── */}
      <section id="analytics" className="section-pad bg-[#FBFCFD] relative overflow-hidden min-h-[100svh] flex flex-col justify-center shrink-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Soft abstract glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold-light)] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E2E8F0] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Copy */}
            <div className="lg:col-span-5 relative z-10">
              <div className="gold-divider" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-6">Analytics when and as you want them</h2>
              <p className="text-lg text-[#64748B] leading-relaxed mb-10">
                Move beyond generic course completion rates. All data is captured and presented on demand, giving engineering leaders granular visibility into team capabilities and potential blockers.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  "Number of students enrolled and in progress",
                  "Live tracking of exact module positions",
                  "Pass/fail rates on automated lab validations",
                  "Certification exam registration tracking",
                  "Final certification pass statistics",
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[#0F172A] font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/#contact" className="btn-gold text-base px-8 py-3.5">
                View Analytics Demo
              </Link>
            </div>

            {/* Right Dashboard Mock */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#E7E2D8] shadow-2xl relative overflow-hidden">
                {/* Header bar */}
                <div className="flex justify-between items-center mb-8 border-b border-[#E7E2D8] pb-6">
                  <div className="font-bold text-xl text-[#0F172A]">Company Overview</div>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-white border border-[#E7E2D8] px-3 py-1.5 rounded-lg text-[#475569] font-medium">Last 30 Days</span>
                    <span className="bg-[#0F172A] text-white px-3 py-1.5 rounded-lg font-medium">Export CSV</span>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Active Students", value: "342", trend: "+12%" },
                    { label: "Avg. Module Level", value: "07", trend: "+2" },
                    { label: "Lab Pass Rate", value: "94%", trend: "+3%" },
                    { label: "Cert. Registrations", value: "128", trend: "+18%" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-sm">
                      <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">{stat.label}</div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-900 text-[#0F172A]">{stat.value}</div>
                        <div className="text-xs font-bold text-green-600 mb-1">{stat.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cert tracking bar */}
                <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-sm w-full">
                  <div className="flex justify-between items-end mb-4">
                    <div className="font-bold text-[#0F172A]">Kubernetes CKA Certification Pipeline</div>
                    <div className="text-sm font-bold text-[var(--gold)]">85% Pass Rate</div>
                  </div>

                  <div className="w-full h-4 bg-[#F3F0E8] rounded-full overflow-hidden flex">
                    <div className="bg-[#0F172A] h-full" style={{ width: "40%" }} title="Completed & Passed" />
                    <div className="bg-[var(--gold)] h-full" style={{ width: "25%" }} title="Registered" />
                    <div className="bg-[var(--gold-light)] h-full" style={{ width: "20%" }} title="In Progress" />
                  </div>

                  <div className="flex gap-6 mt-4 text-xs font-semibold text-[#64748B]">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"></div> Passed Exam</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]"></div> Registered</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--gold-light)]"></div> Module Training</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────── SECTION 7: TESTIMONIALS ───────────── */}
      <section id="testimonials" className="section-pad bg-[#FCFBF8] border-t border-[#E7E2D8] relative overflow-hidden min-h-[100svh] flex flex-col justify-center shrink-0">
        {/* Clean straight transition line with subtle gold glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-20"></div>

        {/* Warm radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,128,42,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(169,128,42,0.04),transparent_50%)] pointer-events-none"></div>
        {/* Oversized faint quotation mark */}
        <div className="absolute top-12 left-12 text-[18rem] md:text-[24rem] font-serif text-[var(--gold)] opacity-[0.03] select-none pointer-events-none leading-none -tracking-widest">&quot;</div>

        <div className="container-content relative z-10">
          <div className="text-center mb-16">
            <div className="gold-divider mx-auto" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A]">Customer testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl border border-[#E7E2D8] shadow-[0_10px_40px_rgba(15,23,42,0.04)] hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
                <div>
                  <div className="text-[var(--gold)] text-4xl font-serif leading-none mb-4">&quot;</div>
                  <p className="text-[#0F172A] text-lg font-medium leading-relaxed mb-8">
                    {t.quote}
                  </p>
                </div>
                <div className="border-t border-[#FAFAF8] pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center font-bold text-[#94A3B8]">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">{t.author}</div>
                    <div className="text-sm font-semibold text-[#64748B]">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 9: CONTACT FORM ───────────── */}
      <section id="contact" className="section-pad bg-[#0B1220] min-h-[100svh] flex flex-col justify-center shrink-0">
        <div className="container-content">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-white mb-4">
                Ready to scale 1:1 mentorship?
              </h2>
              <p className="text-[#94A3B8]">
                Book a 30-minute discovery call with an Aurilearn solutions architect or sign up to try 10 free minutes of instruction.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#162035] rounded-2xl p-10 text-center border border-[var(--gold)]/30">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-700 text-white mb-2">Request received</h3>
                <p className="text-[#94A3B8] text-sm">Our team will reach out within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-600 text-[#94A3B8] mb-2">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#162035] border-[1.5px] border-[#1E2D45] text-white placeholder-[#475569] focus:outline-none focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-600 text-[#94A3B8] mb-2">Current Training Stack</label>
                  <select
                    value={form.stack}
                    onChange={(e) => setForm((f) => ({ ...f, stack: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#162035] border-[1.5px] border-[#1E2D45] text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                  >
                    <option value="">Select a domain…</option>
                    {["Kubernetes", "Cloud Native", "DevOps", "Networking", "Security", "Storage"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-600 text-[#94A3B8] mb-3">Estimated Team Size</label>
                  <div className="flex gap-3">
                    {["10–100", "100–500", "500+"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, teamSize: size }))}
                        className={`flex-1 py-3 rounded-xl border-[1.5px] text-sm font-600 transition-all ${form.teamSize === size
                          ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                          : "border-[#1E2D45] text-[#475569] hover:border-[var(--gold)]/50"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button type="submit" className="btn-gold text-base flex-1 justify-center py-4">
                    Secure Discovery Call
                  </button>
                  <button type="submit" className="btn-outline border-white text-white hover:bg-white hover:text-[#0B1220] text-base flex-1 justify-center py-4">
                    Try For Free
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ───── Video Modal ───── */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="Aurilearn Demo: Overcoming Obstacles" size="xl">
        <div className="aspect-video bg-[#0B1220] rounded-xl flex items-center justify-center relative overflow-hidden border border-[#1E2D45]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--gold)]/10 to-transparent"></div>
          <div className="text-center relative z-10 px-8">
            <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_var(--gold)] animate-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 6l10 6-10 6V6z" fill="white" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Demo Video Placeholder</h3>
            <p className="text-[#94A3B8] text-sm max-w-sm mx-auto">
              Visualizing the workflow: Click, Type, and Voice interactions with the Aurilearn instructor agent leading to &quot;aha!&quot; moments.
            </p>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toastVisible && (
        <div className="toast border border-[#1E2D45]">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-[var(--gold)] flex items-center justify-center shrink-0 text-[10px] text-white font-bold">✓</span>
            <span className="text-sm font-600 text-white">Thanks — we&apos;ll reach out shortly.</span>
          </div>
        </div>
      )}
    </>
  );
}
