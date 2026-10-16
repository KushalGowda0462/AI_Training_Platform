/* Shared building blocks for the /home-v2/ landing page.
   Layout follows the DC Tech course page: a 1140px column, "// label"
   eyebrows in mono, and section heads that sit left or centred. */

export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1140px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[17px] md:text-lg font-semibold text-[var(--gold)] mb-3">
      {"// "}
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <header className={`mb-12 max-w-[760px] ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(1.7rem,1.25rem+2.1vw,2.6rem)] font-extrabold tracking-tight leading-[1.1] text-[#0F172A]">
        {title}
      </h2>
      {lede && <p className="mt-4 text-[clamp(1.0625rem,1rem+0.35vw,1.1875rem)] text-[#475569] leading-relaxed">{lede}</p>}
    </header>
  );
}

/* A section band. "alt" is the white band that alternates with cream. */
export function Band({
  id,
  alt = false,
  children,
}: {
  id?: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`border-t border-[#E7E2D8] py-20 md:py-28 ${alt ? "bg-white" : "bg-[#FAFAF8]"}`}>
      <Wrap>{children}</Wrap>
    </section>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-sm md:text-[15px] text-[#475569] bg-white border border-[#E7E2D8] rounded-md px-3 py-1.5">
      {children}
    </span>
  );
}

export function Check() {
  return (
    <span className="mt-0.5 w-5 h-5 rounded-md bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 5L4 7L8 3" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
