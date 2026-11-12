"use client";
import { useState } from "react";

export function HymnLyrics({
  lyrics,
}: {
  lyrics: { stanza?: number; label?: string; lines: string[] }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2.5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-champagne/70 px-3 py-1 text-xs font-medium text-purple transition hover:border-purple print:hidden"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <span>{open ? "Hide lyrics" : "View lyrics"}</span>
      </button>
