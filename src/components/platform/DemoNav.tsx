"use client";

/**
 * Previous / Next for every stepped demo in the Platform section, so the
 * slides, case studies and whiteboard all move the same way: two equal
 * buttons, same height, same labels, same place.
 */
export default function DemoNav({
    onPrev,
    onNext,
    prevDisabled,
    nextDisabled,
    nextLabel = "Next",
    children,
}: {
    onPrev: () => void;
    onNext: () => void;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    nextLabel?: string;
    /** extra controls that sit to the right of the pair, e.g. the voice toggle */
    children?: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-3 flex-1">
                <button
                    onClick={onPrev}
                    disabled={prevDisabled}
                    className="w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-sm font-800 text-[#475569] hover:border-[var(--gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className="btn-gold w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-transparent text-sm font-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    {nextLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
            {children}
        </div>
    );
}
