"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll-Reveal ([data-reveal]), Parallax ([data-parallax="0.2"]) und 3D-Tilt ([data-tilt]).
export function Effekte() {
  const pfad = usePathname();
  useEffect(() => {
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (ruhig) { reveal.forEach((el) => el.classList.add("sichtbar")); return; }
    document.documentElement.classList.add("fx");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("sichtbar"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveal.forEach((el) => io.observe(el));

    const para = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of para) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const speed = Number(el.dataset.parallax || 0.15);
        const mitte = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-mitte * speed).toFixed(1)}px, 0) scale(1.08)`;
      }
      const prog = document.querySelectorAll<HTMLElement>("[data-progress]");
      prog.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const fein = window.matchMedia("(pointer: fine)").matches;
    const tilts = fein ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
    const handlers = tilts.map((el) => {
      const move = (ev: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(0)`;
        el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      handlers.forEach((h) => h());
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pfad]);
  return null;
}
