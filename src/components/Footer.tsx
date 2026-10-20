import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { AGENCY, CONTACT, HOTEL, PHONES, WHATSAPP_NUMBERS, whatsappLink } from "../data/hotel";

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Stay",
    links: [
      { to: "/hotels", label: "Rooms & Suites" },
      { to: "/rooms/deluxe", label: "Deluxe Room" },
      { to: "/rooms/royal", label: "Royal Suite" },
      { to: "/offers", label: "Offers" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { to: "/destinations", label: "Destinations" },
      { to: "/experiences", label: "Experiences" },
      { to: "/weddings", label: "Weddings & Banquets" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Information",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  const waMessage = `Hello, I have an enquiry for ${HOTEL.name}, ${HOTEL.city}.`;

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-ivory/65">
              {HOTEL.name} is an elegant stay in {HOTEL.city},{" "}
              {HOTEL.state} — thoughtfully kept rooms, an indoor banquet hall
              for life's celebrations, and the warm hospitality of the Doon
              Valley.
            </p>
            <div className="mt-6 h-px w-14 bg-gold/60" />
            <address className="mt-6 space-y-2.5 text-sm font-light not-italic text-ivory/70">
              <p>{HOTEL.addressLine}</p>
              {PHONES.map((p) => (
                <p key={p.tel}>
                  <a href={`tel:${p.tel}`} className="hover:text-gold">
                    {p.display}
                  </a>
                </p>
              ))}
              {WHATSAPP_NUMBERS.map((n) => (
                <p key={n.wa}>
                  <a
                    href={whatsappLink(waMessage, n.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {n.label}: {n.display}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href={CONTACT.directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Get Directions →
                </a>
              </p>
            </address>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-gold">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link
                      to={l.to}
                      className="text-sm font-light text-ivory/70 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-7 text-xs font-light tracking-wide text-ivory/45 md:flex md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {HOTEL.name}, {HOTEL.city}. All rights
            reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Photography shown is temporary licensed stock media, pending the
            hotel's own imagery.
          </p>
        </div>
        <p className="mt-6 text-center text-[0.68rem] font-light tracking-[0.14em] text-ivory/40">
          {AGENCY.credit}{" "}
          <a
            href={AGENCY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/80 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {AGENCY.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
