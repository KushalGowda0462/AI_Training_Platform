import { Band, SectionHead } from "./ui";

const metrics = [
  "Number of students enrolled and in progress",
  "Track exact module position of each learner",
  "Pass/fail rates on automated lab validations",
  "Certification exam registration tracking",
  "Final certification pass statistics",
];

const stages = [
  { label: "Concept", state: "done" },
  { label: "Lab Practice", state: "active" },
  { label: "Assessment", state: "locked" },
  { label: "Cert Exam", state: "locked" },
];

export default function AnalyticsBand() {
  return (
    <Band id="analytics" alt>
      <SectionHead
        eyebrow="analytics"
        title="Analytics when, where and as you want them."
        lede="Move beyond generic course completion rates. All data is captured and presented on demand, giving engineering leaders granular visibility in to team capabilities and potential road blocks."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Learner progress mock */}
        <div className="lg:col-span-5 min-w-0 rounded-2xl border border-[#E7E2D8] bg-[#FAFAF8] p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="font-bold uppercase tracking-[0.15em] text-[var(--gold)]">Learner progress</span>
            <span className="text-[#94A3B8]">live</span>
          </div>
          <p className="mt-3 text-lg font-extrabold text-[#0F172A]">Simon Riley · Kubernetes CKA Track</p>

          <ol className="mt-6 grid grid-cols-4 gap-2">
            {stages.map((s) => (
              <li key={s.label} className="min-w-0">
                <span
                  className={`block h-1.5 rounded-full ${
                    s.state === "done" ? "bg-emerald-500" : s.state === "active" ? "bg-[var(--gold)]" : "bg-[#E7E2D8]"
                  }`}
                />
                <span
                  className={`mt-2 block truncate font-mono text-[10px] font-bold ${
                    s.state === "done" ? "text-emerald-600" : s.state === "active" ? "text-[var(--gold)]" : "text-[#94A3B8]"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          <dl className="mt-6 divide-y divide-[#E7E2D8] border-t border-[#E7E2D8] text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#64748B]">Current module</dt>
              <dd className="font-mono text-[var(--gold-hover)]">Pod Networking</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-[#64748B]">Status</dt>
              <dd className="font-mono text-[var(--gold-hover)]">In Progress</dd>
            </div>
          </dl>
        </div>

        <ol className="lg:col-span-7 flex flex-col gap-3">
          {metrics.map((m, i) => (
            <li key={m} className="flex items-center gap-5 rounded-2xl border border-[#E7E2D8] bg-white px-6 py-5 transition-colors hover:border-[var(--gold)]">
              <span className="font-mono text-sm font-bold text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-bold text-[#0F172A]">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
