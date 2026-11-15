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
    return c;
  });
  // gold dust
  const d = document.createElement("canvas");
  d.width = d.height = 32;
  const g = d.getContext("2d")!;
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255,248,215,1)");
  grad.addColorStop(0.25, "rgba(240,206,120,0.95)");
  grad.addColorStop(0.6, "rgba(201,162,75,0.35)");
  grad.addColorStop(1, "rgba(201,162,75,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  sprites.push(d);
  return sprites;
}

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCanvas(
  setup: (ctx: { w: number; h: number }) => Particle[],
  step: (p: Particle, i: number, size: { w: number; h: number }, t: number) => boolean,
  opts: { running: boolean; onDone?: () => void },
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const setupRef = useRef(setup);
  const stepRef = useRef(step);
  const doneRef = useRef(opts.onDone);
  setupRef.current = setup;
  stepRef.current = step;
  doneRef.current = opts.onDone;

  useEffect(() => {
    if (!opts.running || reduced()) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sprites = makeSprites();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = { w: 0, h: 0 };
    const resize = () => {
      size.w = canvas.clientWidth;
      size.h = canvas.clientHeight;
      canvas.width = Math.round(size.w * dpr);
      canvas.height = Math.round(size.h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    let particles = setupRef.current(size);
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const frame = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      t += dt;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p, i) => {
        // apply the step dt times' worth of motion
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vflip * dt;
        const keep = stepRef.current(p, i, size, t);
        if (!keep) return false;
        const sway = Math.sin(t * p.swaySpeed + p.phase) * p.swayAmp;
        const s = p.size * dpr;
        ctx.setTransform(1, 0, 0, 1, (p.x + sway) * dpr, p.y * dpr);
        ctx.rotate(p.rot);
        if (!p.gold) ctx.scale(Math.cos(p.flip) * 0.85 + 0.15 * Math.sign(Math.cos(p.flip) || 1), 1);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * p.life));
        ctx.drawImage(sprites[p.gold ? sprites.length - 1 : p.sprite], -s / 2, -s / 2, s, s);
        return true;
      });
      ctx.globalAlpha = 1;
      if (particles.length === 0) {
        doneRef.current?.();
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [opts.running]);

  return ref;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function petal(x: number, y: number, size: number): Particle {
  return {
    x, y, vx: rand(-0.25, 0.25), vy: rand(0.55, 1.25),
    rot: rand(0, Math.PI * 2), vr: rand(-0.025, 0.025), flip: rand(0, Math.PI * 2), vflip: rand(0.02, 0.06),
    size, sprite: Math.floor(Math.random() * PETAL_COLOURS.length),
    phase: rand(0, Math.PI * 2), swayAmp: rand(8, 26), swaySpeed: rand(0.01, 0.025),
    alpha: rand(0.75, 0.95), gold: false, life: 1, decay: 0,
  };
}

/** A drifting petal: fewer and more see-through than the burst, so text underneath stays readable. */
function drifter(x: number, y: number, size: number): Particle {
  const p = petal(x, y, size);
  p.alpha = rand(0.4, 0.6);
  return p;
}

/** Rose petals drifting down the whole page. Sparser once guests scroll past the top. */
export function PetalField({ active = true }: { active?: boolean }) {
  const ref = useCanvas(
    ({ w, h }) => {
      const n = w < 640 ? 8 : 14;
      return Array.from({ length: n }, () => drifter(rand(0, w), rand(-h, h), rand(w < 640 ? 11 : 14, w < 640 ? 18 : 24)));
    },
    (p, _i, { w, h }) => {
      if (p.y > h + 40 || p.x < -80 || p.x > w + 80) {
        const sparse = window.scrollY > window.innerHeight * 0.9;
        Object.assign(p, drifter(rand(0, w), -40 - (sparse ? rand(0, h * 1.6) : rand(0, 120)), p.size));
      }
      return true;
    },
    { running: active },
  );
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 h-full w-full" />;
}

/** A one-off burst of petals and gold dust from the centre of the screen. */
export function PetalBurst({ fire, onDone }: { fire: boolean; onDone?: () => void }) {
  const ref = useCanvas(
    ({ w, h }) => {
      const cx = w / 2;
      const cy = h * 0.5;
      const big = w >= 640;
      const petals = Array.from({ length: big ? 70 : 46 }, () => {
        const a = rand(0, Math.PI * 2);
        const v = rand(4, big ? 15 : 11);
        const p = petal(cx + rand(-20, 20), cy + rand(-20, 20), rand(14, big ? 30 : 24));
        p.vx = Math.cos(a) * v;
        p.vy = Math.sin(a) * v - rand(2, 5);
        p.vr = rand(-0.12, 0.12);
        p.vflip = rand(0.06, 0.16);
        return p;
      });
      const dust = Array.from({ length: big ? 90 : 60 }, () => {
        const a = rand(0, Math.PI * 2);
        const v = rand(1.5, big ? 12 : 9);
        const p = petal(cx, cy, rand(4, 12));
        p.gold = true;
        p.vx = Math.cos(a) * v;
        p.vy = Math.sin(a) * v - rand(0, 3);
        p.swayAmp = rand(2, 8);
        p.decay = rand(0.006, 0.014);
        p.alpha = 1;
        return p;
      });
      return [...petals, ...dust];
    },
    (p, _i, { w, h }) => {
      p.vx *= 0.975;
      p.vy = p.vy * 0.975 + (p.gold ? 0.03 : 0.12);
      if (!p.gold && p.vy > 1.6) p.vy = 1.6;
      if (p.gold) p.life -= p.decay;
      return p.life > 0 && p.y < h + 50 && p.x > -80 && p.x < w + 80;
    },
    { running: fire, onDone },
  );
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55] h-full w-full" />;
}
