"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { couple } from "@/content";
import { Corner } from "./Floral";
import { Amp, Flourish } from "./Ornaments";

// Guests can scroll as normal, or turn the pages like a book: swipe left or right (the page follows
// the finger), tap the arrows at the bottom, or press the arrow keys. Each turn moves one screen at a
// time and always stops at the start of a section, so no detail is ever skipped.

type Dir = 1 | -1;
type Plan = { target: number; title: string; sub: string };
type SheetState = { dir: Dir; phase: "in" | "out"; title: string; sub: string; width: number };

const NAV = 56; // the fixed menu bar
const DOCK = 84; // the page controls at the bottom of the screen
const OVERLAP = 32; // keep a sliver of the last screen in view
const EDGE = 94; // degrees: the page waits just past edge-on, out of sight

const PAPER = "radial-gradient(120% 80% at 50% 35%, #fffdf8 0%, #fbf4e6 55%, #efe0c3 100%)";
const GILT = "linear-gradient(180deg, #f7e2a6 0%, #c9a24b 30%, #9c7428 55%, #e9cd7f 80%, #b8892f 100%)";

const TITLES: Record<string, string> = {
  top: `${couple.groom} & ${couple.bride}`,
  countdown: "The Countdown",
  live: "Watch Live",
  invitation: "Our Invitation",
  gallery: "Gallery",
  venue: "The Venue",
  schedule: "Schedule",
  programme: "Order of Service",
  ministers: "Ministers",
  "dress-code": "Dress Code",
  vendors: "Service Providers",
  gifts: "Gifts",
  rsvp: "RSVP",
  faq: "Questions",
  note: "A Note From Us",
};

// Swipes that start on these keep their own behaviour.
const IGNORE = "input, textarea, select, iframe, [data-noflip], .overflow-x-auto";

const sections = () =>
  Array.from(document.querySelectorAll<HTMLElement>("main > header, main > section, main > footer")).filter(
    (el) => el.offsetHeight > 0,
  );

const startOf = (el: HTMLElement) =>
  Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0)));

const titleOf = (el: HTMLElement) =>
  el.tagName === "FOOTER" ? "With Love" : (TITLES[el.id] ?? el.querySelector("h2, h1")?.textContent?.trim() ?? "");

function indexAt(starts: number[], y: number) {
  let i = 0;
  starts.forEach((s, n) => {
    if (s <= y + 8) i = n;
  });
  return i;
}

/** Where the next turn lands: one screen on, but never past the start of the next section. */
function plan(dir: Dir): Plan | null {
  const list = sections();
  if (!list.length) return null;
  const starts = list.map(startOf);
  const y = Math.round(window.scrollY);
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const step = Math.max(260, window.innerHeight - NAV - DOCK - OVERLAP);
  let target: number;
  if (dir === 1) {
    if (y >= max - 2) return null;
    const next = starts.find((s) => s > y + 8);
    target = next !== undefined && next <= y + step ? next : y + step;
  } else {
    if (y <= 2) return null;
    const prev = [...starts].reverse().find((s) => s < y - 8);
    target = prev !== undefined && y - prev <= step ? prev : y - step;
  }
  target = Math.min(Math.max(target, 0), max);
  // Name the page after the section that fills most of the screen it lands on.
  const view0 = target + NAV;
  const view1 = target + window.innerHeight - DOCK;
  let i = indexAt(starts, target);
  let best = -1;
  list.forEach((el, n) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const overlap = Math.min(top + el.offsetHeight, view1) - Math.max(top, view0);
    if (overlap > best + 1) {
      best = overlap;
      i = n;
    }
  });
  const sectionTop = list[i].getBoundingClientRect().top + window.scrollY;
  const continued = Math.abs(target - starts[i]) > 8 && sectionTop < view0 - 8;
  return { target, title: titleOf(list[i]), sub: continued ? "continued" : `Page ${i + 1} of ${list.length}` };
}

const frames = (n: number) =>
  new Promise<void>((resolve) => {
    const tick = () => (--n <= 0 ? resolve() : requestAnimationFrame(tick));
    requestAnimationFrame(tick);
  });
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const jumpTo = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });

