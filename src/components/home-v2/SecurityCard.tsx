"use client";

import { useState } from "react";
import Link from "next/link";
import DemoRequestModal from "@/components/DemoRequestModal";
import { Band, SectionHead, Check } from "./ui";

const points = [
  { title: "Private On Premise Deployment", desc: "Deploy within your infrastructure or dedicated cloud environment." },
  { title: "Controlled Access", desc: "Administrators manage which teams and users can access the AI instructor." },
  { title: "Organization Isolated Environments", desc: "No cross tenant data sharing at any layer." },
  { title: "Secure Training Data", desc: "Runbooks, labs, and infrastructure interactions never leave your controlled environment." },
  { title: "Enterprise Identity Integration", desc: "Corporate SSO, authentication systems, and access policies." },
];

export default function SecurityCard() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Band id="security">
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      <SectionHead
        center
        eyebrow="security"
        title="Enterprise-grade. Inside your perimeter."
        lede="Deploy AuriLearn within your infrastructure or dedicated cloud environment — keeping all training data inside your perimeter."
      />

      <div className="relative mx-auto max-w-[560px] rounded-3xl border border-[var(--gold)]/50 bg-[#FAFAF8] px-6 pb-8 pt-10 sm:px-10 shadow-[0_24px_60px_rgba(169,128,42,0.12)]">
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D4A017] px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white">
          Enterprise ready
        </span>

        <ul className="space-y-4">
          {points.map((p) => (
            <li key={p.title} className="flex gap-3">
              <Check />
              <div>
                <p className="font-bold text-[#0F172A]">{p.title}</p>
                <p className="text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setDemoOpen(true)}
          className="mt-8 w-full rounded-full bg-[#D4A017] hover:bg-[#B8870A] text-white py-3.5 font-bold shadow-[0_8px_30px_rgba(212,160,23,0.35)] transition-colors cursor-pointer"
        >
          Request an Enterprise Demo
        </button>
        <p className="mt-4 text-center">
          <Link href="/security/" className="text-sm font-semibold text-[var(--gold-hover)] hover:text-[var(--gold)]">
            Read more about security →
          </Link>
        </p>
      </div>
    </Band>
  );
}
