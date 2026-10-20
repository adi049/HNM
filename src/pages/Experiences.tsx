import { useRef, useState } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { VIDEOS } from "../data/assets";
import { REVIEWS } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui";
import { cn } from "../utils/cn";

type GalleryVideo = (typeof VIDEOS.gallery)[number];

function VideoCard({ video }: { video: GalleryVideo }) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">("idle");
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    setState("loading");
    const el = ref.current;
    if (!el) return;
    el.load();
    el.play()
      .then(() => setState("playing"))
      .catch(() => setState("error"));
  };

  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        {state === "idle" || state === "error" ? (
          <>
            <img
              src={video.poster}
              alt={`${video.title} — video thumbnail`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-charcoal/30 transition-colors duration-500 group-hover:bg-charcoal/15" />
            {state === "error" ? (
              <p className="absolute inset-x-0 bottom-0 bg-charcoal/80 px-4 py-3 text-center text-xs text-ivory/80">
                This video could not be loaded right now — please try again shortly.
              </p>
            ) : null}
            <button
              type="button"
              onClick={play}
              aria-label={`Play video: ${video.title}`}
              className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/70 bg-charcoal/40 text-ivory backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:text-gold">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            </button>
          </>
        ) : null}
        <video
          ref={ref}
          className={cn(
            "h-full w-full object-cover",
            state === "playing" || state === "loading" ? "block" : "hidden"
          )}
          src={video.src}
          poster={video.poster}
          controls={state === "playing"}
          playsInline
          preload="none"
          onError={() => setState("error")}
          onEnded={() => setState("idle")}
        />
        {state === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
            <span className="h-10 w-10 animate-spin rounded-full border border-ivory/30 border-t-gold" aria-label="Loading video" />
          </div>
        )}
      </div>
      <figcaption>
        <h3 className="mt-5 font-serif text-2xl text-charcoal">{video.title}</h3>
        <p className="mt-1.5 text-sm font-light leading-relaxed text-stone-warm">
          {video.description}
        </p>
      </figcaption>
    </figure>
  );
}

function Reviews() {
  const [paused, setPaused] = useState(false);

  if (REVIEWS.length === 0) {
    return (
      <Reveal className="mx-auto max-w-2xl border border-gold/40 bg-pearl px-8 py-10 text-center">
        <p className="font-serif text-2xl text-charcoal">Verified Guest Reviews</p>
        <div className="mx-auto mt-5 h-px w-14 bg-gold" />
        <p className="mt-5 text-sm font-light leading-[1.9] text-stone-warm">
          We showcase only genuine, authorised guest feedback — never
          fabricated testimonials. Verified reviews from the hotel's Google
          Business Profile will appear here once the integration is connected
          (add them in <code className="font-mono text-xs">src/data/hotel.ts → REVIEWS</code>).
        </p>
      </Reveal>
    );
  }

  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <div
      className={cn("overflow-hidden", paused && "marquee-paused")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="marquee-track flex w-max gap-6">
        {doubled.map((r, i) => (
          <blockquote
            key={i}
            tabIndex={0}
            className="w-80 shrink-0 border border-charcoal/10 bg-pearl p-7"
          >
            <p className="text-sm font-light leading-relaxed text-charcoal/85">“{r.text}”</p>
            <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-warm">
              {r.author} · {r.source}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export default function Experiences() {
  usePageMeta(
    "Experiences at Hotel ND Manor, Dehradun",
    "Videos from Hotel ND Manor in Dehradun — room tours, guest comfort and a closer look at the stay experience."
  );

  return (
    <>
      <PageBanner
        image={VIDEOS.gallery[0].poster}
        alt="A guest being welcomed at an elegant hotel reception"
        eyebrow="Experiences"
        title="Films from the Manor"
        intro="Explore the supplied ND Manor videos, including room tours and premium-stay highlights."
      />

      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Video Gallery"
              title="Press Play, Step Inside"
              intro="Videos load only when you choose to play them, keeping the page light and smooth."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.gallery.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 100}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="In Our Guests' Words"
              title="Guest Reviews"
            />
          </Reveal>
          <div className="mt-14">
            <Reviews />
          </div>
        </div>
      </section>
    </>
  );
}
