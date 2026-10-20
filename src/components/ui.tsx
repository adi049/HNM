import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { WHATSAPP_NUMBERS, openWhatsApp, whatsappLink } from "../data/hotel";

export function GoldDivider({ className }: { className?: string }) {
  return <div className={cn("mx-auto h-px w-16 bg-gold", className)} aria-hidden="true" />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.68rem] font-medium uppercase tracking-[0.4em] text-gold-dark", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && <Eyebrow className={tone === "light" ? "text-gold" : undefined}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 font-serif text-3xl leading-tight md:text-[2.6rem]",
          tone === "light" ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      <GoldDivider className={cn("mt-6", align === "left" && "mx-0")} />
      {intro && (
        <p
          className={cn(
            "mt-6 text-[0.95rem] font-light leading-[1.9]",
            tone === "light" ? "text-ivory/70" : "text-stone-warm"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

const btnBase =
  "inline-block border px-8 py-3.5 text-center text-[0.7rem] font-medium uppercase tracking-[0.28em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const buttonStyles = {
  solidDark: cn(btnBase, "border-charcoal bg-charcoal text-ivory hover:border-gold hover:bg-gold hover:text-charcoal"),
  outlineDark: cn(btnBase, "border-charcoal/40 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory"),
  outlineLight: cn(btnBase, "border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal"),
  gold: cn(btnBase, "border-gold bg-gold text-charcoal hover:bg-transparent hover:text-gold"),
};

export function WhatsAppChoice({
  message,
  onSend,
}: {
  message: string;
  onSend?: (wa: string) => void;
}) {
  return (
    <div className="space-y-3">
      {WHATSAPP_NUMBERS.map((n, i) => (
        <button
          key={n.wa}
          type="button"
          onClick={() => (onSend ? onSend(n.wa) : message.trim() && openWhatsApp(message, n.wa))}
          className="min-h-12 w-full border border-gold bg-charcoal px-5 py-3 text-ivory transition-colors hover:bg-gold hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold"
        >
          <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">
            Send Enquiry to WhatsApp {i + 1}
          </span>
          <span className="mt-1 block text-xs font-light tracking-wide opacity-80">{n.display}</span>
        </button>
      ))}
    </div>
  );
}

export function WhatsAppSend({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {WHATSAPP_NUMBERS.map((n) => (
        <a
          key={n.wa}
          href={whatsappLink(message, n.wa)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.solidDark} block w-full`}
        >
          {n.label} · {n.display}
        </a>
      ))}
    </div>
  );
}

export function LinkButton({
  to,
  children,
  variant = "solidDark",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(buttonStyles[variant], className)}>
      {children}
    </Link>
  );
}
