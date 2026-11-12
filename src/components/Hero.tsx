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
  const floatUp = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sink = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fade = (d: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { delay: d, duration: 1.1, ease },
  });
  const bloom = (d: number) => ({
    initial: { opacity: 0, scale: 0.6 },
    animate: show ? { opacity: 1, scale: 1 } : {},
    transition: { delay: d, duration: 1.4, ease },
  });
  const v = venues[0];

  return (
    <header
      id="top"
      ref={ref}
      className="velvet relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-20 text-center"
    >
      <GoldFrame dark className="inset-3 sm:inset-6" />
      {effects.sparkles && <Sparkles count={30} seed={11} />}

      <motion.div className="pointer-events-none absolute inset-0" style={{ y: floatUp }}>
        <motion.div className="absolute left-0 top-0 origin-top-left" {...bloom(0.2)}>
          <Corner pos="tl" className="!relative w-44 sm:w-80" />
        </motion.div>
        <motion.div className="absolute right-0 top-0 origin-top-right" {...bloom(0.35)}>
          <Corner pos="tr" className="!relative w-28 sm:w-52" variant={1} />
        </motion.div>
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: sink }}>
        <motion.div className="absolute bottom-0 right-0 origin-bottom-right" {...bloom(0.3)}>
          <Corner pos="br" className="!relative w-44 sm:w-80" variant={1} />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 origin-bottom-left" {...bloom(0.45)}>
          <Corner pos="bl" className="!relative w-28 sm:w-52" />
        </motion.div>
      </motion.div>

      <motion.div className="relative z-10 flex w-full max-w-xl flex-col items-center" style={{ opacity: fadeOut }}>
        {guest && (
          <motion.p className="gold-foil mb-3 px-4 font-script text-4xl sm:text-5xl" {...fade(0.1)}>
            Dear <Amp text={guest} className="font-serif text-[0.8em] italic" />,
          </motion.p>
        )}
        <motion.p className="font-display text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft sm:text-xs" {...fade(0.2)}>
          {invitation.tagline}
        </motion.p>
        <motion.div {...fade(0.3)}>
          <Flourish className="mx-auto mt-3 w-44" />
        </motion.div>

        <motion.div className="mt-6" {...fade(0.4)}>
          {photos.couple ? <Portrait /> : <Medallion />}
        </motion.div>

        <motion.h1 className="mt-8 flex flex-col items-center" {...fade(0.6)}>
          <span className="gold-foil px-3 pb-1 font-script text-[3.2rem] leading-[1.1] sm:text-7xl">{couple.groomFull.first}</span>
          <span className="gold-text font-display text-2xl font-semibold tracking-[0.2em] sm:text-3xl">{couple.groomFull.last.toUpperCase()}</span>
          <span className="gold-text my-1 font-serif text-4xl italic">&amp;</span>
          <span className="gold-foil px-3 pb-1 font-script text-[3.2rem] leading-[1.1] sm:text-7xl">{couple.brideFull.first}</span>
          <span className="gold-text font-display text-2xl font-semibold tracking-[0.2em] sm:text-3xl">{couple.brideFull.last.toUpperCase()}</span>
        </motion.h1>

        <motion.div className="mt-8 w-full max-w-sm" {...fade(0.8)}>
          <div className="gold-rule" />
          <div className="flex items-stretch justify-center py-4 font-display text-gold-pale">
            <div className="flex-1">
              <p className="text-[0.7rem] tracking-[0.3em] text-gold-soft">{wedding.weekday.toUpperCase()}</p>
              <p className="gold-text text-4xl font-semibold leading-tight">
                {wedding.day}
                <sup className="text-base">{wedding.daySuffix.toUpperCase()}</sup>
              </p>
              <p className="text-xs tracking-[0.2em]">
                {wedding.month.toUpperCase()} {wedding.year}
              </p>
            </div>
            <div className="mx-3 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
            <div className="flex flex-1 flex-col justify-center">
              <p className="gold-text text-3xl font-semibold leading-tight">{wedding.displayTime.toUpperCase()}</p>
              <p className="text-[0.7rem] tracking-[0.3em] text-gold-soft">{wedding.timeNote.toUpperCase()}</p>
            </div>
          </div>
          <div className="gold-rule" />
        </motion.div>

        <motion.div className="mt-5" {...fade(0.95)}>
          <p className="font-display text-sm font-semibold tracking-[0.14em] text-gold-pale">{v.name.toUpperCase()}</p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-gold-soft/80">{v.address}</p>
        </motion.div>

        <motion.p className="gold-foil mt-6 px-4 pb-1 font-script text-4xl" {...fade(1.1)}>
          {invitation.motto}
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" {...fade(1.25)}>
          <a href="#invitation" className="btn btn-gold">Wedding details</a>
