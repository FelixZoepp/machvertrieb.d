import { IcBriefcase, IcCheck, IcPin, IcShield, IcStar } from "@/components/icons";

// 3D-Ansicht: So sieht die Vermittlung für Bewerber aus (Beispielansicht, keine echten Angebote).
const ANGEBOTE = [
  { logo: "major", titel: "Glasfaser-Berater (m/w/d)", ort: "Berlin-Mitte · 6 km", art: "Vollzeit", match: 96, vorteile: ["Viele Provisionen", "Einarbeitung im Team"] },
  { logo: "salesfocus", titel: "Energieberater Strom & Gas", ort: "Berlin-Pankow · 9 km", art: "Vollzeit", match: 91, vorteile: ["Feste Termine", "Wöchentliche Abrechnung"] },
  { logo: "despos", titel: "Solar-Berater im Außendienst", ort: "Potsdam · 24 km", art: "Teilzeit möglich", match: 87, vorteile: ["Große Provisionen", "Firmenwagen möglich"] },
];

export function VermittlungScreen() {
  return (
    <div className="vs" data-reveal="zoom" aria-label="Beispielansicht: So sehen deine Angebote nach der Vermittlung aus">
      <div className="vs__buehne" data-tilt>
        <div className="vs__screen">
          <div className="vs__kopf">
            <div>
              <small>Deine Angebote · Beispiel</small>
              <b>3 Vertriebe passen zu dir</b>
            </div>
            <span className="vs__plz"><IcPin />10115 Berlin</span>
          </div>
          <ul className="vs__liste">
            {ANGEBOTE.map((a, i) => (
              <li key={a.logo} className="vs__karte" style={{ ["--i" as string]: i }}>
                <div className="vs__logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/logos/${a.logo}-weiss.png`} alt="" /></div>
                <div className="vs__info">
                  <b>{a.titel}</b>
                  <span><IcPin />{a.ort}<i>·</i><IcBriefcase />{a.art}</span>
                  <div className="vs__chips">{a.vorteile.map((v) => <em key={v}><IcCheck />{v}</em>)}</div>
                </div>
                <div className="vs__match"><b>{a.match}%</b><small>passt</small></div>
              </li>
            ))}
          </ul>
          <div className="vs__fuss"><span className="vs__btn">Probetag anfragen</span><small>Du entscheidest, wo du hingehst.</small></div>
        </div>
        <div className="vs__schwebe vs__schwebe--1"><span><IcShield /></span><div><b>Geprüfter Partner</b><small>Zahlt pünktlich</small></div></div>
        <div className="vs__schwebe vs__schwebe--2"><span><IcStar /></span><div><b>Probetag diese Woche</b><small>Termin frei</small></div></div>
      </div>
    </div>
  );
}
