"use client";
import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ExperienceLoader } from "@/components/ExperienceLoader";
import { RoyalGate } from "@/components/RoyalGate";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Venue, Schedule, Programme, Ministers, DressCode, Gifts, Faq, Note, Footer } from "@/components/Details";
import { Invitation } from "@/components/Invitation";
import { Gallery } from "@/components/Gallery";
import { Nav } from "@/components/Nav";
import { Livestream } from "@/components/Livestream";
import { MusicToggle } from "@/components/Music";
import { PetalField } from "@/components/Petals";
import { Rsvp } from "@/components/Rsvp";
import { effects, music } from "@/content";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [experienceReady, setExperienceReady] = useState(false);
  const [guest, setGuest] = useState<string | null>(null);
  const [skipIntro, setSkipIntro] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Links straight to a section (e.g. /#programme or /#rsvp) skip the gate.
  useEffect(() => {
    const id = window.location.hash.slice(1);
