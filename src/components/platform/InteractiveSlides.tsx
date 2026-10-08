"use client";

import { useState, type ReactNode } from "react";
import { SLIDE_DECK, SLIDE_LOOP, SLIDE_COURSE, type SlideKey } from "@/components/platform/content";

/**
 * Interactive slides — the five NVIDIA INFRA simulators recommended for the
 * website.
 *
 * These are not presentation slides. Each one gives the learner the controls
 * the course lesson uses and recomputes the outcome the moment a value
 * changes. The models are deliberately simple, but every number on screen is
 * calculated from the controls — nothing is scripted. The instructor agent
 * shares the same controls in the course, so its note under each simulator is
 * written from the current state too.
 */

/* ─────────────────────────── shared controls ─────────────────────────── */

type Tone = "ok" | "warn" | "bad";

const TONE_PANEL: Record<Tone, string> = {
    ok: "border-[#16A34A] bg-[#16A34A]/5",
    warn: "border-[var(--gold)] bg-[var(--gold)]/5",
    bad: "border-[#DC2626] bg-[#DC2626]/5",
};

const TONE_TEXT: Record<Tone, string> = {
    ok: "text-[#15803D]",
    warn: "text-[var(--gold-hover)]",
    bad: "text-[#B91C1C]",
};

function Label({ children, value }: { children: ReactNode; value?: ReactNode }) {
    return (
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-800 uppercase tracking-widest text-[#64748B]">{children}</span>
            {value !== undefined && <span className="text-sm font-900 text-[#0F172A] tabular-nums">{value}</span>}
        </div>
    );
}

function Segmented<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: { value: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
}) {
    return (
        <div>
            <Label>{label}</Label>
            <div className="flex flex-wrap gap-1.5">
                {options.map((o) => (
                    <button
                        key={o.value}
                        onClick={() => onChange(o.value)}
                        aria-pressed={o.value === value}
                        className={`px-3 py-1.5 rounded-lg border-2 text-xs font-800 transition-colors cursor-pointer ${
                            o.value === value
                                ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-hover)]"
                                : "border-[#E7E2D8] bg-white text-[#475569] hover:border-[var(--gold)]"
                        }`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Slider({
    label,
    min,
    max,
    step = 1,
    value,
    onChange,
    display,
}: {
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (v: number) => void;
    display: ReactNode;
}) {
    return (
        <div>
            <Label value={display}>{label}</Label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-label={label}
                className="w-full accent-[var(--gold)] cursor-pointer"
            />
        </div>
    );
}

function Stat({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: ReactNode; tone?: Tone }) {
    return (
        <div className="rounded-xl border border-[#E7E2D8] bg-white px-3 py-2.5 min-w-0">
            <p className="text-[10px] font-800 uppercase tracking-widest text-[#64748B] mb-0.5 leading-tight">{label}</p>
            <p className={`text-xl font-900 leading-tight tabular-nums ${tone ? TONE_TEXT[tone] : "text-[#0F172A]"}`}>{value}</p>
            {sub && <p className="text-[11px] font-bold text-[#94A3B8] leading-snug">{sub}</p>}
        </div>
    );
}

/** One horizontal bar split into labelled segments, with an optional limit marker. */
function SplitBar({
    label,
    parts,
    total,
    limit,
}: {
    label: string;
    parts: { label: string; value: number; color: string }[];
    total: number;
    limit?: { at: number; label: string };
}) {
    return (
        <div>
            <p className="text-[10px] font-800 uppercase tracking-widest text-[#64748B] mb-1.5">{label}</p>
            <div className="relative h-5 rounded-md bg-[#F3F0E8] overflow-hidden flex">
                {parts.map((p) => (
                    <div
                        key={p.label}
                        className="h-full transition-all duration-300"
                        style={{ width: `${Math.max(0, Math.min(100, (p.value / total) * 100))}%`, background: p.color }}
                    />
                ))}
                {limit && (
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#0F172A]"
                        style={{ left: `${Math.min(100, (limit.at / total) * 100)}%` }}
                        title={limit.label}
                    />
                )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                {parts.map((p) => (
                    <span key={p.label} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#475569]">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                        {p.label}
                    </span>
                ))}
                {limit && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#475569]">
                        <span className="w-0.5 h-3 bg-[#0F172A]" />
                        {limit.label}
                    </span>
                )}
            </div>
        </div>
    );
}

type Series = { label: string; values: number[]; color: string; dashed?: boolean; strong?: boolean };

/** Small line chart over evenly spaced x positions, with a marker for the current x. */
function LineChart({
    series,
    xLabels,
    yMax,
    markerIndex,
    yFormat,
    caption,
}: {
    series: Series[];
    xLabels: string[];
    yMax: number;
    markerIndex: number;
    yFormat: (v: number) => string;
    caption: string;
}) {
    const W = 460;
    const H = 120;
    const PAD = { l: 34, r: 8, t: 8, b: 20 };
    const n = series[0].values.length;
    const x = (i: number) => PAD.l + (i / Math.max(1, n - 1)) * (W - PAD.l - PAD.r);
    const y = (v: number) => PAD.t + (1 - Math.min(v, yMax) / yMax) * (H - PAD.t - PAD.b);
    const labelEvery = Math.max(1, Math.ceil(xLabels.length / 7));

    return (
        <figure>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={caption}>
                {[0, 0.5, 1].map((f) => (
                    <g key={f}>
                        <line x1={PAD.l} x2={W - PAD.r} y1={y(yMax * f)} y2={y(yMax * f)} stroke="#E7E2D8" strokeWidth="1" />
                        <text x={PAD.l - 4} y={y(yMax * f) + 3} textAnchor="end" fontSize="9" fontWeight="700" fill="#94A3B8">
                            {yFormat(yMax * f)}
                        </text>
                    </g>
                ))}
                {xLabels.map((l, i) =>
                    (i % labelEvery === 0 && xLabels.length - 1 - i >= labelEvery / 2) || i === xLabels.length - 1 ? (
                        <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94A3B8">
                            {l}
                        </text>
                    ) : null
                )}
                <line x1={x(markerIndex)} x2={x(markerIndex)} y1={PAD.t} y2={H - PAD.b} stroke="#0F172A" strokeWidth="1" strokeDasharray="2 3" />
                {series.map((s) => (
                    <polyline
                        key={s.label}
                        fill="none"
                        points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
                        style={{ stroke: s.color }}
                        strokeWidth={s.strong ? 2.75 : 1.75}
                        strokeDasharray={s.dashed ? "4 4" : undefined}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                ))}
                {series
                    .filter((s) => s.strong)
                    .map((s) => (
                        <circle key={s.label} cx={x(markerIndex)} cy={y(s.values[markerIndex])} r="4" style={{ fill: s.color }} stroke="#fff" strokeWidth="1.5" />
                    ))}
            </svg>
            <figcaption className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                {series.map((s) => (
                    <span key={s.label} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#475569]">
                        <span
                            className="w-4 h-0 border-t-2"
                            style={{ borderColor: s.color, borderStyle: s.dashed ? "dashed" : "solid" }}
                        />
                        {s.label}
                    </span>
                ))}
            </figcaption>
        </figure>
    );
}

/** The live verdict, written by the instructor agent from the current state. */
function AgentNote({ tone, headline, children }: { tone: Tone; headline: string; children: ReactNode }) {
    return (
        <div className={`rounded-xl border-2 p-3.5 ${TONE_PANEL[tone]}`}>
            <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-1">Instructor agent</p>
            <p className="text-[15px] font-900 text-[#0F172A] mb-1 leading-snug">{headline}</p>
            <p className="text-[13px] text-[#475569] font-semibold leading-relaxed">{children}</p>
        </div>
    );
}

/** Controls on the left, outcome on the right; stacks on small screens. */
function SimLayout({ controls, outcome }: { controls: ReactNode; outcome: ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4">
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAFAF8] p-4 flex flex-col gap-4">
                <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] -mb-1">Change parameters</p>
                {controls}
            </div>
            <div className="flex flex-col gap-3 min-w-0">{outcome}</div>
        </div>
    );
}

const COLORS = {
    gold: "var(--gold)",
    navy: "#0F172A",
    slate: "#94A3B8",
    red: "#DC2626",
    sand: "#D6CFC0",
};

const pct = (v: number) => `${Math.round(v * 100)}%`;
const money = (v: number) =>
    v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${Math.round(v)}`;
const secs = (v: number) => (v < 1 ? `${Math.round(v * 1000)} ms` : `${v.toFixed(2)} s`);

/* ───────────── 1. Why 64 GPUs don't give 64x — Module 2, Lesson 5 ───────────── */

const GPU_STEPS = [1, 2, 4, 8, 16, 32, 64];

const FABRICS = {
    nvlink: { label: "NVLink / NVSwitch", bw: 450, lat: 3e-6 },
    ib: { label: "InfiniBand NDR 400", bw: 50, lat: 5e-6 },
    pcie: { label: "PCIe Gen5 / Ethernet", bw: 10, lat: 2e-5 },
} as const;
type Fabric = keyof typeof FABRICS;

/** compute seconds per step, and gradient GB exchanged each step (BF16) */
const MODELS = {
    "7b": { label: "7B params", compute: 1.2, grad: 14 },
    "70b": { label: "70B params", compute: 6, grad: 140 },
} as const;
type ModelSize = keyof typeof MODELS;

/** Data-parallel step: fixed compute per GPU, plus a ring all-reduce of the gradients. */
function scalingStep(gpus: number, fabric: Fabric, model: ModelSize) {
    const f = FABRICS[fabric];
    const m = MODELS[model];
    const comm = gpus === 1 ? 0 : ((2 * (gpus - 1)) / gpus) * (m.grad / f.bw) + 2 * (gpus - 1) * f.lat;
    const speedup = (gpus * m.compute) / (m.compute + comm);
    return { compute: m.compute, comm, speedup, efficiency: speedup / gpus };
}

function ScalingSim() {
    const [gpuIdx, setGpuIdx] = useState(6);
    const [fabric, setFabric] = useState<Fabric>("ib");
    const [model, setModel] = useState<ModelSize>("7b");

    const gpus = GPU_STEPS[gpuIdx];
    const r = scalingStep(gpus, fabric, model);
    const curve = GPU_STEPS.map((g) => scalingStep(g, fabric, model).speedup);
    const nvlink = scalingStep(gpus, "nvlink", model);
    const commShare = r.comm / (r.compute + r.comm);
    const tone: Tone = r.efficiency >= 0.85 ? "ok" : r.efficiency >= 0.55 ? "warn" : "bad";

    return (
        <SimLayout
            controls={
                <>
                    <Slider
                        label="Number of GPUs"
                        min={0}
                        max={GPU_STEPS.length - 1}
                        value={gpuIdx}
                        onChange={setGpuIdx}
                        display={gpus}
                    />
                    <Segmented
                        label="Interconnect"
                        value={fabric}
                        onChange={setFabric}
                        options={(Object.keys(FABRICS) as Fabric[]).map((k) => ({ value: k, label: FABRICS[k].label }))}
                    />
                    <Segmented
                        label="Model size"
                        value={model}
                        onChange={setModel}
                        options={(Object.keys(MODELS) as ModelSize[]).map((k) => ({ value: k, label: MODELS[k].label }))}
                    />
                </>
            }
            outcome={
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <Stat label="Efficiency" value={pct(r.efficiency)} tone={tone} />
                        <Stat label="Actual speedup" value={`${r.speedup.toFixed(1)}x`} sub={`ideal ${gpus}x`} />
                        <Stat label="Time per step" value={secs(r.compute + r.comm)} />
                    </div>
                    <SplitBar
                        label="Time per training step"
                        total={r.compute + r.comm}
                        parts={[
                            { label: `Compute ${secs(r.compute)}`, value: r.compute, color: COLORS.navy },
                            { label: `Communication ${secs(r.comm)}`, value: r.comm, color: COLORS.gold },
                        ]}
                    />
                    <LineChart
                        caption="Actual speedup against ideal linear speedup"
                        xLabels={GPU_STEPS.map(String)}
                        yMax={64}
                        markerIndex={gpuIdx}
                        yFormat={(v) => `${Math.round(v)}x`}
                        series={[
                            { label: "Ideal linear", values: GPU_STEPS, color: COLORS.slate, dashed: true },
                            { label: "Actual", values: curve, color: COLORS.gold, strong: true },
                        ]}
                    />
                    <AgentNote
                        tone={tone}
                        headline={
                            gpus === 1
                                ? "One GPU: nothing to synchronise yet"
                                : `${gpus} GPUs give ${r.speedup.toFixed(1)}x, not ${gpus}x`
                        }
                    >
                        {gpus === 1
                            ? "Add GPUs and watch the communication share of each step appear. Every step now ends with a gradient all-reduce across all of them."
                            : tone === "ok"
                            ? `The fabric keeps up: communication is only ${pct(commShare)} of each step, so almost all the added GPUs turn into speed.`
                            : `${pct(commShare)} of every step is spent exchanging gradients over ${FABRICS[fabric].label}. ${
                                  fabric === "nvlink"
                                      ? "Even the fastest fabric is the limit here; overlapping communication with compute is the next lever."
                                      : `The same run on NVLink / NVSwitch would reach ${nvlink.speedup.toFixed(1)}x — a faster interconnect helps more than more GPUs.`
                              }`}
                    </AgentNote>
                </>
            }
        />
    );
}

/* ───────────── 2. GPU time-slicing latency simulator — Module 5, Lesson 2 ───────────── */

const SLICE = { base: 20, limit: 100, switchCost: 6, mpsWait: 0.45, burstyActive: 0.35 };
type Workload = "bursty" | "steady";

function sliceLatency(replicas: number, mps: boolean, workload: Workload) {
    // bursty notebooks are mostly idle, so only a share of replicas contend at once
    const active = workload === "steady" ? replicas : 1 + (replicas - 1) * SLICE.burstyActive;
    const wait = (active - 1) * SLICE.base * (mps ? SLICE.mpsWait : 1);
    const switching = mps ? 0 : (active - 1) * SLICE.switchCost;
    return { compute: SLICE.base, wait, switching, total: SLICE.base + wait + switching };
}

function TimeSlicingSim() {
    const [replicas, setReplicas] = useState(4);
    const [mps, setMps] = useState(false);
    const [workload, setWorkload] = useState<Workload>("steady");

    const r = sliceLatency(replicas, mps, workload);
    const fits = Array.from({ length: 8 }, (_, i) => i + 1).filter((n) => sliceLatency(n, mps, workload).total <= SLICE.limit);
    const maxFit = fits.length ? fits[fits.length - 1] : 0;
    const tone: Tone = r.total <= SLICE.limit * 0.8 ? "ok" : r.total <= SLICE.limit ? "warn" : "bad";
    const scale = Math.max(SLICE.limit * 1.25, r.total);

    return (
        <SimLayout
            controls={
                <>
                    <Slider
                        label="Replicas sharing one GPU"
                        min={1}
                        max={8}
                        value={replicas}
                        onChange={setReplicas}
                        display={replicas}
                    />
                    <Segmented
                        label="MPS"
                        value={mps ? "on" : "off"}
                        onChange={(v) => setMps(v === "on")}
                        options={[
                            { value: "off", label: "Disabled" },
                            { value: "on", label: "Enabled" },
                        ]}
                    />
                    <Segmented
                        label="Workload type"
                        value={workload}
                        onChange={setWorkload}
                        options={[
                            { value: "bursty", label: "Bursty notebooks" },
                            { value: "steady", label: "Steady batch" },
                        ]}
                    />
                </>
            }
            outcome={
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <Stat label="Per-pod latency" value={`${Math.round(r.total)} ms`} tone={tone} />
                        <Stat label="Acceptable limit" value={`${SLICE.limit} ms`} />
                        <Stat label="Replicas that fit" value={maxFit} sub="under the limit" />
                    </div>
                    <SplitBar
                        label="Latency breakdown"
                        total={scale}
                        limit={{ at: SLICE.limit, label: `${SLICE.limit} ms limit` }}
                        parts={[
                            { label: `Own compute ${Math.round(r.compute)} ms`, value: r.compute, color: COLORS.navy },
                            { label: `Waiting for a slice ${Math.round(r.wait)} ms`, value: r.wait, color: COLORS.gold },
                            { label: `Context switching ${Math.round(r.switching)} ms`, value: r.switching, color: COLORS.red },
                        ]}
                    />
                    <LineChart
                        caption="Per-pod latency as replicas are added"
                        xLabels={Array.from({ length: 8 }, (_, i) => String(i + 1))}
                        yMax={200}
                        markerIndex={replicas - 1}
                        yFormat={(v) => `${Math.round(v)}`}
                        series={[
                            { label: "Limit (ms)", values: Array(8).fill(SLICE.limit), color: COLORS.slate, dashed: true },
                            {
                                label: "Per-pod latency (ms)",
                                values: Array.from({ length: 8 }, (_, i) => sliceLatency(i + 1, mps, workload).total),
                                color: COLORS.gold,
                                strong: true,
                            },
                        ]}
                    />
                    <AgentNote
                        tone={tone}
                        headline={
                            r.total <= SLICE.limit
                                ? `${Math.round(r.total)} ms — inside the ${SLICE.limit} ms limit`
                                : `${Math.round(r.total)} ms — over the limit by ${Math.round(r.total - SLICE.limit)} ms`
                        }
                    >
                        {replicas === 1
                            ? "One pod has the GPU to itself. Add replicas and each one starts waiting for its turn on the GPU."
                            : mps
                            ? `MPS runs kernels from different pods concurrently, so the context-switch cost disappears and waiting drops. The trade-off: pods share one memory space, so a fault in one can affect the others. This setup holds the limit up to ${maxFit} replica${maxFit === 1 ? "" : "s"}.`
                            : `Time-slicing gives each pod the whole GPU in turn, so latency grows with every active neighbour — plus ${Math.round(
                                  r.switching
                              )} ms of context switching. ${
                                  workload === "steady"
                                      ? "Steady batch keeps every replica busy at once."
                                      : "Bursty notebooks are idle most of the time, which is why they share better."
                              } Limit holds up to ${maxFit} replica${maxFit === 1 ? "" : "s"}.`}
                    </AgentNote>
                </>
            }
        />
    );
}

/* ───────────── 3. Diagnosing GPU bottlenecks — Module 2, Lesson 6 ───────────── */

const BATCHES = ["32", "64", "128", "256"] as const;
type Batch = (typeof BATCHES)[number];

/** samples/s the GPU can process at full occupancy */
const PRECISION = {
    fp32: { label: "FP32", peak: 900, bytes: 1 },
    fp16: { label: "FP16", peak: 2400, bytes: 0.8 },
    fp8: { label: "FP8", peak: 3800, bytes: 0.65 },
} as const;
type Precision = keyof typeof PRECISION;

function BottleneckSim() {
    const [batch, setBatch] = useState<Batch>("128");
    const [loader, setLoader] = useState(2000);
    const [precision, setPrecision] = useState<Precision>("fp16");

    const b = Number(batch);
    const occupancy = b / (b + 40); // small batches leave SMs idle
    const gpuRate = PRECISION[precision].peak * occupancy;
    const computeMs = (b / gpuRate) * 1000;
    const ioMs = (b / loader) * 1000;
    const stepMs = Math.max(computeMs, ioMs); // the loader prefetches while the GPU computes
    const stallMs = Math.max(0, ioMs - computeMs);
    const smUtil = (computeMs / stepMs) * occupancy;
    const memUtil = Math.min(0.98, smUtil * PRECISION[precision].bytes * 1.1);
    const throughput = (b / stepMs) * 1000;

    const ioBound = stallMs / stepMs > 0.1;
    const smallBatch = !ioBound && occupancy < 0.65;
    const state = ioBound ? "I/O-bound" : smallBatch ? "Under-filled" : "Compute-bound";
    const tone: Tone = ioBound ? "bad" : smallBatch ? "warn" : "ok";

    return (
        <SimLayout
            controls={
                <>
                    <Segmented
                        label="Batch size"
                        value={batch}
                        onChange={setBatch}
                        options={BATCHES.map((v) => ({ value: v, label: v }))}
                    />
                    <Slider
                        label="Data loader throughput"
                        min={500}
                        max={6000}
                        step={250}
                        value={loader}
                        onChange={setLoader}
                        display={`${loader.toLocaleString()} samples/s`}
                    />
                    <Segmented
                        label="Precision format"
                        value={precision}
                        onChange={setPrecision}
                        options={(Object.keys(PRECISION) as Precision[]).map((k) => ({ value: k, label: PRECISION[k].label }))}
                    />
                </>
            }
            outcome={
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Stat label="System state" value={<span className="text-[15px] whitespace-nowrap">{state}</span>} tone={tone} />
                        <Stat label="SM util" value={pct(smUtil)} />
                        <Stat label="Memory BW" value={pct(memUtil)} />
                        <Stat label="Throughput" value={Math.round(throughput).toLocaleString()} sub="samples/s" />
                    </div>
                    <SplitBar
                        label={`Step latency — ${Math.round(stepMs)} ms`}
                        total={stepMs}
                        parts={[
                            { label: `Compute ${Math.round(computeMs)} ms`, value: computeMs, color: COLORS.navy },
                            { label: `I/O stall ${Math.round(stallMs)} ms`, value: stallMs, color: COLORS.red },
                        ]}
                    />
                    <SplitBar
                        label="Who is the bottleneck — samples/s each side can supply"
                        total={Math.max(gpuRate, loader) * 1.05}
                        parts={[{ label: `GPU can take ${Math.round(gpuRate).toLocaleString()}`, value: gpuRate, color: COLORS.navy }]}
                        limit={{ at: loader, label: `Loader feeds ${loader.toLocaleString()}` }}
                    />
                    <AgentNote
                        tone={tone}
                        headline={
                            ioBound
                                ? `The GPU waits ${Math.round(stallMs)} ms every step for data`
                                : smallBatch
                                ? `Batch ${b} leaves the SMs under-filled`
                                : "The GPU is the bottleneck — that is where you want it"
                        }
                    >
                        {ioBound
                            ? `${PRECISION[precision].label} lets the GPU take ${Math.round(gpuRate).toLocaleString()} samples/s but the loader only supplies ${loader.toLocaleString()}. A faster precision will not help now — more loader workers or faster storage will.`
                            : smallBatch
                            ? `Only ${pct(occupancy)} occupancy at this batch size, so SM utilization stays low even though nothing is stalling. Raise the batch size if memory allows.`
                            : `SM utilization is ${pct(smUtil)} with no I/O stall. Try ${
                                  precision === "fp8" ? "lowering the loader throughput" : "switching to a faster precision"
                              } and watch the bottleneck move to the data path.`}
                    </AgentNote>
                </>
            }
        />
    );
}

/* ───────────── 4. Data gravity and egress cost — Module 8, Lesson 3 ───────────── */

const EGRESS_PER_TB = 90; // ≈ $0.09/GB public cloud egress
const ARTIFACT_SHARE = 0.005; // checkpoints and results leaving per run, as a share of the dataset

const PATTERNS = {
    anchor: { label: "Anchor data, migrate compute" },
    replicate: { label: "Replicate once, run anywhere" },
    naive: { label: "Naive cross-cloud mobility" },
} as const;
type Pattern = keyof typeof PATTERNS;

function egressCost(pattern: Pattern, tb: number, runs: number) {
    const artifacts = runs * tb * ARTIFACT_SHARE * EGRESS_PER_TB;
    const dataset = pattern === "anchor" ? 0 : pattern === "replicate" ? tb * EGRESS_PER_TB : runs * tb * EGRESS_PER_TB;
    return { dataset, artifacts, total: dataset + artifacts };
}

function EgressSim() {
    const [tb, setTb] = useState(500);
    const [runs, setRuns] = useState(12);
    const [pattern, setPattern] = useState<Pattern>("naive");

    const r = egressCost(pattern, tb, runs);
    const all = (Object.keys(PATTERNS) as Pattern[]).map((p) => ({ p, ...egressCost(p, tb, runs) }));
    const cheapest = all.reduce((a, c) => (c.total < a.total ? c : a));
    const worst = all.reduce((a, c) => (c.total > a.total ? c : a));
    const RUN_AXIS = Array.from({ length: 50 }, (_, i) => i + 1);
    const yMax = Math.max(...RUN_AXIS.map((n) => egressCost("naive", tb, n).total));
    const tone: Tone = pattern === "anchor" ? "ok" : pattern === "replicate" ? "warn" : "bad";

    return (
        <SimLayout
            controls={
                <>
                    <Slider
                        label="Dataset size"
                        min={10}
                        max={1000}
                        step={10}
                        value={tb}
                        onChange={setTb}
                        display={`${tb} TB`}
                    />
                    <Slider label="Training runs" min={1} max={50} value={runs} onChange={setRuns} display={runs} />
                    <Segmented
                        label="Architecture pattern"
                        value={pattern}
                        onChange={setPattern}
                        options={(Object.keys(PATTERNS) as Pattern[]).map((k) => ({ value: k, label: PATTERNS[k].label }))}
                    />
                </>
            }
            outcome={
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <Stat label="Cumulative egress" value={money(r.total)} tone={tone} />
                        <Stat label="Dataset moves" value={money(r.dataset)} />
                        <Stat label="Artifacts out" value={money(r.artifacts)} />
                    </div>
                    <LineChart
                        caption="Cumulative egress cost by number of training runs"
                        xLabels={RUN_AXIS.map(String)}
                        yMax={yMax}
                        markerIndex={runs - 1}
                        yFormat={money}
                        series={(Object.keys(PATTERNS) as Pattern[]).map((p) => ({
                            label: PATTERNS[p].label,
                            values: RUN_AXIS.map((n) => egressCost(p, tb, n).total),
                            color: p === pattern ? COLORS.gold : p === "naive" ? COLORS.red : p === "replicate" ? COLORS.slate : COLORS.navy,
                            strong: p === pattern,
                            dashed: p !== pattern,
                        }))}
                    />
                    <AgentNote
                        tone={tone}
                        headline={
                            pattern === cheapest.p
                                ? `${money(r.total)} — the cheapest of the three patterns`
                                : `${money(r.total - cheapest.total)} more than ${PATTERNS[cheapest.p].label.toLowerCase()}`
                        }
                    >
                        {pattern === "naive"
                            ? `Every run pulls the full ${tb} TB across clouds, so cost grows with every run — ${money(
                                  tb * EGRESS_PER_TB
                              )} each time. Data has gravity: move the compute to it instead.`
                            : pattern === "replicate"
                            ? `You pay ${money(tb * EGRESS_PER_TB)} once to place a copy, then only small artifacts move. It beats naive mobility from the second run, but you now keep two copies in sync.`
                            : `The dataset never moves; only results and checkpoints leave. Across ${runs} run${runs === 1 ? "" : "s"} that saves ${money(
                                  worst.total - r.total
                              )} against naive mobility. The constraint is having GPU capacity where the data lives.`}
                    </AgentNote>
                </>
            }
        />
    );
}

/* ───────────── 5. Storage architecture bottlenecks — Module 6, Lesson 1 ───────────── */

const PER_WORKER_GBS = 2;
const STORAGE = {
    nas: { label: "Legacy NAS", seq: 25, random: 6 },
    distributed: { label: "Distributed", seq: 400, random: 300 },
} as const;
type Arch = keyof typeof STORAGE;
type Access = "seq" | "random";

/** Delivered throughput bends towards the system ceiling rather than hitting it cleanly. */
function delivered(workers: number, arch: Arch, access: Access) {
    const demand = workers * PER_WORKER_GBS;
    const ceiling = STORAGE[arch][access];
    return { demand, ceiling, actual: (demand * ceiling) / Math.pow(demand ** 4 + ceiling ** 4, 0.25) };
}

function StorageSim() {
    const [workers, setWorkers] = useState(32);
    const [access, setAccess] = useState<Access>("random");
    const [arch, setArch] = useState<Arch>("nas");

    const r = delivered(workers, arch, access);
    const idle = 1 - r.actual / r.demand;
    const AXIS = Array.from({ length: 64 }, (_, i) => i + 1);
    const tone: Tone = idle < 0.1 ? "ok" : idle < 0.4 ? "warn" : "bad";

    return (
        <SimLayout
            controls={
                <>
                    <Slider
                        label="Concurrent workers"
                        min={1}
                        max={64}
                        value={workers}
                        onChange={setWorkers}
                        display={workers}
                    />
                    <Segmented
                        label="I/O access pattern"
                        value={access}
                        onChange={setAccess}
                        options={[
                            { value: "seq", label: "Sequential" },
                            { value: "random", label: "Random" },
                        ]}
                    />
                    <Segmented
                        label="Storage architecture"
                        value={arch}
                        onChange={setArch}
                        options={(Object.keys(STORAGE) as Arch[]).map((k) => ({ value: k, label: STORAGE[k].label }))}
                    />
                    <p className="text-[11px] font-bold text-[#94A3B8] leading-snug">
                        Each worker feeds a GPU that wants {PER_WORKER_GBS} GB/s.
                    </p>
                </>
            }
            outcome={
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <Stat label="Throughput" value={`${r.actual.toFixed(1)} GB/s`} sub={`needed ${r.demand} GB/s`} />
                        <Stat label="GPU idle time" value={pct(idle)} tone={tone} />
                        <Stat label="Scaling vs ideal" value={pct(r.actual / r.demand)} />
                    </div>
                    <LineChart
                        caption="Actual throughput against ideal linear scaling"
                        xLabels={AXIS.map(String)}
                        yMax={64 * PER_WORKER_GBS}
                        markerIndex={workers - 1}
                        yFormat={(v) => `${Math.round(v)}`}
                        series={[
                            { label: "Ideal linear (GB/s)", values: AXIS.map((n) => n * PER_WORKER_GBS), color: COLORS.slate, dashed: true },
                            { label: "Actual (GB/s)", values: AXIS.map((n) => delivered(n, arch, access).actual), color: COLORS.gold, strong: true },
                        ]}
                    />
                    <AgentNote
                        tone={tone}
                        headline={
                            idle < 0.1
                                ? "Storage keeps every GPU fed"
                                : `GPUs sit idle ${pct(idle)} of the time waiting on storage`
                        }
                    >
                        {arch === "nas"
                            ? `A single NAS head tops out near ${STORAGE.nas[access]} GB/s for ${
                                  access === "seq" ? "sequential" : "random"
                              } reads, however many workers ask. ${
                                  access === "random" ? "Random small reads make it worse — the filer runs out of IOPS long before bandwidth." : ""
                              } Switch to a distributed architecture and watch the curve follow the ideal line.`
                            : `Throughput is spread across many storage nodes, so it scales with the workers${
                                  idle < 0.1 ? "" : " until the cluster's own ceiling"
                              }. ${access === "random" ? "Random access costs a little, but nothing like on NAS." : ""}`}
                    </AgentNote>
                </>
            }
        />
    );
}

/* ─────────────────────────────── the deck ─────────────────────────────── */

const SIMULATORS: Record<SlideKey, () => ReactNode> = {
    scaling: () => <ScalingSim />,
    timeslicing: () => <TimeSlicingSim />,
    bottleneck: () => <BottleneckSim />,
    egress: () => <EgressSim />,
    storage: () => <StorageSim />,
};

export default function InteractiveSlides() {
    const [index, setIndex] = useState(0);
    const [resets, setResets] = useState(0);
    const slide = SLIDE_DECK[index];

    return (
        <div>
            {/* what an interactive slide is for */}
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-4 text-[11px] font-800 uppercase tracking-wider text-[#64748B]">
                {SLIDE_LOOP.map((step, i) => (
                    <li key={step} className="inline-flex items-center gap-1.5">
                        {i > 0 && <span className="text-[var(--gold)]">→</span>}
                        <span className={i === SLIDE_LOOP.length - 1 ? "text-[var(--gold-hover)]" : ""}>{step}</span>
                    </li>
                ))}
            </ol>

            <div className="flex items-center gap-1.5 mb-3">
                {SLIDE_DECK.map((s, i) => (
                    <button
                        key={s.key}
                        onClick={() => setIndex(i)}
                        aria-label={`Slide ${i + 1}: ${s.title}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-[#E7E2D8] hover:bg-[var(--gold)]/50"}`}
                    />
                ))}
                <span className="ml-auto text-xs font-800 text-[#64748B]">
                    Slide {index + 1} of {SLIDE_DECK.length}
                </span>
            </div>

            <div className="flex items-start gap-3 mb-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-800 uppercase tracking-widest text-[var(--gold-hover)] mb-0.5">
                        NVIDIA INFRA · {slide.where}
                    </p>
                    <h4 className="text-xl font-900 text-[#0F172A] leading-snug">{slide.title}</h4>
                </div>
                <button
                    onClick={() => setResets((n) => n + 1)}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#E7E2D8] bg-white text-xs font-800 text-[#475569] hover:border-[var(--gold)] cursor-pointer transition-colors shrink-0"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 2v6h6" />
                        <path d="M3.51 15a9 9 0 102.13-9.36L3 8" />
                    </svg>
                    Reset
                </button>
            </div>

            <div className="mb-3" key={`${slide.key}-${resets}`}>
                {SIMULATORS[slide.key]()}
            </div>

            <p className="text-[13px] text-[#64748B] font-semibold mb-4">
                <span className="font-900 text-[#0F172A]">The trade-off it teaches: </span>
                {slide.why}
            </p>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#E7E2D8] text-sm font-800 text-[#475569] bg-white hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => setIndex((i) => (i + 1) % SLIDE_DECK.length)}
                    className="btn-gold flex-1 justify-center py-2.5 text-sm font-800 cursor-pointer"
                >
                    {index === SLIDE_DECK.length - 1 ? "Start again" : "Next slide"}
                </button>
            </div>

            <p className="text-[11px] font-bold text-[#94A3B8] text-center mt-3">
                {SLIDE_DECK.length} of {SLIDE_COURSE.experiences} interactive experiences across the {SLIDE_COURSE.modules} modules of the
                NVIDIA INFRA course.
            </p>
        </div>
    );
}
