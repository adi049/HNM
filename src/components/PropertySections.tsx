import { Link } from "react-router-dom";
import { HIGHLIGHTS, POLICIES, openWhatsApp } from "../data/hotel";
import { IMAGES } from "../data/assets";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { SectionHeading, buttonStyles } from "./ui";

const HIGHLIGHT_IMAGES: Record<string, { src: string; alt: string }> = {
  views: {
    src: IMAGES.mussoorieMist,
    alt: "Mist over hillside houses — representative landscape, not a guaranteed view from every room",
  },
  events: {
    src: IMAGES.banquetHall,
    alt: "Indoor celebration hall with warm lighting — representative banquet setting",
  },
  comfort: {
    src: IMAGES.roomSuperDeluxe,
    alt: "Hotel bedroom with a dressed bed and soft lighting — representative room photograph",
  },
  access: {
    src: IMAGES.guestArrival,
    alt: "Guest arriving with luggage in a hotel lobby — representative of road and taxi access, not a hotel-owned car",
  },
};

export function HotelHighlights() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Hotel ND Manor"
            title="A Peaceful Stay, Well Connected"
            intro="Comfortable rooms, warm service and space for gatherings, in a green and well-connected part of Dehradun. Views are described only where they can actually be seen."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {HIGHLIGHTS.map((item, i) => {
            const photo = HIGHLIGHT_IMAGES[item.id];
            return (
              <Reveal key={item.id} delay={i * 80}>
                <article className="h-full overflow-hidden border border-charcoal/10 bg-ivory">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-stone-warm">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhatWeOffer() {
  const cards = [
    {
      title: "Rooms & Suites",
      text: "Eighteen rooms across Deluxe, Super Deluxe with balcony, Royal Suite with bathtub and Family categories. Choose EP, CP or MAP when you enquire. Final availability is confirmed by the hotel.",
      to: "/hotels",
      cta: "View Rooms",
      image: `${import.meta.env.BASE_URL}images/nd-manor-room-wide.png`,
      alt: "Hotel ND Manor guest room with a dressed bed and warm wooden flooring",
    },
    {
      title: "Banquets & Events",
      text: "A 4,000 sq. ft. banquet hall and a conference hall for weddings and gatherings. A DJ is available on request. Capacity and arrangements are confirmed with our events team.",
      to: "/weddings?type=Wedding#enquiry",
      cta: "Enquire About Your Event",
      image: `${import.meta.env.BASE_URL}images/nd-manor-banquet.png`,
      alt: "Hotel ND Manor banquet hall prepared for celebrations",
    },
    {
      title: "Restaurant",
      text: "The on-site restaurant serves Indian cuisine in a family-friendly setting with a traditional and modern feel. Ask the hotel about dining times and any event menus.",
      to: "/contact",
      cta: "Restaurant Enquiry",
      image: `${import.meta.env.BASE_URL}images/nd-manor-restaurant.png`,
      alt: "Hotel ND Manor restaurant with green chairs and golden lights",
      whatsapp: "Hello Hotel ND Manor, I would like to enquire about the restaurant.",
    },
  ];

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What We Offer"
            title="Rooms, Gatherings and Dining"
            intro="Three parts of a stay at Hotel ND Manor. Published room tariffs are separate from event and dining enquiries."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-pearl">
                {"image" in card && card.image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={card.image} alt={card.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-forest">0{i + 1}</p>
                  <h3 className="mt-3 font-serif text-3xl text-charcoal">{card.title}</h3>
                  <p className="mt-4 flex-1 text-sm font-light leading-[1.8] text-stone-warm">{card.text}</p>
                  <div className="mt-7 flex flex-col gap-3">
                    {"whatsapp" in card && card.whatsapp ? (
                      <button
                        type="button"
                        onClick={() => openWhatsApp(card.whatsapp as string)}
                        className={cn(buttonStyles.solidDark, "w-full px-4 text-center tracking-[0.12em]")}
                      >
                        Send enquiry on WhatsApp
                      </button>
                    ) : null}
                    <Link
                      to={card.to}
                      className={cn(buttonStyles.outlineDark, "w-full px-4 text-center tracking-[0.12em]")}
                    >
                      {card.cta}
                    </Link>
                    {card.title.startsWith("Banquet") && (
                      <Link
                        to="/weddings?type=Conference%20%2F%20Meeting#enquiry"
                        className="text-center text-[0.66rem] uppercase tracking-[0.16em] text-stone-warm underline-offset-4 hover:text-charcoal hover:underline"
                      >
                        Conference hall enquiry
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PolicyNote() {
  return (
    <aside className="border border-gold/40 bg-champagne/25 px-5 py-4 text-sm font-light leading-relaxed text-charcoal/80">
      <p className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-gold-dark">House rules</p>
      <p className="mt-2">{POLICIES.publicNote}</p>
      {POLICIES.smoking && <p className="mt-2">{POLICIES.smoking}</p>}
    </aside>
  );
}


