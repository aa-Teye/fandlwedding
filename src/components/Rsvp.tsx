"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, rsvp, wedding } from "@/content";
import { Section, Reveal } from "./Section";

// Ghana numbers: 0246531897 -> 233246531897 (for WhatsApp) and "024 653 1897" (to read).
const intl = (p: string) => `233${p.replace(/\D/g, "").replace(/^0/, "")}`;
const pretty = (p: string) => p.replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

const field =
  "w-full rounded-xl border border-gold/40 bg-white/80 px-4 py-3 font-serif text-lg text-ink outline-none transition placeholder:text-muted/60 focus:border-purple focus:ring-2 focus:ring-purple/15";

export function Rsvp({ guest }: { guest?: string | null }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (guest) setName((n) => n || guest);
  }, [guest]);

  const to = rsvp.contacts[0];

  const whatsappUrl = () => {
    const lines = [
      `RSVP: ${couple.groom} & ${couple.bride}'s wedding, ${wedding.shortDate}`,
      "",
      `Name: ${name.trim()}`,
      attending === "yes" ? "Attending: Yes, joyfully! 🎉" : "Attending: Sorry, I can't make it",
      ...(attending === "yes" ? [`Number of guests: ${guests}`] : []),
      ...(message.trim() ? ["", `Message: ${message.trim()}`] : []),
    ];
    return `https://wa.me/${intl(to.phone)}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!name.trim()) return setError("Please tell us your name.");
    if (!attending) return setError("Please let us know if you can come.");
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending: attending === "yes", guests, message, invitedAs: guest ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "We couldn't save your reply. Please try again.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't save your reply. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section
      id="rsvp"
      eyebrow="Kindly respond"
      title="Confirm Your Attendance"
      subtitle={rsvp.by || "We'd love to know if you can celebrate with us"}
      art="envelope"
    >
      <Reveal from="zoom" className="card relative mx-auto max-w-lg overflow-hidden p-6 sm:p-9">
        <AnimatePresence mode="wait" initial={false}>
          {!sent ? (
            <motion.form key="form" onSubmit={send} exit={{ opacity: 0, y: -10 }} className="space-y-5" noValidate>
              <label className="block">
                <span className="eyebrow mb-2 block">Your name</span>
                <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ama & Kofi Mensah" autoComplete="name" />
              </label>

              <fieldset>
                <legend className="eyebrow mb-2 block">Will you attend?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["yes", "Joyfully accept"],
                      ["no", "Regretfully decline"],
                    ] as const
                  ).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAttending(v)}
                      aria-pressed={attending === v}
                      className={`rounded-xl border px-3 py-3 font-serif text-lg transition ${
                        attending === v
                          ? "border-purple bg-purple text-white shadow-[0_10px_20px_-12px_rgba(42,10,64,0.9)]"
                          : "border-gold/40 bg-white/70 text-purple hover:border-purple"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <AnimatePresence initial={false}>
                {attending === "yes" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <span className="eyebrow mb-2 block">How many of you?</span>
                    <div className="flex items-center gap-3">
                      <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-11 w-11 rounded-full border border-gold/50 text-xl text-purple">
                        −
                      </button>
                      <span className="w-10 text-center font-display text-2xl text-purple tabular-nums">{guests}</span>
                      <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(10, g + 1))} className="h-11 w-11 rounded-full border border-gold/50 text-xl text-purple">
                        +
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="block">
                <span className="eyebrow mb-2 block">A message for the couple (optional)</span>
                <textarea className={field} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your wishes…" />
              </label>

              {error && <p className="font-serif text-lg text-rose">{error}</p>}

              <button type="submit" disabled={sending} className="btn btn-primary w-full !py-4 disabled:opacity-60">
                {sending ? "Sending…" : "Send my reply"}
              </button>
            </motion.form>
          ) : (
            <motion.div key="thanks" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
              <motion.svg viewBox="0 0 52 52" className="mx-auto h-16 w-16" aria-hidden="true">
                <motion.circle cx={26} cy={26} r={24} fill="none" stroke="#c9a24b" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                <motion.path d="M15 27l7 7 15-16" fill="none" stroke="#4a1670" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }} />
              </motion.svg>
              <p className="mt-4 font-script text-5xl text-purple">Thank you!</p>
              <p className="mx-auto mt-3 max-w-xs font-serif text-lg text-muted">
                {attending === "yes" ? "Your reply has been received. We can't wait to celebrate with you!" : "Your reply has been received. We'll miss you on the day."}
              </p>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-outline mt-5">
                Also tell us on WhatsApp
              </a>
              <br />
              <button onClick={() => setSent(false)} className="mt-5 text-sm text-purple underline decoration-gold/60 underline-offset-4">
                Send another reply
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <p className="eyebrow">Or call / WhatsApp</p>
        <div className="mx-auto mt-4 grid max-w-lg gap-3 sm:grid-cols-2">
          {rsvp.contacts.map((c) => {
            const who = c.name || pretty(c.phone);
            return (
              <div key={c.phone} className="card flex items-center justify-between gap-3 px-5 py-3.5 text-left">
                <div>
                  {c.name && <p className="font-serif text-xl font-semibold leading-tight text-purple">{c.name}</p>}
                  <p className="text-sm tracking-[0.06em] text-muted [font-variant-numeric:lining-nums_tabular-nums]">
                    {pretty(c.phone)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={`tel:+${intl(c.phone)}`}
                    aria-label={`Call ${who}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-purple/40 text-purple transition hover:bg-purple hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/${intl(c.phone)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${who}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_18px_-10px_rgba(37,211,102,0.9)] transition hover:brightness-105"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
