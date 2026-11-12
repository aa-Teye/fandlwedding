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

