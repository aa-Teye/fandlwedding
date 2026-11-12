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
