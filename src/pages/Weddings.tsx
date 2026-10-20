import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { IMAGES } from "../data/assets";
import { HOTEL, whatsappLink } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { EventEnquiryForm } from "../components/EventEnquiryForm";
import { Eyebrow, GoldDivider, SectionHeading, buttonStyles } from "../components/ui";

const OCCASIONS = [
  {
    title: "Weddings & Receptions",
    image: IMAGES.weddingCouple,
    alt: "Couple in traditional attire at an elegantly decorated ceremony",
    text: "Pheras, receptions and sangeet evenings hosted indoors with grace — décor and flow planned hand-in-hand with your family.",
  },
  {
    title: "The Indoor Banquet Hall",
    image: IMAGES.banquetHall,
    alt: "Grand indoor banquet hall glowing with ornate lighting",
    text: "Our banquet hall is the heart of celebrations at the Manor — an elegant, weather-proof setting dressed to your occasion.",
  },
  {
    title: "Conferences & Gatherings",
    image: IMAGES.conferenceRoom,
    alt: "Neatly arranged conference seating in a bright room",
    text: "Meetings, launches and family functions arranged with the same unhurried attention we give every guest.",
  },
];

export default function Weddings() {
  usePageMeta(
    "Indoor Banquet Hall & Wedding Venue in Dehradun | Hotel ND Manor",
    "Host a wedding, reception or gathering in the indoor banquet hall at Hotel ND Manor, Doon University Road, Mothrowala, Dehradun. Send an event enquiry — capacity is confirmed by the hotel."
  );

  const { hash } = useLocation();
  const [params] = useSearchParams();
  const eventType = params.get("type") ?? undefined;
  useEffect(() => {
    if (hash === "#enquiry") {
      setTimeout(() => {
        document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [hash]);

  return (
    <>
      <PageBanner
        image={IMAGES.banquetTables}
        alt="Luxurious banquet table arrangement with gold accents, seen from above"
        eyebrow="Weddings · Banquets · Events"
        title="Celebrate Your Special Moments"
        intro="A 4,000 sq. ft. indoor banquet hall and a conference hall in Dehradun, with a DJ available on request. Guest capacity is confirmed by the hotel."
      />

      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Occasions We Host"
              title="From Vows to Victories"
              intro="The banquet hall is 4,000 sq. ft., with a conference hall for meetings. A DJ is available on request. Guest numbers, layouts and charges are confirmed during your enquiry."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {OCCASIONS.map((o, i) => (
              <Reveal key={o.title} delay={i * 120}>
                <figure className="group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={o.image}
                      alt={o.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption>
                    <h3 className="mt-5 font-serif text-2xl text-charcoal">{o.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-stone-warm">{o.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-24 bg-ivory py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1fr_1.4fr] md:px-8">
          <Reveal>
            <Eyebrow>Event Enquiry</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-[2.4rem]">
              Tell Us About Your Occasion
            </h2>
            <GoldDivider className="mx-0 mt-6" />
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
              Share a few details and our events team will respond with
              availability, arrangements and a personalised proposal. Prefer to
              talk it through? We're always happy to meet you at the hotel.
            </p>
            <a
              href={whatsappLink(
                `Hello ${HOTEL.name}, I would like to enquire about hosting an event at your banquet hall.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles.outlineDark} mt-8`}
            >
              WhatsApp the events team
            </a>
            <div className="mt-10 hidden aspect-[4/3] overflow-hidden md:block">
              <img
                src={IMAGES.weddingGold}
                alt="Gold candelabra and white floral centrepiece on a celebration table"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-charcoal/10 bg-pearl p-7 md:p-10">
              <EventEnquiryForm initialType={eventType} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
