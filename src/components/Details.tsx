"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  venues, wedding, couple, schedule, orderOfService, ministers, dressCode, church,
  gifts, faqs, note, scripture, effects,
} from "@/content";
import { Section, Reveal } from "./Section";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { Corner } from "./Floral";
import { Amp, Flourish, GoldFrame } from "./Ornaments";
import { Illustration, Sparkles } from "./Illustrations";
import { HymnLyrics } from "./HymnLyrics";

const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function Venue() {
  return (
    <Section id="venue" eyebrow="Where" title="The Venue" subtitle={wedding.displayDate} art="church" className="champagne">
      <div className={`grid gap-6 ${venues.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {venues.map((v, i) =>
          v.confirmed ? (
            <Reveal key={v.label} delay={i * 0.1} className="card p-6 text-center">
              <p className="eyebrow">
                {v.label} · {v.time}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-[0.06em] text-purple sm:text-2xl">{v.name}</h3>
              <p className="mt-1 text-sm text-muted">{v.address}</p>
              <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-gold/40">
                <iframe
                  title={`${v.name} map`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(v.mapQuery)}&z=15&output=embed`}
                  className="h-52 w-full border-0"
                  loading="lazy"
                />
              </div>
              <a href={mapsLink(v.mapQuery)} target="_blank" rel="noreferrer" className="btn btn-outline mt-5">
                Open in Maps
              </a>
            </Reveal>
          ) : (
            <Reveal key={v.label} delay={i * 0.1} className="card flex flex-col items-center justify-center p-6 text-center">
              <p className="eyebrow">{v.label}</p>
              <h3 className="mt-2 font-display text-xl text-purple">Details to follow</h3>
              <p className="mt-1 text-sm text-muted">We&rsquo;ll share the {v.label.toLowerCase()} venue here soon.</p>
            </Reveal>
          ),
        )}
      </div>
      <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className="btn btn-primary">
          Google Calendar
        </a>
        <button onClick={downloadIcs} className="btn btn-outline">Apple / Outlook</button>
      </Reveal>
    </Section>
  );
}

// Schedule times are local Accra time (UTC+0) on the wedding day.
function scheduleTime(time: string) {
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  const d = new Date(wedding.date);
  d.setUTCHours(h, Number(m[2]), 0, 0);
  return d.getTime();
}

function useNow(interval = 30000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

export function Schedule() {
  const now = useNow();
  const dayStart = new Date(wedding.date);
  dayStart.setUTCHours(0, 0, 0, 0);
  const dayEnd = new Date(wedding.date);
  dayEnd.setUTCHours(23, 59, 59, 999);
  let current = -1;
  if (now !== null && now >= dayStart.getTime() && now <= dayEnd.getTime()) {
    schedule.forEach((s, i) => {
      const t = scheduleTime(s.time);
      if (t !== null && t <= now) current = i;
    });
  }

  return (
    <Section id="schedule" eyebrow="When" title="Schedule" subtitle="Our celebration, step by step" art="clock">
      <ol className="relative mx-auto max-w-lg pl-10">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[0.6rem] top-2 w-px origin-top bg-gradient-to-b from-gold via-gold-soft to-gold/20"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {schedule.map((s, i) => (
          <Reveal key={s.title} delay={0.2 + i * 0.15} from="left" className="relative mb-10 last:mb-0">
            <span
              className={`absolute -left-[2.15rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-cream ${
                i === current ? "ring-4 ring-gold/30" : ""
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${i === current ? "bg-tomato" : "bg-gold"}`} />
            </span>
            <p className="eyebrow">
              {s.time}
              {i === current && (
                <span className="ml-2 rounded-full bg-purple px-2 py-0.5 text-[0.55rem] tracking-[0.15em] text-white">
                  Happening now
                </span>
              )}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-[0.04em] text-purple">{s.title}</h3>
            <p className="mt-0.5 font-serif text-lg text-muted">{s.note}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function ProgrammeList({ items }: { items: typeof orderOfService }) {
  return (
    <ol>
      {items.map((o, i) => (
        <li key={o.item} className="flex gap-4 border-b border-gold/20 px-5 py-4 last:border-0 sm:px-7">
          <span className="w-8 shrink-0 font-display text-lg text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex-1">
            <p className="font-serif text-xl font-semibold text-purple">{o.item}</p>
            {o.by && <p className="text-sm text-muted">{o.by.join(" · ")}</p>}
            {o.lyrics && <HymnLyrics lyrics={o.lyrics} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Programme() {
  const [open, setOpen] = useState(false);
  const shown = open ? orderOfService : orderOfService.slice(0, 6);
  return (
    <Section
      id="programme"
      eyebrow={church.name}
      title="Order of Service"
      subtitle={`The marriage ceremony of ${couple.groom} & ${couple.bride}`}
      art="book"
      className="champagne"
    >
      {orderOfService.length > 0 ? (
        <>
          <Reveal className="card p-0">
            <ProgrammeList items={shown} />
          </Reveal>
          <div className="mt-6 text-center">
