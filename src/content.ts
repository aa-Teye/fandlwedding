// ─────────────────────────────────────────────────────────────
//  All wedding details live here. Edit this file to update the site.
//  Items marked  // TODO  are placeholders waiting for real details.
// ─────────────────────────────────────────────────────────────

export const site = {
  // The address the site is published at (used for link previews and QR codes).
  url: "https://fandlwedding.vercel.app", // TODO swap for the custom domain once it's set up
  // Used in file names for downloads, e.g. "Francis-and-Linda-Invitation.jpg".
  slug: "Francis-and-Linda",
  themeColor: "#3b1258",
};

export const couple = {
  // Short names: the monogram, menu, page titles and messages.
  groom: "Francis",
  bride: "Linda",
  // Full names, as printed on the invitation.
  groomFull: { first: "Francis Kormla", last: "Balame" },
  brideFull: { first: "Linda Kutorkor", last: "Neequaye" },
  families: ["Balame", "Neequaye"],
  hashtag: "", // TODO e.g. "#FrancisAndLinda2026" (hidden while empty)
};

// Ghana is UTC+0, so the "Z" times below are local Accra time.
export const wedding = {
  date: "2026-12-19T13:30:00Z", // from the official invitation
  calendarEnd: "2026-12-19T17:00:00Z", // TODO end time
  displayDate: "Saturday, 19th December 2026",
  shortDate: "19 December 2026",
  weekday: "Saturday",
  month: "December",
  day: "19",
  daySuffix: "th",
  year: "2026",
  displayTime: "1:30pm",
  timeNote: "Prompt",
};

export const invitation = {
  // Wording from the official invitation card.
  line1: "Together with their families",
  families: "The families of",
  line2: "joyfully invite you to celebrate the marriage of",
  // From the save the date.
  tagline: "Together in love and in purpose",
  motto: "Two hearts… One journey",
};

export const scripture = { text: "Love is patient, love is kind.", ref: "1 Corinthians 13:4" };

export const photos: {
  couple: Photo | null;
  saveTheDate: Photo | null;
  invitation: Photo | null;
} = {
  // TODO: crop the couple from the save the date once the original file arrives.
  couple: null,
  saveTheDate: null, // TODO add public/save-the-date.jpg
  invitation: null, // TODO add public/invitation.jpg
};

type Photo = { src: string; width: number; height: number; alt: string };

// Put photos in public/gallery/ and list them here. The gallery appears once there is one.
export const gallery: Photo[] = [];

export const venues = [
  {
    label: "Ceremony",
    name: "Overcomers Nation Church",
    address: "Opposite Ayrton Drugs, Tesano, Accra",
    time: "1:30 PM",
    mapQuery: "Overcomers Nation Church, Tesano, Accra",
    confirmed: true,
  },
];

export const schedule = [
  // TODO confirm with the couple
  { time: "1:00 PM", title: "Guest Arrival", note: "Kindly be seated before the ceremony begins." },
  { time: "1:30 PM", title: "Marriage Ceremony", note: "Overcomers Nation Church, Tesano. The service starts promptly." },
  { time: "After the service", title: "Photographs & Celebration", note: "Celebrate the newlyweds and join the photos." },
];

// TODO: from the official wedding programme. The section shows "coming soon" while this is empty.
export const orderOfService: {
  item: string;
  by?: string[];
  lyrics?: { stanza?: number; label?: string; lines: string[] }[];
}[] = [];

export const church = {
  name: "Overcomers Nation Church",
  short: "ONC",
};

// TODO: officiating ministers, grouped by church. Hidden while empty.
export const ministers: { church: string; names: string[] }[] = [];

export const dressCode = {
  title: "Colours of the Day",
  note: "Formal or traditional attire. Our colours are royal purple, tomato red and light green, if you'd like to match.", // TODO confirm wording
  colours: [
    { name: "Royal Purple", hex: "#5B2084" },
    { name: "Tomato Red", hex: "#E0442E" },
    { name: "Light Green", hex: "#B9DC8C" },
  ],
};
