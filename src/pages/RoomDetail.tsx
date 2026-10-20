import { Link, Navigate, useParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { ROOMS } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { RoomRates } from "../components/RoomRates";
import { buttonStyles } from "../components/ui";

export default function RoomDetail() {
  const { roomId } = useParams();
  const room = ROOMS.find((r) => r.id === roomId);
  const { openBookingFor } = useUI();

  usePageMeta(
    room
      ? `${room.name} in Dehradun | Hotel ND Manor, Mothrowala`
      : "Room — Hotel ND Manor, Dehradun",
    room
      ? `${room.name} at Hotel ND Manor, Doon University Road, Mothrowala, Dehradun. ${room.blurb} Tariffs shown for EP, CP and MAP; final rate confirmed by the hotel.`
      : undefined
  );

  if (!room) return <Navigate to="/hotels" replace />;

  const others = ROOMS.filter((r) => r.id !== room.id);

  return (
    <>
      <PageBanner
        image={room.image}
        alt={`${room.name} — representative photograph`}
        eyebrow="Rooms & Suites"
        title={room.name}
        intro={room.blurb}
      />

      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1.5fr_1fr] md:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl text-charcoal">The Room</h2>
            <div className="mt-5 h-px w-14 bg-gold" />
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-stone-warm">
              {room.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {room.gallery.slice(1).map((src, i) => (
                <div key={src + i} className="aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt={`${room.name} — interior detail ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] hover:scale-[1.05]"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-light text-stone-warm">
              Photographs are representative licensed imagery, pending the hotel's own gallery.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <aside className="border border-charcoal/10 bg-ivory p-8">
              <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-gold-dark">
                At a glance
              </p>
              <ul className="mt-5 space-y-3">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                    <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="my-6 h-px bg-charcoal/10" />
              <p className="text-sm font-light text-stone-warm">Ideal for</p>
              <p className="mt-1 font-serif text-lg text-charcoal">{room.idealFor}</p>
              <div className="mt-4">
                <RoomRates room={room} showDisclaimer />
              </div>
              <button
                type="button"
                onClick={() => openBookingFor(room.id)}
                className={`${buttonStyles.solidDark} mt-7 w-full`}
              >
                Enquire About This Room
              </button>
              <Link to="/contact" className={`${buttonStyles.outlineDark} mt-3 w-full`}>
                Ask a Question
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-center font-serif text-2xl text-charcoal">Other rooms you may like</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {others.map((r) => (
              <Link key={r.id} to={`/rooms/${r.id}`} className="group block focus-visible:outline-2 focus-visible:outline-gold">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.image}
                    alt={`${r.name} — representative photograph`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-4 font-serif text-xl text-charcoal group-hover:text-gold-dark">
                  {r.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
