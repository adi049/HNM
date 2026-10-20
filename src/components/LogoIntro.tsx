import { useEffect, useState } from "react";
import { Emblem } from "./Logo";
import { cn } from "../utils/cn";

const SESSION_KEY = "ndmanor-intro-seen";

/**
 * Short, tasteful brand introduction shown once per browsing session.
 * Skippable, and skipped entirely for prefers-reduced-motion users.
 */
export function LogoIntro() {
  const [phase, setPhase] = useState<"hidden" | "showing" | "leaving">(() => {
    if (typeof window === "undefined") return "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    return reduced || seen ? "hidden" : "showing";
  });

  useEffect(() => {
    if (phase !== "showing") return;
    const leave = setTimeout(() => setPhase("leaving"), 2600);
    return () => clearTimeout(leave);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    sessionStorage.setItem(SESSION_KEY, "1");
    const hide = setTimeout(() => setPhase("hidden"), 900);
    return () => clearTimeout(hide);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[120] flex flex-col items-center justify-center bg-charcoal transition-opacity duration-[900ms]",
        phase === "leaving" ? "opacity-0" : "opacity-100"
      )}
      role="status"
      aria-label="Hotel ND Manor"
    >
      <div className={cn(
        "text-gold transition-transform duration-[2600ms] ease-out",
        phase === "leaving" ? "scale-[1.18]" : "scale-100"
      )}>
        <Emblem className="h-28 w-28 animate-fade-in md:h-36 md:w-36" />
      </div>
      <p
        className="mt-8 font-serif text-2xl uppercase tracking-[0.4em] text-ivory animate-fade-up md:text-3xl"
        style={{ animationDelay: "0.4s" }}
      >
        ND&nbsp;Manor
      </p>
      <p
        className="mt-3 text-[0.62rem] font-light uppercase tracking-[0.5em] text-ivory/60 animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        Hotel · Dehradun
      </p>
      <button
        type="button"
        onClick={() => setPhase("leaving")}
        className="pointer-events-auto absolute bottom-10 text-[0.64rem] uppercase tracking-[0.3em] text-ivory/50 underline-offset-4 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
      >
        Skip intro
      </button>
    </div>
  );
}
