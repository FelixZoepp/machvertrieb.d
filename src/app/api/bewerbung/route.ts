import { NextRequest, NextResponse } from "next/server";
import { quelleAus, type Tracking } from "@/lib/quelle";
import { JOBS } from "@/lib/jobs";

// Bewerbung aus dem Quiz → Supabase (Projekt Vertriebs-Vermittlung), Funktion bewerbung_einreichen
// legt einen Kandidaten in Stage "eingang" an. Es werden keine Nachrichten verschickt.
const hits = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "?";
  const now = Date.now();
  const liste = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (liste.length >= 5) return NextResponse.json({ error: "Zu viele Versuche." }, { status: 429 });
  hits.set(ip, [...liste, now]);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  if (typeof b.website === "string" && b.website) return NextResponse.json({ ok: true }); // Honeypot

  const tracking = (b.tracking ?? {}) as Tracking;
  const { quelle, detail } = quelleAus(tracking);
  const job = typeof b.stelle === "string" ? JOBS.find((j) => j.slug === b.stelle) : undefined;

  const p = {
    vorname: b.vorname,
    nachname: b.nachname,
    email: b.email,
    telefon: b.telefon,
    plz: b.plz,
    umkreis_km: b.umkreis_km,
    erfahrung_jahre: b.erfahrung_jahre,
    branchen: Array.isArray(b.branchen) ? b.branchen.slice(0, 6) : [],
    fuehrerschein: !!b.fuehrerschein,
    verfuegbar_ab: b.verfuegbar_ab || null,
    einwilligung: b.einwilligung === true,
    quelle,
    quelle_detail: job ? `${detail} · Stelle: ${job.title} (${job.ort})` : detail,
    quiz: { ...(b.quiz as object), stelle_firma: job?.company ?? null },
    tracking: { ...tracking, user_agent: req.headers.get("user-agent")?.slice(0, 200) ?? null },
    herkunft_seite: `machvertrieb.de${typeof b.seite === "string" ? b.seite.slice(0, 150) : ""}`,
  };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL / SUPABASE_ANON_KEY fehlen");
    return NextResponse.json({ error: "Nicht konfiguriert." }, { status: 500 });
  }
  const r = await fetch(`${url}/rest/v1/rpc/bewerbung_einreichen`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p }),
    cache: "no-store",
  });
  if (!r.ok) {
    const t = await r.text();
    console.error("bewerbung_einreichen fehlgeschlagen", r.status, t.slice(0, 300));
    const ungueltig = t.includes("ungueltig");
    return NextResponse.json({ error: ungueltig ? "Angaben unvollständig." : "Speichern fehlgeschlagen." }, { status: ungueltig ? 400 : 502 });
  }
  return NextResponse.json({ ok: true });
}
