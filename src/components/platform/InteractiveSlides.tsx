"use client";

import { useMemo, useState } from "react";

/**
 * Interactive slides.
 *
 * Per the client's 06/10 note, an interactive slide means the learner moves
 * things around the screen and the output changes. Both slides here are drag
 * and drop (with a click-to-place fallback for touch), and the result panel is
 * recomputed from whatever the learner has arranged — it is not scripted.
 */

type PieceId = "ingress" | "service" | "pod";

const PIECES: { id: PieceId; label: string; note: string }[] = [
    { id: "ingress", label: "Ingress", note: "terminates TLS" },
    { id: "service", label: "Service", note: "load balances" },
    { id: "pod", label: "Pod", note: "runs your container" },
];

const CORRECT: PieceId[] = ["ingress", "service", "pod"];

/** Lets the learner wipe their attempt and try the arrangement again. */
function RedoButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#E7E2D8] bg-white text-xs font-800 text-[#475569] hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shrink-0"
        >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v6h6" />
                <path d="M3.51 15a9 9 0 102.13-9.36L3 8" />
            </svg>
            Redo
        </button>
    );
}

/* ── Slide 1: order the request path ── */

function PathBuilder() {
    const [slots, setSlots] = useState<(PieceId | null)[]>([null, null, null]);
    const [held, setHeld] = useState<PieceId | null>(null);

    const placed = slots.filter(Boolean) as PieceId[];

    const place = (index: number, id: PieceId) => {
        setSlots((prev) => {
            const next = [...prev];
            // a piece can only sit in one slot
            for (let i = 0; i < next.length; i++) if (next[i] === id) next[i] = null;
            next[index] = id;
            return next;
        });
        setHeld(null);
    };

    const redo = () => {
        setSlots([null, null, null]);
        setHeld(null);
    };

    const clear = (index: number) =>
        setSlots((prev) => {
            const next = [...prev];
            next[index] = null;
            return next;
        });

    const result = useMemo(() => {
        if (placed.length === 0)
            return { tone: "idle", headline: "Nothing placed yet", detail: "Drag the three parts into the path to see what happens to the request." };
        if (placed.length < 3)
            return {
                tone: "warn",
                headline: `Request stops after ${placed.length} hop${placed.length > 1 ? "s" : ""}`,
                detail: "The path is incomplete, so traffic has nowhere to go next. Fill all three positions.",
            };
        const order = slots as PieceId[];
        if (order.every((p, i) => p === CORRECT[i]))
            return {
                tone: "ok",
                headline: "200 OK — the request reaches your container",
                detail: "TLS ends at the Ingress, the Service picks a ready pod, and the pod answers. This is the path traffic actually takes.",
            };
        if (order[0] === "pod")
            return {
                tone: "bad",
                headline: "Exposed pod — no TLS, no load balancing",
                detail: "Traffic hits one container directly. The certificate never terminates and a single pod takes every request.",
            };
        if (order[0] === "service")
            return {
                tone: "bad",
                headline: "No TLS termination",
                detail: "The Service balances traffic but nothing has terminated the certificate, so HTTPS requests fail before they are routed.",
            };
        if (order.indexOf("pod") < order.indexOf("service"))
            return {
                tone: "bad",
                headline: "Pod placed before the Service",
                detail: "Nothing is balancing load. One pod serves everything and a restart takes the whole route down.",
            };
        return {
            tone: "bad",
            headline: "Traffic cannot complete this path",
            detail: "The hops are out of order, so the request is handed somewhere that is not listening for it.",
        };
    }, [slots, placed.length]);

    const toneClass =
        result.tone === "ok"
            ? "border-[#16A34A] bg-[#16A34A]/5"
            : result.tone === "bad"
            ? "border-[#DC2626] bg-[#DC2626]/5"
            : result.tone === "warn"
            ? "border-[var(--gold)] bg-[var(--gold)]/5"
            : "border-[#E7E2D8] bg-[#FAFAF8]";

    return (
        <div>
            <div className="flex items-start gap-3 mb-4">
                <p className="text-sm text-[#475569] font-semibold">
                    Drag each part into the path — or tap one, then tap a slot. The result below changes with what you build.
                </p>
                <RedoButton onClick={redo} disabled={placed.length === 0} />
            </div>

            {/* palette */}
            <div className="flex flex-wrap gap-2 mb-5">
                {PIECES.map((p) => {
                    const used = slots.includes(p.id);
                    return (
                        <button
                            key={p.id}
                            draggable={!used}
                            onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
                            onClick={() => !used && setHeld(held === p.id ? null : p.id)}
                            disabled={used}
                            className={`px-4 py-2.5 rounded-xl border-2 text-sm font-800 transition-all ${
                                used
                                    ? "border-[#E7E2D8] bg-[#F3F0E8] text-[#94A3B8] cursor-default"
                                    : held === p.id
                                    ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-hover)] cursor-grab"
                                    : "border-[#E7E2D8] bg-white text-[#0F172A] hover:border-[var(--gold)] cursor-grab"
                            }`}
                        >
                            {p.label}
                            <span className="block text-[11px] font-semibold text-[#64748B]">{p.note}</span>
                        </button>
                    );
                })}
            </div>

            {/* the path */}
            <div className="flex items-stretch gap-2 mb-5">
                {slots.map((slot, i) => (
                    <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const id = e.dataTransfer.getData("text/plain") as PieceId;
                                if (id) place(i, id);
                            }}
                            onClick={() => (held ? place(i, held) : slot && clear(i))}
                            className={`flex-1 min-w-0 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center px-2 transition-all cursor-pointer ${
                                slot
                                    ? "border-solid border-[var(--gold)] bg-white"
                                    : "border-[#E7E2D8] bg-[#FAFAF8] hover:border-[var(--gold)]"
                            }`}
                        >
                            {slot ? (
                                <>
                                    <span className="text-sm font-900 text-[#0F172A] truncate w-full">
                                        {PIECES.find((p) => p.id === slot)!.label}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#94A3B8]">tap to remove</span>
                                </>
                            ) : (
                                <span className="text-xs font-bold text-[#94A3B8]">Hop {i + 1}</span>
                            )}
                        </div>
                        {i < slots.length - 1 && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="3" className="shrink-0">
                                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>

            {/* live output */}
            <div className={`rounded-xl border-2 p-4 ${toneClass}`}>
                <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">Output</p>
                <p className="text-base font-900 text-[#0F172A] mb-1 leading-snug">{result.headline}</p>
                <p className="text-sm text-[#475569] font-semibold leading-relaxed">{result.detail}</p>
            </div>
        </div>
    );
}

/* ── Slide 2: drag pods in and out, watch the load move ── */

function ReplicaBuilder() {
    const [pods, setPods] = useState(0);
    const PEAK = 1200; // requests per minute at peak
    const CAPACITY = 500; // one pod can serve this many

    const add = () => setPods((n) => Math.min(6, n + 1));
    const remove = () => setPods((n) => Math.max(0, n - 1));

    const perPod = pods === 0 ? 0 : Math.round(PEAK / pods);
    const ok = pods > 0 && perPod <= CAPACITY;
    const headroom = pods === 0 ? 0 : Math.round(((CAPACITY * pods - PEAK) / PEAK) * 100);

    return (
        <div>
            <div className="flex items-start gap-3 mb-4">
                <p className="text-sm text-[#475569] font-semibold">
                    Drag pods into the Service — or tap to add. Peak traffic is {PEAK.toLocaleString()} requests a minute and one
                    pod serves {CAPACITY}.
                </p>
                <RedoButton onClick={() => setPods(0)} disabled={pods === 0} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", "pod")}
                    onClick={add}
                    className="px-4 py-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-sm font-800 text-[#0F172A] hover:border-[var(--gold)] cursor-grab"
                >
                    Pod
                    <span className="block text-[11px] font-semibold text-[#64748B]">drag into the Service</span>
                </button>
                <button
                    onClick={remove}
                    disabled={pods === 0}
                    className="px-4 py-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-sm font-800 text-[#475569] hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    Remove one
                </button>
            </div>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    add();
                }}
                className="rounded-xl border-2 border-dashed border-[#E7E2D8] bg-[#FAFAF8] p-4 mb-5 min-h-[104px]"
            >
                <p className="text-[11px] font-800 uppercase tracking-widest text-[#94A3B8] mb-3">Service — behind one virtual IP</p>
                {pods === 0 ? (
                    <p className="text-sm font-bold text-[#94A3B8]">Empty. Drop a pod here.</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: pods }).map((_, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-lg border-2 text-xs font-900 ${
                                    perPod <= CAPACITY ? "border-[#16A34A] bg-white text-[#0F172A]" : "border-[#DC2626] bg-[#DC2626]/5 text-[#0F172A]"
                                }`}
                            >
                                Pod
                                <span className="block text-[10px] font-bold text-[#64748B]">{perPod}/min</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div
                className={`rounded-xl border-2 p-4 ${
                    pods === 0
                        ? "border-[#E7E2D8] bg-[#FAFAF8]"
                        : ok
                        ? "border-[#16A34A] bg-[#16A34A]/5"
                        : "border-[#DC2626] bg-[#DC2626]/5"
                }`}
            >
                <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1.5">Output</p>
                {pods === 0 ? (
                    <>
                        <p className="text-base font-900 text-[#0F172A] mb-1">503 — no endpoints</p>
                        <p className="text-sm text-[#475569] font-semibold">
                            The Service exists but has no ready pods behind it, so every request is refused.
                        </p>
                    </>
                ) : ok ? (
                    <>
                        <p className="text-base font-900 text-[#0F172A] mb-1">
                            Serving peak with {headroom}% headroom
                        </p>
                        <p className="text-sm text-[#475569] font-semibold">
                            {pods} pod{pods > 1 ? "s" : ""} at {perPod} requests a minute each, under the {CAPACITY} one pod can
                            handle. Losing a pod would push the rest to {Math.round(PEAK / Math.max(1, pods - 1))}/min.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-base font-900 text-[#0F172A] mb-1">Overloaded — requests start timing out</p>
                        <p className="text-sm text-[#475569] font-semibold">
                            Each pod is taking {perPod} requests a minute against a limit of {CAPACITY}. Add{" "}
                            {Math.ceil(PEAK / CAPACITY) - pods} more to carry peak.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

/* ── the deck ── */

const SLIDES = [
    { title: "Build the request path", render: () => <PathBuilder /> },
    { title: "Size the deployment", render: () => <ReplicaBuilder /> },
];

export default function InteractiveSlides() {
    const [index, setIndex] = useState(0);
    const slide = SLIDES[index];

    return (
        <div>
            <div className="flex items-center gap-1.5 mb-4">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-[#E7E2D8]"}`}
                    />
                ))}
                <span className="ml-auto text-xs font-800 text-[#64748B]">
                    Slide {index + 1} of {SLIDES.length}
                </span>
            </div>

            <h4 className="text-xl font-900 text-[#0F172A] mb-3 leading-snug">{slide.title}</h4>

            <div className="mb-4">{slide.render()}</div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => setIndex((i) => Math.min(SLIDES.length - 1, i + 1))}
                    disabled={index === SLIDES.length - 1}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm font-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    Next slide
                </button>
            </div>
        </div>
    );
}
