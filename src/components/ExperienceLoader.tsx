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
