"use client";

import { useState } from "react";
import Link from "next/link";
import { Band, SectionHead, Chip } from "./ui";

const steps = [
  {
    image: "/how-it-works/learning.png",
    title: "Deploy Aurilearn Instructor",
    desc: "Aurilearn deploys securely in to your company's environment and integrates with your existing learning platform, lab system and engineering tools.",
  },
  {
    image: "/how-it-works/enroll.png",
    title: "Enroll Teams in Training Programs",
    desc: "Teams join curated Aurilearn learning tracks such as Kubernetes, DevOps, platform engineering and internal product and technical training.",
  },
  {
    image: "/how-it-works/mentorship.png",
    title: "AI-Guided Mentorship",
    desc: "Engineers interact with the Aurilearn AI instructor that explains concepts, answers questions, and guides problem solving like a senior engineer.",
  },
  {
    image: "/how-it-works/labs-rack.jpg",
    photo: true,
    title: "Practice in Real Labs",
    desc: "Learners work inside real labs while the AI mentor provides step-by-step guidance and debugging support.",
  },
  {
    image: "/how-it-works/progress.png",
    title: "Track Skills Progress",
    desc: "Managers monitor class and module progress, lab completion, and certification readiness across their teams.",
  },
];

const tracks = ["Kubernetes", "DevOps", "Platform engineering", "Internal product training"];

export default function Steps() {
  const [open, setOpen] = useState(0);

  return (
    <Band id="how-it-works" alt>
      <SectionHead
        eyebrow="how it works"
        title="Five steps from deployment to certified expertise."
        lede={
          <Link href="/platform/" className="font-semibold text-[var(--gold-hover)] underline underline-offset-4 hover:text-[var(--gold)]">
            See the full platform →
          </Link>
        }
      />

      <ol className="rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden divide-y divide-[#E7E2D8]">
        {steps.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.title} className={isOpen ? "bg-[#FAFAF8]" : ""}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-5 px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-mono text-sm font-bold text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-bold text-[#0F172A] text-lg">{s.title}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {isOpen && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 px-6 pb-6 sm:pl-[4.25rem]">
                  <span className="w-16 h-16 rounded-full bg-white border border-[var(--gold)]/30 flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt=""
                      className={s.photo ? "w-full h-full p-[3px] rounded-full object-cover" : "w-10 h-10 object-contain"}
                    />
                  </span>
                  <p className="text-[#475569] leading-relaxed max-w-[720px]">{s.desc}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 mb-3 font-mono text-sm md:text-[15px] uppercase tracking-[0.15em] text-[#94A3B8]">Learning tracks</p>
      <div className="flex flex-wrap gap-2">
        {tracks.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </Band>
  );
}
