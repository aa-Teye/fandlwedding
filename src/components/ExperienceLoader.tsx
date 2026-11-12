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
