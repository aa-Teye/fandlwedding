"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, rsvp, wedding } from "@/content";
import { Section, Reveal } from "./Section";

// Ghana numbers: 0246531897 -> 233246531897 (for WhatsApp) and "024 653 1897" (to read).
const intl = (p: string) => `233${p.replace(/\D/g, "").replace(/^0/, "")}`;
const pretty = (p: string) => p.replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

const field =
  "w-full rounded-xl border border-gold/40 bg-white/80 px-4 py-3 font-serif text-lg text-ink outline-none transition placeholder:text-muted/60 focus:border-purple focus:ring-2 focus:ring-purple/15";

export function Rsvp({ guest }: { guest?: string | null }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (guest) setName((n) => n || guest);
  }, [guest]);

