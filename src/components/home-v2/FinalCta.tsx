"use client";

import { useState } from "react";
import DemoRequestModal from "@/components/DemoRequestModal";
import FreeTrialModal from "@/components/FreeTrialModal";
import { Wrap } from "./ui";

export default function FinalCta() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-[#D4A017] via-[#E3B43A] to-[#B8870A]">
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <FreeTrialModal isOpen={trialOpen} onClose={() => setTrialOpen(false)} />
      <Wrap className="py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-mono text-[17px] md:text-lg font-semibold text-[#0B1220]/70 mb-2">{"// get started"}</p>
          <h2 className="text-[clamp(1.7rem,1.25rem+2.1vw,2.6rem)] font-extrabold tracking-tight leading-[1.1] text-[#0B1220]">
            See AuriLearn in action.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setDemoOpen(true)}
            className="rounded-full bg-[#0B1220] hover:bg-[#162035] text-white px-8 py-3.5 font-bold transition-colors cursor-pointer"
          >
            Request an Enterprise Demo
          </button>
          <button
            onClick={() => setTrialOpen(true)}
            className="rounded-full border-2 border-[#0B1220] text-[#0B1220] px-8 py-3 font-bold text-center transition-colors hover:bg-[#0B1220] hover:text-white cursor-pointer"
          >
            Try it for Free
          </button>
        </div>
      </Wrap>
    </section>
  );
}
