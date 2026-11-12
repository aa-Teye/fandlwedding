"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, wedding } from "@/content";
import { Corner } from "./Floral";
import { Amp, Seal } from "./Ornaments";
import { PetalBurst } from "./Petals";

const swing = [0.62, 0, 0.28, 1] as const;
const DOORS_AT = 0.55; // seconds after the tap
const DOORS_FOR = 1.75;

// The seam fades out behind the words on the doors.
const seamMask =
  "linear-gradient(to bottom, #000 0%, #000 14%, transparent 18%, transparent 47%, #000 51%, #000 70%, transparent 73%, transparent 85%, #000 88%)";

const satinBand =
  "linear-gradient(180deg,#6e1206 0%,#b52a17 10%,#e9563d 26%,#ffa088 38%,#e0442e 52%,#c3341f 70%,#8f1d0c 90%,#62100a 100%)";

function Door({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute top-0 h-full w-1/2 ${left ? "left-0" : "right-0"}`}
      style={{ transformOrigin: left ? "left center" : "right center", transformStyle: "preserve-3d" }}
      initial={false}
      animate={opening ? { rotateY: left ? 102 : -102 } : { rotateY: 0 }}
      transition={{ delay: DOORS_AT, duration: DOORS_FOR, ease: swing }}
    >
      <div
        className="velvet absolute inset-0 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          boxShadow: left
            ? "inset -22px 0 36px -14px rgba(8,0,16,0.75)"
            : "inset 22px 0 36px -14px rgba(8,0,16,0.75)",
        }}
      >
        {/* arched door panel in gold */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d={left ? "M10 97V20Q10 4 52 4Q94 4 94 20V97Z" : "M6 97V20Q6 4 48 4Q90 4 90 20V97Z"}
            fill="none"
            stroke="#d9b45e"
            strokeOpacity={0.7}
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={left ? "M14 94V22Q14 8 52 8Q90 8 90 22V94Z" : "M10 94V22Q10 8 48 8Q86 8 86 22V94Z"}
            fill="none"
            stroke="#d9b45e"
            strokeOpacity={0.35}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
