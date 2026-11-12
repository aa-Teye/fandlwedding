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
