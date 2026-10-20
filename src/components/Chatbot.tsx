import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUI } from "../context/UIContext";
import {
  CONTACT,
  FACILITIES,
  HOTEL,
  MEAL_PLAN_GUIDE,
  MEAL_PLANS,
  NEARBY_PLACES,
  OFFERS,
  PHONES,
  WHATSAPP_NUMBERS,
  POLICIES,
  RATE_DISCLAIMER,
  ROOMS,
  formatINR,
  whatsappLink,
} from "../data/hotel";
import { cn } from "../utils/cn";

/**
 * ND Assistant — a rule-based concierge.
 * Replies use only verified data in src/data/hotel.ts. This is not an AI
 * service and does not confirm availability or reservations.
 */

interface ChatLink {
  label: string;
  href: string;
  external?: boolean;
}

interface Msg {
  from: "bot" | "user";
  text: string;
  links?: ChatLink[];
}

const QUICK_ACTIONS = [
  "Book a Room",
  "View Room Rates",
  "EP / CP / MAP Information",
  "Explore Room Categories",
  "Banquet & Wedding Enquiry",
  "Conference Hall Enquiry",
  "Restaurant Information",
  "Hotel Facilities",
  "Check-in / Check-out Information",
  "Get Directions",
  "Call Hotel Line 1",
  "Call Hotel Line 2",
  "WhatsApp Enquiry",
  "Email Hotel",
  "Nearby Attractions",
  "Frequently Asked Questions",
  "Manage My Booking",
] as const;

type Action = (typeof QUICK_ACTIONS)[number];

const phoneLinks = (): ChatLink[] =>
  PHONES.map((p) => ({ label: `Call ${p.display}`, href: `tel:${p.tel}` }));

const whatsappLinks = (message: string): ChatLink[] =>
  WHATSAPP_NUMBERS.map((n) => ({
    label: `${n.label} ${n.display}`,
    href: whatsappLink(message, n.wa),
    external: true,
  }));

function ratesText(): string {
  const lines = ROOMS.map((room) => {
    const plans = MEAL_PLANS.map((p) => `${p.id} ${formatINR(room.rates[p.id])}`).join(" · ");
    return `${room.name}: ${plans}`;
  });
  return [
    "Published tariffs at Hotel ND Manor, per room per night:",
    ...lines,
    "",
    MEAL_PLAN_GUIDE,
    "",
    RATE_DISCLAIMER,
  ].join("\n");
}

function contactText(): string {
  return [
    `${HOTEL.name}`,
    HOTEL.addressLine,
    ...PHONES.map((p) => `Phone: ${p.display}`),
    `E-mail: ${CONTACT.email}`,
    "Use the buttons below to call, WhatsApp, e-mail or open the map.",
  ].join("\n");
}

