/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOTEL ND MANOR — CENTRAL MEDIA LIBRARY
 * ─────────────────────────────────────────────────────────────────────────────
 * Every photograph and video used on the website is referenced from this one
 * file. To replace any temporary stock asset with a genuine ND Manor
 * photograph or video, change the URL here — no other file needs editing.
 *
 * All current assets are licensed stock media from Pexels (free licence).
 * They are TEMPORARY stand-ins and do not depict the actual property.
 * See README.md → "Replacing Images & Videos" for the full guide.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const IMAGES = {
  // Genuine Hotel ND Manor photographs supplied by the hotel team.
  ndLuxuryRooms: `${import.meta.env.BASE_URL}images/nd-manor-room-wide.png`,
  ndIndoorBanquet: `${import.meta.env.BASE_URL}images/nd-manor-banquet.png`,
  ndConferenceMeeting: `${import.meta.env.BASE_URL}images/hotel-real/conference-meeting.png`,
  // — Exterior & arrival —
  exteriorDusk: `${import.meta.env.BASE_URL}images/nd-manor-exterior.png`,
  exteriorNight: `${import.meta.env.BASE_URL}images/nd-manor-exterior-evening.png`,

  // — Lobby & interiors —
  lobbyLounge: `${import.meta.env.BASE_URL}images/nd-manor-interior-wide.png`,
  lobbyFoyer: `${import.meta.env.BASE_URL}images/nd-manor-luxury-interiors.png`,
  lobbyReception:
    "https://images.pexels.com/photos/14036253/pexels-photo-14036253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  corridor:
    "https://images.pexels.com/photos/3923502/pexels-photo-3923502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",

  // — Rooms —
  roomDeluxe:
    "https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  roomSuperDeluxe: `${import.meta.env.BASE_URL}images/nd-manor-guest-room.png`,
  roomRoyal: `${import.meta.env.BASE_URL}images/nd-manor-room-wide.png`,
  roomDetailBeige:
    "https://images.pexels.com/photos/7546281/pexels-photo-7546281.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  roomDetailArt: `${import.meta.env.BASE_URL}images/nd-manor-room-detail.png`,
  roomBedDetail:
    "https://images.pexels.com/photos/2736384/pexels-photo-2736384.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",

  // — Hospitality moments —
  housekeeping:
    "https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  guestArrival:
    "https://images.pexels.com/photos/7820616/pexels-photo-7820616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",

  // — Banquets, weddings & events —
  banquetHall: `${import.meta.env.BASE_URL}images/nd-manor-banquet.png`,
  banquetTables:
    "https://images.pexels.com/photos/4717549/pexels-photo-4717549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  weddingTable: `${import.meta.env.BASE_URL}images/nd-manor-restaurant.png`,
  weddingGold:
    "https://images.pexels.com/photos/34278804/pexels-photo-34278804.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  weddingCouple:
    "https://images.pexels.com/photos/27825196/pexels-photo-27825196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  conferenceRoom:
    "https://images.pexels.com/photos/31107325/pexels-photo-31107325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  eventSetup:
    "https://images.pexels.com/photos/31107445/pexels-photo-31107445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",

  forestResearchInstitute: "https://commons.wikimedia.org/wiki/Special:FilePath/Forest_Research_Institute,_Dehradun,_Uttarakhand.jpg",

  // — Dehradun & the region —
  doonHills:
    "https://images.pexels.com/photos/36096908/pexels-photo-36096908.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  mussoorieMist:
    "https://images.pexels.com/photos/27178287/pexels-photo-27178287.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  rishikeshSunset:
    "https://images.pexels.com/photos/38044214/pexels-photo-38044214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  gangaGhats:
    "https://images.pexels.com/photos/15196909/pexels-photo-15196909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  riverValley:
    "https://images.pexels.com/photos/19041828/pexels-photo-19041828.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  haridwarAerial:
    "https://images.pexels.com/photos/19041829/pexels-photo-19041829.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
} as const;

export const VIDEOS = {
  /** Homepage hero loop — elegant chandelier interior (10s, loops cleanly). */
  hero: {
    src: "https://videos.pexels.com/video-files/34555902/14641685_4096_2160_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/34555902/pexels-photo-34555902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  },

  /** Experiences page video gallery — supplied Hotel ND Manor clips. */
  gallery: [
    {
      id: "arrival",
      title: "Arrival & Welcome",
      description: "A glimpse of the welcome and hospitality at ND Manor.",
      src: "/videos/experiences/arrival-welcome.mp4",
      poster: "/images/hotel-real/luxury-rooms.png",
    },
    {
      id: "premium-stay",
      title: "Premium Stay",
      description: "A look at the rooms and details that shape a comfortable stay.",
      src: "/videos/experiences/premium-stay.mp4",
      poster: "/images/hotel-real/luxury-rooms.png",
    },
    {
      id: "feel-comfortable",
      title: "Feel Comfortable",
      description: "Comfortable interiors and a relaxed hotel experience.",
      src: "/videos/experiences/feel-comfortable.mp4",
      poster: "/images/hotel-real/luxury-rooms.png",
    },
    {
      id: "guest-room-tour-updated",
      title: "Guest Room Tour",
      description: "Step inside a guest room at ND Manor.",
      src: "/videos/experiences/guest-room-tour-updated.mp4",
      poster: "/images/hotel-real/luxury-rooms.png",
    },
    {
      id: "guest-room-tour",
      title: "Room Details",
      description: "A closer look at the room and its interiors.",
      src: "/videos/experiences/guest-room-tour.mp4",
      poster: "/images/hotel-real/luxury-rooms.png",
    },
  ],
} as const;
