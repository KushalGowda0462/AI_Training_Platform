"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";

/**
 * "Platform" section — built to James's 26/09 input.
 *
 * Layout: the four capability points sit on the left half of the page;
 * "What Do You Get" and "Experience" sit on the right half.
 *
 * Every Experience row is clickable and opens a working example. The four
 * interactive examples (quiz, slides, whiteboarding, case study) are real and
 * run in the browser. The three video examples are waiting on 1-minute clips
 * from the client — they open a placeholder that says exactly what is needed.
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
    "Individualized Instructor agent teaching that is highly personalizable",
    "One on one lab work mentorship",
];

const EXPERIENCES: { key: DemoKey; title: string; blurb: string; kind: "interactive" | "video" }[] = [
    {
        key: "quiz",
        title: "Quiz directed learning",
        blurb: "Take a real 5-question quiz",
        kind: "interactive",
    },
    {
        key: "slides",
        title: "Interactive slides",
        blurb: "Click through a slide you can interact with",
        kind: "interactive",
    },
    {
        key: "whiteboard",
        title: "Live real time white boarding",
        blurb: "Watch a diagram generated live",
        kind: "interactive",
    },
    {
        key: "casestudy",
        title: "Case studies",
        blurb: "Work through a case study example",
        kind: "interactive",
    },
    {
        key: "labmentorship",
        title: "Lab work mentorship",
        blurb: "1 min video — lab exercise with agent assistance",
        kind: "video",
    },
    {
        key: "interactive",
        title: "Highly interactive",
        blurb: "Ask any question any time, including follow ups",
        kind: "video",
    },
    {
        key: "contentgen",
        title: "Content generation",
        blurb: "1 min video — how it works, output, how long it takes",
        kind: "video",
    },
];

/* ─────────────────────────── Quiz ─────────────────────────── */

const QUIZ = [
    {
        q: "Which control plane component stores all Kubernetes cluster state?",
        options: ["kubelet", "etcd", "kube-proxy", "containerd"],
        answer: 1,
        why: "etcd is the consistent key-value store that holds the entire cluster state. The API server is the only component that talks to it directly.",
    },
    {
        q: "What does a Service of type ClusterIP give you?",
        options: [
            "A public IP reachable from the internet",
            "A stable internal IP reachable only inside the cluster",
            "A port opened on every node",
            "A DNS record with no load balancing",
        ],
        answer: 1,
        why: "ClusterIP is the default type. It gives a stable virtual IP that only works inside the cluster — NodePort and LoadBalancer are the types that expose traffic outwards.",
    },
    {
        q: "A pod is stuck in CrashLoopBackOff. What is actually happening?",
        options: [
            "The image cannot be pulled from the registry",
            "The scheduler cannot find a node with enough resources",
            "The container starts, exits with an error, and is restarted with growing delays",
            "The pod is waiting on a PersistentVolume to bind",
        ],
        answer: 2,
        why: "CrashLoopBackOff means the container is starting and exiting repeatedly. The kubelet backs off a little longer before each restart. Check the logs of the previous run with --previous.",
    },
    {
        q: "Which command shows recent events and the current state of one pod?",
        options: [
            "kubectl get pods -o wide",
            "kubectl describe pod <name>",
            "kubectl top pod <name>",
            "kubectl config view",
        ],
        answer: 1,
        why: "describe prints the pod spec, its conditions, and the recent events attached to it — usually the fastest first look when something will not start.",
    },
    {
        q: "What is a readiness probe for?",
        options: [
            "Restarting a container that has hung",
            "Telling the kubelet when a container may start receiving traffic",
            "Delaying the first start of a container",
            "Checking that the node itself is healthy",
        ],
        answer: 1,
        why: "A readiness probe controls whether the pod is added to Service endpoints. A liveness probe is the one that restarts a hung container.",
    },
];

