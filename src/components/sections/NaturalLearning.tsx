
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
  );
}
