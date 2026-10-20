# Hotel ND Manor — Website

A premium, cinematic, multi-page website for **Hotel ND Manor, Dehradun, Uttarakhand**
built with React, Vite, Tailwind CSS and React Router.

## Pages

- `/` Homepage — logo intro, hero video, offers, carousels, explore, celebrations
- `/destinations` Dehradun & Doon Valley guide, map & facilities
- `/hotels` Rooms & Suites (Deluxe, Super Deluxe, Royal, Family) + facilities
- `/rooms/:id` Room detail pages
- `/experiences` Video gallery + verified-reviews integration point
- `/offers` Offers with inclusions & terms
- `/weddings` Weddings & banquets + event enquiry form
- `/contact` Contact details, map, enquiry form
- `/privacy`, `/terms` Legal pages

Site-wide: scroll-aware header, Book-a-Stay drawer, **ND Assistant** chatbot
(rule-based, powered only by verified data in `src/data/hotel.ts`).

## Setup & deployment

```bash
npm install
npm run dev        # local development
npm run build      # production build → dist/
npm run preview    # preview the production build
```

The build outputs a static site (`dist/`) that can be hosted anywhere
(Netlify, Vercel, shared hosting). Hash-based routing is used, so no server
rewrite rules are required.

## Replacing images & videos (the only two files you need)

1. **`src/data/assets.ts`** — every photograph (`IMAGES`) and video
   (`VIDEOS`) on the site. Replace a URL (or import a local file placed in
   `src/assets/`) and the change applies everywhere automatically.
   All current media is temporary licensed Pexels stock and does **not**
   depict the actual property.
2. **`src/components/Logo.tsx`** — swap the placeholder vector emblem with
   the hotel's official logo artwork when supplied.

## Updating hotel information — `src/data/hotel.ts`

All editable facts live here:

| Field | Purpose |
|---|---|
| `PHONES`, `CONTACT.email`, `HOTEL.addressLine` | Verified contact details. Both numbers are used for click-to-call and WhatsApp. |
| `ROOMS[].rates` | EP / CP / MAP tariffs. Update here only — room cards, the booking drawer and the assistant all read this list. |
| `BOOKING_PLATFORMS` | Direct property URLs. Leave `url` empty and `verified: false` until a listing is confirmed. Never point a card at a generic homepage. |
| `BOOKING_ENGINE_URL` | Optional booking-engine URL. While empty, Book a Stay sends an enquiry and does not confirm a reservation. |
| `INTENDED_ORIGIN` / `DOMAIN_CONNECTED` in `src/data/seo.ts` | Intended site is `https://ndmanor.com`. Canonical tags stay off until `DOMAIN_CONNECTED` is set to true after DNS and HTTPS are working. |
| `AGENCY.url` in `src/data/hotel.ts` | Official Managed by Luna link. Leave empty until the owner supplies it. |
| `BOOKING_PLATFORMS` | Only Booking.com is linked. Other platforms stay visible but unlinked until a direct property URL is confirmed. |
| `OFFERS` | Offer copy, validity, inclusions, price, terms. |
| `REVIEWS` | Add **verified** guest reviews to activate the review strip. Empty = honest integration notice. |

## Integration points (documented in code)

- **Booking engine** — `BOOKING_ENGINE_URL` in `src/data/hotel.ts`; handover in `src/components/BookingDrawer.tsx`.
- **Event / contact forms** — forms validate input and prepare a ready-to-send
  enquiry (WhatsApp / clipboard). No fake "sent" confirmation is shown. To
  connect a backend or e-mail service, POST the composed message from the
  `onSubmit` handlers in `src/components/EventEnquiryForm.tsx` and
  `src/pages/Contact.tsx`.
- **ND Assistant** — rule-based, using only `src/data/hotel.ts`. It is not an
  AI service. If an AI backend is added later, call it from a server and do
  not put API keys in this frontend.
- **SEO** — unique titles and descriptions, Hotel JSON-LD in `index.html`,
  breadcrumb structured data, `public/robots.txt` and `public/sitemap.xml`.
  The production domain is intentionally unset until confirmed.

## Honesty guarantees

- No fabricated prices, reviews, awards, capacities or amenities.
- Unconfirmed details show elegant "on request / to be confirmed" states.
- Temporary stock media is disclosed in the footer and terms page.
