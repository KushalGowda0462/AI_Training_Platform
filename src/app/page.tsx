"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
import { testimonials } from "@/lib/mock/testimonials";

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Reliable programmatic scroll — works regardless of scroll-snap or Next.js router
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };



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

  const howItWorks = [
    {
      step: "01",
      icon: "🚀",
      title: "Deploy Aurilearn Instructor",
      desc: "Aurilearn deploys securely in to your companies environment and integrates with your existing engineering tools and lab systems.",
    },
    {
      step: "02",
      icon: "📋",
      title: "Enroll Teams in Training Programs",
      desc: "Teams join curated Aurilearn learning tracks such as Kubernetes, DevOps, platform engineering, or internal product training.",
    },
    {
      step: "03",
      icon: "🤖",
      title: "AI-Guided Mentorship",
      desc: "Engineers interact with the Aurilearn AI instructor that explains concepts, answers questions, and guides problem solving like a senior engineer.",
    },
    {
      step: "04",
      icon: "🧪",
      title: "Practice in Real Labs",
      desc: "Learners work inside realistic infrastructure labs while the AI mentor provides step-by-step guidance and debugging support.",
    },
    {
      step: "05",
      icon: "📊",
      title: "Track Skill Progress",
      desc: "Managers monitor class and module progress, lab completion, and certification readiness across their teams.",
    },
  ];

  return (
    <>
      {/* ─── SECTION 1: HERO (full-screen snap) ─── */}
      <section id="hero" className="snap-section hero-bg pt-20">
        <div className="container-content w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left: Text */}
            <div className="md:col-span-6 lg:col-span-6 max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold-light)] text-[var(--gold-hover)] text-sm font-700 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block animate-pulse" />
                AI delivered IT training – 1:1 mentorship
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-900 text-[#0F172A] leading-[1.05] tracking-tight mb-4">
                With Aurilearn, you will <span className="text-gradient-gold">exceed your own expectations.</span>
              </h1>

              <p className="text-lg text-[#475569] leading-relaxed mb-5 font-medium">
                The Aurilearn AI instructor can be
                used any time, anywhere on any device and transforms your legacy training in to a
                1:1 mentorship experience leading you to technology mastery. Further, it is secure,
                scalable, and easily integrated into your current training management platform with
                robust and granular data analytics.
              </p>

              <ul className="space-y-2 mb-6 text-[#64748B]">
                {[
                  "AI agent instructing 1:1 just for you",
                  "Ask as many questions as you want",
                  "Receive context-aware expert answers",
                  "Go entirely at your own speed",
                  "Any device, any time, any where",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--gold)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Stack */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2">
                <button
                  onClick={scrollToContact}
                  className="btn-gold flex items-center justify-center text-base font-bold px-7 h-12 rounded-xl shadow-[0_4px_20px_rgba(169,128,42,0.25)] w-full sm:w-auto transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Request an Enterprise Demo
                </button>
                <button
                  onClick={scrollToContact}
                  className="btnx-outline flex items-center justify-center text-base font-bold px-7 h-12 rounded-xl bg-white border-2 w-full sm:w-auto transition-all hover:bg-[#FAFAF8] hover:-translate-y-0.5 cursor-pointer"
                >
                  Try it for Free
                </button>
              </div>
              <p className="text-xs text-[#64748B] font-semibold mb-3">Included: 10 free minutes of AI instruction with &quot;Try for Free&quot;</p>

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

            {/* Right: Product Visual */}
            <div className="md:col-span-6 lg:col-span-6 relative z-10 lg:ml-auto w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#162035] aspect-[4/3] shadow-2xl border-4 border-white">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,var(--gold),transparent_60%)]" />
                </div>

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

                <div className="absolute inset-0 flex items-center justify-center pb-10">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:bg-white/20 hover:scale-105 transition-all"
                    aria-label="Play video"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M8 6l10 6-10 6V6z" fill="var(--ink)" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[radial-gradient(circle,var(--gold-light)_2px,transparent_2px)] [background-size:10px_10px] opacity-60 -z-10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[radial-gradient(circle,var(--border)_2px,transparent_2px)] [background-size:10px_10px] opacity-80 -z-10 rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ABOUT + TRUST LOGOS (full-screen snap) ─── */}
      <section id="about" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8] flex flex-col">
        {/* Main content — grows to push logos down */}
        <div className="container-content flex-1 flex flex-col justify-center py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--gold)] shadow-lg mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-6">About Aurilearn</h2>
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

        {/* Logo strip — anchored at the bottom via mt-auto on the outer wrapper */}
        <div className="w-full mt-auto border-t border-black/[0.06] bg-white py-6">
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
        </div>
      </section>

      {/* ─── SECTION 3: HOW IT WORKS (full-screen snap) ─── */}
      <section className="snap-section bg-white border-t border-[#E7E2D8]">
        <div className="container-content w-full py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-3">How Aurilearn works</h2>
              <p className="text-lg text-[#64748B] max-w-xl mx-auto">
                Five steps from deployment to certified expertise — Your
                Comprehensive Solution
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-12">
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {howItWorks.map((step, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_8px_30px_rgba(169,128,42,0.08)] transition-all">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-[44px] -right-3 w-6 h-[2px] bg-[#E7E2D8] z-10" />
                  )}
                  <div className="text-xs font-bold text-[var(--gold)] tracking-widest mb-3 uppercase">{step.step}</div>
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h3 className="text-base font-800 text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={scrollToContact} className="btn-gold text-base px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer">
              See Aurilearn in Action
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: NATURAL LEARNING EXPERIENCE ─── */}
      <section id="ease-of-use" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8]">
        <div className="container-content w-full py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 max-w-2xl mx-auto">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-3">Natural Learning Experience</h2>
              <p className="text-lg text-[#64748B]">
                Interact with your Aurilearn AI instructor like working with a senior engineer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                { icon: "💬", title: "Ask Questions Anytime", desc: "Learners can ask the AI mentor questions at any stage of training — no waiting, no bottlenecks." },
                { icon: "🐛", title: "Debug Errors Instantly", desc: "Paste logs, errors, or configurations and receive guided troubleshooting explanations in real time." },
                { icon: "🗺️", title: "Guided Lab Execution", desc: "The AI mentor walks engineers through complex infrastructure tasks step by step." },
                { icon: "💡", title: "Concept Explanations", desc: "Difficult engineering concepts are explained clearly using examples and structured reasoning." },
                { icon: "🔄", title: "Continuous Learning Support", desc: "The AI instructor remembers context and continues guiding the learner through their full progress." },
              ].map((card) => (
                <div key={card.title} className="group rounded-2xl p-6 bg-white border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_8px_30px_rgba(169,128,42,0.08)] transition-all flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center text-3xl group-hover:-translate-y-1 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{card.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: MENTORSHIP THAT FEELS REAL ─── */}
      <section id="scalability" className="snap-section bg-white border-t border-[#E7E2D8]">
        <div className="container-content w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="gold-divider" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-5">Mentorship That Feels Real</h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-7">
                Aurilearn&apos;s AI instructor behaves like a senior engineer guiding your learning journey — patient, precise, and always available.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Human-Like Mentorship", desc: "Learners interact with the AI instructor as if they are working with an experienced mentor." },
                  { title: "Context-Aware Teaching", desc: "The AI understands what the learner is currently doing and adapts its guidance accordingly." },
                  { title: "Continuous Feedback", desc: "Learners receive immediate feedback on commands, configurations, and decisions in real time." },
                  { title: "Confidence Building", desc: "Engineers learn by doing while the AI mentor supports and validates their reasoning process." },
                  { title: "Deeper Learning Engagement", desc: "Mentorship-style interaction improves understanding, retention, and real-world skill transfer." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center shrink-0 mt-0.5">
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

            {/* Right side: Mentorship visual */}
            <div className="lg:col-span-6 lg:col-start-7 relative rounded-2xl bg-[#0B1220] border border-[#1E2D45] shadow-xl p-7 overflow-hidden flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(169,128,42,0.4)]">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Aurilearn Instructor</div>
                  <div className="text-[#94A3B8] text-xs">Kubernetes CKA — Pod Networking</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live session
                </div>
              </div>
              {[
                { role: "learner", text: "I applied the NetworkPolicy but traffic is still being blocked between namespaces." },
                { role: "ai", text: "Good catch. Let's check two things: first, ensure the podSelector labels match exactly. A common mistake is a label casing mismatch. Can you paste your policy spec?" },
                { role: "learner", text: "Here it is — podSelector: matchLabels: app: frontend" },
                { role: "ai", text: "I see it — your destination namespace selector is missing. Add a namespaceSelector block alongside the podSelector. Here's the corrected structure..." },
              ].map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "learner" ? "" : "flex-row-reverse"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.role === "ai" ? "bg-[var(--gold)] text-white" : "bg-[#1E2D45] text-[#94A3B8]"
                    }`}>
                    {msg.role === "ai" ? "A" : "R"}
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed max-w-[80%] ${msg.role === "ai"
                    ? "bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-white rounded-tr-sm"
                    : "bg-[#1E2D45] text-[#CBD5E1] rounded-tl-sm"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: ENTERPRISE DEPLOYMENT CONTROL ─── */}
      <section id="security" className="snap-section bg-[#0B1220]">
        <div className="container-content w-full py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-white mb-4">Enterprise Deployment Control</h2>
              <p className="text-[#94A3B8] text-base max-w-xl mx-auto">
                Aurilearn runs within your controlled environment ensuring that you have full enterprise
                governance, security and access management.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {securityCards.map((card) => (
                <div key={card.title} className="bg-[#162035] border border-[#1E2D45] rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#0B1220] border border-[var(--gold)]/20 flex items-center justify-center text-2xl shadow-[0_0_16px_rgba(169,128,42,0.12)]">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: ANALYTICS (full-screen snap) ─── */}
      <section id="analytics" className="snap-section bg-[#FBFCFD] border-t border-[#E7E2D8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-light)] rounded-full mix-blend-multiply filter blur-[80px] opacity-25 pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="container-content relative z-10 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="gold-divider" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A] mb-5">Analytics when, where and as you want them</h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-7">
                Move beyond generic course completion rates. All data is captured and presented on demand, giving engineering leaders granular visibility in to team capabilities and potential road blocks.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Number of students enrolled and in progress",
                  "Track exact module position of each learner",
                  "Pass/fail rates on automated lab validations",
                  "Certification exam registration tracking",
                  "Final certification pass statistics",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-white border border-[#E7E2D8] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[#0F172A] font-semibold text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="#contact" className="btn-gold text-base px-7 py-3">
                View Analytics Demo
              </Link>
            </div>

            <div className="lg:col-span-7 w-full break-words [overflow-wrap:break-word] relative z-20">
              <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] shadow-[0_12px_40px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col gap-4 sm:gap-5">

                {/* 1. Header (Student Profile + Risk) */}
                <div className="flex sm:items-start flex-col sm:flex-row gap-3 justify-between pb-4 border-b border-[#E7E2D8]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center font-bold text-[#94A3B8] text-xl shadow-sm shrink-0">
                      SR
                    </div>
                    <div>
                      <div className="font-bold text-[#0F172A] text-lg leading-tight mb-1">Simon Riley</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="text-[#475569] font-bold bg-[#FAFAF8] border border-[#E7E2D8] px-2 py-0.5 rounded-md">Kubernetes CKA Track</span>
                        <span className="text-[var(--gold)] font-bold bg-[var(--gold)]/10 px-2 py-0.5 rounded-md">In Progress</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm cursor-pointer hover:bg-opacity-90 transition w-full sm:w-auto text-center shrink-0">Export Report</span>
                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Moderate Risk — Needs Practice
                    </div>
                  </div>
                </div>

                {/* 2. Horizontal Learning Journey Tracker */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Learning Journey</div>
                    <div className="text-[10px] font-bold text-[#0F172A]">Module 2 of 5</div>
                  </div>
                  <div className="flex items-center justify-between relative px-2 sm:px-6">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#F3F0E8] rounded-full"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[25%] h-1 bg-green-500 rounded-full"></div>

                    {/* Node 1 */}
                    <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-green-500 border-[3px] border-white flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#0F172A] leading-tight">Module 1<br />K8s Basics</span>
                    </div>

                    {/* Node 2 - Current */}
                    <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[var(--gold)] border-[3px] border-white flex items-center justify-center shadow-[0_0_15px_rgba(169,128,42,0.4)] ring-2 ring-[var(--gold)]/20 transition-transform group-hover:scale-110">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-center text-[var(--gold)] leading-tight">Module 2<br />Pod Net</span>
                    </div>

                    {/* Node 3 - Weak */}
                    <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center text-amber-500 shadow-sm transition-transform group-hover:scale-110">
                        <span className="text-xs font-bold">!</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-center text-amber-600 leading-tight">Module 3<br />Debugging</span>
                    </div>

                    {/* Node 4 - Locked */}
                    <div className="relative z-10 flex flex-col items-center gap-2 w-16 opacity-50">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF8] border-2 border-[#CBD5E1] flex items-center justify-center text-[#94A3B8]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#94A3B8] leading-tight flex-col hidden sm:flex">Module 4<br />Helm</span>
                    </div>

                    {/* Node 5 - Locked */}
                    <div className="relative z-10 flex flex-col items-center gap-2 w-16 opacity-50">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF8] border-2 border-[#CBD5E1] flex items-center justify-center text-[#94A3B8]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#94A3B8] leading-tight flex-col hidden sm:flex">Module 5<br />Security</span>
                    </div>
                  </div>
                </div>

                {/* 3. Learning Status & AI Insight Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Status Card */}
                  <div className="bg-[#FAFAF8] rounded-xl p-4 sm:p-5 border border-[#E7E2D8] shadow-sm flex flex-col justify-between">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Status Overview</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Current Phase</div>
                        <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded inline-block">Hands-on Lab Practice</div>
                      </div>
                      <div className="flex justify-between gap-2 border-t border-[#E7E2D8] pt-3">
                        <div>
                          <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Momentum</div>
                          <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                            Slowing
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Next Action</div>
                          <div className="text-xs font-bold text-[#0F172A]">Complete Network Lab</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insight Card */}
                  <div className="bg-gradient-to-br from-[#F4F9FF] to-[#E0EFFF] rounded-xl p-3 sm:p-4 border border-[#CCE3FF] relative overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-3 opacity-10 text-blue-600 pointer-events-none">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 relative z-10">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
                        Aurilearn AI Insight
                      </div>
                      <p className="text-xs font-medium text-[#0F172A] leading-relaxed relative z-10 mb-4 opacity-90">
                        Simon is struggling with Kubernetes Network Policies, specifically block-all ingress rules. He spent 45 minutes on the last module without passing validation.
                      </p>
                    </div>
                    <div className="text-[10px] font-bold text-white bg-blue-600 inline-flex items-center justify-between px-3 py-2 rounded-lg shadow-sm relative z-10 cursor-pointer hover:bg-blue-700 transition-colors w-full">
                      Assign Guided Remediation Lab
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>

                {/* 4. Improved Module Table */}
                <div>
                  <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 sm:gap-4 text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 sm:px-3 pb-1 border-b border-[#E7E2D8] mb-1">
                    <span className="w-4 text-center">#</span>
                    <span>Module Name</span>
                    <span className="text-center w-16 sm:w-20 hidden sm:block">Progress</span>
                    <span className="text-right w-16 sm:w-22">Status</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { num: 1, name: "Kubernetes Basics", p: 100, active: false, badge: "Completed", color: "text-green-700 bg-green-50 border-green-200" },
                      { num: 2, name: "Pod Networking", p: 65, active: true, badge: "In Progress", color: "text-[var(--gold)] bg-[#FAFAF8] border-[#E7E2D8] shadow-sm transform scale-[1.01]" },
                      { num: 3, name: "Cluster Debugging", p: 0, active: false, badge: "At Risk", color: "text-amber-700 bg-amber-50 border-amber-200" },
                      { num: 4, name: "Helm Deployments", p: 0, active: false, badge: "Locked", color: "text-[#94A3B8] bg-[#FAFAF8] border-[#E7E2D8] opacity-60" },
                    ].map((row, i) => (
                      <div key={i} className={`grid grid-cols-[auto_1fr_auto_auto] gap-2 sm:gap-4 items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all ${row.active ? "border-[var(--gold)]/40 bg-[var(--gold)]/5 ring-1 ring-[var(--gold)]/20" : "border-transparent hover:bg-[#FAFAF8]"}`}>
                        <span className={`text-[10px] font-bold w-4 text-center ${row.active ? "text-[var(--gold)]" : "text-[#94A3B8]"}`}>{row.num}</span>
                        <span className={`text-[10px] sm:text-xs font-bold truncate ${row.active ? "text-[#0F172A]" : "text-[#475569]"}`}>{row.name}</span>
                        <div className="w-16 sm:w-20 hidden sm:flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[#E7E2D8] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${row.active ? "bg-[var(--gold)]" : row.p === 100 ? "bg-green-500" : "bg-transparent"}`} style={{ width: `${row.p}%` }}></div>
                          </div>
                          <span className="text-[9px] font-bold text-[#94A3B8] w-6 text-right shrink-0">{row.p}%</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border text-center w-16 sm:w-22 shrink-0 ${row.color}`}>{row.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Certification pipeline with labels */}
                <div className="bg-[#0B1220] p-3 sm:p-4 rounded-xl shadow-inner mt-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-3">
                    <div className="font-bold text-white text-[10px] sm:text-xs uppercase tracking-widest opacity-90">CKA Certification Pipeline</div>
                    <div className="font-bold text-[var(--gold)] text-[10px] bg-[var(--gold)]/10 px-2 py-0.5 rounded-md self-start sm:self-auto border border-[var(--gold)]/20">Phase 2 of 4</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Concept", state: "done" },
                      { label: "Lab Practice", state: "active" },
                      { label: "Assessment", state: "locked" },
                      { label: "Cert Exam", state: "locked" },
                    ].map((stage, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className={`h-1.5 rounded-full w-full ${stage.state === "done" ? "bg-green-500" : stage.state === "active" ? "bg-[var(--gold)] shadow-[0_0_8px_rgba(169,128,42,0.6)]" : "bg-white/10"}`}></div>
                        <span className={`text-[9px] sm:text-[10px] font-bold truncate ${stage.state === "done" ? "text-green-400" : stage.state === "active" ? "text-[var(--gold)]" : "text-white/40"}`}>{stage.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 8: TESTIMONIALS (full-screen snap) ─── */}
      <section id="testimonials" className="snap-section bg-[#FCFBF8] border-t border-[#E7E2D8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,128,42,0.05),transparent_60%)] pointer-events-none" />

        <div className="container-content relative z-10 w-full py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="gold-divider mx-auto" />
              <h2 className="text-3xl md:text-4xl font-800 text-[#0F172A]">Customer testimonials</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-7 rounded-2xl border border-[#E7E2D8] shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
                  <div>
                    <div className="text-[var(--gold)] text-3xl font-serif leading-none mb-4">&quot;</div>
                    <p className="text-[#0F172A] text-base font-medium leading-relaxed mb-6">
                      {t.quote}
                    </p>
                  </div>
                  <div className="border-t border-[#F3F0E8] pt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center font-bold text-[#94A3B8] text-sm shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0F172A] text-sm">{t.author}</div>
                      <div className="text-xs font-semibold text-[#64748B]">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA / CONTACT (full-screen snap, flex-col) ─── */}
      <section id="contact" className="snap-section bg-[#0B1220] flex flex-col pt-20 md:pt-28">
        {/* Form area — grows to fill space */}
        <div className="container-content w-full flex-1 flex flex-col justify-center pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 max-w-xl mx-auto w-full">
              <div className="text-center mb-8">
                <div className="gold-divider mx-auto" />
                <h2 className="text-3xl md:text-4xl font-800 text-white mb-3">
                  Let Aurliearn take you beyond your own expectations
                </h2>
                <p className="text-[#94A3B8] text-base">
                  Book a 30-minute discovery call with an AURILEARN.AI Customer Service Representative
                </p>
              </div>

              <div className="bg-[#162035] rounded-2xl p-8 sm:p-10 text-center border border-[#1E2D45] shadow-2xl mt-8">
                <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-6">
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
                    <span className="text-xl sm:text-2xl font-800 text-white group-hover:text-[var(--gold)] transition-colors">
                      sales@aurilearn.ai
                    </span>
                  </a>

                  <div className="w-12 h-px bg-[#1E2D45]" />

                  <a
                    href="tel:+910000000000"
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1E2D45] border border-[#334155] flex items-center justify-center text-[#94A3B8] group-hover:scale-110 group-hover:text-white transition-all duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="text-base font-600 text-[#CBD5E1] group-hover:text-white transition-colors">
                      +91 99869 68828
                    </span>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1E2D45]">
                  <p className="text-[#64748B] text-xs font-600">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rich company footer band — pinned at bottom of the contact panel */}
        <div className="w-full mt-auto border-t border-[#162035] bg-[#060D1A]">
          <div className="container-content py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-6">
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
                    { label: "How It Works", href: "#ease-of-use" },
                    { label: "Security", href: "#security" },
                    { label: "Analytics", href: "#analytics" },
                    { label: "Scalability", href: "#scalability" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="md:col-span-4 lg:col-span-2">
                <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Company</h4>
                <ul className="space-y-2">
                  {[
                    { label: "About", href: "#about" },
                    { label: "Testimonials", href: "#testimonials" },
                    { label: "Contact", href: "#contact" },
                    { label: "Careers", href: "#" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</a>
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
                      <a href={l.href} className="text-xs text-[#475569] hover:text-[var(--gold)] transition-colors">{l.label}</a>
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
        </div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="Aurilearn Demo: Overcoming Obstacles" size="xl">
        <div className="aspect-video bg-[#0B1220] rounded-xl flex items-center justify-center relative overflow-hidden border border-[#1E2D45]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--gold)]/10 to-transparent" />
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


    </>
  );
}
