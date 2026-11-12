"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple, photos } from "@/content";

export function ExperienceLoader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(12);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    const critical = [photos.couple?.src, photos.invitation?.src, photos.saveTheDate?.src].filter(Boolean) as string[];
    let loaded = 0;
    const total = critical.length + 1; // +1 for fonts
    const tick = () => {
      loaded++;
      if (mounted) setProgress((p) => Math.max(p, Math.min(95, Math.round((loaded / total) * 85) + 10)));
    };
    critical.forEach((src) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
    if ("fonts" in document) document.fonts.ready.then(tick).catch(tick);
    else tick();

    const interval = setInterval(() => setProgress((p) => (p >= 95 ? 95 : p + 5)), 110);
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        if (!mounted) return;
        setDone(true);
        onLoaded();
      }, 380);
    }, 1700);
    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(finish);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="velvet fixed inset-0 z-[60] flex select-none flex-col items-center justify-center px-6 text-center"
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx={60} cy={60} r={56} fill="none" stroke="rgba(201,162,75,0.2)" strokeWidth={1.5} />
              <motion.circle
                cx={60}
                cy={60}
                r={56}
                fill="none"
                stroke="url(#fl-gold-line)"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              />
            </svg>
            <motion.p
              className="flex items-baseline"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gold-foil px-1 font-script text-5xl">{couple.groom[0]}</span>
              <span className="gold-text font-serif text-2xl italic">&amp;</span>
              <span className="gold-foil px-1 font-script text-5xl">{couple.bride[0]}</span>
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-7 font-serif text-2xl italic text-gold-pale"
          >
            Preparing your invitation…
          </motion.p>
          <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft/80">
            {couple.groom} &amp; {couple.bride}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
