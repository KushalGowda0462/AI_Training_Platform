
/* ─── SECTION 4: NATURAL LEARNING EXPERIENCE ─── */
export default function NaturalLearning() {
  return (
    <section id="ease-of-use" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8]">
      <div className="container-content w-full py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
          <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 max-w-2xl mx-auto">
            <div className="gold-divider mx-auto" />
            <h2 className="section-title text-[#0F172A] mb-3">Natural Learning Experience</h2>
            <p className="text-lg text-[#64748B]">
              Interact with your Aurilearn AI instructor like working with a senior engineer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: ["M13 4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1v3.5l4.5-3.5H18a2 2 0 0 0 2-2v-4", "M8.1 10.5a0.4 0.4 0 1 0 0.8 0a0.4 0.4 0 1 0 -0.8 0", "M11.6 10.5a0.4 0.4 0 1 0 0.8 0a0.4 0.4 0 1 0 -0.8 0", "M15.1 10.5a0.4 0.4 0 1 0 0.8 0a0.4 0.4 0 1 0 -0.8 0", "M18.5 2.5c.3 1.6 1.4 2.7 3 3-1.6.3-2.7 1.4-3 3-.3-1.6-1.4-2.7-3-3 1.6-.3 2.7-1.4 3-3z"], title: "Ask Questions Anytime", desc: "Learners can ask the AI mentor questions at any stage of training — no waiting, no bottlenecks." },
              { icon: ["M3 7.5V5a2 2 0 0 1 2-2h2.5", "M16.5 3H19a2 2 0 0 1 2 2v2.5", "M21 16.5V19a2 2 0 0 1-2 2h-2.5", "M7.5 21H5a2 2 0 0 1-2-2v-2.5", "M9 12.5a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0z", "M10.5 9.6a1.5 1.5 0 0 1 3 0", "M12 12v5.3", "M9 13.5H7.5", "M16.5 13.5H15", "M9.4 16.4 8 17.5", "M14.6 16.4 16 17.5", "M9.4 10.6 8 9.5", "M14.6 10.6 16 9.5"], title: "Debug Errors Instantly", desc: "Paste logs, errors, or configurations and receive guided troubleshooting explanations in real time." },
              { icon: ["M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M3 8.5h18", "m6.5 12 2 1.75-2 1.75", "M10.25 16.5a1.25 1.25 0 1 0 2.5 0a1.25 1.25 0 1 0 -2.5 0", "M15.75 12a1.25 1.25 0 1 0 2.5 0a1.25 1.25 0 1 0 -2.5 0", "M12.5 15.7l3.5-2.9"], title: "Guided Lab Execution", desc: "The AI mentor walks engineers through complex infrastructure tasks step by step." },
              { icon: ["M10.25 4.5a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 1 0 -3.5 0", "M3.25 12a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 1 0 -3.5 0", "M17.25 12a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 1 0 -3.5 0", "M10.25 19.5a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 1 0 -3.5 0", "M10.75 12a1.25 1.25 0 1 0 2.5 0a1.25 1.25 0 1 0 -2.5 0", "M10.8 5.8 6.2 10.7", "M13.2 5.8l4.6 4.9", "M6.2 13.3l4.6 4.9", "M17.8 13.3l-4.6 4.9", "M6.75 12h4", "M13.25 12h4"], title: "Concept Explanations", desc: "Difficult engineering concepts are explained clearly using examples and structured reasoning." },
              { icon: ["M20 11a8 8 0 0 0-14.3-4.9L4 8", "M4 3.5V8h4.5", "M4 13a8 8 0 0 0 14.3 4.9L20 16", "M20 20.5V16h-4.5", "M9.75 9.75h4.5v4.5h-4.5z", "M11 8.25v1.5", "M13 8.25v1.5", "M11 14.25v1.5", "M13 14.25v1.5", "M8.25 11h1.5", "M8.25 13h1.5", "M14.25 11h1.5", "M14.25 13h1.5"], title: "Continuous Learning Support", desc: "The AI instructor remembers context and continues guiding the learner through their full progress." },
            ].map((card) => (
              <div key={card.title} className="group rounded-2xl p-6 bg-white border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_8px_30px_rgba(169,128,42,0.08)] transition-all flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#F3EEE2] border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold-hover)] group-hover:-translate-y-1 transition-transform duration-300">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {card.icon.map((d) => <path key={d} d={d} />)}
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{card.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
