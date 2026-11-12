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
