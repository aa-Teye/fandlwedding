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
      initial={start}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  art,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  art?: ArtName;
  dark?: boolean;
}) {
  return (
