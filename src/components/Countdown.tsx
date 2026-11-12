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
