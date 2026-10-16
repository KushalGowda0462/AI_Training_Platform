import { Band, SectionHead } from "./ui";

const points = [
  {
    title: "Built by IT training professionals.",
    desc: "Created, architected and engineered by people who have worked for top-tier global IT training companies, with decades of classroom and content experience.",
  },
  {
    title: "Context-aware teaching, not a generic chatbot.",
    desc: "The AI understands what the learner is currently doing and adapts its guidance accordingly.",
  },
  {
    title: "Practice in real labs.",
    desc: "Learners work inside realistic infrastructure labs while the AI mentor provides step-by-step guidance and debugging support.",
  },
];

export default function TrainingGap() {
  return (
    <Band id="training-gap" alt>
      <SectionHead
        eyebrow="the training gap"
        title="General LLM chatbots have failed to teach effectively."
        lede="AuriLearn is a specialized LLM IT training platform: a system that dynamically and efficiently interprets the complex, stateful environments of modern engineering."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] p-8 flex flex-col justify-end min-h-[280px]">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[var(--gold-light)] opacity-60 blur-[60px]" />
          <div className="relative font-mono text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] font-bold leading-none text-[#0F172A]">
            1<span className="text-[var(--gold)]">:</span>1
          </div>
          <p className="relative mt-4 text-[#475569] leading-relaxed">
            AI mentorship, built on decades of deep real-world IT training experience and applying LLMs to narrow,
            high value training use cases.
          </p>
        </div>

        <ol className="lg:col-span-7 flex flex-col gap-4">
          {points.map((p, i) => (
            <li key={p.title} className="flex gap-5 rounded-2xl border border-[#E7E2D8] bg-white p-6 transition-colors hover:border-[var(--gold)]">
              <span className="font-mono text-sm font-bold text-[var(--gold)] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-1.5">{p.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
