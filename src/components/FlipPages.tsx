"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { couple } from "@/content";
import { GoldFrame } from "./Ornaments";

// Guests can scroll as normal, or flip from one section to the next like the pages of a book:
// swipe left/right, tap the arrows, or press the left/right arrow keys.

type Dir = 1 | -1;

const pages = () =>
  Array.from(document.querySelectorAll<HTMLElement>("main > header, main > section, main > footer")).filter(
    (el) => el.offsetHeight > 0,
  );

// The page whose top has passed the upper third of the screen.
function currentIndex(list: HTMLElement[]) {
  const line = window.innerHeight * 0.35;
  let i = 0;
  list.forEach((el, n) => {
    if (el.getBoundingClientRect().top <= line) i = n;
  });
  return i;
}

// Swipes that start on these keep their own behaviour.
const IGNORE = "input, textarea, select, iframe, button, a, [data-noflip], .overflow-x-auto";

function Sheet({ dir, phase, onDone }: { dir: Dir; phase: "in" | "out"; onDone: () => void }) {
  // Next: the sheet swings in from the right, then turns away to the left. Previous mirrors it.
  const fromRight = dir === 1;
  const origin = phase === "in" ? (fromRight ? "right center" : "left center") : fromRight ? "left center" : "right center";
  const start = phase === "in" ? (fromRight ? 92 : -92) : 0;
  const end = phase === "in" ? 0 : fromRight ? -92 : 92;
  return (
    <motion.div
      key={phase}
      className="absolute inset-0 overflow-hidden"
      style={{
        transformOrigin: origin,
        backfaceVisibility: "hidden",
        willChange: "transform",
        // A light gradient (no noise texture) so the turning page repaints smoothly on any phone.
        background:
          "radial-gradient(120% 70% at 50% 0%, rgba(139,63,190,0.55) 0%, transparent 60%), linear-gradient(180deg, #4a1670 0%, #3b1258 50%, #2a0a40 100%)",
        boxShadow: fromRight ? "-24px 0 40px rgba(0,0,0,0.45)" : "24px 0 40px rgba(0,0,0,0.45)",
      }}
      initial={{ rotateY: start }}
      animate={{ rotateY: end }}
      transition={{ duration: phase === "in" ? 0.38 : 0.46, ease: phase === "in" ? [0.2, 0.7, 0.3, 1] : [0.6, 0, 0.8, 0.4] }}
      onAnimationComplete={onDone}
    >
      <GoldFrame dark className="inset-4 sm:inset-6" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="flex items-baseline">
          <span className="gold-foil px-1 font-script text-7xl">{couple.groom[0]}</span>
          <span className="gold-text font-serif text-3xl italic">&amp;</span>
          <span className="gold-foil px-1 font-script text-7xl">{couple.bride[0]}</span>
        </p>
      </div>
      {/* the page darkens a little as it turns */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: phase === "in" ? 0.45 : 0 }}
        animate={{ opacity: phase === "in" ? 0 : 0.45 }}
        transition={{ duration: phase === "in" ? 0.38 : 0.46 }}
      />
    </motion.div>
  );
}

export function FlipPages() {
  const reduce = useReducedMotion();
  const [flip, setFlip] = useState<{ dir: Dir; phase: "in" | "out"; target: number } | null>(null);
  const [pos, setPos] = useState({ i: 0, n: 0 });
  const [hint, setHint] = useState(true);
  const busy = useRef(false);

  const jumpTo = (el: HTMLElement) => el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });

  const go = useCallback(
    (dir: Dir) => {
      if (busy.current) return;
      const list = pages();
      const target = currentIndex(list) + dir;
      if (target < 0 || target >= list.length) return;
      setHint(false);
      if (reduce) {
        jumpTo(list[target]);
        return;
      }
      busy.current = true;
      setFlip({ dir, phase: "in", target });
    },
    [reduce],
  );

  const onSheetDone = () => {
    if (!flip) return;
    if (flip.phase === "in") {
      const el = pages()[flip.target];
      if (el) jumpTo(el);
      setFlip({ ...flip, phase: "out" });
    } else {
      setFlip(null);
      busy.current = false;
    }
  };

  // Page counter follows normal scrolling too.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const list = pages();
        setPos({ i: currentIndex(list), n: list.length });
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

  // Swipe left/right to flip; vertical swipes stay normal scrolling.
  useEffect(() => {
    let x = 0, y = 0, t = 0, ok = false;
    const start = (e: TouchEvent) => {
      const el = e.target as Element | null;
      ok = e.touches.length === 1 && !el?.closest(IGNORE) && document.body.style.overflow !== "hidden";
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      t = Date.now();
    };
    const end = (e: TouchEvent) => {
      if (!ok) return;
      const dx = e.changedTouches[0].clientX - x;
      const dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - t < 900) go(dx < 0 ? 1 : -1);
    };
    const key = (e: KeyboardEvent) => {
      const el = e.target as Element | null;
      if (el?.closest("input, textarea, select") || document.body.style.overflow === "hidden") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
      window.removeEventListener("keydown", key);
    };
  }, [go]);

  useEffect(() => {
    const id = setTimeout(() => setHint(false), 6000);
    return () => clearTimeout(id);
  }, []);

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full text-gold-soft transition hover:bg-gold/20 disabled:opacity-30";

  return (
    <>
      <AnimatePresence>
        {flip && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-[45]"
            style={{ perspective: "1600px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Sheet dir={flip.dir} phase={flip.phase} onDone={onSheetDone} />
          </motion.div>
        )}
      </AnimatePresence>

      <div data-noflip className="fixed bottom-5 left-1/2 z-[25] flex -translate-x-1/2 flex-col items-center">
        <AnimatePresence>
          {hint && (
            <motion.p
              className="mb-2 whitespace-nowrap rounded-full bg-purple-night/80 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold-pale shadow-lg backdrop-blur"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5 } }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.25 } }}
            >
              Scroll, or swipe to turn the page
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-1 rounded-full border border-gold/50 bg-purple-deep/85 px-1.5 py-1 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <button onClick={() => go(-1)} disabled={pos.i === 0} aria-label="Previous page" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <span className="min-w-[3.5rem] text-center font-display text-xs tracking-[0.15em] text-gold-pale tabular-nums">
            {pos.n ? `${pos.i + 1} / ${pos.n}` : ""}
          </span>
          <button onClick={() => go(1)} disabled={pos.n > 0 && pos.i >= pos.n - 1} aria-label="Next page" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
