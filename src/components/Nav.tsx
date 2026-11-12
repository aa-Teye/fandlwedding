"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, gallery, ministers } from "@/content";
import { Corner } from "./Floral";

const links: [string, string][] = [
  ["invitation", "Invitation"],
  ...(gallery.length > 0 ? ([["gallery", "Gallery"]] as [string, string][]) : []),
  ["venue", "Venue"],
  ["schedule", "Schedule"],
  ["programme", "Order of Service"],
  ...(ministers.length > 0 ? ([["ministers", "Ministers"]] as [string, string][]) : []),
  ["dress-code", "Dress Code"],
  ["gifts", "Gifts"],
  ["rsvp", "RSVP"],
  ["faq", "Questions"],
];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {(visible || open) && (
          <motion.nav
            initial={{ y: -72 }}
            animate={{ y: 0 }}
            exit={{ y: -72 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 border-b border-gold/30 bg-purple-deep/85 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
              <a href="#top" onClick={() => setOpen(false)} className="flex items-baseline">
                <span className="gold-foil px-1 font-script text-3xl">{couple.groom[0]}</span>
                <span className="gold-text font-serif text-lg italic">&amp;</span>
                <span className="gold-foil px-1 font-script text-3xl">{couple.bride[0]}</span>
              </a>
              <div className="flex items-center gap-2">
                <a href="#rsvp" onClick={() => setOpen(false)} className="btn btn-gold px-4 py-2">
                  RSVP
                </a>
                <button
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-soft"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                  </svg>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="velvet fixed inset-0 z-30 flex flex-col items-center justify-center gap-1 overflow-hidden pt-14"
          >
            <Corner pos="bl" className="w-36 opacity-90" />
            <Corner pos="br" className="w-36 opacity-90" variant={1} />
            {links.map(([id, label], i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="relative z-10 py-2 font-display text-xl tracking-[0.08em] text-gold-pale transition hover:text-gold-soft"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
