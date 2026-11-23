"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BUNDESLAENDER, DEUTSCHLAND_UMRISS, KARTE_BREITE, KARTE_HOEHE, KARTE_VIEWBOX, geoZuXY } from "@/lib/deutschland-pfade";
import { PARTNER_ORTE, PARTNER_REGIONEN, SITZ } from "@/lib/karte";

// Deutschlandkarte: Umriss zeichnet sich beim Scrollen, Partnerpunkte erscheinen nacheinander,
// Linien fließen vom Sitz in Berlin. Hover/Tap zeigt Ort und Branche.
const START = 1.4;
const ABSTAND = 0.2;
const pct = (x: number, y: number) => ({ left: `${(x / KARTE_BREITE) * 100}%`, top: `${(y / KARTE_HOEHE) * 100}%` });

export function Karte() {
  const ref = useRef<HTMLDivElement>(null);
  const [an, setAn] = useState(false);
  const [aktiv, setAktiv] = useState<string | null>(null);
  const berlin = useMemo(() => geoZuXY(SITZ.lat, SITZ.lon), []);
  const regionen = useMemo(() => new Set(PARTNER_REGIONEN.map((r) => r.id)), []);
  const punkte = useMemo(() => PARTNER_ORTE.map((o, i) => {
    const [x, y] = geoZuXY(o.lat, o.lon);
    const dx = x - berlin[0], dy = y - berlin[1], len = Math.hypot(dx, dy) || 1, b = Math.min(70, len * 0.22);
    const cx = (berlin[0] + x) / 2 - (dy / len) * b, cy = (berlin[1] + y) / 2 + (dx / len) * b;
    return { ...o, i, x, y, linie: `M${berlin[0]},${berlin[1]} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x},${y}` };
  }), [berlin]);
  const regionMitte = useMemo(() => {
    const ls = BUNDESLAENDER.filter((b) => regionen.has(b.id));
    return [ls.reduce((s, b) => s + b.mitte[0], 0) / ls.length, ls.reduce((s, b) => s + b.mitte[1], 0) / ls.length] as const;
  }, [regionen]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) { setAn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    const netz = setTimeout(() => setAn(true), 4000);
    return () => { io.disconnect(); clearTimeout(netz); };
  }, []);

  const tip = (k: string) => ({
    onPointerEnter: () => setAktiv(k),
    onPointerLeave: () => setAktiv((a) => (a === k ? null : a)),
    onFocus: () => setAktiv(k),
    onBlur: () => setAktiv(null),
    onClick: () => setAktiv((a) => (a === k ? null : k)),
  });
  const d = (s: number) => `${s}s`;
  const ap = punkte.find((p) => p.ort === aktiv);

  return (
    <div ref={ref} className={`karte${an ? " karte--an" : ""}`}>
      <div className="karte__flaeche" style={{ aspectRatio: `${KARTE_BREITE} / ${KARTE_HOEHE}` }}>
        <svg viewBox={KARTE_VIEWBOX} role="img" aria-label="Deutschlandkarte mit unserem Sitz in Berlin und Standorten unserer Partner-Vertriebe">
          <defs>
            <linearGradient id="k-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f3d58b" /><stop offset="55%" stopColor="#e3b75a" /><stop offset="100%" stopColor="#b98a22" /></linearGradient>
            <filter id="k-glow" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>
          <g className="karte__laender">
            {BUNDESLAENDER.map((b) => (
              <path key={b.id} d={b.d} className={regionen.has(b.id) ? "karte__region" : undefined} style={aktiv === "__region" && regionen.has(b.id) ? { fill: "rgba(227,183,90,0.32)" } : undefined}><title>{b.name}</title></path>
            ))}
          </g>
          <path d={DEUTSCHLAND_UMRISS} className="karte__glow" filter="url(#k-glow)" />
          <path d={DEUTSCHLAND_UMRISS} className="karte__umriss" pathLength={1} />
          <g fill="none">
            {punkte.map((p) => (
              <g key={p.ort} className="karte__linie" style={{ transitionDelay: d(START + p.i * ABSTAND) }}>
                <path d={p.linie} stroke="rgba(227,183,90,0.14)" strokeWidth={3} />
                <path d={p.linie} stroke={aktiv === p.ort ? "#f3d58b" : "rgba(232,196,106,0.75)"} strokeWidth={aktiv === p.ort ? 1.6 : 1.1} strokeDasharray="3 7" strokeLinecap="round" className="karte__fluss" />
              </g>
            ))}
          </g>
        </svg>

        <button type="button" className="karte__regionlabel" style={{ ...pct(regionMitte[0] - 45, regionMitte[1] + 30), transitionDelay: d(START + punkte.length * ABSTAND) }} {...tip("__region")}
          aria-label={`${PARTNER_REGIONEN.map((r) => r.name).join(" und ")}: ${PARTNER_REGIONEN[0].branche}`}>{PARTNER_REGIONEN[0].branche}</button>

        {punkte.map((p) => (
          <button key={p.ort} type="button" className={`karte__punkt${aktiv === p.ort ? " ist-aktiv" : ""}`} style={{ ...pct(p.x, p.y), transitionDelay: d(START + p.i * ABSTAND) }} {...tip(p.ort)} aria-label={`${p.ort}: Partner-Vertrieb ${p.branche}`}>
            <span className="karte__ping" style={{ animationDelay: `${(p.i * 0.37) % 2.6}s` }} /><span className="karte__kern" />
          </button>
        ))}

        {(ap || aktiv === "__region") && (
          <div role="status" className="karte__tip" style={ap ? { ...pct(Math.min(Math.max(ap.x, 90), KARTE_BREITE - 90), ap.y), transform: "translate(-50%, calc(-100% - 16px))" } : { ...pct(regionMitte[0], regionMitte[1]), transform: "translate(-50%, calc(-100% - 4px))" }}>
            <b>{ap ? ap.ort : PARTNER_REGIONEN.map((r) => r.name).join(" und ")}</b>
            <span>{ap ? ap.branche : PARTNER_REGIONEN[0].branche}</span>
            <small>Partner-Vertrieb, sucht Verstärkung</small>
          </div>
        )}

        <div className="karte__sitz" style={pct(berlin[0], berlin[1])} {...tip("__sitz")} tabIndex={0} aria-label={`Unser Sitz: ${SITZ.strasse}, ${SITZ.plzOrt}`}>
          <span className="karte__ring" /><span className="karte__ring karte__ring--2" />
          <span className="karte__logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/zoepp-mark.png" alt="" width={22} height={22} /></span>
          <span className="karte__berlin">Berlin</span>
          {aktiv === "__sitz" && <div className="karte__tip karte__tip--sitz"><b>Unser Sitz</b><span>{SITZ.strasse}</span><small>{SITZ.plzOrt}</small></div>}
        </div>
      </div>
    </div>
  );
}
