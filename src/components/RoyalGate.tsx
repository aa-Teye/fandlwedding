"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, wedding } from "@/content";
import { Corner } from "./Floral";
import { Amp, Seal } from "./Ornaments";
import { PetalBurst } from "./Petals";

const swing = [0.62, 0, 0.28, 1] as const;
const DOORS_AT = 0.55; // seconds after the tap
const DOORS_FOR = 1.75;

// The seam fades out behind the words on the doors.
const seamMask =
  "linear-gradient(to bottom, #000 0%, #000 14%, transparent 18%, transparent 47%, #000 51%, #000 70%, transparent 73%, transparent 85%, #000 88%)";

const satinBand =
  "linear-gradient(180deg,#6e1206 0%,#b52a17 10%,#e9563d 26%,#ffa088 38%,#e0442e 52%,#c3341f 70%,#8f1d0c 90%,#62100a 100%)";

function Door({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute top-0 h-full w-1/2 ${left ? "left-0" : "right-0"}`}
      style={{ transformOrigin: left ? "left center" : "right center", transformStyle: "preserve-3d" }}
      initial={false}
      animate={opening ? { rotateY: left ? 102 : -102 } : { rotateY: 0 }}
      transition={{ delay: DOORS_AT, duration: DOORS_FOR, ease: swing }}
    >
      <div
        className="velvet absolute inset-0 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          boxShadow: left
            ? "inset -22px 0 36px -14px rgba(8,0,16,0.75)"
            : "inset 22px 0 36px -14px rgba(8,0,16,0.75)",
        }}
      >
        {/* arched door panel in gold */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d={left ? "M10 97V20Q10 4 52 4Q94 4 94 20V97Z" : "M6 97V20Q6 4 48 4Q90 4 90 20V97Z"}
            fill="none"
            stroke="#d9b45e"
            strokeOpacity={0.7}
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={left ? "M14 94V22Q14 8 52 8Q90 8 90 22V94Z" : "M10 94V22Q10 8 48 8Q86 8 86 22V94Z"}
            fill="none"
            stroke="#d9b45e"
            strokeOpacity={0.35}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <Corner pos={left ? "tl" : "tr"} className="w-[92%] max-w-[360px]" />
        <Corner pos={left ? "bl" : "br"} className="w-[78%] max-w-[300px]" variant={1} />

        {/* this door's half of the satin ribbon */}
        <div
          className="absolute top-[56%] h-9 w-full -translate-y-1/2 sm:h-11"
          style={{ background: satinBand, boxShadow: "0 6px 14px -6px rgba(10,0,18,0.7)" }}
        >
          <div className="absolute inset-x-0 top-[3px] h-px bg-gold-soft/50" />
          <div className="absolute inset-x-0 bottom-[3px] h-px bg-gold-soft/50" />
        </div>

        {/* the gold edge where the doors meet */}
        <div
          className={`absolute top-0 h-full w-[2px] ${left ? "right-0" : "left-0"} bg-gradient-to-b from-gold-deep via-gold-soft to-gold-deep`}
          style={{ maskImage: seamMask, WebkitMaskImage: seamMask }}
        />

        {/* the door darkens as it turns away from the light */}
        <motion.div
          className="absolute inset-0 bg-[#0b0012]"
          initial={false}
          animate={{ opacity: opening ? 0.6 : 0 }}
          transition={{ delay: DOORS_AT, duration: DOORS_FOR, ease: "easeIn" }}
        />
      </div>
    </motion.div>
  );
}

function Bow({ opening }: { opening: boolean }) {
  const t = { duration: 0.75, ease: [0.4, 0, 0.6, 1] as const };
  const loop = (dir: 1 | -1) => (
    <motion.g
      style={{ originX: dir === -1 ? 1 : 0, originY: 0.55 }}
      initial={false}
      animate={opening ? { x: dir * 70, y: -26, rotate: dir * 32, scale: 0.4, opacity: 0 } : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
      transition={{ ...t, delay: 0.12 }}
    >
      <g transform={dir === 1 ? "scale(-1,1)" : undefined}>
        <path d="M-6-4C-30-46-100-76-130-46C-152-22-128 16-80 12C-50 10-24 4-6 6Z" fill="url(#fl-satin)" />
        <path d="M-10-1C-36-32-94-54-114-36C-100-24-60-10-10-1Z" fill="url(#fl-satin-dark)" opacity={0.85} />
        <path d="M-16-14C-46-48-98-64-122-42" stroke="#ffd3c4" strokeOpacity={0.7} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M-12 8C-34 12-72 18-100 8" stroke="#5a0d04" strokeOpacity={0.4} strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
    </motion.g>
  );
  const tail = (dir: 1 | -1, d: string) => (
    <motion.g
      style={{ originX: 0.5, originY: 0 }}
      initial={false}
      animate={opening ? { y: 90, x: dir * 34, rotate: dir * 18, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
      transition={{ ...t, delay: 0.05 }}
    >
      <path d={d} fill="url(#fl-satin-tail)" />
    </motion.g>
  );
  return (
    <svg
      viewBox="-150 -100 300 270"
      className="absolute left-0 top-0 w-[250px] sm:w-[310px]"
      style={{ transform: "translate(-50%, -37.037%)", filter: "drop-shadow(0 10px 12px rgba(16,0,26,0.55))" }}
      aria-hidden="true"
    >
      {tail(-1, "M-8 8C-20 40-38 92-62 150L-44 140-36 160C-16 104-2 52 6 10Z")}
      {tail(1, "M8 8C22 44 42 96 60 154L44 144 32 162C16 108 4 54-6 10Z")}
      {loop(-1)}
      {loop(1)}
      <motion.g initial={false} animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.6 : 1 }} transition={{ ...t, delay: 0.2 }}>
        <path d="M-18-16C-8-22 8-22 18-16C23-6 23 8 18 16C8 22-8 22-18 16C-23 8-23-6-18-16Z" fill="url(#fl-satin)" />
        <path d="M-9-15C-3-5-3 7-9 17M9-15C3-5 3 7 9 17" stroke="#6e1206" strokeOpacity={0.45} strokeWidth={1.4} fill="none" />
      </motion.g>
    </svg>
  );
}

export function RoyalGate({
  guest,
  onStart,
  onOpen,
}: {
  guest?: string | null;
  onStart?: () => void;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const [burst, setBurst] = useState(false);

  const open = () => {
    if (opening) return;
    onStart?.(); // inside the tap, so phones allow the music to start
    setOpening(true);
    setTimeout(() => setBurst(true), (DOORS_AT + 0.1) * 1000);
    setTimeout(() => {
      setGone(true);
      onOpen();
    }, (DOORS_AT + DOORS_FOR - 0.1) * 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!gone && (
          <motion.div
            role="button"
