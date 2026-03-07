"use client";

import { useState } from "react";
import Link from "next/link";
import { vendors } from "@/lib/mock/vendors";
import { certifications } from "@/lib/mock/certifications";
import VendorCard from "@/components/VendorCard";
import CertificationCard from "@/components/CertificationCard";
import Modal from "@/components/Modal";

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Contact form state
  const [form, setForm] = useState({ email: "", stack: "", teamSize: "" });
  const [submitted, setSubmitted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [certSearch, setCertSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const filteredCerts = certSearch.trim()
    ? certifications.filter(
      (c) =>
        c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
        c.tagline.toLowerCase().includes(certSearch.toLowerCase())
    )
    : certifications.slice(0, 6);

  const comparisonRows = [
    { aspect: "Scalability", legacy: "Linear (1 instructor per cohort)", aurentis: "Unlimited (concurrent 1-on-1 training)" },
    { aspect: "Feedback", legacy: "Delayed / Generic", aurentis: "Instant / Contextual (per-line-of-code)" },
    { aspect: "Labs", legacy: "High failure / Manual supervision", aurentis: "Automated validation / Self-healing labs" },
    { aspect: "Adaptability", legacy: "Rigid curriculum", aurentis: "Dynamic / Personalized to student pace" },
    { aspect: "Analytics", legacy: "Manual attendance sheets", aurentis: "Deep-dive metrics on cognitive strengths" },
  ];

  const outcomes = [
    {
      icon: "⚡",
      title: "The Lab-Agent Advantage",
      desc: "AI agents diagnose YAML errors, validate lab completion states, and guide engineers step-by-step — in real time.",
    },
    {
      icon: "📐",
      title: "Automatic Whiteboarding",
      desc: "Agents generate on-the-fly architecture diagrams tailored to each learner's current concept — no pre-built decks.",
    },
    {
      icon: "🎯",
      title: "Hyper-Personalized Customization",
      desc: "Ingest your company's runbooks, docs, and company voice. The agent becomes your internal SME, at scale.",
    },
    {
      icon: "📊",
      title: "Deep-Dive Progress Analytics",
      desc: "Skill heatmaps reveal exactly where teams stall — by concept, by engineer, by team — enabling targeted remediation.",
    },
    {
      icon: "🔗",
      title: "LMS & Tech Stack Integration",
      desc: "REST API bridges your existing LMS, Kubernetes environments, and cloud workspaces in under a day.",
    },
  ];

  const securityBlocks = [
    {
      icon: "🔒",
      title: "Secure SaaS Architecture",
      desc: "Hosted in your private cloud or our VPC, ensuring proprietary data stays within your environment.",
    },
    {
      icon: "📋",
      title: "Enterprise-Grade Compliance",
      desc: "SOC2-ready posture, encryption at rest and in transit.",
    },
    {
      icon: "🧠",
      title: "Model Agnosticism",
      desc: "Deploy with GPT-4o, Llama 3.1, or DeepSeek models. We build the agentic layer; you control privacy.",
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
      <section className="hero-bg section-pad">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5E6B8] text-[#B8870A] text-xs font-600 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] inline-block" />
                AI Instructor Agent Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-900 text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                Let Aurentis take you{" "}
                <span className="text-gradient-gold">beyond your own limitations.</span>
              </h1>

              <p className="text-lg text-[#475569] leading-relaxed mb-8">
                AI-powered instructor agents that transform legacy training into interactive, lab-driven mastery.
                Secure, scalable, and integrated into your current tech stack.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="btn-gold text-base px-6 py-3">
                  Request Enterprise Demo
                </Link>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="btn-outline text-base px-6 py-3 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="currentColor" />
                  </svg>
                  Watch the 60-Second Workflow
                </button>
              </div>
            </div>

            {/* Right: Video Placeholder */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#162035] aspect-video shadow-2xl border border-[#162035]">
                {/* Poster / decorative content */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, #D4A017 0%, transparent 60%), radial-gradient(circle at 80% 20%, #4F46E5 0%, transparent 50%)'
                  }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center shadow-[0_4px_24px_rgba(212,160,23,0.5)] hover:bg-[#B8870A] transition-all hover:scale-105 active:scale-95"
                    aria-label="Play video"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M8 6l9 5-9 5V6z" fill="white" />
                    </svg>
                  </button>
                </div>
                {/* Code lines decoration */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1.5 opacity-60">
                  {["kubectl apply -f lab-validator.yaml", "✓ Lab completion detected — 94% accuracy", "→ Generating feedback report..."].map((line, i) => (
                    <div key={i} className="text-[#94A3B8] text-xs font-mono bg-[#0B1220]/50 px-3 py-1 rounded">{line}</div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-card border border-[#E7E2D8] hidden md:block">
                <div className="text-xs text-[#94A3B8] mb-0.5">Concurrent sessions</div>
                <div className="text-xl font-800 text-[#D4A017]">∞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 2: TRUST STRIP ───────────── */}
      <section className="py-10 border-y border-[#E7E2D8] bg-white">
        <div className="container-content">
          <p className="text-center text-sm font-500 text-[#94A3B8] uppercase tracking-widest mb-8">
            Trusted by engineering teams at
          </p>
          <div className="relative overflow-hidden flex w-full max-w-5xl mx-auto items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
              {/* Double set for seamless infinite loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="px-12 md:px-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  title={logo.name}
                  aria-label={logo.name}
                  role="img"
                >
                  {logo.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 3: WHY LEGACY FAILS ───────────── */}
      <section className="section-pad bg-[#FAFAF8]" id="compare">
        <div className="container-content">
          <div className="max-w-2xl mb-12">
            <div className="gold-divider" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-4">Why legacy training fails modern engineering teams</h2>
            <p className="text-[#64748B]">Side-by-side comparison of traditional instructor-led training versus the Aurentis AI agent platform.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E7E2D8] shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E7E2D8]">
                  <th className="text-left px-6 py-4 text-sm font-600 text-[#94A3B8] w-1/4 bg-white">Aspect</th>
                  <th className="text-left px-6 py-4 text-sm font-600 text-[#64748B] bg-white">Legacy Instructor-Led Training</th>
                  <th className="text-left px-6 py-4 text-sm font-700 text-[#D4A017] col-aurentis">Aurentis AI Agent Platform</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.aspect} className={`border-b border-[#E7E2D8] last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}>
                    <td className="px-6 py-4 text-sm font-600 text-[#0F172A]">{row.aspect}</td>
                    <td className="px-6 py-4 text-sm text-[#64748B]">{row.legacy}</td>
                    <td className="px-6 py-4 text-sm text-[#0F172A] font-500 col-aurentis">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#F5E6B8] flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {row.aurentis}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 4: CORE OUTCOMES ───────────── */}
      <section className="section-pad bg-white" id="outcomes">
        <div className="container-content">
          <div className="max-w-2xl mb-12">
            <div className="gold-divider" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-4">Business outcomes, not features</h2>
            <p className="text-[#64748B]">Every Aurentis capability maps to a measurable engineering outcome — from time-to-competency to lab pass rates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((o) => (
              <div key={o.title} className="card p-6 flex flex-col gap-3">
                <span className="text-3xl">{o.icon}</span>
                <h3 className="text-base font-700 text-[#0F172A]">{o.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 5: VENDOR-FIRST NAV ───────────── */}
      <section className="section-pad bg-[#FAFAF8]" id="vendors">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="gold-divider" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A]">Browse training by vendor</h2>
            </div>
            <Link href="/vendors" className="text-sm font-600 text-[#D4A017] hover:text-[#B8870A] transition-colors">
              View all vendors →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vendors.map((v) => (
              <VendorCard key={v.slug} vendor={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 6: CERTIFICATION-FIRST ───────────── */}
      <section className="section-pad bg-white" id="certifications">
        <div className="container-content">
          <div className="text-center mb-10">
            <div className="gold-divider mx-auto" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-4">Search by certification</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Find the exact certification path your team needs — filtered by vendor, role, and difficulty.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="e.g. Kubernetes, Azure Administrator, CCNA…"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                className="input-base pl-11 py-3 text-base"
              />
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Vendor", "Difficulty", "Role"].map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full border border-[#E7E2D8] text-sm text-[#64748B] font-medium cursor-pointer hover:border-[#D4A017] hover:text-[#D4A017] transition-colors">
                {f} ▾
              </span>
            ))}
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {filteredCerts.map((c) => (
              <CertificationCard key={c.id} cert={c} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/certifications" className="btn-outline px-8 py-3">
              Browse all certifications →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 7: TRUST & SECURITY ───────────── */}
      <section className="section-pad bg-[#FAFAF8]" id="security">
        <div className="container-content">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-3">Built for enterprise security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityBlocks.map((b) => (
              <div key={b.title} className="card p-8 flex flex-col gap-4 text-center md:text-left">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="text-base font-700 text-[#0F172A]">{b.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 8: ABOUT + WHY US ───────────── */}
      <section className="section-pad bg-white" id="about">
        <div className="container-content">
          <div className="max-w-3xl">
            <div className="gold-divider" />
            <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-6">Engineering Velocity</h2>
            <p className="text-lg text-[#475569] leading-relaxed mb-8">
              Technical training is broken. Cohort-based scheduling, static slide decks, and manual lab supervision create bottlenecks that scale linearly while your team's needs scale exponentially.
              Aurentis is autonomous instructor infrastructure — embedded directly into your engineering workflow, delivering precision feedback at the moment of learning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { n: "01", title: "Infinite scalability", desc: "Deploy one AI agent or ten thousand — the architecture doesn't flinch." },
                { n: "02", title: "Context-aware, lab-ready intelligence", desc: "Every agent understands your stack, your docs, and your learning objectives." },
                { n: "03", title: "Frictionless ecosystem integration", desc: "API-first design connects to your LMS, K8s clusters, and cloud workspaces." },
                { n: "04", title: "Precision analytics & skill heatmapping", desc: "Surface cognitive bottlenecks before they become team-wide blockers." },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 p-5 rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8]">
                  <span className="text-xl font-800 text-[#D4A017] shrink-0 leading-tight">{item.n}</span>
                  <div>
                    <div className="text-sm font-700 text-[#0F172A] mb-1">{item.title}</div>
                    <div className="text-sm text-[#64748B] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 9: CONTACT FORM ───────────── */}
      <section className="section-pad bg-[#0B1220]" id="contact">
        <div className="container-content">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-white mb-4">
                Ready to modernize your training pipeline?
              </h2>
              <p className="text-[#94A3B8]">
                Book a 30-minute discovery call with an Aurentis solutions architect.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#162035] rounded-2xl p-10 text-center border border-[#D4A017]/30">
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
                    className="input-base bg-[#162035] border-[#1E2D45] text-white placeholder-[#475569] focus:border-[#D4A017]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-600 text-[#94A3B8] mb-2">Current Training Stack</label>
                  <select
                    value={form.stack}
                    onChange={(e) => setForm((f) => ({ ...f, stack: e.target.value }))}
                    className="input-base bg-[#162035] border-[#1E2D45] text-white focus:border-[#D4A017]"
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
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-600 transition-all ${form.teamSize === size
                          ? "border-[#D4A017] bg-[#D4A017]/10 text-[#D4A017]"
                          : "border-[#1E2D45] text-[#475569] hover:border-[#D4A017]/50"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-gold text-base w-full justify-center py-3.5 mt-2">
                  Secure Your Discovery Call
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ───── Video Modal ───── */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="60-Second Workflow Demo" size="xl">
        <div className="aspect-video bg-gradient-to-br from-[#0B1220] to-[#162035] rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center mx-auto mb-4 opacity-70">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8 6l9 5-9 5V6z" fill="white" />
              </svg>
            </div>
            <p className="text-[#94A3B8] text-sm">Workflow demo video placeholder</p>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toastVisible && (
        <div className="toast">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-[#D4A017] flex items-center justify-center shrink-0 text-[10px]">✓</span>
            <span className="text-sm font-500">Thanks — we&apos;ll reach out shortly.</span>
          </div>
        </div>
      )}
    </>
  );
}