function QuizDemo() {
    const [current, setCurrent] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const item = QUIZ[current];

    const choose = (i: number) => {
        if (picked !== null) return;
        setPicked(i);
        if (i === item.answer) setScore((s) => s + 1);
    };

    const next = () => {
        if (current === QUIZ.length - 1) {
            setDone(true);
            return;
        }
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
                <p className="text-sm font-700 uppercase tracking-widest text-[#94A3B8] mb-2">Quiz complete</p>
                <p className="text-5xl font-900 text-[#0F172A] mb-2">
                    {score}<span className="text-2xl text-[#94A3B8]">/{QUIZ.length}</span>
                </p>
                <p className="text-[#475569] font-medium mb-6">
                    In the real platform your instructor agent picks the next topic based on what you got wrong.
                </p>
                <button onClick={restart} className="btn-gold px-6 py-2.5 text-sm cursor-pointer">
                    Take it again
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-700 uppercase tracking-widest text-[#94A3B8]">
                    Question {current + 1} of {QUIZ.length}
                </span>
                <span className="text-xs font-700 text-[#94A3B8]">Score {score}</span>
            </div>

            <div className="h-1.5 w-full bg-[#F3F0E8] rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-[var(--gold)] rounded-full transition-all duration-300"
                    style={{ width: `${((current + (picked !== null ? 1 : 0)) / QUIZ.length) * 100}%` }}
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
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium text-[#0F172A] text-sm flex items-center gap-3 ${cls} ${picked === null ? "cursor-pointer" : "cursor-default"}`}
                        >
                            <span className="w-6 h-6 rounded-full border border-current/20 bg-[#F3F0E8] text-[#64748B] text-xs font-700 flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {picked !== null && isAnswer && (
                                <span className="text-[#16A34A] font-700 text-xs shrink-0">Correct</span>
                            )}
                            {picked !== null && isPicked && !isAnswer && (
                                <span className="text-[#DC2626] font-700 text-xs shrink-0">Your answer</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {picked !== null && (
                <div className="rounded-xl bg-[#FAFAF8] border border-[#E7E2D8] p-4 mb-5">
                    <p className="text-xs font-700 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">
                        Instructor agent
                    </p>
                    <p className="text-sm text-[#475569] leading-relaxed font-medium">{item.why}</p>
                </div>
            )}

            <button
                onClick={next}
                disabled={picked === null}
                className="btn-gold w-full justify-center py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                {current === QUIZ.length - 1 ? "See result" : "Next question"}
            </button>
        </div>
    );
}

/* ───────────────────── Interactive slides ───────────────────── */

const SLIDES = [
    {
        title: "How a request reaches your pod",
        body: "Traffic does not go straight to a container. It passes through three hops, each of which can be the thing that is broken.",
        hotspots: [
            { label: "Ingress", detail: "Terminates TLS and matches the host and path, then forwards to a Service." },
            { label: "Service", detail: "Holds a stable virtual IP and load balances across whichever pods are currently ready." },
            { label: "Pod", detail: "Your container. If its readiness probe fails it is quietly removed from the Service." },
        ],
    },
    {
        title: "Where deployments usually go wrong",
        body: "Click each item to see what the symptom looks like in practice.",
        hotspots: [
            { label: "Image pull", detail: "ErrImagePull or ImagePullBackOff — wrong tag, private registry, or missing pull secret." },
            { label: "Resources", detail: "Pod stays Pending because no node has enough CPU or memory left to fit the request." },
            { label: "Probes", detail: "Pod runs but never goes Ready, so the Service has no endpoints and traffic 503s." },
        ],
    },
    {
        title: "Rolling updates in one picture",
        body: "A rolling update replaces pods gradually. maxUnavailable and maxSurge decide how gradually.",
        hotspots: [
            { label: "maxSurge", detail: "How many extra pods may exist above the desired count during the rollout." },
            { label: "maxUnavailable", detail: "How many pods may be missing at once. Set it to 0 for a zero-downtime rollout." },
            { label: "Rollback", detail: "kubectl rollout undo returns to the previous ReplicaSet if the new pods never become ready." },
        ],
    },
];

function SlidesDemo() {
    const [index, setIndex] = useState(0);
    const [openSpot, setOpenSpot] = useState<number | null>(null);
    const slide = SLIDES[index];

    const go = (dir: number) => {
        setIndex((i) => Math.min(SLIDES.length - 1, Math.max(0, i + dir)));
        setOpenSpot(null);
    };

    return (
        <div>
            <div className="flex items-center gap-1.5 mb-4">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-[#E7E2D8]"}`}
                    />
                ))}
                <span className="ml-auto text-xs font-700 text-[#94A3B8]">
                    Slide {index + 1} of {SLIDES.length}
                </span>
            </div>

            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAFAF8] p-6 mb-4 min-h-[280px]">
                <h4 className="text-xl font-900 text-[#0F172A] mb-2 leading-snug">{slide.title}</h4>
                <p className="text-sm text-[#475569] font-medium mb-5 leading-relaxed">{slide.body}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {slide.hotspots.map((h, i) => (
                        <button
                            key={i}
                            onClick={() => setOpenSpot(openSpot === i ? null : i)}
                            className={`px-4 py-2 rounded-lg text-sm font-700 border-2 transition-all cursor-pointer ${
                                openSpot === i
                                    ? "border-[var(--gold)] bg-[var(--gold-light)] text-[var(--gold-hover)]"
                                    : "border-[#E7E2D8] bg-white text-[#475569] hover:border-[var(--gold)]"
                            }`}
                        >
                            {h.label}
                        </button>
                    ))}
                </div>

                {openSpot !== null ? (
                    <div className="rounded-lg bg-white border border-[#E7E2D8] p-4">
                        <p className="text-sm text-[#475569] leading-relaxed font-medium">
                            {slide.hotspots[openSpot].detail}
                        </p>
                    </div>
                ) : (
                    <p className="text-xs text-[#94A3B8] font-600 italic">
                        Click any label above — the agent expands on whichever part you ask about.
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => go(-1)}
                    disabled={index === 0}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-700 text-[#475569] bg-white hover:bg-[#FAFAF8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => go(1)}
                    disabled={index === SLIDES.length - 1}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    Next slide
                </button>
            </div>
        </div>
    );
}

/* ─────────────────── Live white boarding ─────────────────── */

const BOARD_STEPS = [
    { caption: "Let us draw the request path. Start with the user." },
    { caption: "Traffic hits the Ingress first — TLS ends here." },
    { caption: "The Ingress forwards to a Service on its virtual IP." },
    { caption: "The Service load balances across the ready pods." },
    { caption: "If a pod fails its readiness probe it drops out of the set." },
];

function WhiteboardDemo() {
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(true);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!playing) return;
        if (step >= BOARD_STEPS.length - 1) {
            setPlaying(false);
            return;
        }
        timer.current = setTimeout(() => setStep((s) => s + 1), 1400);
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
            <div className="rounded-xl bg-[#0B1220] border border-[#1E2D45] p-5 mb-4">
                <svg viewBox="0 0 520 210" className="w-full h-auto">
                    {/* user */}
                    <g className={`transition-opacity duration-700 ${show(0)}`}>
                        <circle cx="45" cy="105" r="22" fill="none" stroke="#D4A017" strokeWidth="2.5" />
                        <text x="45" y="148" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="700">User</text>
                    </g>
                    {/* arrow 1 */}
                    <g className={`transition-opacity duration-700 ${show(1)}`}>
                        <line x1="72" y1="105" x2="122" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                        <path d="M122 105l-7-4v8z" fill="#475569" />
                    </g>
                    {/* ingress */}
                    <g className={`transition-opacity duration-700 ${show(1)}`}>
                        <rect x="128" y="82" width="92" height="46" rx="8" fill="none" stroke="#D4A017" strokeWidth="2.5" />
                        <text x="174" y="110" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700">Ingress</text>
                        <text x="174" y="148" textAnchor="middle" fill="#94A3B8" fontSize="11">TLS ends here</text>
                    </g>
                    {/* arrow 2 */}
                    <g className={`transition-opacity duration-700 ${show(2)}`}>
                        <line x1="224" y1="105" x2="274" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                        <path d="M274 105l-7-4v8z" fill="#475569" />
                    </g>
                    {/* service */}
                    <g className={`transition-opacity duration-700 ${show(2)}`}>
                        <rect x="280" y="82" width="92" height="46" rx="8" fill="none" stroke="#D4A017" strokeWidth="2.5" />
                        <text x="326" y="110" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700">Service</text>
                        <text x="326" y="148" textAnchor="middle" fill="#94A3B8" fontSize="11">virtual IP</text>
                    </g>
                    {/* fan out */}
                    <g className={`transition-opacity duration-700 ${show(3)}`}>
                        <line x1="376" y1="105" x2="418" y2="55" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                        <line x1="376" y1="105" x2="418" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                        <line x1="376" y1="105" x2="418" y2="155" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                        <rect x="424" y="36" width="68" height="38" rx="8" fill="none" stroke="#16A34A" strokeWidth="2.5" />
                        <text x="458" y="60" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="700">Pod</text>
                        <rect x="424" y="86" width="68" height="38" rx="8" fill="none" stroke="#16A34A" strokeWidth="2.5" />
                        <text x="458" y="110" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="700">Pod</text>
                    </g>
                    {/* failing pod */}
                    <g className={`transition-opacity duration-700 ${show(4)}`}>
                        <rect x="424" y="136" width="68" height="38" rx="8" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="5 4" />
                        <text x="458" y="160" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="700">Pod</text>
                        <line x1="376" y1="105" x2="418" y2="155" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 4" />
                        <text x="458" y="192" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="700">not ready</text>
                    </g>
                </svg>
            </div>

            <div className="rounded-xl bg-[#FAFAF8] border border-[#E7E2D8] p-4 mb-4 min-h-[68px]">
                <p className="text-xs font-700 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">
                    Instructor agent {playing ? "is drawing" : ""}
                </p>
                <p className="text-sm text-[#475569] font-medium leading-relaxed">{BOARD_STEPS[step].caption}</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={replay}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-700 text-[#475569] bg-white hover:bg-[#FAFAF8] cursor-pointer transition-colors"
                >
                    Replay
                </button>
                <button
                    onClick={() => setStep((s) => Math.min(BOARD_STEPS.length - 1, s + 1))}
                    disabled={step >= BOARD_STEPS.length - 1}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    {step >= BOARD_STEPS.length - 1 ? "Diagram complete" : "Draw next step"}
                </button>
            </div>
        </div>
    );
}

