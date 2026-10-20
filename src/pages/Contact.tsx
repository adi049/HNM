import { useState } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useUI } from "../context/UIContext";
import { IMAGES } from "../data/assets";
import { CONTACT, HOTEL, PHONES, WHATSAPP_NUMBERS, whatsappLink } from "../data/hotel";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { BookingPlatforms } from "../components/BookingPlatforms";
import { PolicyNote } from "../components/PropertySections";
import { Eyebrow, GoldDivider, WhatsAppSend, buttonStyles } from "../components/ui";

interface Fields {
  name: string;
  phone: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [f, setF] = useState<Fields>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [ready, setReady] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Fields> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(f.phone.trim())) er.phone = "Please enter a valid phone number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = "Please enter a valid e-mail, or leave blank.";
    if (f.message.trim().length < 10) er.message = "Please tell us a little more (at least 10 characters).";
    setErrors(er);
    if (Object.keys(er).length) return;
    setReady(
      [
        `Enquiry — ${HOTEL.name}, ${HOTEL.city}`,
        `Name: ${f.name.trim()}`,
        `Phone: ${f.phone.trim()}`,
        f.email && `E-mail: ${f.email.trim()}`,
        `Message: ${f.message.trim()}`,
      ]
        .filter(Boolean)
        .join("\n")
    );
  };

  const field =
    "w-full border border-charcoal/20 bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold";
  const label =
    "mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-stone-warm";

  if (ready) {
    return (
      <div className="space-y-5">
        <p className="font-serif text-2xl text-charcoal">Your message is ready</p>
        <pre className="whitespace-pre-wrap border border-charcoal/15 bg-ivory px-4 py-4 font-sans text-sm leading-relaxed text-charcoal">
          {ready}
        </pre>
        <WhatsAppSend message={ready} />
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry — ${HOTEL.name}`)}&body=${encodeURIComponent(ready)}`}
          className={`${buttonStyles.outlineDark} block w-full`}
        >
          Email {CONTACT.email}
        </a>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(ready);
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            } catch {
              /* ignore */
            }
          }}
          className={`${buttonStyles.outlineDark} w-full`}
        >
          {copied ? "Copied to clipboard" : "Copy message"}
        </button>
        <button
          type="button"
          onClick={() => setReady(null)}
          className="text-xs uppercase tracking-[0.2em] text-stone-warm underline-offset-4 hover:underline"
        >
          ← Edit message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="ct-name" className={label}>Name *</label>
        <input id="ct-name" className={field} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-phone" className={label}>Phone *</label>
          <input id="ct-phone" type="tel" className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="ct-email" className={label}>E-mail (optional)</label>
          <input id="ct-email" type="email" className={field} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="ct-msg" className={label}>Message *</label>
        <textarea id="ct-msg" rows={5} className={field} value={f.message} onChange={(e) => set("message", e.target.value)} />
        {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
      </div>
      <button type="submit" className={`${buttonStyles.solidDark} w-full sm:w-auto sm:px-12`}>
        Prepare Message
      </button>
    </form>
  );
}

export default function Contact() {
  usePageMeta(
    "Contact Hotel ND Manor, Dehradun | Doon University Road, Mothrowala",
    "Contact Hotel ND Manor at Doon University Road, Mothrowala, Dehradun 248121. Call +91 99684 07707 or +91 70789 44451, email ndmanorhotel@gmail.com, or get directions."
  );
  const { openBooking } = useUI();
  const waMessage = `Hello ${HOTEL.name}, I have an enquiry.`;

  return (
    <>
      <PageBanner
        image={IMAGES.lobbyReception}
        alt="Elegant hotel reception area with warm lighting"
        eyebrow="Contact"
        title="We're at Your Service"
        intro="Hotel ND Manor, Doon University Road, Mothrowala — questions, room enquiries and celebrations, answered personally."
      />

      <section className="bg-pearl py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1fr_1.3fr] md:px-8">
          <Reveal>
            <Eyebrow>Reach Us</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-charcoal">
              {HOTEL.name}
            </h2>
            <GoldDivider className="mx-0 mt-6" />
            <ul className="mt-7 space-y-5 text-sm font-light leading-relaxed text-charcoal/85">
              <li>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold-dark">Address</p>
                <p className="mt-1.5">{HOTEL.addressLine}</p>
              </li>
              <li>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold-dark">Phone</p>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {PHONES.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-gold-dark">
                      {p.display}
                    </a>
                  ))}
                  {WHATSAPP_NUMBERS.map((n) => (
                    <a
                      key={n.wa}
                      href={whatsappLink(waMessage, n.wa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.66rem] uppercase tracking-[0.16em] text-gold-dark hover:underline"
                    >
                      {n.label}: {n.display}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold-dark">E-mail</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1.5 inline-block break-all hover:text-gold-dark">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold-dark">Instagram</p>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block hover:text-gold-dark">
                  @hotelndmanordehradun
                </a>
              </li>
            </ul>
            <div className="mt-9 flex flex-col gap-3">
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
              <a
                href={CONTACT.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[0.66rem] uppercase tracking-[0.2em] text-stone-warm underline-offset-4 hover:underline"
              >
                Open the Google Maps location
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-charcoal/10 bg-ivory p-7 md:p-10">
              <h2 className="font-serif text-2xl text-charcoal">Send an Enquiry</h2>
              <p className="mt-2 text-sm font-light text-stone-warm">
                We validate your details and prepare a ready-to-send message for our team.
              </p>
              <div className="mt-5">
                <PolicyNote />
              </div>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingPlatforms />

      <section className="bg-ivory pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="aspect-[16/7] min-h-72 overflow-hidden border border-charcoal/10">
              <iframe
                title="Hotel ND Manor location on Google Maps"
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
