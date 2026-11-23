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
  // Cropped from the save the date, with the gold text on the right removed.
  couple: { src: "/couple.jpg", width: 400, height: 576, alt: "Francis and Linda" },
  saveTheDate: {
    src: "/save-the-date.jpg",
    width: 853,
    height: 1280,
    alt: "Save the date: Francis Kormla Balame & Linda Kutorkor Neequaye, 19 December 2026, Overcomers Nation Church, Tesano",
  },
  invitation: null, // TODO add public/invitation.jpg (the cream floral card)
};

type Photo = { src: string; width: number; height: number; alt: string };

// Put photos in public/gallery/ and list them here. The gallery appears once there is one.
export const gallery: Photo[] = [
  { src: "/gallery/gallery-1.jpg", width: 771, height: 1080, alt: "Francis & Linda in smock, pre-wedding shoot" },
  { src: "/gallery/gallery-2.jpg", width: 771, height: 1080, alt: "Francis & Linda, pre-wedding shoot" },
  { src: "/gallery/gallery-3.jpg", width: 771, height: 1080, alt: "Francis & Linda, pre-wedding shoot" },
  { src: "/gallery/gallery-4.jpg", width: 1080, height: 771, alt: "Francis & Linda in traditional wear, pre-wedding shoot" },
];

// The couple's vendors, credited on the site.
export const vendors = [
  { role: "Decor", name: "MasterMind Events" },
  { role: "Style A Bride", name: "Regal by Atitirew" },
  { role: "Bridal Accessories", name: "Bjays Bridals" },
  { role: "Groom & Bridal Wardrobe", name: "MiAbi Bridals" },
  { role: "Makeup", name: "Dottys Salon" },
];

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

export const gifts: {
  intro: string;
  accounts: { method: string; rows: { label: string; value: string }[] }[];
} = {
  intro: "Your presence is the greatest gift. Should you wish to bless us further, here are a few ways.",
  accounts: [], // TODO Mobile Money / bank details (the Gifts section is hidden while empty)
};

// RSVP: replies from the form go to the first number on WhatsApp.
export const rsvp = {
  by: "", // TODO e.g. "Kindly respond by 5th December 2026"
  contacts: [
    { name: "", phone: "0246531897" }, // TODO name
    { name: "", phone: "0546024584" }, // TODO name; printed as 546024584 on the card
  ],
};

export const faqs = [
  {
    q: "What time should I arrive?",
    a: "Please arrive by 1:00pm so you're seated before the ceremony begins at 1:30pm prompt.",
  },
  {
    q: "Where is the church?",
    a: "Overcomers Nation Church, opposite Ayrton Drugs, Tesano, Accra. Tap \"Open in Maps\" in the venue section for directions.",
  },
  {
    q: "What should I wear?",
    a: "Formal or traditional attire. Our colours of the day are royal purple, tomato red and light green.",
  },
  {
    q: "Who can I contact for inquiries?",
    a: "Please call or WhatsApp 024 653 1897 or 054 602 4584.",
  },
];

export const note = {
  body: "We are so grateful to God for bringing us together, and for each of you who has loved, prayed for and walked with us. We can't wait to celebrate this day with you.", // TODO from the couple
  signoff: "With love, Francis & Linda",
};

// Paste a YouTube or Facebook Live link here to show the "Watch live" section.
export const livestream = { url: "", platform: "YouTube" }; // TODO

// Put a song at public/music.mp3 and set enabled: true. It starts when a guest opens the gate.
export const music = { enabled: false, src: "/music.mp3" }; // TODO

// The heavy effects. Each can be switched off here. All of them stay off for guests whose
// phone asks for reduced motion.
export const effects = {
  petals: true, // rose petals drifting down the page
  sparkles: true, // twinkling gold dust in the purple sections
};
