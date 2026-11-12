"use client";
import { useEffect, useState } from "react";

export function MusicToggle({ audio }: { audio: React.RefObject<HTMLAudioElement | null> }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    setPlaying(!el.paused);
    el.addEventListener("play", on);
    el.addEventListener("pause", off);
    return () => {
      el.removeEventListener("play", on);
      el.removeEventListener("pause", off);
    };
  }, [audio]);

