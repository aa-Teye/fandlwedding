"use client";
import { motion } from "framer-motion";

// Gold line drawings that draw themselves when they scroll into view.

const art = {
  hourglass: [
    "M16 6h32v4H16zM16 54h32v4H16z",
    "M20 10c0 14 10 18 10 22s-10 8-10 22M44 10c0 14-10 18-10 22s10 8 10 22",
    "M25 20q7 4 14 0M23 52q9-10 18 0M32 34v12",
  ],
  church: [
    "M32 3v9M28.5 6.5h7",
    "M26 21l6-9 6 9M27 21v12M37 21v12",
    "M8 35l24-13 24 13M13 33v25h38V33",
    "M28 58v-9a4 4 0 018 0v9M30 28a2 2 0 104 0 2 2 0 10-4 0M18 49v-6a2 2 0 014 0v6zM42 49v-6a2 2 0 014 0v6zM4 58h56",
  ],
  clock: [
    "M32 10a22 22 0 110 44 22 22 0 110-44z",
    "M32 32V18M32 32l10 6",
    "M32 13.5v3M50.5 32h-3M32 50.5v-3M13.5 32h3M29 6h6M32 6v4",
  ],
  book: [
    "M8 18c10-4 18-3 24 2 6-5 14-6 24-2v30c-10-4-18-3-24 2-6-5-14-6-24-2z",
    "M32 20v30",
    "M13 27c5-1.5 9-1 13 .5M13 33c5-1.5 9-1 13 .5M13 39c5-1.5 9-1 13 .5M44 24v13M39.5 28.5h9",
  ],
  rings: [
    "M26 26a12 12 0 110 24 12 12 0 110-24z",
    "M38 26a12 12 0 110 24 12 12 0 110-24z",
    "M34 18l4-5 4 5-4 4zM14 14l2 2M50 12l-2 3M52 24h-3",
  ],
  attire: [
    "M20 7c0-3 4-3 4 0 0 2-2 2-2 4M17 16l5-5 5 5-2 10h-6z",
    "M19 26c-5 10-9 22-11 32h28c-2-10-6-22-11-32",
    "M44 7c0-3 4-3 4 0 0 2-2 2-2 4M38 16l8-5 8 5 2 42H36z",
    "M46 11l-4 13 4 6 4-6zM43 16l3 1.5 3-1.5v3l-3-1.5-3 1.5zM46 36v.1M46 42v.1",
  ],
  gift: [
    "M12 30h40v26H12zM9 22h46v8H9z",
    "M32 22v34",
    "M32 22c-6-10-16-8-12-2 2 3 8 2 12 2zM32 22c6-10 16-8 12-2-2 3-8 2-12 2z",
  ],
  envelope: [
    "M8 22h48v32H8z",
    "M8 22l24 18 24-18M8 54l18-16M56 54L38 38",
    "M32 33c-2-3-7-2-6 1.5.8 2.5 6 5.5 6 5.5s5.2-3 6-5.5c1-3.5-4-4.5-6-1.5z",
  ],
  quill: [
    "M14 44h16v12H14zM17 44v-4h10v4",
    "M24 40c6-14 18-28 32-34-4 12-14 24-26 30",
    "M24 40L50 10M34 30l6 1M39 24l6 1M44 18l5 1",
  ],
  question: [
    "M10 14h44q4 0 4 4v22q0 4-4 4H28l-10 10V44h-4q-4 0-4-4V18q0-4 4-4z",
    "M27 24c0-6 10-6 10 0 0 4-5 5-5 9",
    "M32 38.5v.1",
  ],
  camera: [
    "M10 14h44v36H10z",
    "M14 18h36v28H14z",
    "M14 42l12-12 8 8 6-6 10 10M37 25a3 3 0 106 0 3 3 0 10-6 0",
  ],
  heart: [
    "M32 52S10 39 10 24c0-8 6-12 12-12 5 0 8 3 10 6 2-3 5-6 10-6 6 0 12 4 12 12 0 15-22 28-22 28z",
    "M32 44S18 35 18 25c0-4 3-6 6-6",
  ],
  laurel: [
    "M32 10v38M27 48l5 6 5-6",
    "M30 14c-8 2-13 8-13 16s5 13 11 17M29 20c-6 1-9 5-9 10s3 8 7 11",
    "M34 14c8 2 13 8 13 16s-5 13-11 17M35 20c6 1 9 5 9 10s-3 8-7 11",
    "M17 30c-3 1-5 3-6 6M47 30c3 1 5 3 6 6",
  ],
} as const;

export type ArtName = keyof typeof art;

export function Illustration({
  name,
  className = "h-16 w-16",
  dark = false,
}: {
  name: ArtName;
  className?: string;
  dark?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <motion.circle
        cx={32}
        cy={32}
        r={31}
        fill={dark ? "rgba(255,240,200,0.06)" : "rgba(201,162,75,0.08)"}
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      {art[name].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={dark ? "#ecd08f" : "#b8892f"}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

// Deterministic "random" so the server and the browser draw the same sparkles.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Twinkling gold stars scattered over a section. */
export function Sparkles({ count = 18, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const r = seeded(seed);
  const items = Array.from({ length: count }, () => ({
    x: (r() * 100).toFixed(2),
    y: (r() * 100).toFixed(2),
    s: Math.round(6 + r() * 12),
    d: (r() * 5).toFixed(2),
    t: (2.6 + r() * 3).toFixed(2),
  }));
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((it, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="sparkle absolute"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: it.s,
            height: it.s,
            animationDelay: `${it.d}s`,
            animationDuration: `${it.t}s`,
            opacity: 0,
          }}
        >
          <path d="M10 0C10.8 6 14 9.2 20 10 14 10.8 10.8 14 10 20 9.2 14 6 10.8 0 10 6 9.2 9.2 6 10 0Z" fill="#f7e2a6" />
        </svg>
      ))}
    </div>
  );
}
