"use client";
import { motion } from "framer-motion";
import { Flourish } from "./Ornaments";
import { Illustration, type ArtName } from "./Illustrations";

export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right" | "zoom";
}) {
  const start = {
    up: { opacity: 0, y: 34 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    zoom: { opacity: 0, scale: 0.9 },
  }[from];
  return (
    <motion.div
      className={className}
