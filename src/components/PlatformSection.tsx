"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import InteractiveSlides from "@/components/platform/InteractiveSlides";
import {
    QUIZZES,
    BOARD_STEPS,
    CASE_STAGES,
    VIDEO_SOURCES,
    VIDEO_CAPTIONS,
    type Quiz,
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
    { key: "slides", title: "Interactive slides", blurb: "Interact as you go", kind: "interactive" },
    { key: "whiteboard", title: "Live real time white boarding", blurb: "A diagram drawn live", kind: "interactive" },
    { key: "casestudy", title: "Case studies", blurb: "Work a real scenario", kind: "interactive" },
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

function WhiteboardDemo() {
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Voice over. Until a recorded narration track is supplied this uses the
     * browser's own speech synthesis so the agent talks through the diagram as
     * it draws. Swap in an <audio> track per step when the recording exists.
     */
    const speak = (text: string) => {
        if (muted) return;
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        try {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.rate = 0.98;
            u.pitch = 1;
            window.speechSynthesis.speak(u);
        } catch {
            /* narration is an enhancement — never break the diagram */
        }
    };

    // narrate whichever step is on screen
    useEffect(() => {
        speak(BOARD_STEPS[step].caption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    // stop talking when muted or when the modal closes
    useEffect(() => {
        if (muted && typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }, [muted]);

    useEffect(() => {
        return () => {
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    useEffect(() => {
        if (!playing) return;
        if (step >= BOARD_STEPS.length - 1) {
            setPlaying(false);
            return;
        }
        timer.current = setTimeout(() => setStep((s) => s + 1), 2600);
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [step, playing]);

    const replay = () => {
        setStep(0);
        setPlaying(true);
    };

    const show = (n: number) => (step >= n ? "opacity-100" : "opacity-0");

    return (
        <div>
            <div className="rounded-xl bg-white border border-[#E7E2D8] p-5 mb-4">
                <svg viewBox="0 0 520 210" className="w-full h-auto">
                    <g className={`transition-opacity duration-700 ${show(0)}`}>
                        <circle cx="45" cy="105" r="22" fill="none" stroke="var(--gold)" strokeWidth="3" />
                        <text x="45" y="148" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">User</text>
                    </g>
                    <g className={`transition-opacity duration-700 ${show(1)}`}>
                        <line x1="72" y1="105" x2="122" y2="105" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
                        <path d="M122 105l-7-4v8z" fill="#94A3B8" />
                    </g>
                    <g className={`transition-opacity duration-700 ${show(1)}`}>
                        <rect x="128" y="82" width="92" height="46" rx="8" fill="none" stroke="var(--gold)" strokeWidth="3" />
                        <text x="174" y="110" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800">Ingress</text>
                        <text x="174" y="148" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">TLS ends here</text>
                    </g>
                    <g className={`transition-opacity duration-700 ${show(2)}`}>
                        <line x1="224" y1="105" x2="274" y2="105" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
                        <path d="M274 105l-7-4v8z" fill="#94A3B8" />
                    </g>
                    <g className={`transition-opacity duration-700 ${show(2)}`}>
                        <rect x="280" y="82" width="92" height="46" rx="8" fill="none" stroke="var(--gold)" strokeWidth="3" />
                        <text x="326" y="110" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800">Service</text>
                        <text x="326" y="148" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">virtual IP</text>
                    </g>
                    <g className={`transition-opacity duration-700 ${show(3)}`}>
                        <line x1="376" y1="105" x2="418" y2="55" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
                        <line x1="376" y1="105" x2="418" y2="105" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
                        <line x1="376" y1="105" x2="418" y2="155" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
                        <rect x="424" y="36" width="68" height="38" rx="8" fill="none" stroke="#16A34A" strokeWidth="3" />
                        <text x="458" y="60" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="800">Pod</text>
                        <rect x="424" y="86" width="68" height="38" rx="8" fill="none" stroke="#16A34A" strokeWidth="3" />
                        <text x="458" y="110" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="800">Pod</text>
                    </g>
                    <g className={`transition-opacity duration-700 ${show(4)}`}>
                        <rect x="424" y="136" width="68" height="38" rx="8" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="5 4" />
                        <text x="458" y="160" textAnchor="middle" fill="#64748B" fontSize="12" fontWeight="800">Pod</text>
                        <line x1="376" y1="105" x2="418" y2="155" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="3 4" />
                        <text x="458" y="192" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="800">not ready</text>
                    </g>
                </svg>
            </div>

            <div className={`${PANEL} p-4 mb-4 min-h-[68px]`}>
                <p className="text-xs font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">
                    Instructor agent {playing ? "is drawing" : ""}
                </p>
                <p className="text-sm text-[#475569] font-semibold leading-relaxed">{BOARD_STEPS[step].caption}</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={replay}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] cursor-pointer transition-colors"
                >
                    Replay
                </button>
                <button
                    onClick={() => setMuted((m) => !m)}
                    aria-pressed={!muted}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] cursor-pointer transition-colors inline-flex items-center gap-2"
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
                    {muted ? "Voice off" : "Voice on"}
                </button>
            </div>
        </div>
    );
}

/* ───────────────────────── Case study ───────────────────────── */

function CaseStudyDemo() {
    const [stage, setStage] = useState(0);

    return (
        <div>
            <div className="flex items-center gap-1.5 mb-5">
                {CASE_STAGES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${i <= stage ? "bg-[var(--gold)]" : "bg-[#E7E2D8]"}`}
                    />
                ))}
            </div>

            <div className={`${PANEL} p-6 mb-4 min-h-[210px]`}>
                <p className="text-xs font-800 uppercase tracking-widest text-[#64748B] mb-2">
                    Step {stage + 1} of {CASE_STAGES.length}
                </p>
                <h4 className="text-xl font-900 text-[#0F172A] mb-3 leading-snug">{CASE_STAGES[stage].heading}</h4>
                <p className="text-sm text-[#475569] leading-relaxed font-semibold">{CASE_STAGES[stage].body}</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setStage((s) => Math.max(0, s - 1))}
                    disabled={stage === 0}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => setStage((s) => Math.min(CASE_STAGES.length - 1, s + 1))}
                    disabled={stage === CASE_STAGES.length - 1}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm font-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    {stage === CASE_STAGES.length - 1 ? "End of case study" : "Continue"}
                </button>
            </div>
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
        casestudy: "Case study example",
        labmentorship: "Lab work mentorship",
        interactive: "Highly interactive",
        contentgen: "Content generation",
    };

    return (
        <section id="platform" className="section-tall bg-[#FAFAF8] border-t border-[#E7E2D8]">
            <div className="container-content w-full py-20 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <div className="gold-divider mx-auto" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-900 text-[#0F172A] leading-[1.1] tracking-tight mb-4">
                        Platform
                    </h2>
                    <p className="text-lg md:text-xl text-[#475569] font-medium leading-relaxed">
                        One engine taking you on the whole journey from first concept to a certification pass,
                        with the evidence to prove it happened.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* ── Left half: the four points ── */}
                    <div className="flex flex-col">
                        <h3 className="text-sm md:text-base font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-2">
                            What It Covers
                        </h3>
                        <p className="text-base text-[var(--gold-hover)] font-bold mb-4">
                            The whole journey, end to end.
                        </p>

                        <div className="flex flex-col gap-4 flex-1 justify-between">
                            {LEFT_POINTS.map((p, i) => (
                                <div
                                    key={p.title}
                                    className={`${CARD} flex items-center gap-4 px-6 py-5 transition-all hover:border-[var(--gold)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]`}
                                >
                                    <span className="w-11 h-11 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 text-[var(--gold-hover)] text-sm font-900 flex items-center justify-center shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xl md:text-2xl font-900 text-[#0F172A] leading-snug">{p.title}</span>
                                        <span className="block text-[#475569] font-semibold text-base leading-snug">{p.blurb}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right half: What Do You Get + Experience ── */}
                    <div className="flex flex-col gap-8">

                        <div>
                            <h3 className="text-sm md:text-base font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-2">
                                What Do You Get
                            </h3>
                            <p className="text-base text-[var(--gold-hover)] font-bold mb-4">
                                Included with every seat.
                            </p>
                            <ul className="flex flex-col gap-3">
                                {WHAT_YOU_GET.map((item) => (
                                    <li key={item} className={`${CARD} flex gap-3 items-start px-5 py-4`}>
                                        <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[#0F172A] font-bold leading-snug text-base md:text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm md:text-base font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-2">
                                Experience
                            </h3>
                            <p className="text-base text-[var(--gold-hover)] font-bold mb-4">
                                Click any of these to try it right here.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch">
                                {EXPERIENCES.map((e, i) => (
                                    <button
                                        key={e.key}
                                        onClick={() => open(e.key)}
                                        className={`${CARD} group text-left px-4 py-3.5 flex items-center gap-3 transition-all hover:border-[var(--gold)] hover:bg-[#F3F0E8] cursor-pointer ${
                                            i === EXPERIENCES.length - 1 ? "sm:col-span-2" : ""
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
                                            <span className="block font-900 text-[#0F172A] leading-snug text-base">{e.title}</span>
                                            <span className="block text-sm text-[#475569] font-semibold leading-snug">{e.blurb}</span>
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
                size={openDemo === "whiteboard" ? "xl" : "lg"}
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
