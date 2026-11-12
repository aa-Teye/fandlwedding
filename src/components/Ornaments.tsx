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
