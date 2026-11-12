import Link from "next/link";
import { couple } from "@/content";
import { Corners } from "@/components/Floral";

export default function NotFound() {
  return (
    <main className="velvet relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Corners className="w-32 sm:w-56" />
      <div className="relative z-10">
        <p className="eyebrow !text-gold-soft">Page not found</p>
        <h1 className="gold-foil mt-3 px-4 pb-2 font-script text-6xl">
          {couple.groom} <span className="font-serif text-4xl italic">&amp;</span> {couple.bride}
        </h1>
        <p className="mt-3 font-serif text-xl italic text-gold-pale/80">This page doesn&rsquo;t exist, but the celebration does.</p>
        <Link href="/" className="btn btn-gold mt-8">
          Go to the wedding website
        </Link>
      </div>
    </main>
  );
}
