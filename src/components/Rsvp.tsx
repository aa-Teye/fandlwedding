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
                Change my reply
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <Reveal className="mt-8 text-center">
        <p className="eyebrow">Or call / WhatsApp</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {rsvp.contacts.map((c) => (
            <a key={c.phone} href={`tel:+${intl(c.phone)}`} className="btn btn-outline">
              {c.name ? `${c.name} · ` : ""}
              {pretty(c.phone)}
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
