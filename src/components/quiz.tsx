"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { leseTracking } from "./tracking";
import { Pfeil } from "./icons";

type Opt = { v: string; label: string; emoji: string; hint?: string };
type Frage = {
  id: string;
  titel: string;
  hilfe?: string;
  multi?: boolean;
  zweispaltig?: boolean;
  optionen: Opt[];
  /** Antwort, die nicht weiterführt (Vorqualifizierung) */
  stopp?: { v: string; text: string };
};

const FRAGEN: Frage[] = [
  {
    id: "motivation",
    titel: "Was reizt dich am Vertrieb?",
    hilfe: "Mehrfachauswahl möglich.",
    multi: true,
    optionen: [
      { v: "verdienst", label: "Verdienst nach Leistung", emoji: "💶" },
      { v: "freiheit", label: "Freie Zeiteinteilung", emoji: "🕒" },
      { v: "menschen", label: "Mit Menschen arbeiten", emoji: "🤝" },
      { v: "karriere", label: "Aufstieg und Führung", emoji: "📈" },
    ],
  },
  {
    id: "branchen",
    titel: "Welche Branche interessiert dich?",
    hilfe: "Wähle alles, was für dich in Frage kommt.",
    multi: true,
    zweispaltig: true,
    optionen: [
      { v: "Glasfaser & Telekommunikation", label: "Glasfaser & Telekom", emoji: "📡" },
      { v: "Energie", label: "Strom & Gas", emoji: "⚡" },
      { v: "Photovoltaik", label: "Photovoltaik", emoji: "☀️" },
      { v: "Versicherung & Finanzen", label: "Versicherung & Finanzen", emoji: "🛡️" },
      { v: "Immobilien", label: "Immobilien", emoji: "🏠" },
      { v: "offen", label: "Egal, Hauptsache es passt", emoji: "✨" },
    ],
  },
  {
    id: "erfahrung",
    titel: "Wie viel Vertriebserfahrung hast du?",
    optionen: [
      { v: "0", label: "Keine, ich steige quer ein", emoji: "🌱", hint: "Passt. Viele Vertriebe suchen genau das." },
      { v: "0.5", label: "Weniger als 1 Jahr", emoji: "🚀" },
      { v: "2", label: "1 bis 3 Jahre", emoji: "💼" },
      { v: "4", label: "Mehr als 3 Jahre", emoji: "🏆" },
    ],
  },
  {
    id: "umfang",
    titel: "Wie möchtest du arbeiten?",
    optionen: [
      { v: "vollzeit", label: "Vollzeit", emoji: "🔥" },
      { v: "teilzeit", label: "Teilzeit", emoji: "⏳" },
      { v: "nebenberuflich", label: "Nebenberuflich", emoji: "🌙", hint: "Abends oder am Wochenende" },
    ],
  },
  {
    id: "arbeitsort",
    titel: "Wo arbeitest du am liebsten?",
    optionen: [
      { v: "aussendienst", label: "Draußen bei den Leuten", emoji: "🚪", hint: "Haustür, Termine vor Ort" },
      { v: "telefon", label: "Am Telefon, gern remote", emoji: "📞" },
      { v: "beides", label: "Beides ist okay", emoji: "👍" },
    ],
  },
  {
    id: "mobilitaet",
    titel: "Hast du Führerschein und Auto?",
    optionen: [
      { v: "auto", label: "Führerschein und eigenes Auto", emoji: "🚗" },
      { v: "fuehrerschein", label: "Führerschein, aber kein Auto", emoji: "🪪" },
      { v: "keiner", label: "Keinen Führerschein", emoji: "🚲" },
    ],
  },
  {
    id: "start",
    titel: "Wann kannst du starten?",
    optionen: [
      { v: "sofort", label: "Sofort", emoji: "⚡" },
      { v: "2-4wochen", label: "In 2 bis 4 Wochen", emoji: "📅" },
      { v: "1-3monate", label: "In 1 bis 3 Monaten", emoji: "🗓️" },
    ],
  },
  {
    id: "deutsch",
    titel: "Wie gut ist dein Deutsch?",
    hilfe: "Im Vertrieb sprichst du den ganzen Tag mit Kunden.",
    optionen: [
      { v: "muttersprache", label: "Muttersprache oder fließend", emoji: "💬" },
      { v: "gut", label: "Gut, ich verstehe fast alles", emoji: "🙂" },
      { v: "grundkenntnisse", label: "Grundkenntnisse", emoji: "📘" },
    ],
  },
  {
    id: "alter",
    titel: "Bist du mindestens 18 Jahre alt?",
    optionen: [
      { v: "ja", label: "Ja", emoji: "✅" },
      { v: "nein", label: "Nein", emoji: "✋" },
    ],
    stopp: { v: "nein", text: "Danke für dein Interesse! Unsere Partner stellen nur Bewerber ab 18 Jahren ein. Komm gern wieder, sobald es so weit ist." },
  },
];