function answer(q: string): Msg {
  const s = q.toLowerCase();
  const base = (text: string, links?: ChatLink[]): Msg => ({ from: "bot", text, links });

  if (/(meal plan|meal-plan|\bep\b|\bcp\b|\bmap\b|breakfast)/.test(s)) {
    return base(
      `${MEAL_PLAN_GUIDE}\n\nTariffs differ by room. Ask for room rates, or open a booking enquiry and choose EP, CP or MAP.`,
      [{ label: "View rooms", href: "#/hotels" }]
    );
  }
  if (/(price|rate|tariff|cost|charge|how much)/.test(s)) {
    return base(ratesText(), [{ label: "Enquire about a room", href: "#/hotels" }]);
  }
  if (/(room|deluxe|royal|suite|balcony|bathtub|family|stay|accommodat)/.test(s)) {
    return base(
      `We have four categories: ${ROOMS.map((r) => r.name).join("; ")}. ` +
        "I can show the published tariffs, or open a booking enquiry so you can choose a room and meal plan. I cannot confirm availability.",
      [
        { label: "Explore rooms", href: "#/hotels" },
        { label: "Royal Suite", href: "#/rooms/royal" },
      ]
    );
  }
  if (/(wedding|banquet|event|party|function|reception|conference|meeting|dj)/.test(s)) {
    return base(
      "Hotel ND Manor has a 4,000 sq. ft. banquet hall and a conference hall. A DJ is available on request. Guest capacity and charges are confirmed by the events team — they are not published here.",
      [{ label: "Event enquiry", href: "#/weddings" }]
    );
  }
  if (/(check[- ]?in|check[- ]?out|policy|cancel|child|pet|extra bed)/.test(s)) {
    return base(POLICIES.publicNote + (POLICIES.smoking ? `\n\n${POLICIES.smoking}` : ""), phoneLinks());
  }
  if (/(offer|deal|package|discount)/.test(s)) {
    return base(
      `“${OFFERS[0].title}” is an enquiry for a stay at any time of year. It is not a discount. Published room tariffs are separate, and the hotel confirms the final rate.`,
      [{ label: "See stay packages", href: "#/offers" }]
    );
  }
  if (/(where|location|address|direction|map|reach|mothrowala|university road)/.test(s)) {
    return base(`${HOTEL.name} is at ${HOTEL.addressLine}.`, [
      { label: "Get Directions", href: CONTACT.directionsLink, external: true },
      { label: "Google Maps location", href: CONTACT.mapLink, external: true },
    ]);
  }
  if (/(contact|phone|call|email|whatsapp|number)/.test(s)) {
    return base(contactText(), [
      ...phoneLinks(),
      ...whatsappLinks(`Hello ${HOTEL.name}, I have a question.`),
      { label: "Email the hotel", href: `mailto:${CONTACT.email}` },
    ]);
  }
  if (/(restaurant|dining|food|cafe|cuisine)/.test(s)) {
    return base(
      "The hotel has an on-site restaurant serving Indian cuisine, in a family-friendly setting. Dining times and menus are confirmed by the hotel. A third-party listing name is not used here until the owner confirms it.",
      [{ label: "Restaurant enquiry", href: "#/contact" }]
    );
  }
  if (/(facilit|amenit|wifi|parking|laundry|lift|pool|gym|spa)/.test(s)) {
    return base(
      FACILITIES.map((f) => `${f.title}: ${f.text}`).join("\n") +
        "\n\nThere is no published swimming pool, gym or spa. Ask the hotel if you need something that is not listed.",
      [{ label: "Rooms", href: "#/hotels" }]
    );
  }
  if (/(dehradun|mussoorie|rishikesh|haridwar|travel|visit|sightsee)/.test(s)) {
    return base(
      "Dehradun is the setting — Robber's Cave, Sahastradhara and the Forest Research Institute are nearby outings, with Mussoorie, Rishikesh and Haridwar further afield. Distances and travel times are not published here; our team can advise.",
      [{ label: "Destinations", href: "#/destinations" }]
    );
  }
  if (/(cancel|refund|modify|change|manage|policy)/.test(s)) {
    return base(
      "Changes and cancellations are handled personally by the hotel. There is no self-service booking portal on this website. Share your booking reference by phone, WhatsApp or e-mail and the team will assist. Cancellation terms are confirmed at the time of booking — they are not published here.",
      phoneLinks()
    );
  }
  if (/(book|reserv|availab)/.test(s)) {
    return base(
      "I can open a booking enquiry for you. Choosing dates, a room and a meal plan does not reserve the room — Hotel ND Manor confirms availability and the final rate.",
      [{ label: "Rooms & tariffs", href: "#/hotels" }]
    );
  }
  if (/(hello|hi|hey|namaste|good)/.test(s)) {
    return base(
      "Namaste. I can help with room categories, published tariffs, meal plans, the banquet hall, directions and contact details. I only use confirmed hotel information."
    );
  }
  return base(
    "I don't have a verified answer for that, so I won't guess. Please call, WhatsApp or e-mail the hotel — the team will help you directly.",
    [
      ...phoneLinks(),
      { label: "Email the hotel", href: `mailto:${CONTACT.email}` },
      { label: "Contact page", href: "#/contact" },
    ]
  );
}

const FAQ =
  "Here is what I can confirm:\n" +
  "• Address: " + HOTEL.addressLine + "\n" +
  "• Phones: " + PHONES.map((p) => p.display).join(" and ") + "\n" +
  "• WhatsApp: " + WHATSAPP_NUMBERS.map((n) => n.display).join(" and ") + "\n" +
  "• E-mail: " + CONTACT.email + "\n" +
  "• Rooms: " + ROOMS.map((r) => `${r.count} ${r.name}`).join("; ") + "\n" +
  "• " + MEAL_PLAN_GUIDE + "\n" +
  "• Banquet hall: 4,000 sq. ft. Conference hall and DJ on request. Capacity confirmed on enquiry.\n" +
  "• Restaurant: Indian cuisine on site.\n" +
  "• " + POLICIES.publicNote + "\n" +
  "• An enquiry on this website does not confirm a booking.";

