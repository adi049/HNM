import { cn } from "../utils/cn";

/**
 * ND Manor brand mark.
 * NOTE: This is a placeholder vector identity built for the website.
 * Replace `Emblem` with the hotel's official logo artwork when supplied
 * (drop an SVG/PNG into src/assets and swap it here — used site-wide).
 */

export function Emblem({
  className,
  spinning = false,
}: {
  className?: string;
  spinning?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <g className={cn(spinning && "animate-slow-spin")} style={{ transformOrigin: "50% 50%" }}>
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        {/* Decorative compass ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          const x1 = 50 + Math.cos(a) * 43;
          const y1 = 50 + Math.sin(a) * 43;
          const x2 = 50 + Math.cos(a) * (i % 6 === 0 ? 40.5 : 42);
          const y2 = 50 + Math.sin(a) * (i % 6 === 0 ? 40.5 : 42);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.7"
            />
          );
        })}
      </g>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="30"
        letterSpacing="2"
        fill="currentColor"
      >
        ND
      </text>
    </svg>
  );
}

export function Logo({
  className,
  tone = "light",
  compact = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 select-none",
        tone === "light" ? "text-ivory" : "text-charcoal",
        className
      )}
    >
      <Emblem className={cn("shrink-0 text-gold", compact ? "h-9 w-9" : "h-11 w-11")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif tracking-[0.28em] uppercase",
            compact ? "text-base" : "text-lg md:text-xl"
          )}
        >
          ND&nbsp;Manor
        </span>
        <span className="mt-1 text-[0.58rem] font-sans font-light tracking-[0.42em] uppercase opacity-75">
          Hotel · Dehradun
        </span>
      </span>
    </span>
  );
}
