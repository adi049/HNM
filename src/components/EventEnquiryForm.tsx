import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBERS, openWhatsApp, whatsappLink } from "../data/hotel";

/**
 * Event / banquet enquiry form.
 * INTEGRATION POINT: no backend is configured yet, so instead of pretending
 * to "send", the form validates the details and prepares a ready-to-send
 * enquiry (WhatsApp when configured, plus copy-to-clipboard). To connect a
 * real backend or e-mail service, POST `buildMessage()` from `onSubmit`.
 */

const EVENT_TYPES = [
  "Wedding",
  "Reception",
  "Engagement / Roka",
  "Birthday / Anniversary",
  "Conference / Meeting",
  "Other family function",
];

interface Fields {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  notes: string;
}

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  eventType: EVENT_TYPES[0],
  date: "",
  guests: "",
  notes: "",
};

export function EventEnquiryForm({ initialType }: { initialType?: string }) {
  const [f, setF] = useState<Fields>({
    ...empty,
    eventType: initialType && EVENT_TYPES.includes(initialType) ? initialType : empty.eventType,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [ready, setReady] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialType && EVENT_TYPES.includes(initialType)) {
      setF((p) => ({ ...p, eventType: initialType }));
    }
  }, [initialType]);

  const set = (k: keyof Fields, v: string) => setF((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(f.phone.trim()))
      e.phone = "Please enter a valid phone number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email.trim()))
      e.email = "Please enter a valid e-mail, or leave it blank.";
    if (!f.date) e.date = "Please choose a tentative date.";
    const g = Number(f.guests);
    if (!f.guests || Number.isNaN(g) || g < 1)
      e.guests = "Please enter the expected guest count.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () =>
    [
      "Hello Hotel ND Manor,",
      "",
      `I would like to enquire about: ${f.eventType}.`,
      "",
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Email: ${f.email.trim() || "Not provided"}`,
      `Event type: ${f.eventType}`,
      `Event date: ${f.date}`,
      `Expected guests: ${f.guests}`,
      f.notes.trim() ? `Additional requirements: ${f.notes.trim()}` : "",
      "",
      "Please confirm availability and arrangements. This is an enquiry, not a confirmed booking.",
      "",
      "Thank you.",
    ]
      .filter((line) => line !== "")
      .join("\n");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const message = buildMessage();
    setReady(message);
  };

  const sendReady = (wa: string) => {
    if (!validate()) return;
    const message = ready ?? buildMessage();
    setReady(message);
    openWhatsApp(message, wa);
  };

  const copy = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(ready);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const field =
    "w-full border border-charcoal/20 bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold";
  const label =
    "mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-stone-warm";
  const err = "mt-1 text-xs text-red-700";

  if (ready) {
    return (
      <div className="space-y-5">
        <p className="font-serif text-2xl text-charcoal">Your enquiry is ready</p>
        <label htmlFor="ev-ready" className={label}>
          Edit your message before sending again
        </label>
        <textarea
          id="ev-ready"
          rows={10}
          className={field}
          value={ready}
          onChange={(e) => setReady(e.target.value)}
        />
        <p className="text-sm leading-relaxed text-stone-warm">
          WhatsApp should have opened with this enquiry. It does not confirm the event. If it did not open, send again below.
        </p>
        <div className="space-y-3">
          {WHATSAPP_NUMBERS.map((n, i) => (
            <button
              key={n.wa}
              type="button"
              onClick={() => ready.trim() && openWhatsApp(ready, n.wa)}
              className="min-h-12 w-full border border-gold bg-charcoal px-5 py-3 text-ivory transition-colors hover:bg-gold hover:text-charcoal"
            >
              <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">
                Send Enquiry to WhatsApp {i + 1}
              </span>
              <span className="mt-1 block text-xs font-light opacity-80">{n.display}</span>
            </button>
          ))}
        </div>
        <a
          href={whatsappLink(ready, WHATSAPP_NUMBERS[0].wa)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs uppercase tracking-[0.16em] text-stone-warm underline-offset-4 hover:underline"
        >
          Open WhatsApp 1 in this tab
        </a>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={copy}
            className="flex-1 border border-charcoal/25 px-4 py-3 text-xs font-medium uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
          >
            {copied ? "Copied to clipboard" : "Copy enquiry"}
          </button>
          <Link
            to="/contact"
            className="flex-1 border border-charcoal/25 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
          >
            View contact details
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setReady(null)}
          className="text-xs uppercase tracking-[0.2em] text-stone-warm underline-offset-4 hover:underline"
        >
          ← Edit enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ev-name" className={label}>
            Name *
          </label>
          <input id="ev-name" className={field} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
          {errors.name && <p className={err}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ev-phone" className={label}>
            Phone number *
          </label>
          <input id="ev-phone" type="tel" className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className={err}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ev-email" className={label}>
            E-mail (optional)
          </label>
          <input id="ev-email" type="email" className={field} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className={err}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ev-type" className={label}>
            Event type *
          </label>
          <select id="ev-type" className={field} value={f.eventType} onChange={(e) => set("eventType", e.target.value)}>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ev-date" className={label}>
            Tentative event date *
          </label>
          <input
            id="ev-date"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            className={field}
            value={f.date}
            onChange={(e) => set("date", e.target.value)}
          />
          {errors.date && <p className={err}>{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="ev-guests" className={label}>
            Expected guests *
          </label>
          <input
            id="ev-guests"
            type="number"
            min={1}
            className={field}
            value={f.guests}
            onChange={(e) => set("guests", e.target.value)}
          />
          {errors.guests && <p className={err}>{errors.guests}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ev-notes" className={label}>
          Additional requirements
        </label>
        <textarea
          id="ev-notes"
          rows={4}
          className={field}
          value={f.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Décor preferences, catering notes, room blocks…"
        />
      </div>

      <div className="space-y-3">
        {WHATSAPP_NUMBERS.map((n, i) => (
          <button
            key={n.wa}
            type="button"
            onClick={() => sendReady(n.wa)}
            className="min-h-12 w-full border border-gold bg-charcoal px-5 py-3 text-ivory transition-colors hover:bg-gold hover:text-charcoal"
          >
            <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">
              Send Enquiry to WhatsApp {i + 1}
            </span>
            <span className="mt-1 block text-xs font-light opacity-80">{n.display}</span>
          </button>
        ))}
      </div>
      <p className="text-xs font-light leading-relaxed text-stone-warm">
        Opening WhatsApp does not confirm the event. Staff will reply with availability.
      </p>
    </form>
  );
}
