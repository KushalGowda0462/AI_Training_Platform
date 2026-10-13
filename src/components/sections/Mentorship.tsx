
/* ─── SECTION 5: MENTORSHIP THAT FEELS REAL ─── */
export default function Mentorship() {
  return (
    <section id="scalability" className="snap-section bg-white border-t border-[#E7E2D8]">
      <div className="container-content w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="gold-divider" />
            <h2 className="section-title text-[#0F172A] mb-5">Mentorship That Feels Real</h2>
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
  );
}
