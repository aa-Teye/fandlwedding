"use client";
import Image from "next/image";
import { couple, invitation, photos, site } from "@/content";
import { Reveal } from "./Section";
import { Corner } from "./Floral";
import { Flourish, GoldFrame } from "./Ornaments";
import { Illustration } from "./Illustrations";

function Arrowed({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex items-center justify-center gap-3 text-gold-deep">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <span className="font-display text-sm font-semibold tracking-[0.3em]">{children}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}

export function Invitation() {
  const cards = [
    photos.saveTheDate && { ...photos.saveTheDate, label: "Save the Date", file: `${site.slug}-Save-the-Date.jpg` },
    photos.invitation && { ...photos.invitation, label: "Invitation", file: `${site.slug}-Invitation.jpg` },
  ].filter(Boolean) as { src: string; width: number; height: number; alt: string; label: string; file: string }[];

