import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { IMAGES } from "../data/assets";
import { ATTRACTIONS, CONTACT, FACILITIES, HOTEL, NEARBY_PLACES } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Carousel } from "../components/Carousel";
import { Reveal } from "../components/Reveal";
import { Eyebrow, GoldDivider, SectionHeading, buttonStyles } from "../components/ui";

const TRAVEL_NOTES = [
  {
    title: "By Air",
    text: "Dehradun is served by Jolly Grant Airport, with regular connections to Delhi and other major cities. Our team can guide you on current transfer options.",
  },
  {
    title: "By Rail",
    text: "Dehradun railway station connects the city to Delhi, Lucknow, Kolkata and beyond, including popular services from the capital.",
  },
  {
    title: "By Road",
    text: "National highways link Dehradun with Delhi, Haridwar, Rishikesh and the hill stations of Garhwal. The drive up the Doon Valley is a pleasure in itself.",
  },
  {
    title: "Best Seasons",
    text: "The valley is lovely in spring and autumn, with crisp winters and a green monsoon. Our team can suggest the right time for your plans.",
  },
];

export default function Destinations() {
  usePageMeta(
    "Hotel near Doon University Road, Dehradun | Hotel ND Manor",
    "Hotel ND Manor is on Doon University Road, Mothrowala, Dehradun. Explore Robber's Cave, Sahastradhara, FRI, Mussoorie, Rishikesh and Haridwar from the hotel, and get directions."
  );
  const { openBooking } = useUI();

  return (
    <>
      <PageBanner
        image={IMAGES.mussoorieMist}
        alt="Mist drifting over the hillside houses of Mussoorie above the Doon Valley"
        eyebrow="Destinations"
        title="Dehradun & the Doon Valley"
        intro="Cradled between the Himalayan foothills and the Shivaliks, Dehradun is a city of leafy avenues, old institutions and easy mountain escapes."
      />

      {/* Introduction */}
      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <Eyebrow>An Elegant Introduction</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-charcoal md:text-[2.6rem]">
              The Gateway to Garhwal
            </h2>
            <GoldDivider className="mt-6" />
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
              The capital of Uttarakhand, Dehradun pairs the ease of a modern
              city with the calm of the hills that surround it. Mornings begin
              with birdsong and mountain light; days unfold across basmati
              country, limestone caves and colonial-era institutions; and by
              evening, the lamps of Mussoorie glitter on the ridge above. Hotel ND Manor
              is road-connected, with taxi access available. Distances are not
              published here — ask the team for the current route.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Attractions carousel */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Nearby Attractions"
              title="Places Worth the Detour"
              align="left"
              intro="For current distances, routes and timings, our front desk will gladly plan the day with you."
            />
          </Reveal>
          <Reveal className="mt-12">
            <Carousel label="Nearby attractions">
              {ATTRACTIONS.map((a) => (
                <figure key={a.name} className="group w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption>
                    <h3 className="mt-5 font-serif text-2xl text-charcoal">{a.name}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-stone-warm">{a.text}</p>
                  </figcaption>
                </figure>
              ))}
            </Carousel>
          </Reveal>
          <Reveal className="mt-12">
            <h3 className="font-serif text-2xl text-charcoal">Also mentioned nearby</h3>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-stone-warm">
              These places appear in local information for the area. Precise distances are not shown, because routing figures vary and have not been verified for this pin.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {NEARBY_PLACES.map((place) => (
                <li key={place} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                  <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-forest" aria-hidden="true" />
                  {place}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Travel notes */}
      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Useful to Know" title="Travelling to Dehradun" tone="light" />
          </Reveal>
          <div className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {TRAVEL_NOTES.map((n, i) => (
              <Reveal key={n.title} delay={i * 90} className="bg-charcoal p-8">
                <p className="font-serif text-xl text-gold">{n.title}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-ivory/70">{n.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location & map */}
      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <Eyebrow>Where You'll Find Us</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-charcoal md:text-[2.6rem]">
              {HOTEL.name}, {HOTEL.city}
            </h2>
            <GoldDivider className="mx-0 mt-6" />
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
              {HOTEL.addressLine}. The map is centred on the hotel's Google Maps
              pin. For current routes and travel times, our team is glad to help.
              Guests looking for{" "}
              <Link to="/hotels" className="underline underline-offset-4 hover:text-gold-dark">
                rooms in Dehradun
              </Link>{" "}
              or an{" "}
              <Link to="/weddings" className="underline underline-offset-4 hover:text-gold-dark">
                indoor banquet hall
              </Link>{" "}
              can enquire directly.
            </p>
            <ul className="mt-8 space-y-3">
              {FACILITIES.slice(0, 4).map((fa) => (
                <li key={fa.title} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                  <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-gold" aria-hidden="true" />
                  <span>
                    <strong className="font-medium">{fa.title}.</strong> {fa.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={openBooking} className={buttonStyles.solidDark}>
                Book a Stay
              </button>
              <a
                href={CONTACT.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.outlineDark}
              >
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="aspect-[4/3] overflow-hidden border border-charcoal/10">
              <iframe
                title="Hotel ND Manor on Google Maps"
                src={CONTACT.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
