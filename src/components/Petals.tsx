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
    g.beginPath();
    g.moveTo(32, 14);
    g.bezierCurveTo(36, 5, 55, 3, 57, 20);
    g.bezierCurveTo(59, 37, 44, 52, 32, 61);
    g.bezierCurveTo(20, 52, 5, 37, 7, 20);
    g.bezierCurveTo(9, 3, 28, 5, 32, 14);
    g.closePath();
    const grad = g.createRadialGradient(30, 20, 2, 32, 30, 40);
    grad.addColorStop(0, light);
    grad.addColorStop(0.55, mid);
    grad.addColorStop(1, base);
    g.fillStyle = grad;
    g.fill();
    g.strokeStyle = "rgba(255,255,255,0.28)";
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(14, 18);
    g.bezierCurveTo(20, 10, 28, 12, 31, 18);
    g.stroke();
    g.strokeStyle = "rgba(0,0,0,0.18)";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(32, 20);
    g.bezierCurveTo(31, 34, 32, 46, 32, 56);
    g.stroke();