/** One album page turning, with the shadow it casts on the page beneath. */
function Sheet({ sheet, rot }: { sheet: SheetState; rot: MotionValue<number> }) {
  const forward = sheet.dir === 1;
  // Arriving, the page is hinged on the side it comes from; leaving, on the side it turns towards.
  const hingeRight = sheet.phase === "in" ? forward : !forward;
  const w = sheet.width;
  const bend = useTransform(rot, (r) => Math.min(1, Math.abs(r) / 90) * 0.62);
  const castOpacity = useTransform(rot, (r) => Math.sin((Math.min(Math.abs(r), 90) * Math.PI) / 180) * 0.6);
  const castX = useTransform(rot, (r) => {
    const c = Math.cos((r * Math.PI) / 180);
    return hingeRight ? w * (1 - c) - 110 : w * c;
  });

  return (
    <>
      {/* the shadow the lifted page casts on the page beneath */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[110px]"
        style={{
          x: castX,
          opacity: castOpacity,
          background: `linear-gradient(${hingeRight ? "90deg" : "270deg"}, rgba(20,4,30,0) 0%, rgba(20,4,30,0.5) 100%)`,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{
          rotateY: rot,
          transformOrigin: hingeRight ? "right center" : "left center",
          backfaceVisibility: "hidden",
          willChange: "transform",
          background: PAPER,
          boxShadow: "0 0 50px rgba(20,4,30,0.35)",
        }}
      >
        <div className="absolute inset-3 border border-gold/60 sm:inset-5" />
        <div className="absolute inset-[18px] border border-gold/25 sm:inset-[26px]" />
        <Corner pos="tl" className="w-28 sm:w-44" />
        <Corner pos="br" className="w-28 sm:w-44" variant={1} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
          <p className="eyebrow">{sheet.sub}</p>
          <p className="mt-3 px-2 pb-1 font-script text-[3.3rem] leading-[1.12] text-purple sm:text-7xl">
            <Amp text={sheet.title} className="font-serif text-[0.6em] italic text-gold-deep" />
          </p>
          <Flourish animate={false} className="mx-auto mt-3 w-48" />
          <p className="mt-5 font-display text-[0.62rem] tracking-[0.4em] text-gold-deep">
            {couple.groom.toUpperCase()} &amp; {couple.bride.toUpperCase()}
          </p>
        </div>
        {/* the fold, where the page meets the spine */}
        <div
          className="absolute inset-y-0 w-12"
          style={{
            [hingeRight ? "right" : "left"]: 0,
            background: `linear-gradient(${hingeRight ? "270deg" : "90deg"}, rgba(120,84,30,0.25), rgba(120,84,30,0))`,
          }}
        />
        {/* gilded page edge */}
        <div className="absolute inset-y-0 w-[3px]" style={{ [hingeRight ? "left" : "right"]: 0, background: GILT }} />
        {/* light falls away as the page bends */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bend,
            background: `linear-gradient(${hingeRight ? "90deg" : "270deg"}, rgba(26,6,40,0.85) 0%, rgba(26,6,40,0.3) 40%, rgba(255,255,255,0.14) 72%, rgba(255,255,255,0) 100%)`,
          }}
        />
      </motion.div>
    </>
  );
}

export function FlipPages() {
  const reduce = useReducedMotion();
  const rot = useMotionValue(EDGE);
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [pos, setPos] = useState({ i: 0, n: 0, top: true, bottom: false });
  const [hint, setHint] = useState(true);
  const busy = useRef(false);

  const show = useCallback(
    (dir: Dir, p: Plan) => {
      rot.set(dir === 1 ? EDGE : -EDGE);
      setSheet({ dir, phase: "in", title: p.title, sub: p.sub, width: window.innerWidth });
    },
    [rot],
  );

  // The page lands, the site moves to the next screen beneath it, then the page turns away.
  const finish = useCallback(
    async (dir: Dir, p: Plan) => {
      const from = Math.abs(rot.get());
      await animate(rot, 0, { duration: Math.max(0.16, 0.42 * (from / 90)), ease: [0.25, 0.9, 0.35, 1] });
      jumpTo(p.target);
      setSheet((s) => (s ? { ...s, phase: "out" } : s));
      await frames(2);
      await wait(70);
      await animate(rot, dir === 1 ? -EDGE : EDGE, { duration: 0.52, ease: [0.5, 0.05, 0.55, 0.95] });
      setSheet(null);
      busy.current = false;
    },
    [rot],
  );

  const go = useCallback(
    async (dir: Dir) => {
      if (busy.current) return;
      const p = plan(dir);
      if (!p) return;
      setHint(false);
      if (reduce) {
        jumpTo(p.target);
        return;
      }
      busy.current = true;
      show(dir, p);
      await frames(2);
      await finish(dir, p);
    },
    [reduce, show, finish],
  );

  // Page counter and end-of-book state follow normal scrolling too.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const list = sections();
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPos({ i: indexAt(list.map(startOf), y + window.innerHeight * 0.35 - NAV), n: list.length, top: y <= 2, bottom: y >= max - 2 });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Swipe: the page follows the finger, then finishes the turn or falls back.
  useEffect(() => {
    let x0 = 0, y0 = 0, lastX = 0, lastT = 0, v = 0;
    let eligible = false;
    let drag: { dir: Dir; p: Plan } | null = null;

    const start = (e: TouchEvent) => {
      const el = e.target as Element | null;
      eligible = e.touches.length === 1 && !busy.current && !el?.closest(IGNORE) && document.body.style.overflow !== "hidden";
      drag = null;
      x0 = lastX = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      lastT = e.timeStamp;
      v = 0;
    };
    const move = (e: TouchEvent) => {
      if (!eligible) return;
      const x = e.touches[0].clientX;
      const dx = x - x0;
      const dy = e.touches[0].clientY - y0;
      if (!drag) {
        if (Math.abs(dy) > 12 && Math.abs(dy) >= Math.abs(dx)) {
          eligible = false; // up/down: ordinary scrolling
          return;
        }
        if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
        const dir: Dir = dx < 0 ? 1 : -1;
        if (reduce) {
          eligible = false;
          go(dir);
          return;
        }
        const p = plan(dir);
        if (!p) {
          eligible = false;
          return;
        }
        drag = { dir, p };
        busy.current = true;
        setHint(false);
        show(dir, p);
      }
      if (e.cancelable) e.preventDefault();
      const travel = drag.dir === 1 ? x0 - x : x - x0;
      const progress = Math.min(1, Math.max(0, travel / (window.innerWidth * 0.55)));
      const deg = (Math.acos(progress) * 180) / Math.PI; // keeps the page's edge under the finger
      rot.set(drag.dir === 1 ? deg : -deg);
      if (e.timeStamp > lastT) v = (x - lastX) / (e.timeStamp - lastT);
      lastX = x;
      lastT = e.timeStamp;
    };
    const end = () => {
      eligible = false;
      if (!drag) return;
      const { dir, p } = drag;
      drag = null;
      const angle = Math.abs(rot.get());
      const flingOn = dir === 1 ? v < -0.45 : v > 0.45;
      const flingBack = dir === 1 ? v > 0.45 : v < -0.45;
      if (flingOn || (angle < 72 && !flingBack)) {
        finish(dir, p);
      } else {
        animate(rot, dir === 1 ? EDGE : -EDGE, { duration: 0.24, ease: "easeIn" }).then(() => {
          setSheet(null);
          busy.current = false;
        });
      }
    };
    const key = (e: KeyboardEvent) => {
      const el = e.target as Element | null;
      if (el?.closest("input, textarea, select") || document.body.style.overflow === "hidden") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end, { passive: true });
    window.addEventListener("touchcancel", end, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
      window.removeEventListener("touchcancel", end);
      window.removeEventListener("keydown", key);
    };
  }, [go, show, finish, reduce, rot]);

  useEffect(() => {
    const id = setTimeout(() => setHint(false), 7000);
    return () => clearTimeout(id);
  }, []);

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full text-gold-soft transition hover:bg-gold/20 active:scale-90 disabled:opacity-30";

  return (
    <>
      {sheet && (
        <div className="fixed inset-0 z-[45]" style={{ perspective: "1700px" }}>
          <Sheet sheet={sheet} rot={rot} />
        </div>
      )}

      <div data-noflip className="fixed bottom-5 left-1/2 z-[25] flex -translate-x-1/2 flex-col items-center">
        <AnimatePresence>
          {hint && (
            <motion.p
              className="mb-2 whitespace-nowrap rounded-full bg-purple-night/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-gold-pale shadow-lg backdrop-blur"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5 } }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.25 } }}
            >
              Scroll, or swipe ← → to turn the page
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-1 rounded-full border border-gold/50 bg-purple-deep/85 px-1.5 py-1 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <button onClick={() => go(-1)} disabled={pos.top} aria-label="Previous page" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <span className="min-w-[3.5rem] text-center font-display text-xs tracking-[0.15em] text-gold-pale tabular-nums">
            {pos.n ? `${pos.i + 1} / ${pos.n}` : ""}
          </span>
          <button onClick={() => go(1)} disabled={pos.bottom} aria-label="Next page" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