/* ───────────────────────── Case study ───────────────────────── */

const CASE_STAGES = [
    {
        heading: "The situation",
        body: "A retailer rolls out a new version of its checkout service at 09:40 on a Friday. The rollout reports success. Within four minutes the support queue fills with customers seeing errors at payment.",
    },
    {
        heading: "What you can see",
        body: "All pods show Running. CPU and memory look normal. The Service has endpoints. The only odd signal is that the error rate climbed the moment the new ReplicaSet scaled up.",
    },
    {
        heading: "The question put to you",
        body: "Everything reports healthy and yet customers are failing at payment. Where do you look next, and why would a passing health check still let broken traffic through?",
    },
    {
        heading: "How the agent works it through with you",
        body: "A liveness probe only proves the process is alive. This deployment had no readiness probe, so pods joined the Service before the payment provider connection pool had warmed. Traffic arrived a few seconds too early and failed. The fix is a readiness probe on a real dependency check plus maxUnavailable set to 0.",
    },
    {
        heading: "What you take away",
        body: "Healthy is not the same as ready. You will be asked to apply the same reasoning to a different service in the next lab, and the agent will not give you the answer until you have tried.",
    },
];

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

            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAFAF8] p-6 mb-4 min-h-[210px]">
                <p className="text-xs font-700 uppercase tracking-widest text-[#94A3B8] mb-2">
                    Step {stage + 1} of {CASE_STAGES.length}
                </p>
                <h4 className="text-xl font-900 text-[#0F172A] mb-3 leading-snug">{CASE_STAGES[stage].heading}</h4>
                <p className="text-sm text-[#475569] leading-relaxed font-medium">{CASE_STAGES[stage].body}</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setStage((s) => Math.max(0, s - 1))}
                    disabled={stage === 0}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-700 text-[#475569] bg-white hover:bg-[#FAFAF8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => setStage((s) => Math.min(CASE_STAGES.length - 1, s + 1))}
                    disabled={stage === CASE_STAGES.length - 1}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    {stage === CASE_STAGES.length - 1 ? "End of case study" : "Continue"}
                </button>
            </div>
        </div>
    );
}

