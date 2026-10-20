/**
 * SEO configuration.
 *
 * Intended production origin: https://ndmanor.com
 * Set DOMAIN_CONNECTED to true only after the domain is purchased, DNS is
 * pointed here, and HTTPS responds. Until then, canonical tags are omitted
 * so the site does not claim the domain is live.
 *
 * After the domain is connected:
 * 1. Set DOMAIN_CONNECTED to true.
 * 2. Confirm public/sitemap.xml and public/robots.txt use the same origin.
 * 3. Add the Google Search Console verification token in index.html.
 */
export const INTENDED_ORIGIN = "https://ndmanor.com";
export const DOMAIN_CONNECTED = false;
export const SITE_URL = DOMAIN_CONNECTED ? INTENDED_ORIGIN : "";

export interface Crumb {
  name: string;
  path: string;
}

const ROOM_NAMES: Record<string, string> = {
  deluxe: "Deluxe Room",
  "super-deluxe": "Super Deluxe Room with Balcony",
  royal: "Royal Suite with Bathtub",
};

/** Breadcrumb trail for the current hash path, e.g. "/hotels" or "/rooms/deluxe". */
export function crumbsFor(path: string): Crumb[] {
  const clean = path.split("?")[0] || "/";
  const home: Crumb = { name: "Home", path: "/" };
  if (clean === "/" || clean === "") return [home];

  const room = clean.match(/^\/rooms\/([^/]+)$/);
  if (room) {
    return [
      home,
      { name: "Rooms", path: "/hotels" },
      { name: ROOM_NAMES[room[1]] ?? "Room", path: clean },
    ];
  }

  const names: Record<string, string> = {
    "/destinations": "Destinations",
    "/hotels": "Rooms",
    "/experiences": "Experiences",
    "/offers": "Offers",
    "/weddings": "Weddings & Banquets",
    "/contact": "Contact",
    "/privacy": "Privacy Policy",
    "/terms": "Terms & Conditions",
  };

  return [home, { name: names[clean] ?? "Hotel ND Manor", path: clean }];
}

export function absoluteUrl(path: string): string | null {
  if (!SITE_URL) return null;
  const hashPath = path === "/" ? "/" : path;
  return `${SITE_URL}/#${hashPath}`;
}
