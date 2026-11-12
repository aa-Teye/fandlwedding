"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, gallery, ministers } from "@/content";
import { Corner } from "./Floral";

const links: [string, string][] = [
  ["invitation", "Invitation"],
  ...(gallery.length > 0 ? ([["gallery", "Gallery"]] as [string, string][]) : []),
  ["venue", "Venue"],
  ["schedule", "Schedule"],
  ["programme", "Order of Service"],
  ...(ministers.length > 0 ? ([["ministers", "Ministers"]] as [string, string][]) : []),
  ["dress-code", "Dress Code"],
  ["gifts", "Gifts"],
  ["rsvp", "RSVP"],
  ["faq", "Questions"],
];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
