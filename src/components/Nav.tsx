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
