import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { IMAGES, VIDEOS } from "../data/assets";
import { HOTEL, OFFERS, WHATSAPP_BOOKING, whatsappLink } from "../data/hotel";
import { Carousel } from "../components/Carousel";
import { Reveal } from "../components/Reveal";
import { Eyebrow, GoldDivider, LinkButton, SectionHeading, buttonStyles } from "../components/ui";
import { BookingPlatforms } from "../components/BookingPlatforms";
import { HotelHighlights, WhatWeOffer } from "../components/PropertySections";

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const { openBooking } = useUI();
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-end justify-center overflow-hidden bg-charcoal">
      {/* Poster / fallback image always underneath the video */}
      <img
        src={VIDEOS.hero.poster}
        alt="Elegant hotel interior with a glowing chandelier — representative image, not the ND Manor property"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEOS.hero.src}
          poster={VIDEOS.hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-charcoal/70" />

      <div className="relative z-10 mb-[12svh] px-6 text-center text-ivory animate-fade-up">
        <p className="text-[0.66rem] font-light uppercase tracking-[0.5em] text-gold md:text-xs">
          {HOTEL.city} · {HOTEL.state}
        </p>
        <h1 className="mt-5 font-serif text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
          Hotel ND Manor
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed tracking-wide text-ivory/85 md:text-base">
          {HOTEL.tagline} — on Doon University Road, Mothrowala. Gracious rooms,
          an indoor banquet hall, and the quiet charm of Dehradun.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={openBooking} className={buttonStyles.gold}>
            Book a Stay
          </button>
          <Link to="/hotels" className={buttonStyles.outlineLight}>
            Explore Rooms
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/60" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 4v15m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────── Brand recognition ─────────────────── */

function Journey() {
  return (
    <section className="bg-pearl py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="With Gratitude"
            title="Thank You for Being Part of Our Journey"
            intro="Hotel ND Manor offers a refreshing stay in a peaceful, well-connected part of Dehradun. Lush greenery surrounds the property, with jungle and Himalayan views where they can be seen from the relevant rooms or grounds. Comfortable rooms, attentive service and space for gatherings are here for an unhurried visit — and every guest becomes part of that story."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              src: IMAGES.lobbyLounge,
              alt: "Warmly lit hotel lounge with plush seating",
              caption: "Spaces that feel like home",
            },
            {
              src: IMAGES.housekeeping,
              alt: "Hotel team member carefully arranging a guest room",
              caption: "Care in every detail",
            },
            {
              src: IMAGES.roomBedDetail,
              alt: "Crisp white hotel bed linen with a bedside lamp",
              caption: "Rest, beautifully kept",
            },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 120}>
              <figure className="group overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="mt-4 text-center font-serif text-lg text-charcoal">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Latest offers ─────────────────── */

function LatestOffers() {
  const offer = OFFERS[0];
  const offerMessage = `Hello ${HOTEL.name}, I would like to enquire about the "${offer.title}" offer.`;
  const { openBooking } = useUI();

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Special Offers"
            title="Stay Packages"
            intro="Year-round enquiries for a room stay. Published tariffs are listed on the rooms page. Nothing here is a discount until the hotel confirms one."
          />
        </Reveal>

        <Reveal className="mt-14">
          <article className="grid overflow-hidden border border-charcoal/10 bg-pearl md:grid-cols-2">
            <div className="group relative min-h-72 overflow-hidden">
              <img
                src={offer.image}
                alt="Elegant guest room — representative image for stay enquiries"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-8 md:p-12">
              <Eyebrow>{offer.validity}</Eyebrow>
              <h3 className="mt-3 font-serif text-3xl text-charcoal">{offer.title}</h3>
              <p className="mt-4 text-sm font-light leading-[1.9] text-stone-warm">
                {offer.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {offer.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                    <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-gold" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-serif text-xl text-charcoal">
                {offer.price || "Price on request"}
              </p>
              <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row">
                <button type="button" onClick={openBooking} className={buttonStyles.solidDark}>
                  Book Now
                </button>
                <a
                  href={whatsappLink(offerMessage, WHATSAPP_BOOKING.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles.outlineDark}
                >
                  WhatsApp enquiry
                </a>
              </div>
              <p className="mt-6 text-xs font-light leading-relaxed text-stone-warm">
                {offer.terms[0]} <Link to="/offers" className="underline underline-offset-4 hover:text-gold-dark">Full terms →</Link>
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────── Editorial carousel ─────────────────── */

const SHOWCASE = [
  {
    title: "Hotel Exterior",
    text: "First impressions of the Manor — understated, welcoming, distinctly Doon.",
    image: IMAGES.exteriorDusk,
    alt: "Elegant hotel facade glowing at dusk",
    to: "/destinations",
  },
  {
    title: "Luxury Interiors",
    text: "Warm light, considered detail and spaces made for lingering.",
    image: IMAGES.lobbyFoyer,
    alt: "Grand hotel foyer with staircase and chandelier",
    to: "/hotels",
  },
  {
    title: "Guest Rooms",
    text: "Four categories of quiet comfort, kept immaculately every day.",
    image: IMAGES.roomSuperDeluxe,
    alt: "Spacious guest room with tufted headboard and soft lighting",
    to: "/hotels",
  },
  {
    title: "Indoor Banquet Hall",
    text: "An elegant indoor venue for celebrations of every scale.",
    image: IMAGES.banquetHall,
    alt: "Grand indoor banquet hall dressed for a reception",
    to: "/weddings",
  },
  {
    title: "Wedding Celebrations",
    text: "Vows, music and marigold evenings — hosted with heart.",
    image: IMAGES.weddingCouple,
    alt: "Couple in traditional attire at a decorated wedding ceremony",
    to: "/weddings",
  },
  {
    title: "Hotel Experiences",
    text: "Films and moments from life at the Manor.",
    image: IMAGES.lobbyLounge,
    alt: "Hotel lounge with plush seating and ambient lighting",
    to: "/experiences",
  },
];

function Showcase() {
  return (
    <section className="bg-pearl py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Manor in Pictures"
            title="A Glimpse of Life at ND Manor"
            align="left"
          />
        </Reveal>
        <Reveal className="mt-12">
          <Carousel label="Hotel photography">
            {SHOWCASE.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%] focus-visible:outline-2 focus-visible:outline-gold"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-charcoal transition-colors group-hover:text-gold-dark">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-warm">
                  {card.text}
                </p>
                <span className="mt-3 inline-block text-[0.68rem] font-medium uppercase tracking-[0.26em] text-gold-dark">
                  Discover →
                </span>
              </Link>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────── Explore more ─────────────────── */

const EXPLORE = [
  {
    title: "Luxury Rooms",
    text: "Deluxe to Royal — find the room that suits your stay.",
    image: IMAGES.ndLuxuryRooms,
    alt: "Hotel ND Manor luxury guest room with warm lighting and a king bed",
    to: "/hotels",
  },
  {
    title: "Weddings",
    text: "Celebrations hosted with grace in our indoor hall.",
    image: IMAGES.weddingTable,
    alt: "Wedding table setting with gold accents and florals",
    to: "/weddings",
  },
  {
    title: "Indoor Banquet Hall",
    text: "An elegant setting for receptions and functions.",
    image: IMAGES.ndIndoorBanquet,
    alt: "Hotel ND Manor indoor banquet hall with chandeliers and event seating",
    to: "/weddings",
  },
  {
    title: "Conferences & Events",
    text: "A composed venue for meetings and gatherings.",
    image: IMAGES.ndConferenceMeeting,
    alt: "Hotel ND Manor meeting and conference space with lounge seating",
    to: "/weddings",
  },
  {
    title: "Discover Dehradun",
    text: "Caves, springs, hills — the Doon Valley awaits.",
    image: IMAGES.mussoorieMist,
    alt: "Misty hillside houses of Mussoorie above the valley",
    to: "/destinations",
  },
];

function Explore() {
  return (
    <section className="bg-charcoal py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Explore More"
            title="Moments Waiting to Be Made"
            tone="light"
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 110}>
              <Link
                to={card.to}
                className="group relative block aspect-[4/3] overflow-hidden focus-visible:outline-2 focus-visible:outline-gold"
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-2xl">{card.title}</h3>
                  <p className="mt-1.5 text-sm font-light text-ivory/75">{card.text}</p>
                  <span className="mt-3 inline-block border-b border-gold pb-0.5 text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Explore
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Celebrations teaser ─────────────────── */

function Celebrations() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/nd-manor-celebration-exterior.png"
                alt="Hotel ND Manor exterior illuminated with decorative lights for an evening celebration"
                loading="lazy"
                className="h-full w-full object-cover object-[center_42%] md:object-[center_38%]"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-48 border-4 border-pearl md:block lg:w-60">
              <img
                src="/images/nd-manor-celebration-restaurant.png"
                alt="ND Manor restaurant seating with red velvet sofas and warm chandelier lighting"
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Eyebrow>Weddings · Banquets · Events</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-[2.6rem]">
            Celebrate Your Special Moments
          </h2>
          <GoldDivider className="mx-0 mt-6" />
          <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
            From intimate engagements to grand wedding receptions, our indoor
            banquet hall sets a graceful stage for the days you'll remember
            forever. Our events team plans every detail with you — décor,
            flow, and the little touches that make it yours.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LinkButton to="/weddings" variant="solidDark">
              Plan Your Event
            </LinkButton>
            <LinkButton to="/weddings#enquiry" variant="outlineDark">
              Event Enquiry
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────── Page ─────────────────── */

export default function Home() {
  usePageMeta(
    "Hotel in Dehradun | Hotel ND Manor, Doon University Road",
    "Hotel ND Manor on Doon University Road, Mothrowala, Dehradun — rooms for couples and families, a Super Deluxe with balcony, a Royal Suite with bathtub, and an indoor banquet hall for weddings. Enquire to confirm availability."
  );

  return (
    <>
      <Hero />
      <Journey />
      <HotelHighlights />
      <WhatWeOffer />
      <LatestOffers />
      <Showcase />
      <Explore />
      <Celebrations />
      <BookingPlatforms />
    </>
  );
}
