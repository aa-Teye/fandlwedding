"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  venues, wedding, couple, schedule, orderOfService, ministers, dressCode, church,
  gifts, faqs, note, scripture, effects, vendors,
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
            {orderOfService.length > 6 && (
              <button onClick={() => setOpen(!open)} className="btn btn-outline">
                {open ? "Show less" : `View full programme (${orderOfService.length})`}
              </button>
            )}
            <p className="mt-4">
              <Link href="/programme" className="text-sm text-purple underline decoration-gold/60 underline-offset-4">
                Open the order of service on its own page
              </Link>
            </p>
          </div>
        </>
      ) : (
        <Reveal className="card mx-auto max-w-md p-8 text-center">
          <p className="font-display text-lg text-purple">Coming soon</p>
          <p className="mt-2 font-serif text-lg text-muted">
            The full order of service will be shared here, so you can follow along during the ceremony.
          </p>
        </Reveal>
      )}
    </Section>
  );
}

export function Ministers() {
  if (ministers.length === 0) return null;
  return (
    <Section id="ministers" eyebrow="With gratitude" title="Officiating Ministers" art="rings">
      {ministers.map((g, i) => (
        <Reveal key={g.church} delay={i * 0.1} className={`text-center ${i > 0 ? "mt-10" : ""}`}>
          <p className="eyebrow mb-3">{g.church}</p>
          <div className="space-y-1.5">
            {g.names.map((m) => (
              <p key={m} className="font-serif text-2xl font-semibold text-purple">{m}</p>
            ))}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}

export function DressCode() {
  return (
    <Section id="dress-code" eyebrow="What to wear" title="Dress Code" subtitle={dressCode.title} art="attire" className="champagne">
      <Reveal className="text-center">
        <p className="mx-auto max-w-md font-serif text-xl text-muted">{dressCode.note}</p>
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
        {dressCode.colours.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 + i * 0.15 }}
          >
            <span className="relative block h-20 w-20 sm:h-24 sm:w-24">
              <span className="absolute -inset-1.5 rounded-full border border-gold/60" />
              <span
                className="absolute inset-0 overflow-hidden rounded-full shadow-[0_12px_24px_-10px_rgba(42,10,64,0.6)]"
                style={{ background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 42%), ${c.hex}` }}
              >
                <span className="absolute inset-0 animate-[foil_5s_linear_infinite] bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_45%,transparent_60%)] bg-[length:220%_100%] motion-reduce:animate-none" />
              </span>
            </span>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-purple">{c.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gold/20 py-3 last:border-0">
      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">{label}</p>
        <p className="font-serif text-xl font-semibold text-purple">{value}</p>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded-full border border-gold/60 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-gold-deep hover:bg-gold hover:text-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Vendors() {
  if (vendors.length === 0) return null;
  return (
    <Section id="vendors" eyebrow="With thanks" title="The Wedding Team" art="laurel" className="champagne">
      <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2">
        {vendors.map((v, i) => (
          <Reveal key={v.role} delay={i * 0.08} className="card flex items-center justify-between gap-4 px-6 py-4 text-left">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{v.role}</span>
            <span className="font-serif text-lg font-semibold text-purple">{v.name}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Gifts() {
  // Hidden until the Mobile Money / bank details are added in content.ts.
  if (gifts.accounts.length === 0) return null;
  return (
    <Section id="gifts" eyebrow="Blessings" title="Gifts" subtitle={gifts.intro} art="gift">
      <div className={`grid gap-6 ${gifts.accounts.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-md"}`}>
        {gifts.accounts.map((g, i) => (
          <Reveal key={g.method} delay={i * 0.1} className="card p-6">
            <p className="eyebrow mb-2">{g.method}</p>
            {g.rows.map((r) => (
              <CopyRow key={r.label} {...r} />
            ))}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="Good to know" title="Questions" subtitle="Everything you might want to ask" art="question" className="champagne">
      <div className="mx-auto max-w-xl">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06} className="border-b border-gold/30">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl font-semibold text-purple"
              aria-expanded={open === i}
            >
              {f.q}
              <span className={`text-2xl font-normal text-gold-deep transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pb-5 font-serif text-lg text-muted"
                >
                  {f.a}
                </motion.p>
              )}
            </AnimatePresence>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Note() {
  return (
    <section id="note" className="velvet relative scroll-mt-14 overflow-hidden px-6 py-24 text-center sm:py-28">
      {effects.sparkles && <Sparkles count={16} seed={41} />}
      <Corner pos="tl" className="w-28 opacity-90 sm:w-44" />
      <Corner pos="br" className="w-28 opacity-90 sm:w-44" variant={1} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <Illustration name="quill" dark className="mx-auto mb-4 h-16 w-16" />
        <Reveal>
          <p className="eyebrow !text-gold-soft">From our hearts</p>
          <h2 className="gold-foil mx-auto mt-1 w-fit px-4 pb-2 font-script text-5xl sm:text-6xl">A note from us</h2>
          <Flourish className="mx-auto mt-2 w-48" />
          <p className="mx-auto mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-gold-pale/90">&ldquo;{note.body}&rdquo;</p>
          <p className="gold-foil mx-auto mt-6 w-fit px-3 pb-1 font-script text-4xl">
            <Amp text={note.signoff} className="font-serif text-[0.75em] italic" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ShareButton() {
  const share = async () => {
    const url = `${window.location.origin}/`;
    const text = `You're invited to the wedding of ${couple.groom} & ${couple.bride}: ${wedding.displayDate}, ${wedding.displayTime}, ${venues[0].name}, ${venues[0].address}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${couple.groom} & ${couple.bride}`, text, url });
      } catch {
        /* closed the share sheet */
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank");
    }
  };
  return (
    <button onClick={share} className="btn btn-outline-gold mt-8">
      Share the invitation
    </button>
  );
}

export function Credit({ dark = true }: { dark?: boolean }) {
  const href =
    "https://wa.me/233208216353?text=Hello%20Awonders%2C%20I%20am%20interested%20in%20getting%20a%20website.%20What%20does%20this%20cost%3F";
  const link = `font-medium underline-offset-4 hover:underline ${dark ? "text-gold-soft" : "text-purple"}`;
  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[0.65rem] uppercase tracking-[0.18em] ${
        dark ? "text-gold-pale/60" : "text-muted"
      }`}
    >
      <span>Website developed by</span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 ${link}`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#25D366]" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Awonders</span>
        </a>
        <span>·</span>
        <a href={href} target="_blank" rel="noreferrer" className={link}>
          0208216353
        </a>
      </span>
    </p>
  );
}

export function Footer() {
  return (
    <footer className="velvet relative overflow-hidden px-6 pb-12 pt-20 text-center">
      <GoldFrame dark className="inset-3 sm:inset-5" />
      {effects.sparkles && <Sparkles count={18} seed={57} />}
      <Corner pos="tl" className="w-28 sm:w-44" />
      <Corner pos="tr" className="w-28 sm:w-44" variant={1} />
      <div className="relative z-10">
        <p className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4">
          <span className="gold-foil px-3 pb-1 font-script text-6xl sm:text-7xl">{couple.groom}</span>
          <span className="gold-text font-serif text-3xl italic">&amp;</span>
          <span className="gold-foil px-3 pb-1 font-script text-6xl sm:text-7xl">{couple.bride}</span>
        </p>
        <p className="mt-3 font-display text-xs tracking-[0.3em] text-gold-soft">{wedding.displayDate.toUpperCase()}</p>
        {couple.hashtag && <p className="mt-4 font-serif text-lg italic text-gold-soft">{couple.hashtag}</p>}
        <Flourish className="mx-auto mt-6 w-48" />
        <p className="mt-6 font-serif text-xl italic text-gold-pale/85">&ldquo;{scripture.text}&rdquo;</p>
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-gold-soft">{scripture.ref}</p>
        <ShareButton />
        <div className="mx-auto mt-14 max-w-xl border-t border-gold/20 pt-6">
          <Credit />
        </div>
      </div>
    </footer>
  );
}
