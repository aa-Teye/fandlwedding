"use client";
import { motion } from "framer-motion";

// Gold line drawings that draw themselves when they scroll into view.

const art = {
  hourglass: [
    "M16 6h32v4H16zM16 54h32v4H16z",
    "M20 10c0 14 10 18 10 22s-10 8-10 22M44 10c0 14-10 18-10 22s10 8 10 22",
    "M25 20q7 4 14 0M23 52q9-10 18 0M32 34v12",
  ],
  church: [
    "M32 3v9M28.5 6.5h7",
    "M26 21l6-9 6 9M27 21v12M37 21v12",
    "M8 35l24-13 24 13M13 33v25h38V33",
    "M28 58v-9a4 4 0 018 0v9M30 28a2 2 0 104 0 2 2 0 10-4 0M18 49v-6a2 2 0 014 0v6zM42 49v-6a2 2 0 014 0v6zM4 58h56",
  ],
  clock: [
    "M32 10a22 22 0 110 44 22 22 0 110-44z",
    "M32 32V18M32 32l10 6",
    "M32 13.5v3M50.5 32h-3M32 50.5v-3M13.5 32h3M29 6h6M32 6v4",
  ],
  book: [
    "M8 18c10-4 18-3 24 2 6-5 14-6 24-2v30c-10-4-18-3-24 2-6-5-14-6-24-2z",
    "M32 20v30",
    "M13 27c5-1.5 9-1 13 .5M13 33c5-1.5 9-1 13 .5M13 39c5-1.5 9-1 13 .5M44 24v13M39.5 28.5h9",