/* ──────────────────── Video placeholders ──────────────────── */

function VideoPending({ needed }: { needed: string }) {
    return (
        <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#F3F0E8] flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M8 6l10 6-10 6V6z" strokeLinejoin="round" />
                </svg>
            </div>
            <p className="text-lg font-800 text-[#0F172A] mb-2">Video coming shortly</p>
            <p className="text-sm text-[#475569] font-medium max-w-md mx-auto leading-relaxed">{needed}</p>
        </div>
    );
}

/* ───────────────────────── Section ───────────────────────── */

export default function PlatformSection() {
    const [openDemo, setOpenDemo] = useState<DemoKey | null>(null);
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
        <section id="platform" className="section-tall bg-white border-t border-[#E7E2D8]">
            <div className="container-content w-full py-20 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <div className="gold-divider mx-auto" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-900 text-[#0F172A] leading-[1.1] tracking-tight mb-4">
                        Platform
                    </h2>
                    <p className="text-lg text-[#475569] font-medium leading-relaxed">
                        One engine covering the whole journey — from first concept to a certification pass, with the
                        evidence to prove it happened.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* ── Left half: the four points ── */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-700 uppercase tracking-widest text-[#94A3B8] mb-2">
                            What It Covers
                        </h3>
                        <p className="text-sm text-[#64748B] font-medium mb-4">
                            The whole journey, end to end.
                        </p>

                        <div className="flex flex-col gap-3 flex-1">
                            {LEFT_POINTS.map((p, i) => (
                                <div
                                    key={p.title}
                                    className="flex-1 flex items-center gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAFAF8] px-5 py-4 min-h-[86px] transition-all hover:border-[var(--gold)] hover:bg-white hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                                >
                                    <span className="w-8 h-8 rounded-full bg-[var(--gold-light)] text-[var(--gold-hover)] text-xs font-800 flex items-center justify-center shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-lg font-900 text-[#0F172A] leading-snug">{p.title}</span>
                                        <span className="block text-[#475569] font-medium text-sm leading-snug">{p.blurb}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right half: What Do You Get + Experience ── */}
                    <div className="flex flex-col gap-8">

                        <div>
                            <h3 className="text-sm font-700 uppercase tracking-widest text-[#94A3B8] mb-2">
                                What Do You Get
                            </h3>
                            <p className="text-sm text-[#64748B] font-medium mb-4">
                                Included with every seat.
                            </p>
                            <ul className="flex flex-col gap-3">
                                {WHAT_YOU_GET.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 items-start rounded-xl border border-[#E7E2D8] bg-[#FAFAF8] px-5 py-4"
                                    >
                                        <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[#0F172A] font-semibold leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-700 uppercase tracking-widest text-[#94A3B8] mb-2">
                                Experience
                            </h3>
                            <p className="text-sm text-[#64748B] font-medium mb-4">
                                Click any of these to try it right here.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch">
                                {EXPERIENCES.map((e, i) => (
                                    <button
                                        key={e.key}
                                        onClick={() => setOpenDemo(e.key)}
                                        className={`group text-left rounded-xl border border-[#E7E2D8] bg-white px-4 py-3.5 flex items-center gap-3 transition-all hover:border-[var(--gold)] hover:bg-[#FAFAF8] cursor-pointer ${
                                            i === EXPERIENCES.length - 1 ? "sm:col-span-2" : ""
                                        }`}
                                    >
                                        <span className="w-8 h-8 rounded-full bg-[var(--gold-light)] text-[var(--gold-hover)] flex items-center justify-center shrink-0 group-hover:bg-[var(--gold)] group-hover:text-white transition-colors">
                                            {e.kind === "video" ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 6l10 6-10 6V6z" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-800 text-[#0F172A] leading-snug text-[15px]">{e.title}</span>
                                            <span className="block text-[13px] text-[#64748B] font-medium leading-snug">{e.blurb}</span>
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
                {openDemo === "quiz" && <QuizDemo />}
                {openDemo === "slides" && <SlidesDemo />}
                {openDemo === "whiteboard" && <WhiteboardDemo />}
                {openDemo === "casestudy" && <CaseStudyDemo />}
                {openDemo === "labmentorship" && (
                    <VideoPending needed="Needs a 1 minute clip of a lab exercise with the lab agent assisting, including the agent answering a learner question." />
                )}
                {openDemo === "interactive" && (
                    <VideoPending needed="Needs a 1 minute clip of the instructor delivering training with the student asking three questions in a row." />
                )}
                {openDemo === "contentgen" && (
                    <VideoPending needed="Needs a 1 minute clip explaining how content generation works, what it outputs, and how long it takes." />
                )}
            </Modal>
        </section>
    );
}
