import { IMAGES } from "./assets";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOTEL ND MANOR — EDITABLE HOTEL INFORMATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Verified details supplied by the hotel live here. Tariffs, contact numbers
 * and the map pin are confirmed; validity dates, taxes and booking conditions
 * are not — the site says so rather than inventing them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const HOTEL = {
  name: "Hotel ND Manor",
  shortName: "ND Manor",
  city: "Dehradun",
  state: "Uttarakhand",
  country: "India",
  postalCode: "248121",
  streetAddress: "Doon University Road, Mothrowala",
  tagline: "An elegant stay in the Doon Valley",
  addressLine: "Doon University Road, Mothrowala, Dehradun, Uttarakhand 248121",
} as const;

/** Coordinates taken from the hotel's Google Maps place link. */
export const GEO = {
  latitude: 30.2596878,
  longitude: 78.0360893,
} as const;

export const PHONES = [
  {
    display: "+91 99684 07707",
    tel: "+919968407707",
    wa: "919968407707",
  },
  {
    display: "+91 70789 44451",
    tel: "+917078944451",
    wa: "917078944451",
  },
] as const;

export const CONTACT = {
  /** Primary number, kept for any older references. Prefer `PHONES`. */
  phone: PHONES[0].wa,
  whatsapp: PHONES[0].wa,
  email: "ndmanorhotel@gmail.com",
  instagram: "https://www.instagram.com/hotelndmanordehradun/?hl=en",
  /** Exact place link supplied by the hotel. */
  mapLink:
    "https://www.google.com/maps/place/Hotel+ND+Manor/@30.2596878,78.0360893,17z/",
  /**
   * Get Directions opens the exact Google Maps place link supplied by the hotel.
   */
  directionsLink:
    "https://www.google.com/maps/place/Hotel+ND+Manor/@30.2596878,78.0360893,17z/",
  /** Embed centred on the same coordinates. No API key required. */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=30.2596878,78.0360893&z=17&output=embed",
} as const;

/**
 * INTEGRATION POINT — Booking engine.
 * When a booking-engine URL is available, set it here. While empty, the
 * Book-a-Stay drawer sends a booking enquiry (it does not confirm a reservation).
 */
export const BOOKING_ENGINE_URL = "";

/**
 * Official WhatsApp business lines supplied for enquiries.
 * Call links remain on PHONES. These wa.me IDs have no plus sign or spaces.
 */
export const WHATSAPP_NUMBERS = [
  { label: "WhatsApp 1", display: "+91 7417774451", wa: "917417774451" },
  { label: "WhatsApp 2", display: "+91 7078944451", wa: "917078944451" },
] as const;

/** Default enquiry line. Guests can also send to WHATSAPP_NUMBERS[1]. */
export const WHATSAPP_BOOKING = WHATSAPP_NUMBERS[0];

