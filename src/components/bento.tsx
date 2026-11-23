import { Zaehler } from "@/components/zaehler";
import { IcBell, IcCalendar, IcCheck, IcTrend, IcUsers, IcWallet } from "@/components/icons";

// Bento "So fühlt sich Vertrieb an": animierte 3D-Kacheln (Abrechnung, Auszahlung, Kalender, Karriere, Team).
// Alle Beträge sind als Beispiel gekennzeichnet, keine echten Abrechnungen.
const POSTEN = [
  { t: "Glasfaser-Vertrag, Familie K.", b: 180 },
  { t: "Glasfaser-Vertrag, Familie M.", b: 180 },
  { t: "Stromvertrag, Herr S.", b: 95 },
  { t: "PV-Anlage, Familie B.", b: 1450 },
  { t: "Glasfaser-Vertrag, Frau D.", b: 180 },
];
const SUMME = POSTEN.reduce((s, p) => s + p.b, 0);

export function Bento() {
  return (
    <div className="bento">
      {/* Abrechnung */}
      <div className="bento__k bento__k--abrechnung" data-reveal data-tilt>
        <div className="bento__kopf"><span className="bento__icon"><IcWallet /></span><div><b>Deine Provisionsabrechnung</b><small>Jeder Abschluss steht schwarz auf weiß drauf</small></div></div>
        <div className="blatt-stapel">
          <div className="blatt blatt--hinten2" aria-hidden="true" />
          <div className="blatt blatt--hinten" aria-hidden="true" />
          <div className="blatt">
            <div className="blatt__kopf"><span>Provisionsabrechnung</span><em>Beispiel</em></div>
            <ul>
              {POSTEN.map((p, i) => (
                <li key={i} style={{ ["--i" as string]: i }}><span><IcCheck />{p.t}</span><b>+{p.b.toLocaleString("de-DE")} €</b></li>
              ))}
            </ul>
            <div className="blatt__summe"><span>Diese Woche</span><b><Zaehler wert={SUMME} nach=" €" /></b></div>
          </div>
        </div>
      </div>

      {/* Auszahlung */}
      <div className="bento__k bento__k--push" data-reveal data-tilt style={{ ["--d" as string]: "120ms" }}>
        <div className="handy" aria-hidden="true">
          <div className="handy__notch" />
          <div className="push"><span className="push__icon"><IcBell /></span><div><b>Gutschrift eingegangen</b><small>Provision KW 47 · Beispiel</small></div><em>+<Zaehler wert={2085} nach=" €" /></em></div>
          <div className="push push--2"><span className="push__icon"><IcCheck /></span><div><b>Abschluss bestätigt</b><small>PV-Anlage · Beispiel</small></div></div>
        </div>
        <h3>Provisionen, die wirklich kommen</h3>
        <p>Unsere Partner zahlen pünktlich und nachvollziehbar. Das prüfen wir, bevor wir dich vermitteln.</p>
      </div>

      {/* Kalender */}
      <div className="bento__k bento__k--kalender" data-reveal data-tilt style={{ ["--d" as string]: "60ms" }}>
        <div className="bento__kopf"><span className="bento__icon"><IcCalendar /></span><div><b>Deine Woche</b><small>Du planst selbst</small></div></div>
        <div className="kal" aria-hidden="true">
          {["Mo", "Di", "Mi", "Do", "Fr"].map((t, i) => (
            <div key={t} className="kal__tag"><span>{t}</span>
              {Array.from({ length: [3, 2, 4, 3, 1][i] }).map((_, j) => <i key={j} style={{ ["--i" as string]: i * 3 + j }} className={(i + j) % 3 === 0 ? "ist-gold" : undefined} />)}
            </div>
          ))}
        </div>
      </div>

      {/* Karriere */}
      <div className="bento__k bento__k--karriere" data-reveal data-tilt style={{ ["--d" as string]: "120ms" }}>
        <div className="bento__kopf"><span className="bento__icon"><IcTrend /></span><div><b>Dein Aufstieg</b><small>Ohne Gehaltsdeckel</small></div></div>
        <div className="stufen" aria-hidden="true">
          {[["Start", 28], ["Profi", 52], ["Teamleiter", 76], ["Eigenes Team", 100]].map(([t, h], i) => (
            <div key={t} className="stufe" style={{ ["--h" as string]: `${h}%`, ["--i" as string]: i }}><i /><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bento__k bento__k--team" data-reveal data-tilt style={{ ["--d" as string]: "180ms" }}>
        <div className="bento__kopf"><span className="bento__icon"><IcUsers /></span><div><b>Ein Team, das dich mitzieht</b><small>Einarbeitung vom ersten Tag</small></div></div>
        <div className="avatare" aria-hidden="true">
          {["MK", "JS", "AL", "TB", "+"].map((a, i) => <span key={a} style={{ ["--i" as string]: i }}>{a}</span>)}
        </div>
      </div>
    </div>
  );
}
