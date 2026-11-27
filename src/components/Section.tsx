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
  // Content pops gently into place: it fades in while a soft spring settles it with a slight bounce.
  const start = {
    up: { opacity: 0, y: 30, scale: 0.96 },
    left: { opacity: 0, x: -36, scale: 0.97 },
    right: { opacity: 0, x: 36, scale: 0.97 },
    zoom: { opacity: 0, scale: 0.86 },
  }[from];
  return (
    <motion.div
      className={className}
      initial={start}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 17,
        mass: 0.9,
        delay,
        opacity: { duration: 0.55, ease: "easeOut", delay },
      }}
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
    <div className="text-center">
      {art && <Illustration name={art} dark={dark} className="mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20" />}
      <Reveal>
        {eyebrow && <p className={`eyebrow mb-3 ${dark ? "!text-gold-soft" : ""}`}>{eyebrow}</p>}
        <h2
          className={`font-display text-[1.75rem] font-medium leading-snug tracking-[0.06em] sm:text-4xl ${
            dark ? "gold-text" : "text-purple"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-balance font-serif text-xl italic ${dark ? "text-gold-pale/80" : "text-muted"}`}>{subtitle}</p>
        )}
      </Reveal>
      <Flourish className="mx-auto mt-4 w-52 sm:w-60" />
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  art,
  children,
  className = "paper",
  width = "max-w-3xl",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  art?: ArtName;
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-14 overflow-hidden px-6 py-20 sm:py-28 ${className}`}>
      <div className={`relative z-10 mx-auto ${width}`}>
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} art={art} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
