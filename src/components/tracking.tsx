"use client";
import { useEffect } from "react";

// Merkt sich, über welchen Kanal jemand kommt (UTM, Klick-IDs, Empfehlung, Verweis).
// first = erster Besuch (90 Tage), last = aktueller Besuch mit Kampagnenparametern.
const KEY = "mv_tracking";
const TAGE = 90;

export type Touch = Record<string, string | boolean | undefined>;

function touchAusUrl(): Touch | null {
  const u = new URL(window.location.href);
  const q = u.searchParams;
  const t: Touch = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "ref"]) {
    const v = q.get(k);
    if (v) t[k] = v.slice(0, 120);
  }
  if (q.get("fbclid")) t.fbclid = true;
  if (q.get("gclid") || q.get("gbraid") || q.get("wbraid")) t.gclid = true;
  if (q.get("ttclid")) t.ttclid = true;
  const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
  if (ref) t.referrer = ref.slice(0, 200);
  if (Object.keys(t).length === 0) return null;
  t.landing = u.pathname;
  t.at = new Date().toISOString();
  return t;
}

export function leseTracking(): { first?: Touch; last?: Touch } {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const d = JSON.parse(raw);
    if (d.first?.at && Date.now() - Date.parse(String(d.first.at)) > TAGE * 864e5) return {};
    return d;
  } catch {
    return {};
  }
}

export function TrackingCapture() {
  useEffect(() => {
    try {
      const neu = touchAusUrl();
      const alt = leseTracking();
      const first = alt.first ?? neu ?? { landing: window.location.pathname, at: new Date().toISOString() };
      const last = neu ?? alt.last ?? first;
      localStorage.setItem(KEY, JSON.stringify({ first, last }));
    } catch {
      /* Speicher gesperrt: dann ohne Tracking */
    }
  }, []);
  return null;
}
