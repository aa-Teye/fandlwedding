"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { effects, wedding } from "@/content";
import { Reveal } from "./Section";
import { Illustration, Sparkles } from "./Illustrations";
import { Flourish } from "./Ornaments";

const start = new Date(wedding.date).getTime();
const dayEnd = (() => {
  const d = new Date(wedding.date);
  d.setUTCHours(23, 59, 59, 999); // Accra is UTC+0
  return d.getTime();
})();

function parts(ms: number) {
  return {
    Days: Math.floor(ms / 864e5),
    Hours: Math.floor((ms / 36e5) % 24),
    Minutes: Math.floor((ms / 6e4) % 60),
    Seconds: Math.floor((ms / 1e3) % 60),
  };
}

const face =
  "absolute inset-x-0 overflow-hidden bg-gradient-to-b from-[#4f1a78] to-[#2c0b44] text-gold-pale";

