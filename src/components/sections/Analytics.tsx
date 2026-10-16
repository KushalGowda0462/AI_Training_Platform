
/* ─── SECTION 7: ANALYTICS (full-screen snap) ─── */
export default function Analytics() {
  return (
    <section id="analytics" className="snap-section bg-[#FBFCFD] border-t border-[#E7E2D8] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-light)] rounded-full mix-blend-multiply filter blur-[80px] opacity-25 pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="container-content relative z-10 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="gold-divider" />
            <h2 className="section-title text-[#0F172A] mb-5">Analytics when, where and as you want them</h2>
            <p className="text-base text-[#64748B] leading-relaxed mb-7">
              Move beyond generic course completion rates. All data is captured and presented on demand, giving engineering leaders granular visibility in to team capabilities and potential road blocks.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Number of students enrolled and in progress",
                "Track exact module position of each learner",
                "Pass/fail rates on automated lab validations",
                "Certification exam registration tracking",
                "Final certification pass statistics",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-white border border-[#E7E2D8] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] font-semibold text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 w-full break-words [overflow-wrap:break-word] relative z-20">
            <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] shadow-[0_12px_40px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col gap-4 sm:gap-5">

              {/* 1. Header (Student Profile + Risk) */}
              <div className="flex sm:items-start flex-col sm:flex-row gap-3 justify-between pb-4 border-b border-[#E7E2D8]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E7E2D8] flex items-center justify-center font-bold text-[#94A3B8] text-xl shadow-sm shrink-0">
                    SR
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-lg leading-tight mb-1">Simon Riley</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="text-[#475569] font-bold bg-[#FAFAF8] border border-[#E7E2D8] px-2 py-0.5 rounded-md">Kubernetes CKA Track</span>
                      <span className="text-[var(--gold)] font-bold bg-[var(--gold)]/10 px-2 py-0.5 rounded-md">In Progress</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm cursor-pointer hover:bg-opacity-90 transition w-full sm:w-auto text-center shrink-0">Export Report</span>
                  <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Moderate Risk — Needs Practice
                  </div>
                </div>
              </div>

              {/* 2. Horizontal Learning Journey Tracker */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Learning Journey</div>
                  <div className="text-[10px] font-bold text-[#0F172A]">Module 2 of 5</div>
                </div>
                <div className="flex items-center justify-between relative px-2 sm:px-6">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#F3F0E8] rounded-full"></div>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[25%] h-1 bg-green-500 rounded-full"></div>

                  {/* Node 1 */}
                  <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-green-500 border-[3px] border-white flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#0F172A] leading-tight">Module 1<br />K8s Basics</span>
                  </div>

                  {/* Node 2 - Current */}
                  <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[var(--gold)] border-[3px] border-white flex items-center justify-center shadow-[0_0_15px_rgba(169,128,42,0.4)] ring-2 ring-[var(--gold)]/20 transition-transform group-hover:scale-110">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-center text-[var(--gold)] leading-tight">Module 2<br />Pod Net</span>
                  </div>

                  {/* Node 3 - Weak */}
                  <div className="relative z-10 flex flex-col items-center gap-2 w-16 group cursor-default">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center text-amber-500 shadow-sm transition-transform group-hover:scale-110">
                      <span className="text-xs font-bold">!</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-center text-amber-600 leading-tight">Module 3<br />Debugging</span>
                  </div>

                  {/* Node 4 - Locked */}
                  <div className="relative z-10 flex flex-col items-center gap-2 w-16 opacity-50">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF8] border-2 border-[#CBD5E1] flex items-center justify-center text-[#94A3B8]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#94A3B8] leading-tight flex-col hidden sm:flex">Module 4<br />Helm</span>
                  </div>

                  {/* Node 5 - Locked */}
                  <div className="relative z-10 flex flex-col items-center gap-2 w-16 opacity-50">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF8] border-2 border-[#CBD5E1] flex items-center justify-center text-[#94A3B8]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-center text-[#94A3B8] leading-tight flex-col hidden sm:flex">Module 5<br />Security</span>
                  </div>
                </div>
              </div>

              {/* 3. Learning Status & AI Insight Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Status Card */}
                <div className="bg-[#FAFAF8] rounded-xl p-4 sm:p-5 border border-[#E7E2D8] shadow-sm flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Status Overview</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Current Phase</div>
                      <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded inline-block">Hands-on Lab Practice</div>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-[#E7E2D8] pt-3">
                      <div>
                        <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Momentum</div>
                        <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                          Slowing
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-[#64748B] font-bold mb-0.5">Next Action</div>
                        <div className="text-xs font-bold text-[#0F172A]">Complete Network Lab</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insight Card */}
                <div className="bg-gradient-to-br from-[#F4F9FF] to-[#E0EFFF] rounded-xl p-3 sm:p-4 border border-[#CCE3FF] relative overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-3 opacity-10 text-blue-600 pointer-events-none">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 relative z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
                      Aurilearn AI Insight
                    </div>
                    <p className="text-xs font-medium text-[#0F172A] leading-relaxed relative z-10 mb-4 opacity-90">
                      Simon is struggling with Kubernetes Network Policies, specifically block-all ingress rules. He spent 45 minutes on the last module without passing validation.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-white bg-blue-600 inline-flex items-center justify-between px-3 py-2 rounded-lg shadow-sm relative z-10 cursor-pointer hover:bg-blue-700 transition-colors w-full">
                    Assign Guided Remediation Lab
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>

              {/* 4. Improved Module Table */}
              <div>
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 sm:gap-4 text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 sm:px-3 pb-1 border-b border-[#E7E2D8] mb-1">
                  <span className="w-4 text-center">#</span>
                  <span>Module Name</span>
                  <span className="text-center w-16 sm:w-20 hidden sm:block">Progress</span>
                  <span className="text-right w-16 sm:w-22">Status</span>
                </div>
                <div className="space-y-1">
                  {[
                    { num: 1, name: "Kubernetes Basics", p: 100, active: false, badge: "Completed", color: "text-green-700 bg-green-50 border-green-200" },
                    { num: 2, name: "Pod Networking", p: 65, active: true, badge: "In Progress", color: "text-[var(--gold)] bg-[#FAFAF8] border-[#E7E2D8] shadow-sm transform scale-[1.01]" },
                    { num: 3, name: "Cluster Debugging", p: 0, active: false, badge: "At Risk", color: "text-amber-700 bg-amber-50 border-amber-200" },
                    { num: 4, name: "Helm Deployments", p: 0, active: false, badge: "Locked", color: "text-[#94A3B8] bg-[#FAFAF8] border-[#E7E2D8] opacity-60" },
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-[auto_1fr_auto_auto] gap-2 sm:gap-4 items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all ${row.active ? "border-[var(--gold)]/40 bg-[var(--gold)]/5 ring-1 ring-[var(--gold)]/20" : "border-transparent hover:bg-[#FAFAF8]"}`}>
                      <span className={`text-[10px] font-bold w-4 text-center ${row.active ? "text-[var(--gold)]" : "text-[#94A3B8]"}`}>{row.num}</span>
                      <span className={`text-[10px] sm:text-xs font-bold truncate ${row.active ? "text-[#0F172A]" : "text-[#475569]"}`}>{row.name}</span>
                      <div className="w-16 sm:w-20 hidden sm:flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#E7E2D8] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${row.active ? "bg-[var(--gold)]" : row.p === 100 ? "bg-green-500" : "bg-transparent"}`} style={{ width: `${row.p}%` }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-[#94A3B8] w-6 text-right shrink-0">{row.p}%</span>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border text-center w-16 sm:w-22 shrink-0 ${row.color}`}>{row.badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Certification pipeline with labels */}
              <div className="bg-[#0B1220] p-3 sm:p-4 rounded-xl shadow-inner mt-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-3">
                  <div className="font-bold text-white text-[10px] sm:text-xs uppercase tracking-widest opacity-90">CKA Certification Pipeline</div>
                  <div className="font-bold text-[var(--gold)] text-[10px] bg-[var(--gold)]/10 px-2 py-0.5 rounded-md self-start sm:self-auto border border-[var(--gold)]/20">Phase 2 of 4</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Concept", state: "done" },
                    { label: "Lab Practice", state: "active" },
                    { label: "Assessment", state: "locked" },
                    { label: "Cert Exam", state: "locked" },
                  ].map((stage, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className={`h-1.5 rounded-full w-full ${stage.state === "done" ? "bg-green-500" : stage.state === "active" ? "bg-[var(--gold)] shadow-[0_0_8px_rgba(169,128,42,0.6)]" : "bg-white/10"}`}></div>
                      <span className={`text-[9px] sm:text-[10px] font-bold truncate ${stage.state === "done" ? "text-green-400" : stage.state === "active" ? "text-[var(--gold)]" : "text-white/40"}`}>{stage.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
