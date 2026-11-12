"use client";
import Image from "next/image";
import { couple, invitation, photos, site } from "@/content";
import { Reveal } from "./Section";
import { Corner } from "./Floral";
import { Flourish, GoldFrame } from "./Ornaments";
import { Illustration } from "./Illustrations";

function Arrowed({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex items-center justify-center gap-3 text-gold-deep">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <span className="font-display text-sm font-semibold tracking-[0.3em]">{children}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}

export function Invitation() {
  const cards = [
    photos.saveTheDate && { ...photos.saveTheDate, label: "Save the Date", file: `${site.slug}-Save-the-Date.jpg` },
    photos.invitation && { ...photos.invitation, label: "Invitation", file: `${site.slug}-Invitation.jpg` },
  ].filter(Boolean) as { src: string; width: number; height: number; alt: string; label: string; file: string }[];

  return (
    <section id="invitation" className="paper relative scroll-mt-14 overflow-hidden px-5 py-20 sm:py-28">
      <div className="relative mx-auto max-w-2xl">
        {/* the invitation card, recreated */}
        <Reveal from="zoom" className="relative overflow-hidden rounded-sm bg-ivory px-7 py-16 text-center shadow-[0_40px_80px_-40px_rgba(42,10,64,0.6)] sm:px-14 sm:py-20">
          <GoldFrame className="inset-3 sm:inset-4" />
          <Corner pos="tl" className="w-32 sm:w-48" />
          <Corner pos="br" className="w-32 sm:w-48" variant={1} />
          <div className="relative z-10">
            <Illustration name="heart" className="mx-auto mb-3 h-10 w-10" />
            <p className="font-display text-[0.72rem] font-semibold tracking-[0.3em] text-purple sm:text-sm">
              {invitation.line1.toUpperCase()}
            </p>
            <div className="gold-rule mx-auto my-4 w-40" />
            <p className="font-display text-xs tracking-[0.3em] text-purple/80">{invitation.families.toUpperCase()}</p>
            <div className="mt-2 flex items-center justify-center gap-3 font-display text-lg font-bold tracking-[0.12em] text-purple sm:text-2xl">
              <span>{couple.families[0].toUpperCase()}</span>
              <span className="h-6 w-px bg-gold" />
              <span className="gold-text font-serif text-3xl italic">&amp;</span>
              <span className="h-6 w-px bg-gold" />
              <span>{couple.families[1].toUpperCase()}</span>
            </div>
            <p className="mx-auto mt-4 max-w-xs font-display text-[0.7rem] font-semibold leading-relaxed tracking-[0.25em] text-purple/85 sm:max-w-sm sm:text-xs">
              {invitation.line2.toUpperCase()}
