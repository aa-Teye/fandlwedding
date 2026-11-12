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
