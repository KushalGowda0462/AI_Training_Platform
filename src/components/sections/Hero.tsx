"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import DemoRequestModal from "@/components/DemoRequestModal";
import FreeTrialModal from "@/components/FreeTrialModal";

// "Aurilearn Demonstrative Video" on the Aurilearn ai YouTube channel
const YOUTUBE_ID = "_BNz0LMvnMk";

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  return (
    <>
    <DemoRequestModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    <FreeTrialModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />

    {/* ─── SECTION 1: HERO (full-screen snap) ─── */}
    <section id="hero" className="snap-section hero-bg">
      <div className="container-content w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left: Text */}
          <div className="md:col-span-6 lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold-light)] text-[var(--gold-hover)] text-sm font-700 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block animate-pulse" />
              Aurilearn – Your AI delivered IT training engine – 1:1 mentorship
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-900 text-[#0F172A] leading-[1.05] tracking-tight mb-4">
              The World&apos;s first AI delivered IT Training{" "}
              <span className="text-gradient-gold">Vertical Narrow Language Model</span>
            </h1>

            <p className="text-lg text-[#475569] leading-relaxed mb-5 font-medium">
              specifically architected, orchestrated, trained on and fine tuned to specifically and
              only deliver IT training.
            </p>

            <ul className="space-y-2 mb-6 text-[#64748B]">
              {[
                "Students are taught using interactive slides, through live context based white boarding and case studies",
                "Knowledge and skill sets are ensured through frequent quizzes and instructor check ins",
                "Instructor agent is highly personalizable in terms of voice, accent, explanation style, supportive level, etc.",
                "System is easy to use and highly customizable",
                "Real time progress readily tracked",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Stack */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-gold flex items-center justify-center text-base font-bold px-7 h-12 rounded-xl shadow-[0_4px_20px_rgba(169,128,42,0.25)] w-full sm:w-auto transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Request an Enterprise Demo
              </button>
              <button
                onClick={() => setTrialModalOpen(true)}
                className="btnx-outline flex items-center justify-center text-base font-bold px-7 h-12 rounded-xl bg-white border-2 w-full sm:w-auto transition-all hover:bg-[#FAFAF8] hover:-translate-y-0.5 cursor-pointer"
              >
                Try it for Free
              </button>
            </div>
            <p className="text-xs text-[#64748B] font-semibold mb-3">Included: 10 free minutes of AI instruction with &quot;Try for Free&quot;</p>
          </div>

          {/* Right: Product Visual */}
          <div className="md:col-span-6 lg:col-span-5 relative z-10 w-full">
            {/* Title over the video — spans the full width of the frame */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-10 bg-[var(--gold)] shrink-0" />
                <span className="text-2xl md:text-[2rem] leading-none font-normal uppercase tracking-[0.12em] text-[var(--gold-hover)] whitespace-nowrap">
                  See it live
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#E7E2D8] to-transparent" />
              </div>
              <h2 className="text-base font-semibold text-[#0F172A]">
                Aurilearn <span className="text-gradient-gold">at work</span>
              </h2>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#162035] aspect-[4/3] shadow-2xl border-4 border-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0B1220]/25" />

              <div className="absolute inset-0 flex items-center justify-center">
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

    {/* Video Modal */}
    <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="Aurilearn Demonstrative Video" size="xl">
      <div className="aspect-video bg-[#0B1220] rounded-xl overflow-hidden border border-[#1E2D45]">
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
