import { couple, site, venues, wedding } from "@/content";

const calDate = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${couple.groom} & ${couple.bride}`,
    dates: `${calDate(wedding.date)}/${calDate(wedding.calendarEnd)}`,
    location: `${venues[0].name}, ${venues[0].address}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${couple.groom} and ${couple.bride} Wedding//EN`,
    "BEGIN:VEVENT",
    `UID:${site.slug.toLowerCase()}-wedding-${calDate(wedding.date)}`,
    `DTSTAMP:${calDate(new Date().toISOString())}`,
    `DTSTART:${calDate(wedding.date)}`,
    `DTEND:${calDate(wedding.calendarEnd)}`,
    `SUMMARY:Wedding of ${couple.groom} & ${couple.bride}`,
    `LOCATION:${venues[0].name}\\, ${venues[0].address.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${site.slug}-Wedding.ics` });
  a.click();
  URL.revokeObjectURL(url);
}
