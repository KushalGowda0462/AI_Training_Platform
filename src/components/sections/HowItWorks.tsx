import Link from "next/link";

const howItWorks = [
  {
    step: "01",
    image: "/how-it-works/learning.png",
    title: "Deploy Aurilearn Instructor",
    desc: "Aurilearn deploys securely in to your companies environment and integrates with your existing engineering tools and lab systems.",
  },
  {
    step: "02",
    image: "/how-it-works/enroll.png",
    title: "Enroll Teams in Training Programs",
    desc: "Teams join curated Aurilearn learning tracks such as Kubernetes, DevOps, platform engineering, or internal product training.",
  },
  {
    step: "03",
    image: "/how-it-works/mentorship.png",
    title: "AI-Guided Mentorship",
    desc: "Engineers interact with the Aurilearn AI instructor that explains concepts, answers questions, and guides problem solving like a senior engineer.",
  },
  {
    step: "04",
    image: "/how-it-works/labs-rack.jpg",
    photo: true,
    title: "Practice in Real Labs",
    desc: "Learners work inside realistic infrastructure labs while the AI mentor provides step-by-step guidance and debugging support.",
  },
  {
    step: "05",
    image: "/how-it-works/progress.png",
    title: "Track Skill Progress",
    desc: "Managers monitor class and module progress, lab completion, and certification readiness across their teams.",
  },
];

/* ─── SECTION 3: HOW IT WORKS (full-screen snap) ─── */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="snap-section bg-white border-t border-[#E7E2D8]">
      <div className="container-content w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-12">
          <div className="md:col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <div className="gold-divider mx-auto" />
            <h2 className="section-title text-[#0F172A] mb-3">How Aurilearn works</h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              Five steps from deployment to certified expertise — Your
              Comprehensive Solution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-12">
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {howItWorks.map((step, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E2D8] hover:border-[var(--gold)] hover:shadow-[0_8px_30px_rgba(169,128,42,0.08)] transition-all">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-[44px] -right-3 w-6 h-[2px] bg-[#E7E2D8] z-10" />
                )}
                <div className="text-xs font-bold text-[var(--gold)] tracking-widest mb-3 uppercase">{step.step}</div>
                {/* Icon badge — every step gets the same 56px gold-ringed
                    circle so the artwork reads as an icon set, not as
                    pasted-in pictures of different sizes. */}
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--gold)]/5 border border-[var(--gold)]/30 flex items-center justify-center shadow-[0_0_14px_rgba(169,128,42,0.10)] group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/10 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.image}
                      alt=""
                      className={
                        "photo" in step
                          ? "w-full h-full p-[3px] rounded-full object-cover"
                          : "w-9 h-9 object-contain"
                      }
                      draggable={false}
                    />
                  </div>
                </div>
                <h3 className="text-base font-800 text-[#0F172A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-gold text-base px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer">
            See Aurilearn in Action
          </Link>
        </div>
      </div>
    </section>
  );
}
