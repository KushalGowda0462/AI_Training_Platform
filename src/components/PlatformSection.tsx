"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import InteractiveSlides from "@/components/platform/InteractiveSlides";
import DemoNav from "@/components/platform/DemoNav";
import {
    QUIZZES,
    BOARD,
    BOARD_STEPS,
    CASE_STUDIES,
    VIDEO_SOURCES,
    VIDEO_CAPTIONS,
    type Quiz,
    type CaseStudy,
} from "@/components/platform/content";

/**
 * "Platform" section — James's 26/09 input, with the 29/09 client revisions.
 *
 * Layout: the four capability points sit on the left half, "What Do You Get"
 * and "Experience" on the right half.
 *
 * Every Experience tile opens a working demo — there are no placeholders.
 * All the content they show comes from ./platform/content.ts so the
 * engineering team can replace it without touching this file.
 */

type DemoKey =
    | "quiz"
    | "slides"
    | "whiteboard"
    | "casestudy"
    | "labmentorship"
    | "interactive"
    | "contentgen";

const LEFT_POINTS = [
    { title: "Learning", blurb: "acquire knowledge" },
    { title: "Skilling", blurb: "attain new capabilities" },
    { title: "Certification preparation", blurb: "pass on first go" },
    { title: "Analytics", blurb: "see who is doing what, where and how well" },
];

const WHAT_YOU_GET = [
    "Highly individualized instructor agent teaching that is personalized to match each learning style and behavior",
    "One on one lab work guidance and mentorship",
];

const EXPERIENCES: { key: DemoKey; title: string; blurb: string; kind: "interactive" | "video" }[] = [
    { key: "quiz", title: "Quiz directed learning", blurb: "A new quiz every time", kind: "interactive" },
    { key: "slides", title: "Interactive slides", blurb: "Change it, see the result", kind: "interactive" },
    { key: "whiteboard", title: "Live real time white boarding", blurb: "A diagram drawn live", kind: "interactive" },
    { key: "casestudy", title: "Case studies", blurb: "Real infrastructure decisions", kind: "interactive" },
    { key: "labmentorship", title: "Lab work mentorship", blurb: "Agent assisted lab", kind: "video" },
    { key: "interactive", title: "Highly interactive", blurb: "Ask anything, any time", kind: "video" },
    { key: "contentgen", title: "Content generation", blurb: "How it works, and the output", kind: "video" },
];

/* ── shared dark-surface classes ── */
const CARD = "rounded-xl border border-[#E7E2D8] bg-white";
const PANEL = "rounded-xl border border-[#E7E2D8] bg-[#FAFAF8]";

/* ─────────────────────────── Quiz ─────────────────────────── */

