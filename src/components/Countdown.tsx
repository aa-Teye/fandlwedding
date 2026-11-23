"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { effects, wedding } from "@/content";
import { Reveal } from "./Section";
import { Illustration, Sparkles } from "./Illustrations";
import { Flourish } from "./Ornaments";

const start = new Date(wedding.date).getTime();
const dayEnd = (() => {
  const d = new Date(wedding.date);
  d.setUTCHours(23, 59, 59, 999); // Accra is UTC+0
  return d.getTime();
})();

function parts(ms: number) {
  return {
    Days: Math.floor(ms / 864e5),
    Hours: Math.floor((ms / 36e5) % 24),
    Minutes: Math.floor((ms / 6e4) % 60),
    Seconds: Math.floor((ms / 1e3) % 60),
  };
}

const face =
  "absolute inset-x-0 overflow-hidden bg-gradient-to-b from-[#4f1a78] to-[#2c0b44] text-gold-pale";

function Half({ value, top }: { value: string; top: boolean }) {
  return (
    <div className={`${face} ${top ? "top-0 h-1/2 rounded-t-xl" : "bottom-0 h-1/2 rounded-b-xl"}`}>
      <div className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${top ? "top-0" : "bottom-0"}`}>
        <span className="gold-text font-display text-[2.1rem] font-semibold tabular-nums sm:text-5xl">{value}</span>
      </div>
    </div>
  );
}

/** A flip-clock card: the top flap folds down to reveal the new number. */
function Flip({ value }: { value: string }) {
  const [cur, setCur] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== cur) {
    setPrev(cur);
    setCur(value);
  }
  return (
    <div className="relative h-[4.6rem] w-[4.1rem] [perspective:400px] sm:h-28 sm:w-24">
      <Half value={cur} top />
      <Half value={prev} top={false} />
      <AnimatePresence initial={false}>
        <motion.div
          key={`t${cur}`}
          className="absolute inset-0 [backface-visibility:hidden]"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeIn" }}
        >
          <Half value={prev} top />
        </motion.div>
        <motion.div
          key={`b${cur}`}
          className="absolute inset-0 [backface-visibility:hidden]"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
        >
          <Half value={cur} top={false} />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gold/40" />
    </div>
  );
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const phase = now === null || now < start ? "before" : now <= dayEnd ? "today" : "after";
  const t = parts(Math.max(0, start - (now ?? start)));

  return (
    <section id="countdown" className="velvet relative scroll-mt-14 overflow-hidden px-6 py-20 text-center sm:py-24">
      {effects.sparkles && <Sparkles count={20} seed={23} />}
      <div className="relative z-10">
        <Illustration name="hourglass" dark className="mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20" />
        <Reveal>
          {phase === "before" && (
            <>
              <p className="eyebrow !text-gold-soft">Counting down</p>
              <h2 className="gold-foil mx-auto mt-1 w-fit px-4 pb-2 font-script text-5xl sm:text-6xl">To the big day</h2>
              <Flourish className="mx-auto mt-2 w-48" />
              <div className="mx-auto mt-8 flex max-w-md justify-center gap-2.5 sm:gap-4">
                {Object.entries(t).map(([k, v]) => (
                  <div key={k} className="flex flex-col items-center">
                    <Flip value={now === null ? "--" : String(v).padStart(2, "0")} />
                    <div className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft">{k}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {phase === "today" && (
            <>
              <p className="eyebrow !text-gold-soft">{wedding.shortDate}</p>
              <h2 className="gold-foil mx-auto mt-2 w-fit px-4 pb-2 font-script text-6xl">Today&rsquo;s the day!</h2>
              <p className="mt-3 font-serif text-xl italic text-gold-pale/85">
                The ceremony begins at {wedding.displayTime}. Thank you for celebrating with us.
              </p>
            </>
          )}
          {phase === "after" && (
            <>
              <p className="eyebrow !text-gold-soft">{wedding.shortDate}</p>
              <h2 className="gold-foil mx-auto mt-2 w-fit px-4 pb-2 font-script text-6xl">Just married</h2>
              <p className="mt-3 font-serif text-xl italic text-gold-pale/85">Thank you for celebrating with us.</p>
            </>
          )}
        </Reveal>
        <p className="mt-8 font-display text-xs tracking-[0.25em] text-gold-soft/90">
          <span className="whitespace-nowrap">{wedding.displayDate.toUpperCase()}</span>
          <span className="hidden sm:inline"> · </span>
          <span className="mt-1 block sm:mt-0 sm:inline">{wedding.displayTime.toUpperCase()}</span>
        </p>
      </div>
    </section>
  );
}