const UMKREIS = [
  { v: "15", label: "bis 15 km" },
  { v: "30", label: "bis 30 km" },
  { v: "50", label: "bis 50 km" },
  { v: "100", label: "bis 100 km" },
  { v: "999", label: "Deutschlandweit / remote" },
];

const plus = (tage: number) => {
  const d = new Date();
  d.setDate(d.getDate() + tage);
  return d.toISOString().slice(0, 10);
};

type Kontakt = { vorname: string; nachname: string; telefon: string; email: string; website: string };

export function Quiz({ stelle, stelleTitel }: { stelle?: string; stelleTitel?: string }) {
  const [schritt, setSchritt] = useState(0);
  const [antworten, setAntworten] = useState<Record<string, string[]>>({});
  const [plz, setPlz] = useState("");
  const [umkreis, setUmkreis] = useState("30");
  const [k, setK] = useState<Kontakt>({ vorname: "", nachname: "", telefon: "", email: "", website: "" });
  const [einwilligung, setEinwilligung] = useState(false);
  const [versucht, setVersucht] = useState(false);
  const [status, setStatus] = useState<"offen" | "sendet" | "fertig" | "fehler">("offen");
  const [gestoppt, setGestoppt] = useState<string | null>(null);

  const gesamt = FRAGEN.length + 2; // + PLZ + Kontakt
  const fortschritt = Math.round(((status === "fertig" ? gesamt : schritt) / gesamt) * 100);
  const frage = FRAGEN[schritt];

  const fehler = useMemo(() => {
    const f: Partial<Record<keyof Kontakt | "einwilligung", string>> = {};
    if (k.vorname.trim().length < 2) f.vorname = "Bitte gib deinen Vornamen an.";
    if (k.nachname.trim().length < 2) f.nachname = "Bitte gib deinen Nachnamen an.";
    if (k.telefon.replace(/\D/g, "").length < 6) f.telefon = "Bitte gib eine Telefonnummer an, unter der wir dich erreichen.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(k.email.trim())) f.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (!einwilligung) f.einwilligung = "Bitte bestätige die Einwilligung.";
    return f;
  }, [k, einwilligung]);

  function waehle(f: Frage, v: string) {
    if (f.multi) {
      setAntworten((a) => {
        const cur = a[f.id] ?? [];
        let next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
        if (f.id === "branchen" && v === "offen") next = cur.includes("offen") ? [] : ["offen"];
        else if (f.id === "branchen") next = next.filter((x) => x !== "offen");
        return { ...a, [f.id]: next };
      });
      return;
    }
    setAntworten((a) => ({ ...a, [f.id]: [v] }));
    if (f.stopp && f.stopp.v === v) {
      setGestoppt(f.stopp.text);
      return;
    }
    window.setTimeout(() => setSchritt((s) => s + 1), 180);
  }

  async function absenden() {
    setVersucht(true);
    if (Object.keys(fehler).length > 0) return;
    setStatus("sendet");
    const a = (id: string) => antworten[id] ?? [];
    const start = a("start")[0];
    const payload = {
      vorname: k.vorname.trim(),
      nachname: k.nachname.trim(),
      telefon: k.telefon.trim(),
      email: k.email.trim(),
      website: k.website,
      plz,
      umkreis_km: Number(umkreis),
      erfahrung_jahre: Math.round(Number(a("erfahrung")[0] ?? 0)),
      branchen: a("branchen").filter((b) => b !== "offen"),
      fuehrerschein: ["auto", "fuehrerschein"].includes(a("mobilitaet")[0] ?? ""),
      verfuegbar_ab: start === "sofort" ? plus(0) : start === "2-4wochen" ? plus(14) : start === "1-3monate" ? plus(30) : "",
      einwilligung,
      stelle: stelle ?? null,
      quiz: { ...Object.fromEntries(Object.entries(antworten).map(([key, v]) => [key, FRAGEN.find((f) => f.id === key)?.multi ? v : v[0]])), umkreis_km: Number(umkreis), stelle: stelle ?? null, stelle_titel: stelleTitel ?? null },
      tracking: leseTracking(),
      seite: window.location.pathname + window.location.search,
    };
    try {
      const r = await fetch("/api/bewerbung", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("fertig");
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        // Für Werbe-Pixel/Tag-Manager, falls später eingebunden
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "bewerbung_abgeschickt" });
      } catch {}
    } catch {
      setStatus("fehler");
    }
  }

  if (gestoppt) {
    return (
      <div className="quiz">
        <div className="danke">
          <div className="danke__haken">🙌</div>
          <h2 style={{ margin: 0 }}>Fast geschafft, aber noch nicht ganz</h2>
          <p className="quiz__hilfe">{gestoppt}</p>
          <Link href="/wissen" className="btn btn--ghost">Zum Ratgeber</Link>
        </div>
      </div>
    );
  }

  if (status === "fertig") {
    return (
      <div className="quiz">
        <div className="quiz__fortschritt"><div style={{ width: "100%" }} /></div>
        <div className="danke">
          <div className="danke__haken">✓</div>
          <h1 style={{ margin: "8px 0 0" }}>Danke, {k.vorname.trim()}! Deine Bewerbung ist da.</h1>
          <p className="quiz__hilfe">
            Wir schauen uns deine Angaben an und melden uns telefonisch bei dir. Halte dein Handy in den nächsten Tagen in der Nähe.
            Bis dahin kannst du dich schon mal einlesen:
          </p>
          <div style={{ display: "grid", gap: 10, width: "100%", maxWidth: 420 }}>
            <Link className="btn btn--ghost" href="/wissen/probetag-im-vertrieb">So läuft ein Probetag ab</Link>
            <Link className="btn btn--ghost" href="/wissen/die-ersten-90-tage-im-vertrieb">Die ersten 90 Tage im Vertrieb</Link>
          </div>
        </div>
      </div>
    );
  }

  const zurueck = schritt > 0 && (
    <button type="button" className="quiz__zurueck" onClick={() => setSchritt((s) => s - 1)}>← Zurück</button>
  );

  return (
    <div className="quiz">
      <div className="quiz__top">
        <span>{zurueck || "2-Minuten-Check"}</span>
        <span>Schritt {Math.min(schritt + 1, gesamt)} von {gesamt}</span>
      </div>
      <div className="quiz__fortschritt" role="progressbar" aria-valuenow={fortschritt} aria-valuemin={0} aria-valuemax={100} aria-label="Fortschritt">
        <div style={{ width: `${Math.max(4, fortschritt)}%` }} />
      </div>

      {frage && (
        <section aria-live="polite">
          <h1>{frage.titel}</h1>
          {frage.hilfe && <p className="quiz__hilfe">{frage.hilfe}</p>}
          {!frage.hilfe && <div style={{ height: 14 }} />}
          <div className={`optionen${frage.zweispaltig ? " optionen--2" : ""}`}>
            {frage.optionen.map((o) => {
              const an = (antworten[frage.id] ?? []).includes(o.v);
              return (
                <button key={o.v} type="button" className="option" aria-pressed={an} onClick={() => waehle(frage, o.v)}>
                  <span className="option__emoji" aria-hidden="true">{o.emoji}</span>
                  <span>{o.label}{o.hint && <small>{o.hint}</small>}</span>
                </button>
              );
            })}
          </div>
          {frage.multi && (
            <button type="button" className="btn btn--red quiz__weiter" disabled={(antworten[frage.id] ?? []).length === 0} style={{ opacity: (antworten[frage.id] ?? []).length === 0 ? 0.45 : 1 }} onClick={() => setSchritt((s) => s + 1)}>
              Weiter <Pfeil />
            </button>
          )}
        </section>
      )}

      {schritt === FRAGEN.length && (
        <section>
          <h1>Wo wohnst du?</h1>
          <p className="quiz__hilfe">Damit wir dir Vertriebe in deiner Nähe vorschlagen können.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (/^\d{5}$/.test(plz)) setSchritt((s) => s + 1); }}>
            <div className="feld">
              <label htmlFor="plz">Postleitzahl</label>
              <input id="plz" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="z. B. 10365" value={plz} onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))} autoFocus />
            </div>
            <div className="feld">
              <label>Wie weit würdest du fahren?</label>
            </div>
            <div className="optionen optionen--2" role="radiogroup" aria-label="Umkreis">
              {UMKREIS.map((u) => (
                <button key={u.v} type="button" role="radio" className="option" aria-checked={umkreis === u.v} onClick={() => setUmkreis(u.v)}>
                  <span className="option__emoji" aria-hidden="true">📍</span><span>{u.label}</span>
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn--red quiz__weiter" disabled={!/^\d{5}$/.test(plz)} style={{ opacity: /^\d{5}$/.test(plz) ? 1 : 0.45 }}>
              Weiter <Pfeil />
            </button>
          </form>
        </section>
      )}

      {schritt === FRAGEN.length + 1 && (
        <section>
          <h1>Fast geschafft! Wie erreichen wir dich?</h1>
          <p className="quiz__hilfe">Kein Lebenslauf, kein Anschreiben. Wir rufen dich an und klären alles Weitere.</p>
          <form noValidate onSubmit={(e) => { e.preventDefault(); absenden(); }}>
            <div className="felder-2">
              <Feld id="vorname" label="Vorname" auto="given-name" wert={k.vorname} setze={(v) => setK({ ...k, vorname: v })} fehler={versucht ? fehler.vorname : undefined} />
              <Feld id="nachname" label="Nachname" auto="family-name" wert={k.nachname} setze={(v) => setK({ ...k, nachname: v })} fehler={versucht ? fehler.nachname : undefined} />
            </div>
            <Feld id="telefon" label="Handynummer" typ="tel" auto="tel" wert={k.telefon} setze={(v) => setK({ ...k, telefon: v })} fehler={versucht ? fehler.telefon : undefined} />
            <Feld id="email" label="E-Mail" typ="email" auto="email" wert={k.email} setze={(v) => setK({ ...k, email: v })} fehler={versucht ? fehler.email : undefined} />
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={k.website} onChange={(e) => setK({ ...k, website: e.target.value })} />
            </div>
            <label className="einwilligung">
              <input type="checkbox" checked={einwilligung} onChange={(e) => setEinwilligung(e.target.checked)} />
              <span>
                Ich bin einverstanden, dass machvertrieb.de (Zoepp Consulting GmbH) meine Angaben speichert, mich telefonisch oder per
                E-Mail zu passenden Stellen kontaktiert und mein Profil dafür an passende Vertriebsunternehmen weitergibt. Widerruf
                jederzeit möglich. Details in der <Link href="/datenschutz" target="_blank">Datenschutzerklärung</Link>.
              </span>
            </label>
            {versucht && fehler.einwilligung && <div className="feld__fehler">{fehler.einwilligung}</div>}
            <button type="submit" className="btn btn--red quiz__weiter" disabled={status === "sendet"}>
              {status === "sendet" ? "Wird gesendet …" : <>Bewerbung abschicken <Pfeil /></>}
            </button>
            {status === "fehler" && <div className="quiz__fehler" role="alert">Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal.</div>}
            <div className="quiz__vertrauen"><span>🔒 Daten verschlüsselt</span><span>💶 Für dich kostenlos</span><span>⏱ Dauert 2 Minuten</span></div>
          </form>
        </section>
      )}

      {stelleTitel && <div className="stelle-hinweis">Du bewirbst dich auf: {stelleTitel}</div>}
    </div>
  );
}

function Feld(p: { id: string; label: string; typ?: string; auto: string; wert: string; setze: (v: string) => void; fehler?: string }) {
  return (
    <div className="feld">
      <label htmlFor={p.id}>{p.label}</label>
      <input id={p.id} type={p.typ ?? "text"} autoComplete={p.auto} value={p.wert} onChange={(e) => p.setze(e.target.value)} aria-invalid={!!p.fehler} aria-describedby={p.fehler ? `${p.id}-f` : undefined} />
      {p.fehler && <div id={`${p.id}-f`} className="feld__fehler">{p.fehler}</div>}
    </div>
  );
}
