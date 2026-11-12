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
    if (!id) return;
    setSkipIntro(true);
    setOpened(true);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  // Personal invite links look like /?to=Ama%20%26%20Kofi
  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get("to")?.trim();
    if (to) setGuest(to.slice(0, 60));
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      {!skipIntro && !experienceReady && <ExperienceLoader onLoaded={() => setExperienceReady(true)} />}
      {!skipIntro && (
        <RoyalGate
          guest={guest}
          onStart={() => {
            if (music.enabled) audioRef.current?.play().catch(() => {});
          }}
          onOpen={() => setOpened(true)}
        />
      )}
      {music.enabled && <audio ref={audioRef} src={music.src} loop preload="auto" />}
      {music.enabled && opened && <MusicToggle audio={audioRef} />}
      {effects.petals && opened && <PetalField />}
      {opened && <Nav />}
      <main>
        <Hero show={opened} guest={guest} />
        <Countdown />
        <Livestream />
        <Invitation />
        <Gallery />
        <Venue />
        <Schedule />
        <Programme />
        <Ministers />
        <DressCode />
        <Gifts />
        <Rsvp guest={guest} />
        <Faq />
        <Note />
        <Footer />
      </main>
    </MotionConfig>
  );
}
