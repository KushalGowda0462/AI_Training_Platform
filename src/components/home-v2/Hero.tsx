"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import DemoRequestModal from "@/components/DemoRequestModal";
import FreeTrialModal from "@/components/FreeTrialModal";
import { Wrap } from "./ui";

// "Aurilearn Demonstrative Video" on the Aurilearn ai YouTube channel
const YOUTUBE_ID = "_BNz0LMvnMk";

const jumpLinks = [
  { href: "#instructor", label: "ai instructor" },
  { href: "#analytics", label: "analytics" },
  { href: "#how-it-works", label: "how it works" },
  { href: "#security", label: "security" },
];

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <FreeTrialModal isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      {/* id="hero" lets the navbar hide its own demo button while this is on screen */}
      <section id="hero" className="relative overflow-hidden bg-[#FAFAF8] pt-16 pb-20 md:pt-24 md:pb-28">
        {/* faint grid + gold glow, the light take on the reference's backdrop */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[var(--gold-light)] opacity-40 blur-[120px] pointer-events-none" />

        <Wrap className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left: pitch */}
            <div className="lg:col-span-6 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E2D8] bg-white px-3 py-1.5 mb-6 font-mono text-xs font-semibold text-[#0F172A]">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                AuriLearn · AI-delivered IT training · 1:1 mentorship
              </div>

              <h1 className="text-[clamp(2.3rem,1.4rem+4.4vw,4rem)] font-extrabold tracking-tight leading-[1.04] text-[#0F172A]">
                The World&apos;s first{" "}
                <span className="text-gradient-gold">Vertical Narrow Language Model.</span>
              </h1>

              <p className="mt-6 max-w-[560px] text-[clamp(1.0625rem,1rem+0.35vw,1.1875rem)] text-[#475569] leading-relaxed">
                <strong className="text-[#0F172A]">Specifically architected</strong>, orchestrated, trained on and fine
                tuned to deliver <strong className="text-[#0F172A]">IT training</strong> through a 1:1 AI instructor.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-3">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="rounded-full bg-[#D4A017] hover:bg-[#B8870A] text-white px-8 py-3.5 font-bold text-base shadow-[0_8px_30px_rgba(212,160,23,0.35)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Request an Enterprise Demo
                </button>
                <button
                  onClick={() => setTrialOpen(true)}
                  className="rounded-full border-2 border-[#0F172A] bg-white text-[#0F172A] px-8 py-3 font-bold text-base text-center transition-all hover:bg-[#0F172A] hover:text-white hover:-translate-y-0.5 cursor-pointer"
                >
                  Try it for Free
                </button>
              </div>
              <p className="mt-3 text-xs font-semibold text-[#64748B]">
                Included: 10 free minutes of AI instruction with &quot;Try for Free&quot;
              </p>

              <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-[#94A3B8]">
                {jumpLinks.map((l, i) => (
                  <span key={l.href} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <a href={l.href} className="hover:text-[var(--gold)] transition-colors">
                      {l.label}
                    </a>
                  </span>
                ))}
              </nav>
            </div>

            {/* Right: video */}
            <div className="lg:col-span-6 min-w-0 flex flex-col gap-5">
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                The <span className="text-[var(--gold)]">AuriLearn</span> way of learning
              </h2>

              <button
                onClick={() => setVideoOpen(true)}
                aria-label="Play the AuriLearn demo video"
                className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E7E2D8] bg-[#0B1220] shadow-[0_20px_50px_rgba(15,23,42,0.15)] cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-[#0B1220]/25 transition-colors group-hover:bg-[#0B1220]/10" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center shadow-[0_0_0_10px_rgba(212,160,23,0.25)] transition-transform group-hover:scale-105">
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 6l10 6-10 6V6z" fill="#fff" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </Wrap>
      </section>

      <Modal isOpen={videoOpen} onClose={() => setVideoOpen(false)} title="AuriLearn at work" size="xl">
        <div className="aspect-video bg-[#0B1220] rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
            title="Aurilearn Demonstrative Video"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
}
