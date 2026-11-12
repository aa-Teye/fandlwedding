"use client";
import { motion } from "framer-motion";
import { couple } from "@/content";

// Wavy-edged wax seal outline, computed once.
const sealPath = (() => {
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 46 + Math.sin(a * 9) * 2.2 + Math.sin(a * 23 + 1) * 1.1;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

/** Gold wax seal stamped with the couple's monogram. */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={sealPath} fill="url(#fl-seal)" />
      <path d={sealPath} fill="none" stroke="#7d5a1b" strokeOpacity={0.5} strokeWidth={0.8} />
      <circle cx={50} cy={50} r={36} fill="none" stroke="#8a6420" strokeOpacity={0.55} strokeWidth={1.2} />
      <circle cx={50} cy={50} r={33} fill="none" stroke="#fff4cc" strokeOpacity={0.55} strokeWidth={0.6} />
      {/* tiny laurel dots around the ring */}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return <circle key={i} cx={+(50 + Math.cos(a) * 40.5).toFixed(2)} cy={+(50 + Math.sin(a) * 40.5).toFixed(2)} r={0.9} fill="#8a6420" opacity={0.55} />;
      })}
      <g textAnchor="middle" fontFamily="var(--font-cinzel), serif" fontWeight={600}>
        {[
          { dx: 0.7, dy: 0.7, fill: "#fff4cc", op: 0.7 },
          { dx: 0, dy: 0, fill: "#6b4a12", op: 1 },
        ].map((l, i) => (
          <g key={i} opacity={l.op} fill={l.fill} transform={`translate(${l.dx} ${l.dy})`}>
            <text x={34} y={60} fontSize={26}>{couple.groom[0]}</text>
            <text x={50} y={58} fontSize={17} fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontWeight={500}>&amp;</text>
            <text x={66} y={60} fontSize={26}>{couple.bride[0]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** A thin double gold frame with flourished corners, like the invitation card's border. */
export function GoldFrame({ className = "inset-3 sm:inset-5", dark = false }: { className?: string; dark?: boolean }) {
  const line = dark ? "border-gold/55" : "border-gold/60";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className={`absolute inset-0 border ${line}`} />
      <div className={`absolute inset-[5px] border ${dark ? "border-gold/25" : "border-gold/30"}`} />
