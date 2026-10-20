import { BOOKING_PLATFORMS } from "../data/hotel";
import { useUI } from "../context/UIContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const COPY: Record<string, string> = {
  booking: "Book your stay on Booking.com",
  makemytrip: "Book your stay on MakeMyTrip",
  goibibo: "Book your stay on Goibibo",
  trip: "Book your stay on Trip.com",
  easemytrip: "Book your stay on EaseMyTrip",
  yatra: "Book your stay on Yatra",
};

function ExternalMark() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookingPlatforms({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { openBooking } = useUI();
  const dark = tone === "dark";
  const listings = BOOKING_PLATFORMS.filter((p) => !p.official);

  return (
    <section className={dark ? "bg-charcoal py-16 text-ivory md:py-24" : "bg-ivory py-16 md:py-24"}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Reservations"
            title="Book Hotel ND Manor on Your Preferred Platform"
            tone={dark ? "light" : "dark"}
            intro="Send a booking enquiry to the hotel, or open a verified property listing. Platform prices are set by that site and may differ from the tariffs published here."
          />
        </Reveal>

        <Reveal className="mt-10">
          <button
            type="button"
            onClick={openBooking}
            className="flex min-h-12 w-full items-center justify-between border border-gold bg-charcoal px-5 py-4 text-left text-ivory transition-colors hover:bg-gold hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span>
              <span className="block font-serif text-2xl">Book directly</span>
              <span className="mt-1 block text-xs font-light tracking-wide opacity-80">
                Send a stay enquiry on WhatsApp — not a confirmed reservation
              </span>
            </span>
            <span className="text-[0.66rem] font-medium uppercase tracking-[0.18em]">Enquire</span>
          </button>

          <ul className="mt-4 divide-y divide-charcoal/10 border border-charcoal/10 bg-pearl">
            {listings.map((platform) => {
              const linked = platform.verified && Boolean(platform.url);
              return (
                <li key={platform.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="min-w-0">
                    <p className="font-serif text-2xl text-charcoal">{platform.name}</p>
                    <p className="mt-1 text-sm font-light text-stone-warm">
                      {linked
                        ? COPY[platform.id] ?? `Book your stay on ${platform.name}`
                        : "A direct Hotel ND Manor listing has not been confirmed for this platform."}
                    </p>
                  </div>
                  {linked ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-charcoal/30 px-4 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      View property
                      <ExternalMark />
                      <span className="sr-only">Opens the external booking website</span>
                    </a>
                  ) : (
                    <span className="text-[0.66rem] font-medium uppercase tracking-[0.14em] text-stone-warm">
                      Listing URL not confirmed
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs font-light leading-relaxed text-stone-warm">
            Verified links open the Hotel ND Manor property page on the selected platform in a new tab.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
