import { usePageMeta } from "../hooks/usePageMeta";
import { Emblem } from "../components/Logo";
import { LinkButton } from "../components/ui";

export default function NotFound() {
  usePageMeta(
    "Page Not Found — Hotel ND Manor, Dehradun",
    "This page is not available. Return to Hotel ND Manor, Dehradun."
  );
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-pearl px-6 pt-24 text-center">
      <Emblem className="h-20 w-20 text-gold" />
      <h1 className="mt-8 font-serif text-4xl text-charcoal">This page has wandered off</h1>
      <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-stone-warm">
        The page you're looking for isn't here — but the Manor certainly is.
        Let us guide you back.
      </p>
      <LinkButton to="/" className="mt-9">
        Return Home
      </LinkButton>
    </section>
  );
}
