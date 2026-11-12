"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "@/content";
import { Section } from "./Section";

const arrow = "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = gallery.length;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, n]);

  if (n === 0) return null;

  return (
    <Section id="gallery" eyebrow="Moments" title="Gallery" art="camera" className="champagne">
      <div className="columns-2 gap-3 sm:columns-3">
        {gallery.map((p, i) => (
          <button key={p.src} onClick={() => setOpen(i)} className="mb-3 block w-full overflow-hidden rounded-xl ring-1 ring-gold/40">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(max-width: 640px) 50vw, 300px"
              className="h-auto w-full transition duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-purple-night/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <Image
              key={gallery[open].src}
              src={gallery[open].src}
              alt={gallery[open].alt}
              width={gallery[open].width}
              height={gallery[open].height}
              sizes="100vw"
              className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 text-3xl text-white">
              &times;
            </button>
            {n > 1 && (
              <>
                <button
                  aria-label="Previous photo"
                  className={`${arrow} left-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open - 1 + n) % n);
                  }}
                >
                  &lsaquo;
                </button>
                <button
                  aria-label="Next photo"
                  className={`${arrow} right-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open + 1) % n);
                  }}
                >
                  &rsaquo;
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
