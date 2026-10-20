import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { IMAGES } from "../data/assets";
import { HOTEL, OFFERS, WHATSAPP_BOOKING, whatsappLink } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { Eyebrow, buttonStyles } from "../components/ui";

export default function Offers() {
  usePageMeta(
    "Hotel Offers in Dehradun | Hotel ND Manor, Mothrowala",
    "Seasonal offers at Hotel ND Manor, Doon University Road, Dehradun. Published room tariffs are separate. Final rates, dates and availability are confirmed by the hotel."
  );
  const { openBooking } = useUI();

  return (
    <>
      <PageBanner
        image={IMAGES.roomDetailArt}
        alt="Refined hotel bedroom with artwork and soft evening light"
        eyebrow="Offers"
        title="Special Offers"
        intro="Stay packages and room enquiries for any time of year. Published room tariffs are separate. No discount is shown unless the hotel has confirmed one."
      />

      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-16 px-5 md:px-8">
          {OFFERS.map((offer) => {
            const offerMessage = `Hello ${HOTEL.name}, I would like to enquire about the "${offer.title}" offer.`;
            return (
              <Reveal key={offer.id}>
                <article className="overflow-hidden border border-charcoal/10 bg-ivory">
                  <div className="aspect-[21/9] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={`${offer.title} — representative room photograph`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <Eyebrow>{offer.validity}</Eyebrow>
                    <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">
                      {offer.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[0.95rem] font-light leading-[1.9] text-stone-warm">
                      {offer.description}
                    </p>

                    <div className="mt-8 grid gap-10 md:grid-cols-2">
                      <div>
                        <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-gold-dark">
                          Inclusions
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {offer.inclusions.map((inc) => (
                            <li key={inc} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                              <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-gold" aria-hidden="true" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-gold-dark">
                          Terms & Conditions
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {offer.terms.map((t) => (
                            <li key={t} className="flex items-start gap-3 text-sm font-light text-stone-warm">
                              <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-charcoal/30" aria-hidden="true" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-8 font-serif text-2xl text-charcoal">
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
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal>
            <p className="text-center text-sm font-light leading-relaxed text-stone-warm">
              New promotions are added here as the hotel confirms them. Published room tariffs are on the <Link to="/hotels" className="underline underline-offset-4 hover:text-gold-dark">rooms page</Link>. For a tailored quotation, <Link to="/contact" className="underline underline-offset-4 hover:text-gold-dark">write to our team</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
