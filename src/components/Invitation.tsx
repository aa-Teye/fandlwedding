"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

/** The invitation wording, recreated. Shown only until the couple's own artwork is added. */
function RecreatedCard() {
  return (
    <Reveal from="zoom" className="relative overflow-hidden rounded-sm bg-ivory px-7 py-16 text-center shadow-[0_40px_80px_-40px_rgba(42,10,64,0.6)] sm:px-14 sm:py-20">
      <GoldFrame className="inset-3 sm:inset-4" />
      <Corner pos="tl" className="w-32 sm:w-48" />
      <Corner pos="br" className="w-32 sm:w-48" variant={1} />
      <div className="relative z-10">
        <Illustration name="heart" className="mx-auto mb-3 h-10 w-10" />
        <p className="font-display text-[0.72rem] font-semibold tracking-[0.3em] text-purple sm:text-sm">{invitation.line1.toUpperCase()}</p>
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
  );
}

export function Invitation() {
  const art = photos.invitation;
  const [zoom, setZoom] = useState(false);

  const downloads = [
    art && { src: art.src, label: "Download the invitation", file: `${site.slug}-Invitation.jpg` },
    photos.saveTheDate && { src: photos.saveTheDate.src, label: "Download the save the date", file: `${site.slug}-Save-the-Date.jpg` },
  ].filter(Boolean) as { src: string; label: string; file: string }[];

  // Full-size view: Escape closes it, and the page behind stays still.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <section id="invitation" className="paper relative scroll-mt-14 overflow-hidden px-5 py-20 sm:py-28">
      <div className="relative mx-auto max-w-2xl">
        {art ? (
          <>
            <Reveal className="text-center">
              <p className="eyebrow mb-3">You are invited</p>
              <h2 className="font-display text-[1.75rem] font-medium leading-snug tracking-[0.06em] text-purple sm:text-4xl">Our Invitation</h2>
              <Flourish className="mx-auto mt-4 w-52 sm:w-60" />
            </Reveal>
            <Reveal from="zoom" delay={0.1} className="relative mx-auto mt-10 max-w-md">
              <div aria-hidden="true" className="absolute -inset-3 rounded-lg border border-gold/40" />
              <button
                type="button"
                onClick={() => setZoom(true)}
                aria-label="View the invitation full size"
                className="group relative block w-full overflow-hidden rounded-md shadow-[0_40px_80px_-30px_rgba(42,10,64,0.65)] ring-1 ring-gold/50"
              >
                <Image
                  src={art.src}
                  alt={art.alt}
                  width={art.width}
                  height={art.height}
                  sizes="(max-width: 640px) 92vw, 448px"
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-purple-night/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-pale backdrop-blur">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  Tap to enlarge
                </span>
              </button>
            </Reveal>
          </>
        ) : (
          <RecreatedCard />
        )}

        {downloads.length > 0 && (
          <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
            {downloads.map((d) => (
              <a key={d.file} href={d.src} download={d.file} className="btn btn-outline">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                {d.label}
              </a>
            ))}
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {zoom && art && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-purple-night/95 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            role="dialog"
            aria-label="Invitation"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative h-full max-h-[94svh] w-full max-w-[min(94vw,62svh)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={art.src} alt={art.alt} fill sizes="94vw" className="rounded-md object-contain" />
            </motion.div>
            <button
              aria-label="Close"
              onClick={() => setZoom(false)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
