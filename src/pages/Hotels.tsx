import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { IMAGES } from "../data/assets";
import { FACILITIES, MEAL_PLAN_GUIDE, RATE_DISCLAIMER, ROOMS } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { RoomRates } from "../components/RoomRates";
import { BookingPlatforms } from "../components/BookingPlatforms";
import { SectionHeading, buttonStyles } from "../components/ui";
import { PolicyNote } from "../components/PropertySections";
import { cn } from "../utils/cn";

export default function Hotels() {
  usePageMeta(
    "Rooms in Dehradun | Hotel ND Manor, Mothrowala",
    "Rooms at Hotel ND Manor on Doon University Road, Mothrowala, Dehradun — Deluxe, Super Deluxe with balcony and Royal Suite with bathtub. EP, CP and MAP tariffs. Final rate confirmed by the hotel."
  );
  const { openBooking, openBookingFor } = useUI();

  return (
    <>
      <PageBanner
        image={IMAGES.roomSuperDeluxe}
        alt="Elegant hotel guest room with a tufted headboard and soft lighting"
        eyebrow="Hotels · Rooms & Suites"
        title="Rooms Kept with Care"
        intro="Three room categories at Hotel ND Manor, Mothrowala — Deluxe, Super Deluxe with balcony and Royal Suite with bathtub. Each stay is looked after personally."
      />

      {/* Rooms */}
      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto mb-14 max-w-3xl px-5 text-center md:px-8">
          <p className="text-sm font-light leading-[1.9] text-stone-warm">{MEAL_PLAN_GUIDE}</p>
          <p className="mt-3 text-xs font-light leading-relaxed text-stone-warm">{RATE_DISCLAIMER}</p>
          <div className="mt-6 text-left">
            <PolicyNote />
          </div>
        </div>
        <div className="mx-auto max-w-7xl space-y-16 px-5 md:px-8 md:space-y-24">
          {ROOMS.map((room, i) => (
            <Reveal key={room.id}>
              <article
                className={cn(
                  "grid items-center gap-8 md:grid-cols-2 md:gap-14",
                  i % 2 === 1 && "md:[&>*:first-child]:order-2"
                )}
              >
                <Link to={`/rooms/${room.id}`} className="group block overflow-hidden focus-visible:outline-2 focus-visible:outline-gold">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={room.image}
                      alt={`${room.name} at Hotel ND Manor — representative photograph`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                </Link>
                <div>
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.34em] text-gold-dark">
                    {room.idealFor}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal md:text-4xl">{room.name}</h2>
                  <p className="mt-2 text-xs font-light uppercase tracking-[0.16em] text-stone-warm">
                    {room.count} in this category · availability confirmed by the hotel
                  </p>
                  <div className="mt-5 h-px w-14 bg-gold" />
                  <p className="mt-5 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
                    {room.blurb}
                  </p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                        <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <RoomRates room={room} />
                  </div>
                  <p className="mt-3 text-xs font-light text-stone-warm">
                    Final rate and availability confirmed by the hotel.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link to={`/rooms/${room.id}`} className={buttonStyles.outlineDark}>
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => openBookingFor(room.id)}
                      className={buttonStyles.solidDark}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <BookingPlatforms />

      {/* Facilities */}
      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Hotel Facilities"
              title="Everything a Good Stay Needs"
              tone="light"
              intro="A considered set of facilities, confirmed and kept to a high standard. For anything specific, our front desk is always glad to help."
            />
          </Reveal>
          <div className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 100} className="bg-charcoal p-8">
                <p className="font-serif text-xl text-gold">{f.title}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-ivory/70">{f.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <button type="button" onClick={openBooking} className={buttonStyles.gold}>
              Book a Stay
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
