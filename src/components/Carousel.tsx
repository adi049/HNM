import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", direction === "left" && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Reusable editorial carousel.
 * – Native horizontal scroll with snap points (touch friendly).
 * – Circular arrow controls, keyboard accessible.
 * – Smooth, unhurried transitions.
 */
export function Carousel({
  children,
  label,
  className,
  controlsTone = "dark",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  controlsTone?: "dark" | "light";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.querySelector<HTMLElement>(":scope > *");
    const step = child ? child.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btnClass = cn(
    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    controlsTone === "dark"
      ? "border-charcoal/25 text-charcoal hover:bg-charcoal hover:text-ivory disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-charcoal"
      : "border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ivory"
  );

  return (
    <div className={cn("relative", className)} role="region" aria-label={label}>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollBy(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollBy(-1);
          }
        }}
      >
        {children}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 md:justify-end">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label={`${label} — previous`}
          className={btnClass}
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label={`${label} — next`}
          className={btnClass}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