export function Chatbot() {
  const { chatOpen, setChatOpen, openBooking } = useUI();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Welcome to Hotel ND Manor. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen, typing]);

  const reply = (userText: string, bot: Msg, then?: () => void) => {
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, bot]);
      then?.();
    }, 400);
  };

  const onQuickAction = (action: Action) => {
    switch (action) {
      case "Book a Room":
        reply(
          action,
          { from: "bot", text: "Opening the booking enquiry. You can choose a room, meal plan and dates. This does not confirm a reservation." },
          () => {
            setChatOpen(false);
            openBooking();
          }
        );
        break;
      case "View Room Rates":
        reply(action, { from: "bot", text: ratesText(), links: [{ label: "Rooms page", href: "#/hotels" }] });
        break;
      case "Explore Room Categories":
        reply(
          action,
          { from: "bot", text: "Taking you to the rooms — Deluxe, Super Deluxe with balcony and Royal Suite with bathtub." },
          () => {
            setChatOpen(false);
            navigate("/hotels");
          }
        );
        break;
      case "EP / CP / MAP Information":
        reply(action, {
          from: "bot",
          text: MEAL_PLAN_GUIDE + "\n\nChoose a plan in the booking enquiry to see the displayed tariff for that room. It is not a confirmed booking.",
        });
        break;
      case "Restaurant Information":
        reply(action, {
          from: "bot",
          text: "The on-site restaurant serves Indian cuisine in a family-friendly setting. Hours and menus are confirmed by the hotel.",
          links: [
            { label: "Contact the hotel", href: "#/contact" },
            ...whatsappLinks(`Hello ${HOTEL.name}, I would like to ask about the restaurant.`),
          ],
        });
        break;
      case "Hotel Facilities":
        reply(action, {
          from: "bot",
          text: FACILITIES.map((f) => `${f.title}: ${f.text}`).join("\n"),
        });
        break;
      case "Check-in / Check-out Information":
        reply(action, {
          from: "bot",
          text: POLICIES.publicNote + (POLICIES.smoking ? `\n\n${POLICIES.smoking}` : ""),
          links: phoneLinks(),
        });
        break;
      case "Call Hotel Line 1":
        reply(action, {
          from: "bot",
          text: `Call ${PHONES[0].display}.`,
          links: [{ label: `Call ${PHONES[0].display}`, href: `tel:${PHONES[0].tel}` }],
        });
        break;
      case "Call Hotel Line 2":
        reply(action, {
          from: "bot",
          text: `Call ${PHONES[1].display}.`,
          links: [{ label: `Call ${PHONES[1].display}`, href: `tel:${PHONES[1].tel}` }],
        });
        break;
      case "Email Hotel":
        reply(action, {
          from: "bot",
          text: `E-mail ${CONTACT.email}.`,
          links: [{ label: `Email ${CONTACT.email}`, href: `mailto:${CONTACT.email}` }],
        });
        break;
      case "Nearby Attractions":
        reply(action, {
          from: "bot",
          text:
            "Places mentioned for the area, without published distances:\n" +
            NEARBY_PLACES.map((p) => `• ${p}`).join("\n") +
            "\n\nAsk the hotel for the current route. Taxi access is available, and the property is road-connected.",
          links: [{ label: "Destinations", href: "#/destinations" }],
        });
        break;
      case "Conference Hall Enquiry":
        reply(
          action,
          { from: "bot", text: "Opening the conference enquiry. Capacity and arrangements are confirmed by the hotel." },
          () => {
            setChatOpen(false);
            navigate("/weddings?type=Conference%20%2F%20Meeting#enquiry");
          }
        );
        break;
      case "Banquet & Wedding Enquiry":
        reply(
          action,
          { from: "bot", text: "Taking you to the event enquiry form. Capacity is confirmed by the hotel, not on this page." },
          () => {
            setChatOpen(false);
            navigate("/weddings#enquiry");
          }
        );
        break;
      case "Get Directions":
        reply(action, {
          from: "bot",
          text: `Hotel ND Manor is at ${HOTEL.addressLine}.`,
          links: [
            { label: "Get Directions", href: CONTACT.directionsLink, external: true },
            { label: "Google Maps location", href: CONTACT.mapLink, external: true },
          ],
        });
        break;
      case "WhatsApp Enquiry":
        reply(action, {
          from: "bot",
          text: "Message the hotel on WhatsApp. This starts a conversation — it does not confirm a booking.",
          links: whatsappLinks(`Hello ${HOTEL.name}, I would like to enquire about a stay.`),
        });
        break;
      case "Frequently Asked Questions":
        reply(action, { from: "bot", text: FAQ });
        break;
      case "Manage My Booking":
        reply(action, {
          from: "bot",
          text: "There is no online booking-management system on this website. Share your booking reference with the hotel and the team will help with changes. A booking is only confirmed when the hotel says so.",
          links: [
            ...phoneLinks(),
            { label: "Email the hotel", href: `mailto:${CONTACT.email}` },
          ],
        });
        break;
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    reply(q, answer(q));
  };

  return (
    <>
      <div
        className="group fixed right-4 z-[80] flex items-center gap-3 md:right-7"
        style={{ bottom: "calc(1.15rem + env(safe-area-inset-bottom))" }}
      >
        <span
          className="pointer-events-none translate-x-2 rounded-sm bg-charcoal px-3 py-1.5 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          ND Assistant
        </span>
        <button
          type="button"
          aria-label="Chat with ND Assistant"
          aria-expanded={chatOpen}
          onClick={() => setChatOpen(!chatOpen)}
          className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gold bg-ivory shadow-[0_8px_24px_rgba(28,26,23,0.28)] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none md:h-16 md:w-16"
        >
          <img
            src="/images/nd-assistant.png"
            alt=""
            className="h-full w-full object-cover object-[center_18%]"
          />
          {chatOpen && (
            <span className="absolute inset-0 flex items-center justify-center bg-charcoal/55 text-ivory">
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </button>
      </div>

      <div
        role="dialog"
        aria-label="ND Assistant chat"
        className={cn(
          "fixed right-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-sm border border-charcoal/10 bg-pearl shadow-2xl transition-all duration-400 md:right-7",
          chatOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{
          height: "min(32rem, calc(100dvh - 8.75rem - env(safe-area-inset-bottom)))",
          bottom: "calc(6.35rem + env(safe-area-inset-bottom))",
        }}
        inert={!chatOpen}
      >
        <div className="flex items-center gap-3 border-b border-gold/30 bg-charcoal px-5 py-4 text-ivory">
          <img
            src="/images/nd-assistant.png"
            alt="ND Assistant, hotel concierge"
            className="h-11 w-11 rounded-full border border-gold/50 object-cover object-[center_18%]"
          />
          <div className="flex-1">
            <p className="font-serif text-lg leading-none">ND Assistant</p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-ivory/60">
              How may I help you?
            </p>
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(false)}
            aria-label="Close chat"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/70 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] whitespace-pre-line rounded-sm px-3.5 py-2.5 text-sm leading-relaxed",
                m.from === "bot"
                  ? "border border-charcoal/8 bg-ivory text-charcoal"
                  : "ml-auto bg-charcoal text-ivory"
              )}
            >
              {m.text}
              {m.links && m.links.length > 0 && (
                <span className="mt-3 flex flex-col gap-2">
                  {m.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="border border-charcoal/20 bg-white px-3 py-2 text-center text-[0.66rem] font-medium uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      {l.label}
                    </a>
                  ))}
                </span>
              )}
            </div>
          ))}
          {typing && (
            <p className="max-w-[85%] border border-charcoal/8 bg-ivory px-3.5 py-2.5 text-xs tracking-[0.2em] text-stone-warm" role="status">
              ND Assistant is replying
            </p>
          )}
        </div>

        <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto border-t border-charcoal/8 px-4 py-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onQuickAction(a)}
              className="border border-charcoal/20 bg-white px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:border-gold hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-gold"
            >
              {a}
            </button>
          ))}
        </div>

        <form onSubmit={send} className="flex items-center gap-2 px-4 py-3">
          <label htmlFor="nd-chat-input" className="sr-only">
            Type your message
          </label>
          <input
            id="nd-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="w-full border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-11 shrink-0 items-center justify-center border border-charcoal bg-charcoal text-ivory transition-colors hover:bg-gold hover:border-gold hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
