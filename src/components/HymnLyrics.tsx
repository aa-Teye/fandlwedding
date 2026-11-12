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

      <div
        className={`${
          open ? "block" : "hidden"
        } print:block mt-3 space-y-4 rounded-xl border border-gold/25 bg-ivory/90 p-4 text-left shadow-sm sm:p-5`}
      >
        {lyrics.map((s, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="pt-0.5 font-sans text-xs font-semibold text-gold-deep min-w-4 shrink-0">
              {s.label ?? s.stanza}
            </span>
            <div className="font-serif text-base italic leading-relaxed text-purple">
              {s.lines.map((l, li) => (
                <p key={li}>{l}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

