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
