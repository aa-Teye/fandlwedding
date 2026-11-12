// Original botanical art drawn in SVG: roses in royal purple and red, light green hydrangea,
// green and gold leaves, baby's breath and lavender. Gradients live once in <FloralDefs />.

import type { CSSProperties } from "react";

export function FloralDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {/* red rose */}
        <linearGradient id="fl-red-1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#4a030d" />
          <stop offset="0.45" stopColor="#9b0f24" />
          <stop offset="1" stopColor="#df3e47" />
        </linearGradient>
        <linearGradient id="fl-red-2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#5c0612" />
          <stop offset="0.5" stopColor="#b3172b" />
          <stop offset="1" stopColor="#ee5a5c" />
        </linearGradient>
        <radialGradient id="fl-red-core" cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#2c0106" />
          <stop offset="0.7" stopColor="#6d0915" />
          <stop offset="1" stopColor="#a3142a" />
        </radialGradient>
        {/* royal purple rose */}
        <linearGradient id="fl-pur-1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1d0530" />
          <stop offset="0.45" stopColor="#4b1a78" />
          <stop offset="1" stopColor="#8f55c6" />
        </linearGradient>
        <linearGradient id="fl-pur-2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#250738" />
          <stop offset="0.5" stopColor="#5d2490" />
          <stop offset="1" stopColor="#a874d8" />
        </linearGradient>
        <radialGradient id="fl-pur-core" cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#12021f" />
          <stop offset="0.7" stopColor="#36105a" />
          <stop offset="1" stopColor="#56208a" />
        </radialGradient>
        {/* leaves */}
        <linearGradient id="fl-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7ea85c" />
          <stop offset="0.5" stopColor="#4f7a3a" />
          <stop offset="1" stopColor="#2b4f25" />
        </linearGradient>
        <linearGradient id="fl-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0bf" />
          <stop offset="0.35" stopColor="#e2bf6c" />
          <stop offset="0.7" stopColor="#b8892f" />
          <stop offset="1" stopColor="#8a6420" />
        </linearGradient>
        <radialGradient id="fl-hyd" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#f1f8df" />
          <stop offset="0.6" stopColor="#c9e3a1" />
          <stop offset="1" stopColor="#97bf68" />
        </radialGradient>
        {/* satin ribbon (tomato red) */}
        <linearGradient id="fl-satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a8200f" />
          <stop offset="0.3" stopColor="#f0644a" />
          <stop offset="0.45" stopColor="#ffae94" />
          <stop offset="0.6" stopColor="#e0442e" />
          <stop offset="1" stopColor="#8c1a0b" />
        </linearGradient>
        <linearGradient id="fl-satin-dark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e1207" />
          <stop offset="1" stopColor="#b42a17" />
        </linearGradient>
        <linearGradient id="fl-satin-tail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a1d0d" />
          <stop offset="0.35" stopColor="#e85a40" />
          <stop offset="0.55" stopColor="#ff9b80" />
          <stop offset="0.75" stopColor="#d23d27" />
          <stop offset="1" stopColor="#821709" />
        </linearGradient>
        {/* gold wax seal */}
        <radialGradient id="fl-seal" cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#fff3c8" />
          <stop offset="0.35" stopColor="#e6c36f" />
          <stop offset="0.75" stopColor="#b58a33" />
          <stop offset="1" stopColor="#7d5a1b" />
        </radialGradient>
        <linearGradient id="fl-gold-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8792b" />
          <stop offset="0.5" stopColor="#f7e2a6" />
          <stop offset="1" stopColor="#c9a24b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const PETAL_OUT = "M-29 0C-47-22-35-50 0-51C35-50 47-22 29 0Z";
const PETAL_EDGE = "M-27-26C-20-44 20-44 27-26";
const SPIRAL =
  "M3-3C8-2 7 6 0 6C-7 6-9-3-3-8C3-12 12-9 13-1M-13 1C-14-12 1-17 9-14M-10 9C-3 14 9 12 14 5";

type RoseProps = { x: number; y: number; s?: number; r?: number; tone?: "red" | "purple" };

export function Rose({ x, y, s = 1, r = 0, tone = "red" }: RoseProps) {
  const red = tone === "red";
  const g1 = red ? "url(#fl-red-1)" : "url(#fl-pur-1)";
  const g2 = red ? "url(#fl-red-2)" : "url(#fl-pur-2)";
  const core = red ? "url(#fl-red-core)" : "url(#fl-pur-core)";
  const line = red ? "#3a020a" : "#14031f";
  const light = red ? "#ff8f8a" : "#cfa6f2";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[8, 80, 152, 224, 296].map((a) => (
        <g key={`o${a}`} transform={`rotate(${a})`}>
          <path d={PETAL_OUT} fill={g1} stroke={line} strokeOpacity={0.45} strokeWidth={0.8} />
          <path d={PETAL_EDGE} fill="none" stroke={light} strokeOpacity={0.5} strokeWidth={1.3} strokeLinecap="round" />
        </g>
      ))}
      {[44, 116, 188, 260, 332].map((a) => (
        <g key={`m${a}`} transform={`rotate(${a}) scale(0.74)`}>
          <path d={PETAL_OUT} fill={g2} stroke={line} strokeOpacity={0.5} strokeWidth={1} />
          <path d={PETAL_EDGE} fill="none" stroke={light} strokeOpacity={0.55} strokeWidth={1.6} strokeLinecap="round" />
        </g>
      ))}
      {[20, 110, 200, 290].map((a) => (
        <g key={`i${a}`} transform={`rotate(${a}) scale(0.5)`}>
          <path d={PETAL_OUT} fill={g1} stroke={line} strokeOpacity={0.55} strokeWidth={1.4} />
          <path d={PETAL_EDGE} fill="none" stroke={light} strokeOpacity={0.6} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      ))}
      <circle r={15} fill={core} />
      <path d={SPIRAL} fill="none" stroke={light} strokeOpacity={0.55} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

export function Bud({ x, y, s = 1, r = 0, tone = "red" }: RoseProps) {
  const g = tone === "red" ? "url(#fl-red-2)" : "url(#fl-pur-2)";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 22C-3 30-2 40 0 48" stroke="#4f7a3a" strokeWidth={2} fill="none" />
      <path d="M-11 4C-13-8-6-18 0-22C6-18 13-8 11 4C8 14-8 14-11 4Z" fill={g} stroke="#3a020a" strokeOpacity={0.4} strokeWidth={0.8} />
      <path d="M-4-14C-1-8 1-2 0 8" stroke="#fff" strokeOpacity={0.25} strokeWidth={1.2} fill="none" />
      <path d="M-12 6C-8 18 8 18 12 6C9 22-9 22-12 6Z" fill="url(#fl-leaf)" />
      <path d="M0 18C-10 14-16 18-18 24C-10 26-4 23 0 18Z" fill="url(#fl-leaf)" />
    </g>
  );
}

export function Leaf({ x, y, s = 1, r = 0, gold = false }: { x: number; y: number; s?: number; r?: number; gold?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {gold ? (
        <>
          <path d="M0 0C8-8 26-10 40 0C26 10 8 8 0 0Z" fill="url(#fl-gold)" />
          <path d="M2 0H36" stroke="#8a6420" strokeOpacity={0.6} strokeWidth={0.8} />
        </>
      ) : (
        <>
          <path d="M0 0C10-11 34-14 54 0C34 14 10 11 0 0Z" fill="url(#fl-leaf)" />
          <path d="M2 0C18-1 34-1 50 0" stroke="#a9cf86" strokeOpacity={0.55} strokeWidth={1} fill="none" />
        </>
      )}
    </g>
