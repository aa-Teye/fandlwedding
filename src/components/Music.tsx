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

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-purple-deep text-gold-soft shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
        {playing ? <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /> : <path d="M17 9l5 6M22 9l-5 6" />}
      </svg>
    </button>
  );
}
