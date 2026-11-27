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
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <svg
          key={p}
          viewBox="0 0 40 40"
          className={`absolute h-8 w-8 sm:h-10 sm:w-10 ${
            { tl: "-left-[3px] -top-[3px]", tr: "-right-[3px] -top-[3px] -scale-x-100", bl: "-bottom-[3px] -left-[3px] -scale-y-100", br: "-bottom-[3px] -right-[3px] -scale-100" }[p]
          }`}
        >
          <path d="M2 2h12M2 2v12" stroke="#d9b45e" strokeWidth={1.6} fill="none" />
          <path d="M6 18C6 10 10 6 18 6M10 22c0-7 5-12 12-12" stroke="#c9a24b" strokeWidth={0.9} fill="none" />
          <circle cx={5} cy={5} r={1.8} fill="#e6c36f" />
        </svg>
      ))}
    </div>
  );
}

/** A gold flourish divider with a heart at its centre that draws itself in. */
export function Flourish({ className = "w-56", animate = true }: { className?: string; animate?: boolean }) {
  const paths = [
    "M120 14C112 6 100 8 102 16C104 22 120 26 120 26C120 26 136 22 138 16C140 8 128 6 120 14Z",
    "M98 16H62C54 16 50 10 44 10C38 10 36 16 40 18C44 20 46 14 42 13",
    "M142 16H178C186 16 190 10 196 10C202 10 204 16 200 18C196 20 194 14 198 13",
    "M60 20H10",
    "M180 20H230",
  ];
  return (
    <svg viewBox="0 0 240 32" className={className} aria-hidden="true" fill="none">
      {paths.map((d, i) =>
        animate ? (
          <motion.path
            key={i}
            d={d}
            stroke="url(#fl-gold-line)"
            strokeWidth={i === 0 ? 1.4 : 1.1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease: "easeInOut" }}
          />
        ) : (
          <path key={i} d={d} stroke="url(#fl-gold-line)" strokeWidth={i === 0 ? 1.4 : 1.1} strokeLinecap="round" />
        ),
      )}
      <circle cx={50} cy={20} r={1.6} fill="#d9b45e" />
      <circle cx={190} cy={20} r={1.6} fill="#d9b45e" />
    </svg>
  );
}

/** Two interlocked gold rings. */
export function Rings({ className = "w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 52" className={className} aria-hidden="true" fill="none">
      <circle cx={30} cy={30} r={17} stroke="url(#fl-gold)" strokeWidth={4} />
      <circle cx={50} cy={30} r={17} stroke="url(#fl-gold)" strokeWidth={4} />
      <path d="M45 10l5-6 5 6-5 5z" fill="#fff4cc" stroke="#c9a24b" strokeWidth={0.8} />
      <circle cx={30} cy={30} r={17} stroke="#fff4cc" strokeOpacity={0.5} strokeWidth={0.8} strokeDasharray="10 30" />
    </svg>
  );
}

/** Shows "&" in an elegant serif italic, since script fonts draw it oddly. */
export function Amp({ text, className = "font-serif italic" }: { text: string; className?: string }) {
  const parts = text.split("&");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className={className}>&amp;</span>}
        </span>
      ))}
    </>
  );
}
