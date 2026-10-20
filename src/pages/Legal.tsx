import { usePageMeta } from "../hooks/usePageMeta";
import { HOTEL } from "../data/hotel";
import { Eyebrow, GoldDivider } from "../components/ui";

function LegalShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-pearl pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl text-charcoal">{title}</h1>
        <GoldDivider className="mx-0 mt-6" />
        <div className="prose-sm mt-10 space-y-8 text-[0.95rem] font-light leading-[1.9] text-charcoal/85">
          {children}
        </div>
      </div>
    </section>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl font-medium text-charcoal">{children}</h2>
);

export function Privacy() {
  usePageMeta(
    "Privacy Policy — Hotel ND Manor, Dehradun",
    "How Hotel ND Manor, Doon University Road, Mothrowala, Dehradun handles enquiry details shared through this website."
  );
  return (
    <LegalShell eyebrow="Information" title="Privacy Policy">
      <div>
        <H>Our commitment</H>
        <p className="mt-3">
          {HOTEL.name}, {HOTEL.city} respects your privacy. This website
          collects only the information you choose to share with us through
          its enquiry forms — such as your name, contact number, e-mail
          address and the details of your stay or event.
        </p>
      </div>
      <div>
        <H>How your information is used</H>
        <p className="mt-3">
          Details you submit are used solely to respond to your enquiry,
          assist with bookings and arrange the services you request. We do not
          sell or trade personal information. Enquiries prepared on this
          website are transmitted only when you choose to send them (for
          example via WhatsApp), so you remain in control of your data.
        </p>
      </div>
      <div>
        <H>Third-party services</H>
        <p className="mt-3">
          This website embeds Google Maps to show the hotel's location and
          loads licensed imagery and video from stock-media providers. These
          services may set their own cookies subject to their respective
          privacy policies.
        </p>
      </div>
      <div>
        <H>Contact</H>
        <p className="mt-3">
          For any privacy-related question, please reach us through the
          Contact page and our team will assist you.
        </p>
      </div>
    </LegalShell>
  );
}

export function Terms() {
  usePageMeta(
    "Terms & Conditions — Hotel ND Manor, Dehradun",
    "Terms for using the Hotel ND Manor website, including bookings, offers and temporary photography."
  );
  return (
    <LegalShell eyebrow="Information" title="Terms & Conditions">
      <div>
        <H>About this website</H>
        <p className="mt-3">
          This website presents information about {HOTEL.name}, {HOTEL.city},{" "}
          {HOTEL.state}. While we keep content current and accurate, room
          tariffs, offers, facilities and availability are confirmed only by
          the hotel's reservations team at the time of booking.
        </p>
      </div>
      <div>
        <H>Bookings & offers</H>
        <p className="mt-3">
          Enquiries made through this website do not constitute a confirmed
          reservation. A booking is confirmed only upon direct communication
          from the hotel. Offers are subject to availability and may be
          amended or withdrawn by the hotel at its discretion.
        </p>
      </div>
      <div>
        <H>Imagery</H>
        <p className="mt-3">
          Certain photographs and videos currently displayed are licensed
          stock media used temporarily while the hotel's own photography is
          prepared. They are illustrative and do not depict the actual
          property unless stated.
        </p>
      </div>
      <div>
        <H>Intellectual property</H>
        <p className="mt-3">
          The ND Manor name and the content of this website may not be
          reproduced without permission. Stock media remains the property of
          its respective creators and is used under licence.
        </p>
      </div>
    </LegalShell>
  );
}
