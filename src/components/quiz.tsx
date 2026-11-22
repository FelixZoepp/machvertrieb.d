"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { leseTracking } from "./tracking";
import { Pfeil, IcBolt, IcBriefcase, IcBuilding, IcCalendar, IcCap, IcCar, IcCheck, IcClock, IcFile, IcHome, IcLayers, IcLock, IcPin, IcShield, IcSignal, IcSpark, IcStar, IcSun, IcTarget, IcTrophy, IcUsers, IcWallet, IcWifi, IcX } from "./icons";

type Opt = { v: string; label: string; emoji: React.ReactNode; hint?: string };
type Frage = {
  id: string;
  titel: string;
  hilfe?: string;
  multi?: boolean;
  zweispaltig?: boolean;
  optionen: Opt[];
  freitext?: { label: string; platzhalter: string };
  stopp?: { v: string; text: string };
};

// Frame: Wir suchen für dich das Beste raus. Jede Frage hilft beim Zuteilen zum passenden Vertrieb.
const FRAGEN: Frage[] = [
  {
    id: "arbeitsstil",
    titel: "Wie willst du dein Geld verdienen?",
    hilfe: "Es gibt kein Richtig oder Falsch. So finden wir die Art Vertrieb, die zu dir passt.",
    optionen: [
      { v: "kleine_tickets", label: "Viele Provisionen, jede Woche Geld", emoji: <IcLayers />, hint: "Viele Kunden, dafür regelmäßig Geld auf dem Konto" },
      { v: "grosse_tickets", label: "Wenige, aber richtig große Provisionen", emoji: <IcStar />, hint: "Weniger Kunden, mehr Zeit pro Kunde, viel Geld pro Abschluss" },
      { v: "mix", label: "Eine Mischung aus beidem", emoji: <IcTarget /> },
    ],
  },
  {
    id: "rolle",
    titel: "Was machst du am liebsten?",
    optionen: [
      { v: "closer", label: "Termine bekommen und abschließen", emoji: <IcTarget />, hint: "Du bekommst feste Termine und konzentrierst dich aufs Verkaufen" },
      { v: "full_cycle", label: "Kunden selbst ansprechen und abschließen", emoji: <IcBolt />, hint: "Zum Beispiel an der Haustür, alles in deiner Hand" },
      { v: "leads", label: "Interessenten finden, ohne zu verkaufen", emoji: <IcSignal />, hint: "Leute mit Interesse finden und Termine machen" },
      { v: "abwechslung", label: "Von allem etwas", emoji: <IcLayers /> },
    ],
  },
  {
    id: "branchen",
    titel: "Welche Branchen reizen dich?",
    hilfe: "Mehrfachauswahl möglich.",
    multi: true,
    zweispaltig: true,
    optionen: [
      { v: "Glasfaser & Telekommunikation", label: "Glasfaser & Telekom", emoji: <IcWifi /> },
      { v: "Energie", label: "Strom & Gas", emoji: <IcBolt /> },
      { v: "Photovoltaik", label: "Photovoltaik", emoji: <IcSun /> },
      { v: "Versicherung & Finanzen", label: "Versicherung & Finanzen", emoji: <IcShield /> },
      { v: "Immobilien", label: "Immobilien", emoji: <IcHome /> },
      { v: "offen", label: "Egal, Hauptsache es lohnt sich", emoji: <IcSpark /> },
    ],
  },
  {
    id: "erfahrung",
    titel: "Wie viel Vertriebserfahrung hast du?",
    optionen: [
      { v: "0", label: "Keine, ich steige quer ein", emoji: <IcSpark />, hint: "Kein Problem. Dafür gibt es unsere Vorbereitung." },
      { v: "0.5", label: "Weniger als 1 Jahr", emoji: <IcBolt /> },
      { v: "2", label: "1 bis 3 Jahre", emoji: <IcBriefcase /> },
      { v: "4", label: "Mehr als 3 Jahre", emoji: <IcTrophy /> },
    ],
  },
  {
    id: "abschluss",
    titel: "Was ist dein höchster Abschluss?",
    hilfe: "Manche Partner haben Vorgaben, zum Beispiel im Finanzbereich. So stellen wir dich nur dort vor, wo es passt.",
    zweispaltig: true,
    optionen: [
      { v: "kein", label: "Kein Abschluss", emoji: <IcX /> },
      { v: "hauptschule", label: "Hauptschulabschluss", emoji: <IcFile /> },
      { v: "realschule", label: "Realschule / MSA", emoji: <IcFile /> },
      { v: "abitur", label: "Abitur / Fachabitur", emoji: <IcFile /> },
      { v: "ausbildung", label: "Abgeschlossene Ausbildung", emoji: <IcBriefcase /> },
      { v: "studium", label: "Studium", emoji: <IcCap /> },
    ],
  },
  {
    id: "umfang",
    titel: "Wie willst du arbeiten?",
    hilfe: "Unsere Partner suchen Leute, die es ernst meinen. Nebenberufliche Stellen vermitteln wir nicht.",
    optionen: [
      { v: "vollzeit", label: "Vollzeit", emoji: <IcBolt />, hint: "Volle Energie, volles Potenzial" },
      { v: "teilzeit", label: "Teilzeit", emoji: <IcClock /> },
    ],
  },
  {
    id: "wunschgehalt",
    titel: "Wie viel willst du im Monat verdienen?",
    hilfe: "Sei ehrlich zu dir. Wir suchen die Vertriebe raus, bei denen dein Ziel realistisch drin ist.",
    zweispaltig: true,
    optionen: [
      { v: "bis_2500", label: "Bis 2.500 €", emoji: <IcWallet /> },
      { v: "2500_4000", label: "2.500 bis 4.000 €", emoji: <IcWallet /> },
      { v: "4000_6000", label: "4.000 bis 6.000 €", emoji: <IcWallet /> },
      { v: "6000_10000", label: "6.000 bis 10.000 €", emoji: <IcWallet /> },
      { v: "ueber_10000", label: "Mehr als 10.000 €", emoji: <IcTrophy /> },
    ],
  },
  {
    id: "wofuer",
    titel: "Und wofür? Was ist dein Warum?",
    hilfe: "Geld ist nie das eigentliche Ziel. Wer sein Warum kennt, hält auch schwere Tage durch. Mehrfachauswahl möglich.",
    multi: true,
    zweispaltig: true,
    optionen: [
      { v: "familie", label: "Meine Familie absichern", emoji: <IcUsers /> },
      { v: "zuhause", label: "Eigene Wohnung oder Haus", emoji: <IcHome /> },
      { v: "schulden", label: "Schulden loswerden", emoji: <IcLock /> },
      { v: "freiheit", label: "Freiheit und Reisen", emoji: <IcPin /> },
      { v: "lifestyle", label: "Auto und Lifestyle", emoji: <IcCar /> },
      { v: "business", label: "Eigenes Business aufbauen", emoji: <IcBuilding /> },
      { v: "beweisen", label: "Mir selbst was beweisen", emoji: <IcTrophy /> },
    ],
    freitext: { label: "Erzähl uns mehr (optional)", platzhalter: "Was würdest du mit dem Geld als Erstes machen?" },
  },
  {
    id: "mobilitaet",
    titel: "Hast du Führerschein und Auto?",
    optionen: [
      { v: "auto", label: "Führerschein und eigenes Auto", emoji: <IcCar /> },
      { v: "fuehrerschein", label: "Führerschein, aber kein Auto", emoji: <IcFile /> },
      { v: "keiner", label: "Keinen Führerschein", emoji: <IcPin /> },
    ],
  },
  {
    id: "start",
    titel: "Wann kannst du starten?",
    optionen: [
      { v: "sofort", label: "Sofort", emoji: <IcBolt /> },
      { v: "2-4wochen", label: "In 2 bis 4 Wochen", emoji: <IcCalendar /> },
      { v: "1-3monate", label: "In 1 bis 3 Monaten", emoji: <IcCalendar /> },
    ],
  },
  {
    id: "deutsch",
    titel: "Wie gut ist dein Deutsch?",
    hilfe: "Im Vertrieb sprichst du den ganzen Tag mit Kunden.",
    optionen: [
      { v: "muttersprache", label: "Muttersprache oder fließend", emoji: <IcUsers /> },
      { v: "gut", label: "Gut, ich verstehe fast alles", emoji: <IcCheck /> },
      { v: "grundkenntnisse", label: "Grundkenntnisse", emoji: <IcFile /> },
    ],
  },
  {
    id: "alter",
    titel: "Bist du mindestens 18 Jahre alt?",
    optionen: [
      { v: "ja", label: "Ja", emoji: <IcCheck /> },
      { v: "nein", label: "Nein", emoji: <IcX /> },
    ],
    stopp: { v: "nein", text: "Danke für dein Interesse! Unsere Partner stellen nur ab 18 Jahren ein. Komm gern wieder, sobald es so weit ist." },
  },
];

