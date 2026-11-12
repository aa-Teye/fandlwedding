import type { Metadata } from "next";
import Link from "next/link";
import { church, couple, ministers, orderOfService, scripture, wedding } from "@/content";
import { Corner } from "@/components/Floral";
import { Flourish, GoldFrame } from "@/components/Ornaments";
import { Credit, ProgrammeList } from "@/components/Details";

export const metadata: Metadata = {
  title: `Order of Service — ${couple.groom} & ${couple.bride}`,
  description: `The order of service for the marriage ceremony of ${couple.groom} & ${couple.bride}.`,
};

export default function ProgrammePage() {
  return (
    <main className="paper relative min-h-screen overflow-hidden px-5 py-16 print:bg-none print:py-0">
      <GoldFrame className="inset-3 print:hidden sm:inset-5" />
      <Corner pos="tl" className="w-28 print:hidden sm:w-48" />
      <Corner pos="tr" className="w-28 print:hidden sm:w-48" variant={1} />
      <div className="relative z-10 mx-auto max-w-xl">
        <header className="pt-10 text-center">
          <p className="eyebrow">{church.name}</p>
          <p className="mt-4 font-display text-sm uppercase tracking-[0.18em] text-purple">The marriage ceremony of</p>
          <h1 className="mt-1 font-script text-6xl leading-tight text-purple sm:text-7xl">
            {couple.groom} <span className="font-serif text-4xl italic text-gold-deep">&amp;</span> {couple.bride}
          </h1>
          <p className="mt-2 font-serif text-lg italic text-muted">
            {wedding.displayDate} · {wedding.displayTime}
          </p>
          <Flourish className="mx-auto mt-5 w-52" animate={false} />
          <h2 className="mt-6 font-display text-2xl tracking-[0.05em] text-purple">Order of Service</h2>
        </header>

        {orderOfService.length > 0 ? (
          <div className="card mt-8 p-0">
            <ProgrammeList items={orderOfService} />
          </div>
        ) : (
          <div className="card mt-8 p-8 text-center">
            <p className="font-display text-lg text-purple">Coming soon</p>
            <p className="mt-2 font-serif text-lg text-muted">The order of service will appear here before the day.</p>
          </div>
        )}

        {ministers.map((g) => (
          <section key={g.church} className="mt-10 text-center">
            <p className="eyebrow">{g.church}</p>
            <div className="mt-2 space-y-1">
              {g.names.map((m) => (
                <p key={m} className="font-serif text-xl font-semibold text-purple">
