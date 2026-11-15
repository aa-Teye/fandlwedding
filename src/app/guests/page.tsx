import type { Metadata } from "next";
import { couple } from "@/content";
import { db, type RsvpRow } from "@/lib/db";
import { GUESTS_KEY } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Guest list",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// For the couple: /guests?key=YOUR_KEY  (the key is GUESTS_KEY in the environment variables)
export default async function GuestsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!GUESTS_KEY || key !== GUESTS_KEY) {
    return (
      <main className="velvet flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="gold-text font-display text-2xl tracking-[0.08em]">Guest list</p>
          <p className="mt-3 font-serif text-lg italic text-gold-pale/80">This page is private. Open it with the link you were given.</p>
        </div>
      </main>
    );
  }

  const rows = (await db()`select * from rsvps order by created_at desc`) as RsvpRow[];
  const coming = rows.filter((r) => r.attending);
  const seats = coming.reduce((n, r) => n + r.guests, 0);
  const stats = [
    ["Replies", rows.length],
    ["Coming", coming.length],
    ["Seats needed", seats],
    ["Can't come", rows.length - coming.length],
  ] as const;

  return (
    <main className="paper min-h-screen px-5 py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-center">For {couple.groom} &amp; {couple.bride}</p>
        <h1 className="mt-2 text-center font-display text-3xl text-purple sm:text-4xl">Guest List</h1>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([label, n]) => (
            <div key={label} className="card p-4 text-center">
              <p className="font-display text-3xl text-purple tabular-nums">{n}</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-muted">{label}</p>
            </div>
          ))}
        </div>
        {rows.length === 0 ? (
          <p className="mt-10 text-center font-serif text-xl italic text-muted">No replies yet.</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif text-xl font-semibold text-purple">{r.name}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] ${
                      r.attending ? "bg-green/60 text-leaf" : "bg-tomato/15 text-rose"
                    }`}
                  >
                    {r.attending ? `Coming · ${r.guests}` : "Can't come"}
                  </span>
                </div>
                {r.message && <p className="mt-2 font-serif text-lg italic text-muted">&ldquo;{r.message}&rdquo;</p>}
                <p className="mt-2 text-xs text-muted">
                  {new Date(r.created_at).toLocaleString("en-GB", { timeZone: "Africa/Accra", dateStyle: "medium", timeStyle: "short" })}
                  {r.invited_as && r.invited_as !== r.name ? ` · invited as ${r.invited_as}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
