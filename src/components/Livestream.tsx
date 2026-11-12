"use client";
import { livestream, wedding } from "@/content";
import { Reveal } from "./Section";

export function Livestream() {
  if (!livestream.url) return null;
  return (
    <section id="live" className="velvet px-6 py-14 text-center text-gold-pale">
      <Reveal>
        <p className="eyebrow !text-gold-soft">Can&rsquo;t be with us?</p>
        <h2 className="gold-text mt-2 font-display text-2xl tracking-[0.05em] sm:text-3xl">Watch the ceremony live</h2>
        <p className="mt-2 font-serif text-lg italic text-gold-pale/80">
          {wedding.displayDate} · {wedding.displayTime} (Ghana time)
        </p>
        <a href={livestream.url} target="_blank" rel="noreferrer" className="btn btn-gold mt-6">
          Watch on {livestream.platform}
        </a>
      </Reveal>
    </section>
  );
}
