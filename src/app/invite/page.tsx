"use client";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { couple, venues, wedding } from "@/content";

function inviteMessage(name: string, link: string) {
  return [
    `Dear ${name},`,
    "",
    `Together with our families, we joyfully invite you to celebrate our marriage on ${wedding.displayDate} at ${wedding.displayTime} prompt, ${venues[0].name}, ${venues[0].address}.`,
    "",
    `Open your invitation: ${link}`,
    "",
    "With love,",
    `${couple.groom} & ${couple.bride}`,
  ].join("\n");
}

function QrCard({ label, url }: { label: string; url: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, { width: 1024, margin: 2, color: { dark: "#3B1258", light: "#FFFFFF" } })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [url]);
  return (
    <div className="rounded-2xl border border-gold/30 bg-white/80 p-5 text-center">
      <p className="font-serif text-xl text-purple">{label}</p>
      <p className="mt-1 break-all text-xs text-muted">{url}</p>
      {src && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`QR code for ${label}`} className="mx-auto mt-3 w-44" />
          <a href={src} download={`${label.toLowerCase().replace(/\s+/g, "-")}-qr.png`} className="btn btn-outline mt-3 py-2">
            Download QR
          </a>
        </>
      )}
    </div>
  );
}

export default function InvitePage() {
  const [origin, setOrigin] = useState("");
  const [names, setNames] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);

  const rows = useMemo(
    () =>
      names
        .split("\n")
        .map((n) => n.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 300)
        .map((name) => {
          const link = `${origin}/?to=${encodeURIComponent(name)}`;
          return { name, link, text: inviteMessage(name, link) };
        }),
    [names, origin],
  );

  const copy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="paper min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-center">For the couple</p>
        <h1 className="mt-2 text-center font-display text-3xl text-purple sm:text-4xl">Personal Invitations</h1>
        <p className="mx-auto mt-3 max-w-lg text-balance text-center text-muted">
          Type one guest (or couple) per line. Each gets their own personalized link where the envelope greets them by name.
        </p>
        <textarea
          value={names}
          onChange={(e) => setNames(e.target.value)}
          rows={6}
          placeholder={"Ama\nKofi & Efua Mensah\nAuntie Akos"}
          className="mt-8 w-full rounded-xl border border-gold/40 bg-white/80 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/15"
        />
        {rows.length > 0 && <p className="mt-6 text-sm text-muted">{rows.length} invitation{rows.length > 1 ? "s" : ""} ready</p>}
        <ul className="mt-3 space-y-4">
          {rows.map((r, i) => (
            <li key={`${i}-${r.name}`} className="rounded-2xl border border-gold/30 bg-white/80 p-5">
              <p className="font-serif text-xl text-purple">{r.name}</p>
              <p className="mt-1 break-all text-xs text-muted">{r.link}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(r.text)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] py-2 text-white"
                >
                  Send on WhatsApp
                </a>
                <button onClick={() => copy(`${i}m`, r.text)} className="btn btn-outline py-2">
                  {copied === `${i}m` ? "Copied" : "Copy message"}
                </button>
                <button onClick={() => copy(`${i}l`, r.link)} className="btn btn-outline py-2">
                  {copied === `${i}l` ? "Copied" : "Copy link"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <p className="eyebrow text-center">Printable QR codes</p>
          <p className="mx-auto mt-2 max-w-md text-balance text-center text-sm text-muted">
            For church guests. Download these once the site is live on its real address, so the codes point there.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <QrCard label="Wedding website" url={origin ? `${origin}/` : ""} />
            <QrCard label="Order of Service" url={origin ? `${origin}/programme` : ""} />
          </div>
        </section>
      </div>
    </main>
  );
}