function QuizDemo({ quiz, indexLabel }: { quiz: Quiz; indexLabel: string }) {
    const [current, setCurrent] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const questions = quiz.questions;
    const item = questions[current];

    const choose = (i: number) => {
        if (picked !== null) return;
        setPicked(i);
        if (i === item.answer) setScore((s) => s + 1);
    };

    const next = () => {
        if (current === questions.length - 1) return setDone(true);
        setCurrent((c) => c + 1);
        setPicked(null);
    };

    const restart = () => {
        setCurrent(0);
        setPicked(null);
        setScore(0);
        setDone(false);
    };

    if (done) {
        return (
            <div className="text-center py-6">
                <p className="text-sm font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-2">
                    {indexLabel} complete
                </p>
                <p className="text-5xl font-900 text-[#0F172A] mb-2">
                    {score}
                    <span className="text-2xl text-[#64748B] font-800">/{questions.length}</span>
                </p>
                <p className="text-[#475569] font-semibold mb-6 max-w-md mx-auto leading-relaxed">
                    In the real platform your instructor agent picks the next topic based on what you got wrong.
                </p>
                <button onClick={restart} className="btn-gold px-6 py-2.5 text-sm font-800 cursor-pointer">
                    Take it again
                </button>

                <p className="mt-6 text-[11px] text-[#94A3B8] font-semibold leading-snug">
                    *This is an actual Aurilearn {quiz.title} quiz pack
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-800 uppercase tracking-widest text-[var(--gold-hover)]">
                    {indexLabel} · {quiz.title}
                </span>
                <span className="text-xs font-800 text-[#64748B]">Score {score}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-800 uppercase tracking-widest text-[#64748B]">
                    Question {current + 1} of {questions.length}
                </span>
            </div>

            <div className="h-1.5 w-full bg-[#E7E2D8] rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-[var(--gold)] rounded-full transition-all duration-300"
                    style={{ width: `${((current + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
                />
            </div>

            <p className="text-lg font-800 text-[#0F172A] mb-5 leading-snug">{item.q}</p>

            <div className="space-y-2.5 mb-5">
                {item.options.map((opt, i) => {
                    const isAnswer = i === item.answer;
                    const isPicked = picked === i;
                    let cls = "border-[#E7E2D8] bg-white hover:border-[var(--gold)] hover:bg-[#FAFAF8]";
                    if (picked !== null) {
                        if (isAnswer) cls = "border-[#16A34A] bg-[#16A34A]/5";
                        else if (isPicked) cls = "border-[#DC2626] bg-[#DC2626]/5";
                        else cls = "border-[#E7E2D8] bg-white opacity-60";
                    }
                    return (
                        <button
                            key={i}
                            onClick={() => choose(i)}
                            disabled={picked !== null}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-semibold text-[#0F172A] text-sm flex items-center gap-3 ${cls} ${picked === null ? "cursor-pointer" : "cursor-default"}`}
                        >
                            <span className="w-6 h-6 rounded-full bg-[#F3F0E8] border border-[#E7E2D8] text-[#64748B] text-xs font-800 flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {picked !== null && isAnswer && (
                                <span className="text-[#16A34A] font-800 text-xs shrink-0">Correct</span>
                            )}
                            {picked !== null && isPicked && !isAnswer && (
                                <span className="text-[#DC2626] font-800 text-xs shrink-0">Your answer</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {picked !== null && (
                <div className={`${PANEL} p-4 mb-5`}>
                    <p className="text-xs font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">
                        Instructor agent
                    </p>
                    <p className="text-sm text-[#475569] leading-relaxed font-semibold">{item.why}</p>
                </div>
            )}

            <button
                onClick={next}
                disabled={picked === null}
                className="btn-gold w-full justify-center py-3 text-sm font-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                {current === questions.length - 1 ? "See result" : "Next question"}
            </button>

            <p className="mt-4 text-[11px] text-[#94A3B8] font-semibold leading-snug">
                *This is an actual Aurilearn {quiz.title} quiz pack
            </p>
        </div>
    );
}

/* ─────────────────── Live white boarding ─────────────────── */

/** Pastel fills and strokes for the whiteboard shapes, as drawn in the app. */
const INK = {
    blue: { fill: "#DBEAFE", stroke: "#3B82F6" },
    green: { fill: "#D1FAE5", stroke: "#10B981" },
    purple: { fill: "#F3E8FF", stroke: "#A855F7" },
    red: { fill: "#FEE2E2", stroke: "#EF4444" },
    lime: { fill: "#DCFCE7", stroke: "#22C55E" },
};

function WhiteboardDemo() {
    const [step, setStep] = useState(0);
    const [muted, setMuted] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    /**
     * Voice over. Until a recorded narration track is supplied this uses the
     * browser's own speech synthesis. Each step is narrated in full — nothing
     * advances on its own, so the learner moves with Previous and Next exactly
     * as they would through a taught module.
     */
    const speak = (text: string) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        try {
            window.speechSynthesis.cancel();
            if (muted) return;
            const u = new SpeechSynthesisUtterance(text);
            u.rate = 0.98;
            u.pitch = 1;
            u.onstart = () => setSpeaking(true);
            u.onend = () => setSpeaking(false);
            u.onerror = () => setSpeaking(false);
            window.speechSynthesis.speak(u);
        } catch {
            /* narration is an enhancement — never break the diagram */
            setSpeaking(false);
        }
    };

    // narrate whichever step is on screen, in full, and keep the chat scrolled to it
    useEffect(() => {
        speak(BOARD_STEPS[step].caption);
        const chat = chatRef.current;
        if (chat) chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    // toggling sound stops or starts the current step's narration
    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        if (muted) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        } else {
            speak(BOARD_STEPS[step].caption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    // stop talking when the modal closes
    useEffect(() => {
        return () => {
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const goPrev = () => setStep((n) => Math.max(0, n - 1));
    const goNext = () => setStep((n) => Math.min(BOARD_STEPS.length - 1, n + 1));

    /** shapes fade and settle in; connectors are drawn along their length */
    const shape = (n: number) =>
        `transition-all duration-700 ease-out ${step >= n ? "opacity-100" : "opacity-0 translate-y-1"}`;
    const line = (n: number) => ({
        pathLength: 1,
        strokeDasharray: 1,
        style: { strokeDashoffset: step >= n ? 0 : 1, transition: "stroke-dashoffset 900ms ease-out" },
    });
    const label = { fontSize: 12, fill: "#1E293B", textAnchor: "middle" as const, fontWeight: 500 };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] gap-3 mb-4">
                {/* the board */}
                <div className="rounded-xl bg-white border border-[#E7E2D8] p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                        <span className="inline-flex rounded-full bg-[#334155] p-0.5 text-[11px] font-800">
                            <span className="px-2.5 py-0.5 text-[#CBD5E1]">Slide</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[var(--gold)] text-[#1E293B]">Whiteboard</span>
                        </span>
                        <span className="text-[11px] font-800 text-[#94A3B8]">
                            Step {step + 1} of {BOARD_STEPS.length}
                        </span>
                    </div>
                    <svg viewBox="0 0 560 290" className="w-full h-auto" role="img" aria-label={`Whiteboard diagram: ${BOARD.title}`}>
                        <defs>
                            <marker id="wb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M0 0L10 5L0 10z" fill="#64748B" />
                            </marker>
                        </defs>

                        <text x="280" y="28" textAnchor="middle" fontSize="17" fill="#1E293B" fontWeight="500">
                            {BOARD.title}
                        </text>

                        {/* 1 — application servers */}
                        <g className={shape(0)}>
                            <ellipse cx="110" cy="80" rx="78" ry="19" fill={INK.blue.fill} stroke={INK.blue.stroke} strokeWidth="1.5" />
                            <text x="110" y="84" {...label}>Application Servers</text>
                        </g>

                        {/* 2 — accesses → SVM */}
                        <path d="M110 100 V182" fill="none" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#wb-arrow)" {...line(1)} />
                        <text x="102" y="146" fontSize="11" fill="#64748B" textAnchor="end" className={shape(1)}>accesses</text>
                        <g className={shape(1)}>
                            <rect x="32" y="186" width="156" height="34" rx="6" fill={INK.green.fill} stroke={INK.green.stroke} strokeWidth="1.5" />
                            <text x="110" y="207" {...label}>Storage Virtual Machine</text>
                        </g>

                        {/* 3 — aggregate and physical disks */}
                        <g className={shape(2)}>
                            <rect x="268" y="118" width="272" height="148" rx="12" fill={INK.purple.fill} stroke={INK.purple.stroke} strokeWidth="1.5" />
                            <text x="404" y="256" {...label}>Aggregate</text>
                            <rect x="282" y="152" width="84" height="40" rx="6" fill={INK.blue.fill} stroke={INK.blue.stroke} strokeWidth="1.5" />
                            <text x="324" y="176" {...label} fontSize="11.5">Physical Disks</text>
                        </g>

                        {/* 4 — manages → FlexVol volume */}
                        <path d="M188 226 H250 V60 H440 V138" fill="none" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#wb-arrow)" {...line(3)} />
                        <text x="448" y="56" fontSize="11" fill="#64748B" className={shape(3)}>manages</text>
                        <g className={shape(3)}>
                            <rect x="378" y="140" width="148" height="96" rx="10" fill={INK.red.fill} stroke={INK.red.stroke} strokeWidth="1.5" />
                            <text x="452" y="226" {...label}>FlexVol Volume</text>
                        </g>

                        {/* 5 — data blocks */}
                        <g className={shape(4)}>
                            <rect x="402" y="156" width="100" height="34" rx="6" fill={INK.lime.fill} stroke={INK.lime.stroke} strokeWidth="1.5" />
                            <text x="452" y="177" {...label}>Data Blocks</text>
                        </g>
                    </svg>
                </div>

                {/* the agent panel, as it sits beside the board in the app */}
                <div className="rounded-xl bg-white border border-[#E7E2D8] flex flex-col h-[300px] md:h-auto md:min-h-0">
                    <div className="grid grid-cols-2 border-b border-[#E7E2D8] text-[11px] font-800 uppercase tracking-widest">
                        <span className="py-2 text-center text-[var(--gold-hover)] border-b-2 border-[var(--gold)]">Agent</span>
                        <span className="py-2 text-center text-[#94A3B8]">Lessons</span>
                    </div>
                    <div ref={chatRef} className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-2 md:max-h-[280px]">
                        <div className="self-end max-w-[90%] rounded-xl rounded-br-sm bg-[#7A5C00] text-white px-3 py-2">
                            <p className="text-[10px] font-800 opacity-80">You</p>
                            <p className="text-[13px] font-semibold leading-snug">{BOARD.question}</p>
                        </div>
                        <div className="self-start max-w-[92%] rounded-xl rounded-bl-sm bg-[#F1F5F9] px-3 py-2 text-[13px] font-semibold text-[#334155] leading-snug">
                            {BOARD.reply}
                        </div>
                        {BOARD_STEPS.slice(0, step + 1).map((s, i) => (
                            <div
                                key={i}
                                className={`self-start max-w-[92%] rounded-xl rounded-bl-sm px-3 py-2 text-[13px] font-semibold leading-snug transition-colors ${
                                    i === step ? "bg-[var(--gold)]/10 text-[#0F172A] border border-[var(--gold)]/40" : "bg-[#F1F5F9] text-[#475569]"
                                }`}
                            >
                                {i === step && speaking && (
                                    <span className="block text-[10px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-0.5">
                                        Speaking
                                    </span>
                                )}
                                {s.caption}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DemoNav onPrev={goPrev} onNext={goNext} prevDisabled={step === 0} nextDisabled={step === BOARD_STEPS.length - 1}>
                <button
                    onClick={() => setMuted((m) => !m)}
                    aria-pressed={!muted}
                    aria-label={muted ? "Turn voice on" : "Turn voice off"}
                    className="h-11 px-4 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] cursor-pointer transition-colors inline-flex items-center gap-2 shrink-0"
                >
                    {muted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M23 9l-6 6M17 9l6 6" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
                        </svg>
                    )}
                </button>
            </DemoNav>
        </div>
    );
}

/* ───────────────────────── Case study ───────────────────────── */

const CASE_GROUPS: { kind: CaseStudy["kind"]; label: string }[] = [
    { kind: "case", label: "Case studies" },
    { kind: "scenario", label: "Engineering scenarios" },
];

/** One stage of a case: its header, progress, content and technologies. */
function CaseStage({ cs, index }: { cs: CaseStudy; index: number }) {
    const stage = index;
    const current = cs.stages[index];
    const isOutcome = current.heading === "Outcome";

    return (
        <>
            <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-0.5">
                {cs.kind === "case" ? `Case study ${cs.id}` : `Scenario ${cs.id}`} · {cs.domain}
            </p>
            <h4 className="text-xl font-900 text-[#0F172A] mb-3 leading-snug">{cs.title}</h4>

            <div className="flex items-center gap-1.5 mb-3">
                {cs.stages.map((s, i) => (
                    <div
                        key={s.heading}
                        className={`h-1.5 flex-1 rounded-full transition-all ${i <= stage ? "bg-[var(--gold)]" : "bg-[#E7E2D8]"}`}
                    />
                ))}
            </div>

            <div className={`${PANEL} p-5 mb-3 flex-1`}>
                <p className="text-xs font-800 uppercase tracking-widest text-[#64748B] mb-2">
                    Step {stage + 1} of {cs.stages.length}
                </p>
                <h5 className="text-lg font-900 text-[#0F172A] mb-2.5 leading-snug">{current.heading}</h5>

                {current.body && (
                    <p
                        className={
                            current.heading === "Key takeaway"
                                ? "text-lg font-900 text-[var(--gold-hover)] leading-snug"
                                : "text-sm text-[#475569] leading-relaxed font-semibold"
                        }
                    >
                        {current.body}
                    </p>
                )}

                {current.points && isOutcome && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {current.points.map((p) => (
                            <div key={p.text} className={`${CARD} px-4 py-3`}>
                                <p className="text-2xl font-900 text-[var(--gold-hover)] leading-tight">{p.lead}</p>
                                <p className="text-[13px] text-[#475569] font-semibold leading-snug">{p.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {current.points && !isOutcome && (
                    <ul className="flex flex-col gap-2">
                        {current.points.map((p) => (
                            <li key={p.text} className="flex gap-2.5 items-start text-sm leading-relaxed">
                                <svg className="w-4 h-4 text-[var(--gold)] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#475569] font-semibold">
                                    {p.lead && <span className="font-900 text-[#0F172A]">{p.lead} </span>}
                                    {p.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* technologies & concepts */}
            <div className="flex flex-wrap gap-1.5 mb-0">
                {cs.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#F3F0E8] text-[11px] font-800 text-[#475569]">
                        {t}
                    </span>
                ))}
            </div>

        </>
    );
}

function CaseStudyDemo() {
    const [caseId, setCaseId] = useState(CASE_STUDIES[0].id);
    const [stage, setStage] = useState(0);

    const cs = CASE_STUDIES.find((c) => c.id === caseId)!;
    const last = stage === cs.stages.length - 1;
    const next = CASE_STUDIES[CASE_STUDIES.findIndex((c) => c.id === caseId) + 1];

    const pick = (id: string) => {
        setCaseId(id);
        setStage(0);
    };

    return (
        <div>
            {/* picker */}
            <div className="flex flex-col gap-2.5 mb-5">
                {CASE_GROUPS.map((g) => (
                    <div key={g.kind}>
                        <p className="text-[11px] font-800 uppercase tracking-widest text-[#64748B] mb-1.5">{g.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {CASE_STUDIES.filter((c) => c.kind === g.kind).map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => pick(c.id)}
                                    aria-pressed={c.id === caseId}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-800 transition-colors cursor-pointer ${
                                        c.id === caseId
                                            ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-hover)]"
                                            : "border-[#E7E2D8] bg-white text-[#475569] hover:border-[var(--gold)]"
                                    }`}
                                >
                                    <span className="font-900">{c.id}</span>
                                    {c.short}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/*
             * Every stage of every case sits in the same grid cell, with only
             * the current one visible, so the box keeps one size throughout
             * and Previous / Next never move.
             */}
            <div className="grid mb-4">
                {CASE_STUDIES.flatMap((c) =>
                    c.stages.map((s, i) => {
                        const on = c.id === caseId && i === stage;
                        return (
                            <div
                                key={`${c.id}-${i}`}
                                className={`[grid-area:1/1] min-w-0 flex flex-col ${on ? "" : "invisible"}`}
                                aria-hidden={!on}
                                inert={!on}
                            >
                                <CaseStage cs={c} index={i} />
                            </div>
                        );
                    })
                )}
            </div>

            <DemoNav
                onPrev={() => setStage((s) => Math.max(0, s - 1))}
                onNext={() => (last ? next && pick(next.id) : setStage((s) => s + 1))}
                prevDisabled={stage === 0}
                nextDisabled={last && !next}
                nextLabel={last && next ? "Next case" : "Next"}
            />
        </div>
    );
}

/* ──────────────────────── Video player ──────────────────────── */

/**
 * The player is wired and ready. While its source in content.ts is still
 * empty it shows the waiting state rather than playing an unrelated clip;
 * the moment a real path is set there, it plays that clip instead.
 */
function VideoDemo({ src, caption }: { src: string; caption: string }) {
    const ready = src.trim().length > 0;

    return (
        <div>
            <div className={`rounded-xl overflow-hidden border border-[#E7E2D8] aspect-video mb-4 ${ready ? "bg-[#0B1220]" : "bg-[#FAFAF8]"}`}>
                {ready ? (
                    <video
                        key={src}
                        src={src}
                        className="h-full w-full object-contain"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                        <span className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--gold-hover)] ml-0.5">
                                <path d="M8 6l10 6-10 6V6z" />
                            </svg>
                        </span>
                        <p className="text-sm font-800 text-[#0F172A]">1 minute clip to be added</p>
                        <p className="text-xs font-bold text-[#64748B]">The player is ready and will play it here</p>
                    </div>
                )}
            </div>
            <p className="text-sm text-[#475569] font-semibold leading-relaxed">
                <span className="text-[var(--gold-hover)] font-800">Will show: </span>
                {caption}
            </p>
        </div>
    );
}

/* ───────────────────────── Section ───────────────────────── */

export default function PlatformSection() {
    const [openDemo, setOpenDemo] = useState<DemoKey | null>(null);

    /**
     * Quiz rotation: 1st click shows Quiz 1, 2nd Quiz 2, and so on to Quiz 5,
     * then it starts again.
     */
    const [quizTurn, setQuizTurn] = useState(0);
    const [activeQuiz, setActiveQuiz] = useState(0);

    const open = (key: DemoKey) => {
        if (key === "quiz") {
            setActiveQuiz(quizTurn);
            setQuizTurn((t) => (t + 1) % QUIZZES.length);
        }
        setOpenDemo(key);
    };

    const close = () => setOpenDemo(null);

    const modalTitle: Record<DemoKey, string> = {
        quiz: "Quiz directed learning",
        slides: "Interactive slides",
        whiteboard: "Live real time white boarding",
        casestudy: "Case studies",
        labmentorship: "Lab work mentorship",
        interactive: "Highly interactive",
        contentgen: "Content generation",
    };

    return (
        <section id="platform" className="section-tall bg-[#FAFAF8] border-t border-[#E7E2D8]">
            <div className="container-content w-full py-10 md:py-12">
                <div className="max-w-3xl mx-auto text-center mb-8">
                    <div className="gold-divider mx-auto" />
                    <h2 className="text-3xl md:text-4xl font-900 text-[#0F172A] leading-[1.1] tracking-tight mb-3">
                        Platform
                    </h2>
                    <p className="text-base md:text-lg text-[#475569] font-medium leading-relaxed">
                        One engine taking you on the whole journey from first concept to a certification pass,
                        with the evidence to prove it happened.
                    </p>
                </div>

                <div className="grid-12 items-start">

                    {/* ── Columns 1-5: the four points ── */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col">
                        <h3 className="text-sm font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1">
                            What It Covers
                        </h3>
                        <p className="text-sm text-[var(--gold-hover)] font-bold mb-3">
                            The whole journey, end to end.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            {LEFT_POINTS.map((p, i) => (
                                <div
                                    key={p.title}
                                    className={`${CARD} flex items-center gap-3 px-4 py-4 transition-all hover:border-[var(--gold)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]`}
                                >
                                    <span className="w-9 h-9 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 text-[var(--gold-hover)] text-xs font-900 flex items-center justify-center shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-lg font-900 text-[#0F172A] leading-snug">{p.title}</span>
                                        <span className="block text-[#475569] font-semibold text-sm leading-snug">{p.blurb}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Columns 6-12: What Do You Get + Experience ── */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                        <div>
                            <h3 className="text-sm font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1">
                                What Do You Get
                            </h3>
                            <p className="text-sm text-[var(--gold-hover)] font-bold mb-3">
                                Included with every seat.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                                {WHAT_YOU_GET.map((item) => (
                                    <li key={item} className={`${CARD} flex gap-2.5 items-start px-4 py-3.5`}>
                                        <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[#0F172A] font-bold leading-snug text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1">
                                Experience
                            </h3>
                            <p className="text-sm text-[var(--gold-hover)] font-bold mb-3">
                                Click any of these to try it right here.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 items-stretch">
                                {EXPERIENCES.map((e, i) => (
                                    <button
                                        key={e.key}
                                        onClick={() => open(e.key)}
                                        className={`${CARD} group text-left px-4 py-3.5 flex items-center gap-3 transition-all hover:border-[var(--gold)] hover:bg-[#F3F0E8] cursor-pointer ${
                                            i === EXPERIENCES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                                        }`}
                                    >
                                        <span className="w-8 h-8 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 text-[var(--gold-hover)] flex items-center justify-center shrink-0 group-hover:bg-[var(--gold)] group-hover:text-white transition-colors">
                                            {e.kind === "video" ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 6l10 6-10 6V6z" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-900 text-[#0F172A] leading-snug text-[15px]">{e.title}</span>
                                            <span className="block text-[13px] text-[#475569] font-semibold leading-snug">{e.blurb}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Demo modals ── */}
            <Modal
                isOpen={openDemo !== null}
                onClose={close}
                title={openDemo ? modalTitle[openDemo] : ""}
                size={openDemo === "whiteboard" || openDemo === "slides" || openDemo === "casestudy" ? "xl" : "lg"}
            >
                {openDemo === "quiz" && (
                    <QuizDemo
                        key={activeQuiz}
                        quiz={QUIZZES[activeQuiz]}
                        indexLabel={`Quiz ${activeQuiz + 1} of ${QUIZZES.length}`}
                    />
                )}
                {openDemo === "slides" && <InteractiveSlides />}
                {openDemo === "whiteboard" && <WhiteboardDemo />}
                {openDemo === "casestudy" && <CaseStudyDemo />}
                {openDemo === "labmentorship" && (
                    <VideoDemo src={VIDEO_SOURCES.labmentorship} caption={VIDEO_CAPTIONS.labmentorship} />
                )}
                {openDemo === "interactive" && (
                    <VideoDemo src={VIDEO_SOURCES.interactive} caption={VIDEO_CAPTIONS.interactive} />
                )}
                {openDemo === "contentgen" && (
                    <VideoDemo src={VIDEO_SOURCES.contentgen} caption={VIDEO_CAPTIONS.contentgen} />
                )}
            </Modal>
        </section>
    );
}