const UMKREIS = [
  { v: "15", label: "bis 15 km" },
  { v: "30", label: "bis 30 km" },
  { v: "50", label: "bis 50 km" },
  { v: "100", label: "bis 100 km" },
  { v: "999", label: "Deutschlandweit / remote" },
];

const LADER_SCHRITTE = ["Profil wird ausgewertet", "Partner in deiner Region werden geprüft", "Passende Vertriebe werden ausgewählt"];

const plus = (tage: number) => {
  const d = new Date();
  d.setDate(d.getDate() + tage);
  return d.toISOString().slice(0, 10);
};

type Kontakt = { vorname: string; nachname: string; telefon: string; email: string; website: string };
type Phase = "fragen" | "plz" | "lader" | "kontakt";

export function Quiz({ stelle, stelleTitel }: { stelle?: string; stelleTitel?: string }) {
  const [schritt, setSchritt] = useState(0);
  const [phase, setPhase] = useState<Phase>("fragen");
  const [antworten, setAntworten] = useState<Record<string, string[]>>({});
  const [freitexte, setFreitexte] = useState<Record<string, string>>({});
  const [plz, setPlz] = useState("");
  const [umkreis, setUmkreis] = useState("30");
  const [laderStufe, setLaderStufe] = useState(0);
  const [k, setK] = useState<Kontakt>({ vorname: "", nachname: "", telefon: "", email: "", website: "" });
  const [einwilligung, setEinwilligung] = useState(false);
  const [versucht, setVersucht] = useState(false);
  const [status, setStatus] = useState<"offen" | "sendet" | "fertig" | "fehler">("offen");
  const [gestoppt, setGestoppt] = useState<string | null>(null);

  const gesamt = FRAGEN.length + 2;
  const position = phase === "fragen" ? schritt : phase === "plz" ? FRAGEN.length : FRAGEN.length + 1;
  const fortschritt = Math.round(((status === "fertig" ? gesamt : position) / gesamt) * 100);
  const frage = phase === "fragen" ? FRAGEN[schritt] : undefined;

  useEffect(() => {
    if (phase !== "lader") return;
    setLaderStufe(0);
    const t = [700, 1500, 2300].map((ms, i) => window.setTimeout(() => setLaderStufe(i + 1), ms));
    const ende = window.setTimeout(() => setPhase("kontakt"), 3100);
    return () => { t.forEach(clearTimeout); clearTimeout(ende); };
  }, [phase]);

  const fehler = useMemo(() => {
    const f: Partial<Record<keyof Kontakt | "einwilligung", string>> = {};
    if (k.vorname.trim().length < 2) f.vorname = "Bitte gib deinen Vornamen an.";
    if (k.nachname.trim().length < 2) f.nachname = "Bitte gib deinen Nachnamen an.";
    if (k.telefon.replace(/\D/g, "").length < 6) f.telefon = "Bitte gib eine Nummer an, unter der wir dich erreichen.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(k.email.trim())) f.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (!einwilligung) f.einwilligung = "Bitte bestätige die Einwilligung.";
    return f;
  }, [k, einwilligung]);

  function weiter() {
    if (schritt + 1 < FRAGEN.length) setSchritt((s) => s + 1);
    else setPhase("plz");
  }

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
    if (f.stopp && f.stopp.v === v) { setGestoppt(f.stopp.text); return; }
    window.setTimeout(weiter, 200);
  }

  function zurueck() {
    if (phase === "kontakt" || phase === "lader") { setPhase("plz"); return; }
    if (phase === "plz") { setPhase("fragen"); setSchritt(FRAGEN.length - 1); return; }
    setSchritt((s) => Math.max(0, s - 1));
  }

  async function absenden() {
    setVersucht(true);
    if (Object.keys(fehler).length > 0) return;
    setStatus("sendet");
    const a = (id: string) => antworten[id] ?? [];
    const start = a("start")[0];
    const quiz: Record<string, unknown> = {};
    for (const f of FRAGEN) quiz[f.id] = f.multi ? a(f.id) : a(f.id)[0] ?? null;
    if (freitexte.wofuer?.trim()) quiz.wofuer_text = freitexte.wofuer.trim().slice(0, 1000);
    Object.assign(quiz, { umkreis_km: Number(umkreis), stelle: stelle ?? null, stelle_titel: stelleTitel ?? null });
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
      quiz,
      tracking: leseTracking(),
      seite: window.location.pathname + window.location.search,
    };
    try {
      const r = await fetch("/api/bewerbung", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("fertig");
      window.scrollTo({ top: 0, behavior: "smooth" });
      try { (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "bewerbung_abgeschickt" }); } catch {}
    } catch {
      setStatus("fehler");
    }
  }

  if (gestoppt) {
    return (
      <div className="quiz">
        <div className="danke">
          <div className="danke__haken"><IcX /></div>
          <h2 style={{ margin: 0 }}>Fast, aber noch nicht ganz</h2>
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
          <div className="danke__haken"><IcCheck /></div>
          <h1 style={{ margin: "8px 0 0" }}>Stark, {k.vorname.trim()}. Du bist drin.</h1>
          <p className="quiz__hilfe">
            So geht es weiter: Wir rufen dich in den nächsten Tagen für ein kurzes Kennenlern-Telefonat an. Danach schalten wir dir die
            Masterclass frei, und dein Profil geht anonym an die passenden Vertriebe. Die melden sich dann bei dir. Halte dein Handy in der Nähe.
          </p>
          <div style={{ display: "grid", gap: 10, width: "100%", maxWidth: 420 }}>
            <Link className="btn btn--ghost" href="/wissen/probetag-im-vertrieb">So läuft ein Probetag ab</Link>
            <Link className="btn btn--ghost" href="/wissen/die-ersten-90-tage-im-vertrieb">Die ersten 90 Tage im Vertrieb</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <p className="quiz__intro"><strong>Finde deinen Vertrieb:</strong> Wir suchen für dich das Beste raus.</p>
      <div className="quiz__top">
        <span>{position > 0 && phase !== "lader" ? <button type="button" className="quiz__zurueck" onClick={zurueck}>← Zurück</button> : "2 Minuten"}</span>
        <span>Schritt {Math.min(position + 1, gesamt)} von {gesamt}</span>
      </div>
      <div className="quiz__fortschritt" role="progressbar" aria-valuenow={fortschritt} aria-valuemin={0} aria-valuemax={100} aria-label="Fortschritt">
        <div style={{ width: `${Math.max(4, fortschritt)}%` }} />
      </div>

      {frage && (
        <section aria-live="polite" key={frage.id}>
          <h1>{frage.titel}</h1>
          {frage.hilfe ? <p className="quiz__hilfe">{frage.hilfe}</p> : <div style={{ height: 16 }} />}
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
          {frage.freitext && (
            <div className="feld" style={{ marginTop: 18 }}>
              <label htmlFor={`ft-${frage.id}`}>{frage.freitext.label}</label>
              <textarea id={`ft-${frage.id}`} placeholder={frage.freitext.platzhalter} maxLength={1000} value={freitexte[frage.id] ?? ""} onChange={(e) => setFreitexte({ ...freitexte, [frage.id]: e.target.value })} />
            </div>
          )}
          {frage.multi && (
            <button type="button" className="btn btn--gold quiz__weiter" disabled={(antworten[frage.id] ?? []).length === 0} onClick={weiter}>
              Weiter <Pfeil />
            </button>
          )}
        </section>
      )}

      {phase === "plz" && (
        <section>
          <h1>Wo bist du zu Hause?</h1>
          <p className="quiz__hilfe">Wir schauen, welche unserer Partner in deiner Region gerade Leute suchen.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (/^\d{5}$/.test(plz)) setPhase("lader"); }}>
            <div className="feld">
              <label htmlFor="plz">Postleitzahl</label>
              <input id="plz" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="z. B. 10365" value={plz} onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))} autoFocus />
            </div>
            <div className="feld"><label>Wie weit würdest du fahren?</label></div>
            <div className="optionen optionen--2" role="radiogroup" aria-label="Umkreis">
              {UMKREIS.map((u) => (
                <button key={u.v} type="button" role="radio" className="option" aria-checked={umkreis === u.v} onClick={() => setUmkreis(u.v)}>
                  <span className="option__emoji" aria-hidden="true"><IcPin /></span><span>{u.label}</span>
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn--gold quiz__weiter" disabled={!/^\d{5}$/.test(plz)}>
              Passende Vertriebe suchen <Pfeil />
            </button>
          </form>
        </section>
      )}

      {phase === "lader" && (
        <section className="lader" aria-live="polite">
          <div className="lader__ring" aria-hidden="true" />
          <h2 style={{ margin: 0 }}>Wir suchen für dich …</h2>
          <ul className="lader__liste">
            {LADER_SCHRITTE.map((t, i) => (<li key={t} className={laderStufe > i ? "ok" : ""}>{t}</li>))}
          </ul>
        </section>
      )}

      {phase === "kontakt" && (
        <section>
          <div className="treffer" role="status">
            <span className="treffer__icon"><IcCheck /></span>
            <div>
              <strong>Wir haben passende Vertriebe für dich.</strong>
              <span>Dein Profil passt zu Partnern rund um {plz}, die gerade Verstärkung suchen und bei denen du sofort starten kannst.</span>
            </div>
          </div>
          <h1 style={{ marginTop: 6 }}>Wohin sollen sie sich melden?</h1>
          <p className="quiz__hilfe">Trag deine Daten ein, damit wir dein Profil jetzt anonym an die passenden Vertriebe schicken können. Deine Kontaktdaten bekommt nur, wer dich wirklich kennenlernen will.</p>
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
                Ich bin einverstanden, dass machvertrieb.de (Zoepp Consulting GmbH) meine Angaben speichert, mich telefonisch oder per E-Mail
                kontaktiert und mein Profil an passende Vertriebsunternehmen weitergibt, zunächst ohne Namen und Kontaktdaten. Widerruf jederzeit
                möglich. Details in der <Link href="/datenschutz" target="_blank">Datenschutzerklärung</Link>.
              </span>
            </label>
            {versucht && fehler.einwilligung && <div className="feld__fehler">{fehler.einwilligung}</div>}
            <button type="submit" className="btn btn--gold quiz__weiter" disabled={status === "sendet"}>
              {status === "sendet" ? "Wird gesendet …" : <>Profil an passende Vertriebe senden <Pfeil /></>}
            </button>
            {status === "fehler" && <div className="quiz__fehler" role="alert">Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal.</div>}
            <div className="quiz__vertrauen"><span><IcLock />Anonym vorgestellt</span><span><IcShield />Nur geprüfte Partner</span><span><IcWallet />Für dich kostenlos</span></div>
          </form>
        </section>
      )}

      {stelleTitel && <div className="stelle-hinweis">Du interessierst dich für: {stelleTitel}</div>}
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
