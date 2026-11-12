"use client";
import { useEffect, useRef } from "react";

// Rose petals and gold dust drawn on a canvas. Petal sprites are painted once, then reused.

const PETAL_COLOURS: [string, string, string][] = [
  // [light, mid, base]
  ["#ee5a5c", "#b3172b", "#6a0714"], // deep rose red
  ["#ff9070", "#e0442e", "#a1200f"], // tomato red
  ["#a874d8", "#5d2490", "#2a0942"], // royal purple
  ["#c9a0ea", "#7b3fae", "#40145f"], // soft purple
  ["#e86a66", "#c22a33", "#7c0b18"], // crimson
];

type Particle = {
  x: number; y: number; vx: number; vy: number;
  rot: number; vr: number; flip: number; vflip: number;
  size: number; sprite: number; phase: number; swayAmp: number; swaySpeed: number;
  alpha: number; gold: boolean; life: number; decay: number;
};

function makeSprites() {
  const sprites: HTMLCanvasElement[] = PETAL_COLOURS.map(([light, mid, base]) => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
