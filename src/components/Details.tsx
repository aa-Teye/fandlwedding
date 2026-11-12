"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  venues, wedding, couple, schedule, orderOfService, ministers, dressCode, church,
  gifts, faqs, note, scripture, effects,
} from "@/content";
import { Section, Reveal } from "./Section";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { Corner } from "./Floral";
import { Amp, Flourish, GoldFrame } from "./Ornaments";
import { Illustration, Sparkles } from "./Illustrations";
import { HymnLyrics } from "./HymnLyrics";

const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function Venue() {
  return (
    <Section id="venue" eyebrow="Where" title="The Venue" subtitle={wedding.displayDate} art="church" className="champagne">
      <div className={`grid gap-6 ${venues.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {venues.map((v, i) =>
          v.confirmed ? (
            <Reveal key={v.label} delay={i * 0.1} className="card p-6 text-center">
              <p className="eyebrow">
                {v.label} · {v.time}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-[0.06em] text-purple sm:text-2xl">{v.name}</h3>
