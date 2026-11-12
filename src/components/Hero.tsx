"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { couple, effects, invitation, photos, venues, wedding } from "@/content";
import { Corner } from "./Floral";
import { Amp, Flourish, GoldFrame } from "./Ornaments";
import { Sparkles } from "./Illustrations";

const ease = [0.22, 1, 0.36, 1] as const;
const arch = "50% 50% 1.5rem 1.5rem / 30% 30% 1.5rem 1.5rem";

function Medallion() {
  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
      <div className="absolute inset-0 animate-[rays_30s_linear_infinite] rounded-full border border-dashed border-gold/50 motion-reduce:animate-none" />
      <div className="absolute inset-3 rounded-full border border-gold/70" />
      <div className="absolute inset-[18px] rounded-full border border-gold/30 bg-purple-night/40 shadow-[inset_0_0_40px_rgba(201,162,75,0.25)]" />
      <p className="relative flex items-baseline">
        <span className="gold-foil px-1 font-script text-7xl leading-none sm:text-8xl">{couple.groom[0]}</span>
        <span className="gold-text mx-1 font-serif text-3xl italic">&amp;</span>
        <span className="gold-foil px-1 font-script text-7xl leading-none sm:text-8xl">{couple.bride[0]}</span>
      </p>
    </div>
  );
}

function Portrait() {
  const p = photos.couple!;
  return (
    <div className="relative mx-auto w-[min(70vw,300px)]">
      <div className="absolute -inset-2 border border-gold/80" style={{ borderRadius: arch }} />
      <div className="absolute -inset-4 border border-gold/30" style={{ borderRadius: arch }} />
      <Image
        src={p.src}
        alt={p.alt}
        width={p.width}
        height={p.height}
        priority
        sizes="(max-width: 640px) 70vw, 300px"
        className="relative block h-auto w-full shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)]"
        style={{ borderRadius: arch }}
      />
    </div>
  );
}

export function Hero({ show, guest }: { show: boolean; guest?: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
