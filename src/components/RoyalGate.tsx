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
            tabIndex={0}
            aria-label="Open the invitation"
            onClick={open}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            }}
            className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden bg-purple-night outline-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* the light waiting behind the doors */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 52%, #fffdf6 0%, #fbefcf 16%, #e8c67a 34%, #9a5cc8 62%, #3b1258 82%, #1b0629 100%)",
              }}
              initial={false}
              animate={opening ? { scale: 1.25 } : { scale: 1 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
            />
            <div
              className="absolute left-1/2 top-[52%] h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 animate-[rays_40s_linear_infinite] opacity-60 motion-reduce:animate-none"
              style={{
                background: "repeating-conic-gradient(from 0deg, rgba(255,246,214,0.5) 0deg 4deg, transparent 4deg 15deg)",
                maskImage: "radial-gradient(circle, black 0%, transparent 45%)",
                WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 45%)",
              }}
            />

            <div className="absolute inset-0" style={{ perspective: "1800px" }}>
              <Door side="left" opening={opening} />
              <Door side="right" opening={opening} />
            </div>

            {/* words on the doors */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[17%] z-10 px-6 text-center sm:top-[15%]"
              initial={{ opacity: 0, y: 14 }}
              animate={opening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
              transition={opening ? { duration: 0.35 } : { delay: 0.3, duration: 1 }}
            >
              {guest && (
                <p className="gold-foil mb-2 px-4 font-script text-[2.3rem] leading-tight sm:text-6xl">
                  Dear <Amp text={guest} className="font-serif text-[0.8em] italic" />,
                </p>
              )}
              <p className="text-[0.66rem] uppercase tracking-[0.34em] text-gold-soft sm:text-xs">You are cordially invited</p>
              <p className="mt-1 font-serif text-lg italic text-gold-pale/90 sm:text-xl">to the wedding of</p>
              <h1 className="mt-1 flex flex-col items-center leading-none">
                <span className="gold-foil px-4 pb-1 font-script text-[3.3rem] leading-[1.15] sm:text-8xl">{couple.groom}</span>
                <span className="gold-text -my-1 font-serif text-3xl italic sm:text-4xl">&amp;</span>
                <span className="gold-foil px-4 pb-2 font-script text-[3.3rem] leading-[1.15] sm:text-8xl">{couple.bride}</span>
              </h1>
            </motion.div>

            {/* bow and wax seal, tied on the ribbon */}
            <div className="absolute left-1/2 top-[56%] z-10 h-0 w-0">
              <Bow opening={opening} />
              <motion.div
                className="absolute left-0 top-0 h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 sm:h-24 sm:w-24"
                style={{ filter: "drop-shadow(0 6px 10px rgba(16,0,26,0.6))" }}
                initial={false}
                animate={
                  opening
                    ? { scale: [1, 1.22, 0], rotate: [0, -8, 30], opacity: [1, 1, 0] }
                    : { scale: [1, 1.06, 1] }
                }
                transition={opening ? { duration: 0.5, times: [0, 0.4, 1] } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Seal className="h-full w-full" />
              </motion.div>
              {/* flash of light where the seal breaks */}
              <motion.div
                className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,247,214,0.95) 0%, rgba(240,206,120,0.5) 35%, transparent 70%)" }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={opening ? { opacity: [0, 1, 0], scale: [0.2, 2.4, 3.2] } : { opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.9, delay: 0.25 }}
              />
            </div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[75%] z-10 text-center sm:top-[77%]"
              initial={{ opacity: 0 }}
              animate={opening ? { opacity: 0 } : { opacity: 1 }}
              transition={opening ? { duration: 0.3 } : { delay: 0.8, duration: 1 }}
            >
              <motion.p
                className="mx-auto inline-block max-w-[85vw] rounded-full border border-gold/40 bg-purple-night/45 px-6 py-2 font-serif text-base italic leading-snug text-gold-pale backdrop-blur-[2px] sm:max-w-sm sm:text-xl"
                animate={opening ? {} : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                If you are ready, click this to enter our forever journey
              </motion.p>
              <p className="mt-2 font-display text-[0.7rem] tracking-[0.4em] text-gold-soft/90">
                {wedding.day} · {String(new Date(wedding.date).getUTCMonth() + 1).padStart(2, "0")} · {wedding.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {burst && <PetalBurst fire={burst} onDone={() => setBurst(false)} />}
    </>
  );
}