export function whatsappLink(message: string, wa: string = WHATSAPP_BOOKING.wa): string {
  return `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp from a user click. Falls back to the same tab if a popup is blocked. */
export function openWhatsApp(message: string, wa: string = WHATSAPP_BOOKING.wa): void {
  const url = whatsappLink(message, wa);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/* ───────────────────────── Meal plans & rates ───────────────────────── */

export const MEAL_PLANS = [
  {
    id: "EP",
    name: "EP",
    label: "Room Only",
    detail: "EP: Room Only",
  },
  {
    id: "CP",
    name: "CP",
    label: "Room + Breakfast",
    detail: "CP: Room + Breakfast",
  },
  {
    id: "MAP",
    name: "MAP",
    label: "Room + Breakfast + One Major Meal",
    detail: "MAP: Room + Breakfast + One Major Meal, subject to hotel confirmation",
  },
] as const;

export type MealPlanId = (typeof MEAL_PLANS)[number]["id"];

export const MEAL_PLAN_GUIDE =
  "EP: Room Only. CP: Room + Breakfast. MAP: Room + Breakfast + One Major Meal, subject to hotel confirmation.";

/**
 * Shown wherever tariffs appear. Validity dates, taxes and booking conditions
 * have not been confirmed and are intentionally not stated.
 */
export const RATE_DISCLAIMER =
  "These tariffs are supplied by the hotel. They are not live availability and not a guaranteed final price. Validity dates and booking conditions are yet to be confirmed. Taxes and any additional charges, if applicable, are not shown because they have not been confirmed. The final rate and availability must be confirmed by Hotel ND Manor.";

export type RoomRates = Record<MealPlanId, number>;

/* ───────────────────────────── Rooms ───────────────────────────── */

export interface Room {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  blurb: string;
  description: string;
  /** Only confirmed comforts are listed. */
  amenities: string[];
  idealFor: string;
  /** Stated rooms in this category. A specific room is confirmed by the hotel. */
  count: number;
  rates: RoomRates;
}

export const ROOMS: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    image: IMAGES.roomDeluxe,
    gallery: [IMAGES.roomDeluxe, IMAGES.roomBedDetail, IMAGES.corridor],
    blurb:
      "A calm, thoughtfully appointed room in Dehradun, with crisp linen and warm, restful light.",
    description:
      "The Deluxe Room is a comfortable, well-kept space for restful nights after a day in the Doon Valley. Crisp bedding, soft lighting and attentive housekeeping set the tone for an easy, unhurried stay at Hotel ND Manor, Mothrowala.",
    amenities: [
      "Air conditioning",
      "Complimentary Wi-Fi for staying guests",
      "Tea and coffee maker",
      "Television",
      "Private bathroom with towels and toiletries",
      "Non-smoking",
      "Daily housekeeping",
      "Room service",
    ],
    idealFor: "Couples and solo travellers",
    count: 6,
    rates: { EP: 2500, CP: 3000, MAP: 3500 },
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room with Balcony",
    image: IMAGES.roomSuperDeluxe,
    gallery: [IMAGES.roomSuperDeluxe, IMAGES.roomDetailBeige, IMAGES.roomBedDetail],
    blurb:
      "A more generous room with a balcony, refined furnishings and space to settle in.",
    description:
      "The Super Deluxe Room with Balcony pairs a more generous layout with a private balcony and the same warm, personal service. It suits guests who prefer a little more room to work, relax and unwind during a longer stay in Dehradun.",
    amenities: [
      "Private balcony",
      "Spacious layout",
      "Air conditioning",
      "Daily housekeeping",
      "Attached washroom",
      "Room service",
      "Complimentary Wi-Fi for staying guests",
      "Tea and coffee maker",
      "Television",
      "Non-smoking",
    ],
    idealFor: "Couples and business travellers",
    count: 7,
    rates: { EP: 3000, CP: 3500, MAP: 4000 },
  },
  {
    id: "royal",
    name: "Royal Suite with Bathtub",
    image: IMAGES.roomRoyal,
    gallery: [IMAGES.roomRoyal, IMAGES.roomDetailArt, IMAGES.roomDetailBeige],
    blurb:
      "Our most refined room — a suite with a bathtub, for a truly special stay.",
    description:
      "The Royal Suite with Bathtub is ND Manor's signature category — graceful interiors, a bathtub, and an atmosphere made for celebrations, anniversaries and guests who want the finest room in the house.",
    amenities: [
      "Bathtub",
      "Premium furnishings",
      "Air conditioning",
      "Daily housekeeping",
      "Attached washroom",
      "Room service",
      "Complimentary Wi-Fi for staying guests",
      "Tea and coffee maker",
      "Television",
      "Non-smoking",
    ],
    idealFor: "Special occasions and discerning guests",
    count: 2,
    rates: { EP: 3500, CP: 4000, MAP: 4500 },
  },

];

export function roomById(id: string | undefined): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}

export function lowestRate(): number {
  return Math.min(...ROOMS.map((r) => r.rates.EP));
}

/* Room sizes, views and exact occupancy are not stated — they have not been
   confirmed beyond the balcony and bathtub named in the room titles above. */

/* ───────────────────────── Booking platforms ───────────────────────── */

export interface BookingPlatform {
  id: string;
  name: string;
  /**
   * Direct Hotel ND Manor property URL. Leave empty until a listing is
   * verified — never point this at a generic homepage.
   */
  url: string;
  /** True only when the URL has been matched to this property. */
  verified: boolean;
  /** Opens the on-site booking enquiry instead of an external listing. */
  official?: boolean;
}

/**
 * Direct property pages located for Hotel ND Manor, Doon University Road,
 * Mothrowala, Dehradun. Rates on these platforms are theirs, not ours.
 * Replace any URL here if the hotel supplies a preferred listing link.
 */
export const BOOKING_PLATFORMS: BookingPlatform[] = [
  {
    id: "official",
    name: "Enquire Directly",
    url: "",
    verified: true,
    official: true,
  },
  {
    id: "booking",
    name: "Booking.com",
    url: "https://www.booking.com/hotel/in/nd-manor.html",
    verified: true,
  },
  {
    id: "makemytrip",
    name: "MakeMyTrip",
    url: "https://www.makemytrip.global/hotels/hotel_nd_manor-details-dehradun.html",
    verified: true,
  },
  {
    id: "goibibo",
    name: "Goibibo",
    url: "https://www.goibibo.com/hotels/nd-manor-hotel-in-dehradun-6493958631858536298/",
    verified: true,
  },
  {
    id: "trip",
    name: "Trip.com",
    url: "https://www.trip.com/hotels/dehra-dun-hotel-detail-109947329/nd-manor/",
    verified: true,
  },
  {
    id: "easemytrip",
    name: "EaseMyTrip",
    url: "https://www.easemytrip.com/hotels/hotel-nd-manor-3539155/",
    verified: true,
  },
  {
    id: "yatra",
    name: "Yatra",
    url: "https://www.yatra.com/hotels/hotels-in-dehradun/hotel-nd-manor",
    verified: true,
  },
];

/* ───────────────────────────── Facilities ───────────────────────────── */

export const FACILITIES = [
  {
    title: "18 Rooms, Four Categories",
    text: "15 rooms across Deluxe, Super Deluxe with balcony and Royal Suite categories. A specific room is confirmed by the hotel.",
  },
  {
    title: "4,000 sq. ft. Banquet Hall",
    text: "An indoor banquet hall for weddings and celebrations. Guest capacity is confirmed on enquiry, not published here.",
  },
  {
    title: "Conference Hall",
    text: "A conference hall for meetings and gatherings. Layouts are confirmed with the events team.",
  },
  {
    title: "Restaurant",
    text: "An on-site restaurant serving Indian cuisine, with a family-friendly traditional and modern feel.",
  },
  {
    title: "Complimentary Wi-Fi",
    text: "Wi-Fi for staying guests.",
  },
  {
    title: "Parking & Roads",
    text: "Free on-site private parking and road connectivity. Taxi access is available. Valet parking is offered only if confirmed at the time.",
  },
  {
    title: "24-hour Front Desk",
    text: "The front desk is staffed around the clock.",
  },
  {
    title: "24-hour Travel Desk",
    text: "Travel assistance through the day and night.",
  },
  {
    title: "Housekeeping & Laundry",
    text: "Daily housekeeping. Laundry and ironing are available; additional charges apply.",
  },
  {
    title: "Lift & Garden",
    text: "A lift, plus garden and terrace areas on the property.",
  },
  {
    title: "Room Comforts",
    text: "Air conditioning, private bathrooms, towels, toiletries, television, and a tea and coffee maker. Rooms are non-smoking.",
  },
  {
    title: "Optional Extras",
    text: "DJ on request for events. Bicycle rental, cycling, bike tours and themed dinner nights only when currently offered — these are not included in the room tariff.",
  },
] as const;

export const HIGHLIGHTS = [
  {
    id: "views",
    title: "Rooms with nature views",
    text: "Jungle and Himalayan views where they can be seen from the relevant rooms or parts of the property. Not every room is described as a view room.",
  },
  {
    id: "events",
    title: "Banquet and conference space",
    text: "A 4,000 sq. ft. banquet hall and a conference hall for weddings, celebrations and meetings. A DJ is available on request.",
  },
  {
    id: "comfort",
    title: "Comfortable, practical stays",
    text: "Air-conditioned rooms, private bathrooms, Wi-Fi for staying guests, and an on-site restaurant serving Indian cuisine.",
  },
  {
    id: "access",
    title: "Parking, roads and assistance",
    text: "On-site parking, road connectivity, taxi access, a 24-hour front desk and a 24-hour travel desk.",
  },
] as const;

/**
 * Check-in, check-out and house rules. Leave blank until the owner confirms
 * them. Do not copy ambiguous times from third-party listings.
 */
export const POLICIES = {
  checkIn: "",
  checkOut: "",
  cancellation: "",
  childPolicy: "",
  extraBed: "",
  pets: "",
  smoking: "Guest rooms are non-smoking.",
  publicNote:
    "Please contact the hotel to confirm check-in, check-out, cancellation, children, extra beds and other booking policies.",
} as const;

/** Official agency URL. Leave empty until the owner supplies the exact link. */
export const AGENCY = {
  name: "Managed by Luna",
  credit: "Website crafted and managed by",
  url: "https://adi049.github.io/ManagedByLuna/",
} as const;

export const NEARBY_PLACES = [
  "Shaheed Udham Singh Kamboj Park",
  "Nagendra Saklani Smriti Park",
  "Sarvatra Lake",
  "Dilbagh Singh Park",
  "Dehradun Clock Tower",
  "Rajaji National Park",
  "Dehradun Railway Station",
  "Dehradun Airport",
] as const;

/* ───────────────────────────── Offers ───────────────────────────── */

export interface Offer {
  id: string;
  title: string;
  image: string;
  validity: string;
  description: string;
  inclusions: string[];
  /** Leave empty to show "Price on request". */
  price: string;
  terms: string[];
}

export const OFFERS: Offer[] = [
  {
    id: "stay-enquiry",
    title: "Special Stay Offers",
    image: IMAGES.roomRoyal,
    validity: "Year-round — dates and any package terms are confirmed by the hotel",
    description:
      "Hotel ND Manor welcomes enquiries for room stays and simple stay packages throughout the year. Published room tariffs are listed separately. This is not a discount, and no expiry date or extra inclusion is advertised until the hotel confirms it.",
    inclusions: [
      "A stay in your preferred room category, subject to availability",
      "Meal plan (EP, CP or MAP) chosen at enquiry",
      "Daily housekeeping",
      "Wi-Fi for staying guests",
    ],
    price: "",
    terms: [
      "This is an enquiry, not a confirmed package or discount.",
      "Published room tariffs are separate and are not reduced by this page.",
      "Final rate, inclusions and availability are confirmed by the hotel.",
      "No limited-time offer is published until the hotel supplies one.",
    ],
  },
];

/* ───────────────────────────── Reviews ───────────────────────────── */

/**
 * INTEGRATION POINT — Verified guest reviews.
 * Add authorised guest feedback here. While empty, the Experiences page shows
 * an integration notice instead of fabricated testimonials.
 */
export interface Review {
  author: string;
  source: string;
  text: string;
  rating?: number;
}
export const REVIEWS: Review[] = [];

/* ───────────────────────────── Attractions ───────────────────────────── */

export const ATTRACTIONS = [
  {
    name: "Robber's Cave (Guchhupani)",
    image: IMAGES.riverValley,
    text: "A narrow river cave on Dehradun's outskirts where a cool stream runs between high limestone walls — a favourite easy outing.",
  },
  {
    name: "Sahastradhara",
    image: IMAGES.doonHills,
    text: "The 'thousand-fold spring' — sulphur springs and terraced waterfalls set against the Doon foothills.",
  },
  {
    name: "Forest Research Institute",
    image: IMAGES.forestResearchInstitute,
    text: "Dehradun's grand colonial-era institute, renowned for its Greco-Roman architecture, museums and avenues.",
  },
  {
    name: "Mussoorie",
    image: IMAGES.mussoorieMist,
    text: "The Queen of the Hills rises above the valley — Mall Road strolls, mist-laden viewpoints and colonial charm.",
  },
  {
    name: "Rishikesh",
    image: IMAGES.rishikeshSunset,
    text: "The yoga capital of the world on the banks of the Ganga — ghats, suspension bridges and evening aarti.",
  },
  {
    name: "Haridwar",
    image: IMAGES.haridwarAerial,
    text: "One of India's holiest cities, where the Ganga meets the plains and Har Ki Pauri glows at dusk.",
  },
] as const;

/* Distances and travel times are intentionally not stated; guests are invited
   to ask our team for current routes and timings. */
