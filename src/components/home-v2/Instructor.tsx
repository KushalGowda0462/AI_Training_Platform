import { Band, SectionHead } from "./ui";

const mentorPoints = [
  { title: "Human-like mentorship", desc: "Learners interact with the AI instructor as if they are working with an experienced mentor." },
  { title: "Context-aware teaching", desc: "The AI understands what the learner is currently doing and adapts its guidance accordingly." },
  { title: "Continuous feedback", desc: "Immediate feedback on commands, configurations, and decisions in real time." },
  { title: "Confidence building", desc: "Engineers learn by doing while the AI mentor supports and validates their reasoning process." },
];

const chat = [
  { role: "learner", text: "I applied the NetworkPolicy but traffic is still being blocked between namespaces." },
  { role: "ai", text: "Good catch. Let's check two things: first, ensure the podSelector labels match exactly. A common mistake is a label casing mismatch. Can you paste your policy spec?" },
  { role: "learner", text: "Here it is — podSelector: matchLabels: app: frontend" },
  { role: "ai", text: "I see it — your destination namespace selector is missing. Add a namespaceSelector block alongside the podSelector. Here's the corrected structure..." },
];

const features = [
  {
    title: "Ask Questions Anytime",
    desc: "Learners can ask the AI mentor questions at any stage of training — no waiting, no bottlenecks.",
    icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  },
  {
    title: "Debug Errors Instantly",
    desc: "Paste logs, errors, or configurations and receive guided troubleshooting explanations in real time.",
    icon: <path d="M4 17l6-6-6-6M12 19h8" />,
  },
  {
    title: "Guided Lab Execution",
    desc: "The AI mentor walks engineers through complex infrastructure tasks step by step.",
    icon: <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3zM9 3v15M15 6v15" />,
  },
];

export default function Instructor() {
  return (
    <Band id="instructor">
      <SectionHead
        center
        eyebrow="powered by AuriLearn"
        title="Mentorship that feels real."
        lede="AuriLearn's AI instructor behaves like a senior engineer guiding your learning journey — patient, precise, and always available."
      />

      <div className="rounded-3xl border border-[var(--gold)]/40 bg-white p-6 sm:p-10 shadow-[0_20px_60px_rgba(169,128,42,0.10)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold-light)]/40 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--gold-hover)]">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              AuriLearn AI Instructor
            </span>
            <h3 className="mt-5 text-2xl sm:text-[1.75rem] font-extrabold tracking-tight leading-tight text-[#0F172A]">
              Interact with your AuriLearn AI instructor like working with a senior engineer.
            </h3>
            <ul className="mt-6 space-y-4">
              {mentorPoints.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" />
                  <div>
                    <p className="font-bold text-[#0F172A]">{p.title}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat demo — the one dark panel on the page, as in the reference */}
          <div className="lg:col-span-6 min-w-0 rounded-2xl bg-[#0B1220] border border-[#1E2D45] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[13px] font-bold text-white">AuriLearn Instructor</span>
              <span className="ml-auto rounded-full border border-[var(--gold)]/50 px-2.5 py-0.5 font-mono text-[10px] text-[#E8C96B]">
                Kubernetes CKA
              </span>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {chat.map((m, i) =>
                m.role === "learner" ? (
                  <p key={i} className="self-end max-w-[85%] rounded-xl rounded-br-sm bg-[#D4A017]/15 border border-[#D4A017]/30 px-4 py-2.5 text-[13px] leading-relaxed text-white">
                    {m.text}
                  </p>
                ) : (
                  <div key={i} className="self-start max-w-[90%] rounded-xl rounded-bl-sm bg-white/[0.04] border border-white/10 px-4 py-3">
                    <p className="font-mono text-[11px] font-bold text-[#E8C96B] mb-1">AuriLearn</p>
                    <p className="text-[13px] leading-relaxed text-[#CBD5E1]">{m.text}</p>
                  </div>
                )
              )}
            </div>
            <div className="border-t border-white/10 px-5 py-3.5 font-mono text-[12px] text-white/40">
              Ask anything about your lab…
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-[#E7E2D8] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]">
            <span className="w-11 h-11 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {f.icon}
              </svg>
            </span>
            <h3 className="font-bold text-[#0F172A] text-lg mb-2">{f.title}</h3>
            <p className="text-[#64748B] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}
