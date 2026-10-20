import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import {
  BOOKING_ENGINE_URL,
  CONTACT,
  HOTEL,
  MEAL_PLANS,
  PHONES,
  RATE_DISCLAIMER,
  ROOMS,
  formatINR,
  openWhatsApp,
  roomById,
  WHATSAPP_NUMBERS,
  whatsappLink,
  type MealPlanId,
} from "../data/hotel";
import { cn } from "../utils/cn";

const todayISO = () => {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

interface FormState {
  property: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomId: string;
  mealPlan: MealPlanId;
  name: string;
  phone: string;
  email: string;
}

const initial: FormState = {
  property: `${HOTEL.name}, ${HOTEL.city}`,
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  rooms: 1,
  roomId: "deluxe",
  mealPlan: "EP",
  name: "",
  phone: "",
  email: "",
};

function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(`${checkIn}T00:00:00`);
  const b = new Date(`${checkOut}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function BookingDrawer() {
  const { bookingOpen, closeBooking, bookingRoomId } = useUI();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (bookingOpen) {
      setSummary(null);
      setCopied(false);
      if (bookingRoomId && roomById(bookingRoomId)) {
        setForm((f) => ({ ...f, roomId: bookingRoomId }));
      }
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen, bookingRoomId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    if (bookingOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookingOpen, closeBooking]);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));
  const selected = roomById(form.roomId);
  const plan = MEAL_PLANS.find((p) => p.id === form.mealPlan) ?? MEAL_PLANS[0];
  const nightly = selected?.rates[form.mealPlan];

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
      e.phone = "Please enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Please enter a valid e-mail, or leave it blank.";
    if (!form.checkIn) e.checkIn = "Please choose a check-in date.";
    else if (form.checkIn < todayISO()) e.checkIn = "Check-in cannot be in the past.";
    if (!form.checkOut) e.checkOut = "Please choose a check-out date.";
    else if (form.checkIn && form.checkOut <= form.checkIn)
      e.checkOut = "Check-out must be after check-in.";
    if (form.adults < 1) e.adults = "At least one adult is required.";
    if (form.rooms < 1) e.rooms = "At least one room is required.";
    if (!selected) e.roomId = "Please choose a room category.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const nights = form.checkIn && form.checkOut ? nightsBetween(form.checkIn, form.checkOut) : 0;
    return [
      "Hello Hotel ND Manor,",
      "",
      "I would like to enquire about a stay.",
      "",
      `Guest Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Room Category: ${selected?.name ?? "To be advised"}`,
      `Meal Plan: ${plan.id} — ${plan.label}`,
      `Check-in: ${form.checkIn}`,
      `Check-out: ${form.checkOut}`,
      nights > 0 ? `Nights: ${nights}` : "",
      `Guests: ${form.adults} adult(s)${form.children ? `, ${form.children} child(ren)` : ""}`,
      `Rooms: ${form.rooms}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      nightly ? `Displayed tariff: ${formatINR(nightly)} per room, per night (${plan.id}). This is not a confirmed price.` : "",
      "",
      "Please confirm availability and the final price for my selected dates.",
      "",
      "Thank you.",
    ]
      .filter((line) => line !== "")
      .join("\n");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const sendValidated = (wa: string) => {
    if (!validate()) return;
    if (BOOKING_ENGINE_URL) {
      window.open(BOOKING_ENGINE_URL, "_blank", "noopener,noreferrer");
      return;
    }
    const message = buildMessage();
    setSummary(message);
    openWhatsApp(message, wa);
  };

  const sendTo = (wa: string) => {
    if (!summary) return;
    if (!summary.trim()) return;
    openWhatsApp(summary, wa);
  };

  const copy = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* guest can select the text */
    }
  };

  const fieldClass =
    "w-full border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold";
  const labelClass =
    "mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-stone-warm";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] transition-[visibility] duration-500",
        bookingOpen ? "visible" : "invisible"
      )}
      aria-hidden={!bookingOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] transition-opacity duration-500",
          bookingOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={closeBooking}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a stay enquiry"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-pearl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          bookingOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-7 py-5">
          <div>
            <p className="font-serif text-2xl text-charcoal">Book a Stay</p>
            <p className="mt-0.5 text-xs tracking-[0.2em] uppercase text-stone-warm">
              Enquiry · {HOTEL.city}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeBooking}
            aria-label="Close booking panel"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {!summary ? (
            <form onSubmit={submit} noValidate className="space-y-5">
              <p className="text-xs font-light leading-relaxed text-stone-warm">
                This prepares a booking enquiry for {HOTEL.name}. It does not
                reserve a room or confirm a rate.
              </p>

              <div>
                <label htmlFor="bk-property" className={labelClass}>
                  Hotel / Destination
                </label>
                <select
                  id="bk-property"
                  className={fieldClass}
                  value={form.property}
                  onChange={(e) => set({ property: e.target.value })}
                >
                  <option>{`${HOTEL.name}, ${HOTEL.city}`}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-in" className={labelClass}>Check-in</label>
                  <input
                    id="bk-in"
                    type="date"
                    min={todayISO()}
                    className={fieldClass}
                    value={form.checkIn}
                    onChange={(e) => set({ checkIn: e.target.value })}
                  />
                  {errors.checkIn && <p className="mt-1 text-xs text-red-700">{errors.checkIn}</p>}
                </div>
                <div>
                  <label htmlFor="bk-out" className={labelClass}>Check-out</label>
                  <input
                    id="bk-out"
                    type="date"
                    min={form.checkIn || todayISO()}
                    className={fieldClass}
                    value={form.checkOut}
                    onChange={(e) => set({ checkOut: e.target.value })}
                  />
                  {errors.checkOut && <p className="mt-1 text-xs text-red-700">{errors.checkOut}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {(
                  [
                    ["Adults", "adults", 1, 12],
                    ["Children", "children", 0, 8],
                    ["Rooms", "rooms", 1, 8],
                  ] as const
                ).map(([label, key, min, max]) => (
                  <div key={key}>
                    <label htmlFor={`bk-${key}`} className={labelClass}>{label}</label>
                    <select
                      id={`bk-${key}`}
                      className={fieldClass}
                      value={form[key]}
                      onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<FormState>)}
                    >
                      {Array.from({ length: max - min + 1 }).map((_, i) => (
                        <option key={i} value={min + i}>{min + i}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              {(errors.adults || errors.rooms) && (
                <p className="text-xs text-red-700">{errors.adults ?? errors.rooms}</p>
              )}

              <div>
                <label htmlFor="bk-room" className={labelClass}>Room category</label>
                <select
                  id="bk-room"
                  className={fieldClass}
                  value={form.roomId}
                  onChange={(e) => set({ roomId: e.target.value })}
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className={labelClass}>Meal plan</legend>
                <div className="grid grid-cols-3 gap-2">
                  {MEAL_PLANS.map((p) => (
                    <label
                      key={p.id}
                      className={cn(
                        "cursor-pointer border px-2 py-2.5 text-center transition-colors",
                        form.mealPlan === p.id
                          ? "border-gold bg-charcoal text-ivory"
                          : "border-charcoal/15 bg-white text-charcoal hover:border-gold"
                      )}
                    >
                      <input
                        type="radio"
                        name="meal-plan"
                        value={p.id}
                        checked={form.mealPlan === p.id}
                        onChange={() => set({ mealPlan: p.id })}
                        className="sr-only"
                      />
                      <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">{p.id}</span>
                      <span className="mt-1 block text-[0.62rem] font-light leading-snug opacity-80">{p.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {nightly && (
                <p className="border border-gold/40 bg-champagne/30 px-4 py-3 text-sm text-charcoal">
                  <span className="font-serif text-lg">{formatINR(nightly)}</span>
                  <span className="mt-1 block text-xs font-light leading-relaxed text-charcoal/75">
                    Displayed tariff per room, per night for {selected?.name}, {plan.detail}.{" "}
                    {RATE_DISCLAIMER}
                  </span>
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="bk-name" className={labelClass}>Name *</label>
                  <input
                    id="bk-name"
                    autoComplete="name"
                    className={fieldClass}
                    value={form.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelClass}>Phone *</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                    value={form.phone}
                    onChange={(e) => set({ phone: e.target.value })}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="bk-email" className={labelClass}>E-mail</label>
                  <input
                    id="bk-email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    value={form.email}
                    onChange={(e) => set({ email: e.target.value })}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-3">
                {WHATSAPP_NUMBERS.map((n, i) => (
                  <button
                    key={n.wa}
                    type="button"
                    onClick={() => sendValidated(n.wa)}
                    className="min-h-12 w-full border border-gold bg-charcoal px-5 py-3 text-ivory transition-colors hover:bg-gold hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">
                      Send Enquiry to WhatsApp {i + 1}
                    </span>
                    <span className="mt-1 block text-xs font-light tracking-wide opacity-80">{n.display}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs font-light leading-relaxed text-stone-warm">
                Opening WhatsApp does not reserve a room. Hotel staff confirm availability and the final price.
              </p>
            </form>
          ) : (
            <div className="space-y-5">
              <p className="font-serif text-xl text-charcoal">Review your enquiry</p>
              <p className="text-sm font-light leading-relaxed text-stone-warm">
                Please check the details. Sending this message asks the hotel to
                confirm availability and the final rate. It is not a reservation.
              </p>
              <label htmlFor="bk-message" className={labelClass}>
                Edit your message before sending
              </label>
              <textarea
                id="bk-message"
                rows={12}
                className={`${fieldClass} leading-relaxed`}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <div className="space-y-3">
                {WHATSAPP_NUMBERS.map((n, i) => (
                  <button
                    key={n.wa}
                    type="button"
                    onClick={() => sendTo(n.wa)}
                    className="min-h-12 w-full border border-gold bg-charcoal px-5 py-3 text-ivory transition-colors hover:bg-gold hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em]">
                      Send Enquiry to WhatsApp {i + 1}
                    </span>
                    <span className="mt-1 block text-xs font-light tracking-wide opacity-80">{n.display}</span>
                  </button>
                ))}
              </div>
              <a
                href={summary.trim() ? whatsappLink(summary, WHATSAPP_NUMBERS[0].wa) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs uppercase tracking-[0.16em] text-stone-warm underline-offset-4 hover:underline"
              >
                Open WhatsApp 1 in this tab
              </a>
              <a
                href={`tel:${PHONES[1].tel}`}
                className="block text-center text-xs uppercase tracking-[0.16em] text-stone-warm underline-offset-4 hover:underline"
              >
                Call the second line {PHONES[1].display}
              </a>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="flex-1 border border-charcoal/25 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  {copied ? "Copied" : "Copy enquiry"}
                </button>
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Booking enquiry — ${HOTEL.name}`)}&body=${encodeURIComponent(summary)}`}
                  className="flex-1 border border-charcoal/25 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  Email enquiry
                </a>
              </div>
              <Link
                to="/contact"
                onClick={closeBooking}
                className="block text-center text-xs uppercase tracking-[0.2em] text-stone-warm underline-offset-4 hover:underline"
              >
                Or call the hotel from the contact page
              </Link>
              <button
                type="button"
                onClick={() => setSummary(null)}
                className="text-xs uppercase tracking-[0.2em] text-stone-warm underline-offset-4 hover:underline"
              >
                ← Edit enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
