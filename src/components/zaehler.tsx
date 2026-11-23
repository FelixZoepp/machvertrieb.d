"use client";
import { useEffect, useRef, useState } from "react";

// Zählt beim Sichtbarwerden von 0 auf den Zielwert hoch (deutsches Zahlenformat).
export function Zaehler({ wert, dauer = 1600, vor = "", nach = "" }: { wert: number; dauer?: number; vor?: string; nach?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(wert);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dauer);
        setN(Math.round(wert * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    const netz = setTimeout(() => setN((x) => (x === 0 ? wert : x)), 5000);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(netz); };
  }, [wert, dauer]);
  return <span ref={ref}>{vor}{n.toLocaleString("de-DE")}{nach}</span>;
}
