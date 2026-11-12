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
            </p>
            <h2 className="mt-5 font-script text-[2.7rem] leading-[1.1] text-purple sm:text-6xl">
              {couple.groomFull.first}
              <br />
              {couple.groomFull.last}
            </h2>
            <Arrowed>AND</Arrowed>
            <h2 className="font-script text-[2.7rem] leading-[1.1] text-[#5a1440] sm:text-6xl">
              {couple.brideFull.first}
              <br />
              {couple.brideFull.last}
            </h2>
            <Flourish className="mx-auto mt-6 w-52" />
          </div>
        </Reveal>

        {cards.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow text-center">Keep a copy</p>
            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
              {cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.1} className="w-[78%] shrink-0 snap-center sm:w-auto">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={c.width}
                    height={c.height}
                    sizes="(max-width: 640px) 78vw, 320px"
                    className="h-auto w-full rounded-lg shadow-[0_24px_50px_-24px_rgba(42,10,64,0.6)] ring-1 ring-gold/40"
                  />
                  <div className="mt-4 text-center">
                    <p className="font-display text-lg tracking-[0.05em] text-purple">{c.label}</p>
                    <a href={c.src} download={c.file} className="btn btn-outline mt-3 py-2">
                      Download
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
            {cards.length > 1 && (
              <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:hidden">Swipe to see both</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
