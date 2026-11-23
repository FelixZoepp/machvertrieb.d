import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { alleArtikel } from "@/lib/wissen";
import { STIMMEN } from "@/lib/stimmen";
import { Faq, JsonLd, faqSchema } from "@/components/faq";
import { Bento } from "@/components/bento";
import { Karte } from "@/components/karte";
import { LogoLeiste } from "@/components/logo-leiste";
import { Zaehler } from "@/components/zaehler";
import { GoldIcon, type GoldIconName } from "@/components/gold-icon";
import { IcArrow, IcBolt, IcBuilding, IcCap, IcCar, IcCheck, IcClock, IcPhone, IcPlay, IcWallet, IcX, Pfeil } from "@/components/icons";
import felix from "../../public/img/felix.jpg";

const LOGOS = ["bc", "ct", "da", "dds", "despos", "livara", "major", "maxprom", "mr", "orkanor", "salesfocus", "saleswinner", "schweikert", "seifert", "sellwell", "solvon", "sp"];

const PROBLEME: { icon: GoldIconName; t: string; p: string }[] = [
  { icon: "wachstum", t: "Dein Gehalt hat einen Deckel", p: "Egal, wie viel du gibst: Am Monatsende steht immer dieselbe Zahl auf dem Konto." },
  { icon: "kalender", t: "Der Schichtplan bestimmt dein Leben", p: "Wochenenden, Spätdienst, Feiertage. Freizeit gibt es, wenn der Plan es erlaubt." },
  { icon: "trichter", t: "Du weißt nicht, wo du anfangen sollst", p: "Tausende Anzeigen, alle klingen gleich. Ohne Erfahrung fühlt sich jede Bewerbung wie Lotto an." },
  { icon: "schild", t: "Angst, beim Falschen zu landen", p: "Schlechtes Produkt, Provision kommt nie, keiner bringt dir was bei. Davon hast du schon gehört." },
];

const TRAUM = [
  { icon: "wachstum" as GoldIconName, t: <>Der erste Monat, in dem du <span className="serif">mehr verdienst</span> als je zuvor.</>, p: "Im Vertrieb verdienst du an jedem Kunden mit. Wer dranbleibt und gut ausgebildet wird, sieht das irgendwann auf dem Konto." },
  { icon: "ziel" as GoldIconName, t: <>Ziele, die plötzlich <span className="serif">realistisch</span> werden.</>, p: "Das eigene Auto. Die eigene Wohnung. Urlaub, ohne vorher dreimal zu rechnen. Für viele ist genau das der Grund, warum sie anfangen." },
  { icon: "handschlag" as GoldIconName, t: <>Ein Team, das dich <span className="serif">mitzieht.</span></>, p: "Leute, die gewinnen wollen und dich pushen. Statt Kollegen, die dir sagen, dass sowieso nichts geht." },
];

const ARTEN: { icon: GoldIconName; t: string; p: string; geld: string }[] = [
  { icon: "bewerber", t: "An der Haustür beraten", p: "Du bist in deinem Gebiet unterwegs, sprichst mit Haushalten über Glasfaser, Strom oder Solar und schließt direkt ab.", geld: "Viele Provisionen, jede Woche Geld" },
  { icon: "handschlag", t: "Termine wahrnehmen und abschließen", p: "Du bekommst feste Termine mit Interessenten und konzentrierst dich nur aufs Beraten und Abschließen.", geld: "Weniger Kunden, dafür große Provisionen" },
  { icon: "radar", t: "Interessenten finden, ohne zu verkaufen", p: "Du findest Leute mit Interesse und machst Termine für die Berater. Ideal zum Reinkommen.", geld: "Fester Betrag pro Termin" },
  { icon: "telefon", t: "Am Telefon", p: "Du sprichst Interessenten am Telefon an, qualifizierst oder schließt direkt ab. Oft von zu Hause möglich.", geld: "Provision pro Abschluss oder Termin" },
  { icon: "schild", t: "Kunden beraten: Versicherung & Finanzen", p: "Du hilfst Menschen bei Absicherung und Vorsorge. Manche Partner geben dir Bestandskunden zum Start.", geld: "Oft Fixum plus Provision" },
  { icon: "wachstum", t: "Später: Dein eigenes Team", p: "Wer gut ist und andere mitzieht, baut ein Team auf und verdient an den Ergebnissen seiner Leute mit.", geld: "Du verdienst am Team mit" },
];

const WEGE: { icon: GoldIconName; z: string; t: string; p: string }[] = [
  { icon: "chat", z: "2 Minuten online", t: "Fragen beantworten", p: "Wie willst du arbeiten, was willst du verdienen, wo wohnst du? Kein Lebenslauf, kein Anschreiben." },
  { icon: "telefon", z: "Kennenlernen", t: "Wir rufen dich an", p: "Wir lernen dich kennen und schauen gemeinsam, welche Vertriebe wirklich zu dir passen." },
  { icon: "cloud", z: "Online, ca. 1 Stunde", t: "Kostenlose Vorbereitung", p: "In unserer Masterclass lernst du das richtige Mindset und wie du im Gespräch überzeugst." },
  { icon: "handschlag", z: "Du entscheidest", t: "Probetag und Start", p: "Passende Vertriebe melden sich bei dir. Du suchst dir aus, wo du zum Probetag gehst, und startest." },
];

const KRITERIEN = [
  { t: "Ein Produkt, hinter dem du stehen kannst", p: "Keine Abo-Fallen, keine Drückerkolonnen, kein Produkt, für das du dich schämen musst." },
  { t: "Provisionen, die wirklich kommen", p: "Klares Modell, pünktliche Abrechnung. Vor dem Start weißt du, wofür du wie viel bekommst." },
  { t: "Echte Einarbeitung", p: "Mitlaufen, Schulungen, feste Ansprechpartner. Kein Sprung ins kalte Wasser." },
  { t: "Leute, die bleiben", p: "Wir schauen, wie lange Leute bei einem Partner bleiben. Hohe Fluktuation fliegt raus." },
];

// Laufbahn-Fotos: echte Fotos nach public/img/laufbahn/ legen und hier bei "bild" eintragen (keine KI-Bilder).
const STORY: { i: React.ReactNode; j: string; t: string; p: string; bild?: string; alt?: string }[] = [
  { i: <IcBolt />, j: "2018", t: "„Aus mir wird nichts.“", p: "Schlechte Noten, jeden Tag gezockt, kein Plan. Ich habe mir selbst gesagt, dass aus mir nichts wird." },
  { i: <IcCap />, j: "2021", t: "Studium. Gezwungenermaßen.", p: "Nebenbei Social-Media-Beiträge, Videokurse für 50 €. Eineinhalb Jahre rumgedümpelt, ohne wirklich Geld zu verdienen." },
  { i: <IcPhone />, j: "Der Wendepunkt", t: "Nur noch eins: verkaufen lernen.", p: "Im dritten Monat zum ersten Mal 10.000 € in einem Monat. Danach den ersten Vertrieb aus dem Kinderzimmer aufgebaut." },
  { i: <IcClock />, j: "2022 bis 2024", t: "14 Stunden am Tag. Fast pleite.", p: "Erstes Büro, ein kleiner Raum. Vom 500-€-Passat, der auseinandergefallen ist, zum ersten Arteon. Sechs Vollzeitkräfte und trotzdem fast pleite." },
  { i: <IcBuilding />, j: "Ende 2024", t: "Nicht aufgegeben.", p: "Neues Büro mit 130 Quadratmetern. 2025 ein gutes Jahr, 2026 ein noch besseres." },
  { i: <IcCar />, j: "Heute", t: "Porsche mit 23.", p: "Über 100 Kunden, sechsstellige Monatsumsätze, über 300.000 € in Coachings investiert. Diese Chance gebe ich mit machvertrieb.de weiter.", bild: "/img/laufbahn/heute.jpg", alt: "Felix Zoepp heute" },
];

const FAQ = [
  { q: "Brauche ich Erfahrung im Vertrieb?", a: "Nein. Viele unserer Partner suchen ausdrücklich Quereinsteiger, zum Beispiel aus Gastro, Handwerk, Einzelhandel oder Pflege. Wichtiger sind Ehrgeiz und Zuverlässigkeit. Den Rest lernst du in der Vorbereitung und der Einarbeitung." },
  { q: "Woher weiß ich, dass der Vertrieb seriös ist?", a: "Jeder Partner muss durch unseren Check: Produkt, Provisionsmodell, Auszahlung, Einarbeitung und wie lange Leute dort bleiben. Felix und sein Team arbeiten täglich mit Vertrieben und wissen, wer seine Leute fair behandelt." },
  { q: "Werden die Provisionen wirklich ausgezahlt?", a: "Unsere Partner verpflichten sich zu klarer, pünktlicher Abrechnung. Du weißt vor dem Start, wofür du wie viel bekommst. Hält sich ein Partner nicht daran, arbeiten wir nicht mehr mit ihm." },
  { q: "Was verdient man im Vertrieb?", a: "Das hängt von der Art des Vertriebs, deinem Einsatz und deinem Partner ab. Manche zahlen viele kleinere Provisionen, andere wenige große, manche ein Fixum plus Provision. Im Telefonat sagen wir dir ehrlich, was in deinem Fall realistisch ist." },
  { q: "Geht das auch nebenberuflich?", a: "Nein. Unsere Partner suchen Leute, die es ernst meinen: Vollzeit oder Teilzeit." },
  { q: "Warum soll ich mich nicht einfach selbst bewerben?", a: "Weil du dann oft nicht weißt, woran du bist. Viele verspielen ihre Chance im falschen Vertrieb. Über uns bekommst du geprüfte Partner, eine Vorbereitung und mehrere Angebote zur Auswahl." },
  { q: "Bekommt mein Chef oder jemand anderes meine Daten?", a: "Nein. Dein Profil geht zuerst ohne Namen und Kontaktdaten an passende Partner. Erst wenn einer dich kennenlernen möchte und du einverstanden bist, bringen wir euch zusammen." },
  { q: "Kostet mich das etwas?", a: "Nein. Fragebogen, Telefonat, Vorbereitung und Vermittlung sind für dich komplett kostenlos." },
];

export default function Home() {
  const artikel = alleArtikel().slice(0, 3);
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* ================= HERO ================= */}
      <section className="hero2">
        <div className="hero2__block">
          <div className="hero2__bild"><Image src={felix} alt="Felix Zoepp, Gründer von machvertrieb.de" priority placeholder="blur" sizes="60vw" /></div>
          <div className="hero2__inhalt">
            <span className="hero2__pille">Für Quereinsteiger &amp; Vertriebler in ganz Deutschland</span>
            <h1>Starte im Vertrieb und verdiene <span className="serif">bis zu 10.000 € im Monat.</span></h1>
            <p className="hero2__text">Wir haben die Partner und das Netzwerk: über 100 Vertriebe arbeiten mit Felix&apos; System. Wir suchen den passenden für dich raus und bringen dich vorbereitet zum Probetag.</p>
            <ul className="hero2__checks">
              <li><IcCheck />Geprüfte Partner aus unserem Netzwerk, kein Scam</li>
              <li><IcCheck />Kostenlose Vorbereitung, bevor du startest</li>
              <li><IcCheck />Mehrere Angebote, du entscheidest</li>
              <li><IcCheck />Vollzeit oder Teilzeit, in deiner Region</li>
            </ul>
            <div><Link href="/bewerben" className="btn btn--brand">Jetzt Vertrieb finden, der zu mir passt <Pfeil /></Link></div>
            <small className="hero2__hinweis">Möglich, nicht garantiert: Was du verdienst, hängt von dir und deinem Einsatz ab.</small>
          </div>
          <Link href="#felix" className="hero2__felix"><i><IcPlay /></i><div><b>Felix Zoepp</b><span>Vom Zocker zum Porsche mit 23</span></div></Link>
          <div className="hero2__logos">
            <span>Vertriebe, die mit Felix&apos; System arbeiten:</span>
            <LogoLeiste logos={LOGOS} />
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="section">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Kennst du das?</span>
            <h2 className="h2">Du gibst alles. <span className="b">Und es reicht trotzdem nicht.</span></h2>
            <p className="lead">Du kannst gut mit Menschen, bist fleißig und willst mehr. Aber in deinem Job geht es nicht voran.</p>
          </div>
          <div className="features">
            {PROBLEME.map((x, k) => (
              <div key={x.t} className="feature" data-reveal style={{ ["--d" as string]: `${k * 90}ms` }}>
                <GoldIcon name={x.icon} size={96} />
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAUM ================= */}
      <section className="section section--soft" style={{ overflow: "hidden" }}>
        <div className="motiv motiv--loewe" aria-hidden="true" />
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="tag">Stell dir vor</span>
            <h2 className="h2">Was wäre, wenn sich deine Arbeit <span className="b">endlich lohnt?</span></h2>
            <p className="lead">Im Vertrieb gibt es keine Gehaltstabelle, die dich bremst. Was du verdienst, hängt an dir. Genau deshalb haben so viele, die heute ganz vorne sind, mal ganz ohne Erfahrung angefangen.</p>
          </div>
          <div className="traum">
            {TRAUM.map((x, k) => (
              <div key={k} className="traum__karte" data-reveal style={{ ["--d" as string]: `${k * 100}ms` }}>
                <GoldIcon name={x.icon} size={72} />
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
          <p className="hinweis-klein">Was du verdienst, hängt von dir, deinem Einsatz und deinem Vertrieb ab. Wir versprechen dir kein Einkommen, aber den richtigen Start.</p>
          <div className="cta-zeile"><Link href="/bewerben" className="btn btn--brand">Jetzt Vertrieb finden, der zu mir passt <Pfeil /></Link></div>
        </div>
      </section>

      {/* ================= BENTO ================= */}
      <section className="section" style={{ overflow: "hidden" }}>
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">So fühlt sich Vertrieb an</span>
            <h2 className="h2">Jeder Abschluss. <span className="b">Schwarz auf weiß.</span></h2>
            <p className="lead">Keine Fantasiezahlen, sondern eine Abrechnung, auf der jeder Vertrag steht. Woche für Woche.</p>
          </div>
          <Bento />
          <p className="hinweis-klein" style={{ textAlign: "center" }}>Beispielhafte Darstellung. Höhe und Takt der Provisionen hängen vom Vertrieb, der Branche und deinem Einsatz ab.</p>
        </div>
      </section>

      {/* ================= VERTRIEBSARTEN ================= */}
      <section id="arten" className="section">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Welcher Vertrieb passt zu dir?</span>
            <h2 className="h2">Viele Provisionen oder <span className="b">wenige große?</span></h2>
            <p className="lead">Vertrieb ist nicht gleich Vertrieb. Manche wollen jede Woche Geld sehen, andere lieber weniger Kunden und dafür richtig große Provisionen. Wir finden raus, was zu dir passt.</p>
          </div>
          <div className="arten">
            {ARTEN.map((a, k) => (
              <div key={a.t} className="art" data-reveal style={{ ["--d" as string]: `${(k % 3) * 90}ms` }}>
                <GoldIcon name={a.icon} size={72} />
                <h3>{a.t}</h3>
                <p>{a.p}</p>
                <div className="art__geld"><IcWallet />{a.geld}</div>
              </div>
            ))}
          </div>
          <div className="cta-zeile"><Link href="/bewerben" className="btn btn--brand">Finde raus, welcher Vertrieb zu dir passt <Pfeil /></Link></div>
        </div>
      </section>

      {/* ================= ABLAUF ================= */}
      <section id="ablauf" className="section section--soft" style={{ overflow: "hidden" }}>
        <div className="motiv motiv--wellen" aria-hidden="true" />
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">So läuft&apos;s</span>
            <h2 className="h2">Einmal bewerben. <span className="b">Vorbereitet starten.</span></h2>
            <p className="lead">Kein Bewerbungsmarathon, keine Vorstellungsgespräche, bei denen du dich verkaufen musst. Wir machen das mit dir zusammen.</p>
          </div>
          <div className="wege">
            {WEGE.map((w, k) => (
              <div key={w.t} className="weg" data-reveal style={{ ["--d" as string]: `${k * 90}ms` }}>
                <span className="weg__nr">0{k + 1}</span>
                <GoldIcon name={w.icon} size={72} />
                <span className="weg__zeit">{w.z}</span>
                <h3>{w.t}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
          <div className="cta-zeile"><Link href="/bewerben" className="btn btn--brand">Jetzt in 2 Minuten starten <Pfeil /></Link></div>
        </div>
      </section>

      {/* ================= SICHERHEIT / RADAR ================= */}
      <section id="sicherheit" className="section" style={{ overflow: "hidden" }}>
        <div className="motiv motiv--loewe" aria-hidden="true" style={{ opacity: 0.6 }} />
        <div className="wrap radar-block">
          <div className="radar" aria-hidden="true" data-reveal="zoom">
            <div className="radar__innen">
              <div className="radar__kreuz" />
              {[8, 20, 32].map((p) => <div key={p} className="radar__ring" style={{ inset: `${p}%` }} />)}
              <div className="radar__strahl" />
              <div className="radar__label" style={{ left: "60%", top: "22%" }}><i /><span>Glasfaser · geprüft</span></div>
              <div className="radar__label" style={{ left: "18%", top: "38%" }}><i /><span>Solar · geprüft</span></div>
              <div className="radar__label" style={{ left: "64%", top: "66%" }}><i /><span>Energie · geprüft</span></div>
              <div className="radar__label" style={{ left: "26%", top: "72%" }}><i /><span>Versicherung · geprüft</span></div>
              <div className="radar__mitte"><div><b>machvertrieb</b><small>Partner-Check</small></div></div>
            </div>
          </div>
          <div className="head" data-reveal>
            <span className="tag">Deine Sicherheit</span>
            <h2 className="h2">Wir lassen dich nicht <span className="b">beim Falschen landen.</span></h2>
            <p className="lead">Im Vertrieb gibt es großartige Unternehmen und welche, die Leute benutzen. Bevor wir dich irgendwohin vermitteln, muss jeder Partner durch unseren Check.</p>
            <ul className="kriterien">
              {KRITERIEN.map((k) => (<li key={k.t}><span className="haken"><IcCheck /></span><div><b>{k.t}</b><span>{k.p}</span></div></li>))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= KARTE ================= */}
      <section id="partner" className="section">
        <div className="wrap">
          <div className="karte-block" data-reveal="kippen">
            <div style={{ position: "relative" }}>
              <span className="tag">Deutschlandweit</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Aus Berlin. <span className="b">Partner in ganz Deutschland.</span></h2>
              <p className="lead">Unser Sitz ist in der Bornitzstraße in Berlin. Von hier aus arbeiten wir mit Vertrieben in ganz Deutschland zusammen: Glasfaser, Strom und Gas, Photovoltaik, Versicherung und mehr.</p>
              <div className="karte-zahlen">
                <div><b><Zaehler wert={103} /></b><small>Vertriebe mit Felix&apos; System</small></div>
                <div><b><Zaehler wert={16} /></b><small>Bundesländer erreichbar</small></div>
                <div><b>1</b><small>Ansprechpartner für dich</small></div>
              </div>
              <ul className="karte-legende">
                <li><i className="sitz" />Unser Sitz</li>
                <li><i />Partner-Standort</li>
                <li><i className="region" />Partner-Region</li>
              </ul>
            </div>
            <Karte />
          </div>
        </div>
      </section>

      {/* ================= VERGLEICH ================= */}
      <section className="section section--soft">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Selbst bewerben oder mit uns?</span>
            <h2 className="h2">Allein ist es <span className="b">ein Glücksspiel.</span></h2>
          </div>
          <div className="vergleich" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 920, marginInline: "auto" }}>
            <div className="vergleich__col" data-reveal="links">
              <h3>Allein bewerben</h3>
              <ul>{["Du weißt nicht, ob der Vertrieb seriös ist", "Unklar, ob die Provision wirklich kommt", "Einarbeitung ist Glückssache", "Lebenslauf, Anschreiben, Vorstellungsgespräch", "Passt es nicht, ist die Chance weg"].map((t) => <li key={t}><IcX />{t}</li>)}</ul>
            </div>
            <div className="vergleich__col vergleich__col--top" data-reveal="rechts">
              <h3>Über machvertrieb.de</h3>
              <ul>{["Nur geprüfte, seriöse Partner", "Klare Provisionen, die gezahlt werden", "Kostenlose Vorbereitung vor dem Start", "Kein Lebenslauf, nur Probetag", "Mehrere Angebote, du entscheidest", "Für dich kostenlos"].map((t) => <li key={t}><IcCheck />{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FELIX ================= */}
      <section id="felix" className="section" style={{ overflow: "hidden" }}>
        <div className="motiv motiv--adler" aria-hidden="true" style={{ opacity: 0.5 }} />
        <div className="wrap felix">
          <div className="felix__bild" data-reveal="links">
            <Image src={felix} alt="Felix Zoepp" placeholder="blur" sizes="(max-width: 960px) 100vw, 40vw" />
            <div className="felix__karte"><GoldIcon name="ziel" size={44} /><div><b>Felix Zoepp</b><small>Gründer Zoepp Consulting · Initiator von machvertrieb.de</small></div></div>
          </div>
          <div className="head" style={{ maxWidth: "none" }}>
            <span className="tag">Wer dahinter steht</span>
            <h2 className="h2">Vom Zocker im Kinderzimmer <span className="b">zum Porsche mit 23.</span></h2>
            <p className="lead">Kein reicher Papa, keine guten Noten, kein Plan. Nur die Entscheidung, verkaufen zu lernen. Genau diese Chance will Felix mit machvertrieb.de an dich weitergeben.</p>
            <div className="zahlen">
              <div className="zahl"><b>3.<span> Monat</span></b><small>erstmals 10.000 € in einem Monat</small></div>
              <div className="zahl"><b>103</b><small>Vertriebe arbeiten mit seinem System</small></div>
              <div className="zahl"><b>300k<span>+</span></b><small>€ in Coachings investiert</small></div>
              <div className="zahl"><b>23</b><small>Jahre alt</small></div>
            </div>
            <ol className="zeitleiste" data-progress>
              {STORY.map((s, k) => (
                <li key={s.j} data-reveal={k % 2 ? "rechts" : "links"}>
                  <span className="zeitleiste__punkt">{s.i}</span>
                  <div className="zeitleiste__inhalt">
                    {s.bild && (
                      <figure className="zeitleiste__bild">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.bild} alt={s.alt ?? s.t} loading="lazy" data-parallax="0.08" />
                        <figcaption>{s.j}</figcaption>
                      </figure>
                    )}
                    <div className="zeitleiste__jahr">{s.j}</div><h3>{s.t}</h3><p>{s.p}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="hinweis">Das ist Felix&apos; Weg, kein Einkommensversprechen.</p>
          </div>
        </div>
      </section>

      {/* ================= ERFAHRUNGEN (erst mit echten Videos sichtbar) ================= */}
      {STIMMEN.length > 0 && (
        <section id="erfahrungen" className="section section--soft">
          <div className="wrap">
            <div className="head center"><span className="tag">Erfahrungen</span><h2 className="h2">Über uns gestartet. <span className="b">Heute erfolgreich.</span></h2></div>
            <div className="grid grid--3">
              {STIMMEN.map((s) => (
                <figure key={s.name} className="card" style={{ margin: 0 }}>
                  <video src={s.video} poster={s.poster} controls preload="none" playsInline style={{ borderRadius: 16, aspectRatio: "9 / 16", objectFit: "cover", background: "#000" }} />
                  <figcaption><h3>{s.name}</h3><p>Vorher: {s.vorher} · Heute: {s.heute}</p></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= RATGEBER ================= */}
      {artikel.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="head center" data-reveal><span className="tag">Ratgeber</span><h2 className="h2">Erst lesen, <span className="b">dann loslegen.</span></h2></div>
            <div className="grid grid--3">
              {artikel.map((a) => (
                <Link key={a.slug} href={`/wissen/${a.slug}`} className="card artikel-karte">
                  <span className="kat">{a.category} · {a.minuten} Min.</span>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <span className="mehr">Weiterlesen <IcArrow width={15} height={15} style={{ verticalAlign: -3 }} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      <section id="faq" className="section section--soft">
        <div className="wrap">
          <div className="head center"><span className="tag">Fragen</span><h2 className="h2">Ehrliche <span className="b">Antworten.</span></h2></div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* ================= ABSCHLUSS ================= */}
      <section style={{ padding: "clamp(64px, 8vw, 110px) 0" }}>
        <div className="finale2">
          <Image src={felix} alt="" sizes="55vw" />
          <div className="finale2__inhalt">
            <h2>Dein Neustart beginnt <span className="serif">mit 2 Minuten.</span></h2>
            <p>Beantworte ein paar Fragen. Wir finden den Vertrieb, der zu dir passt. Du musst nur noch zum Probetag.</p>
            <div><Link href="/bewerben" className="btn btn--brand">Jetzt Vertrieb finden, der zu mir passt <Pfeil /></Link></div>
          </div>
        </div>
      </section>

      <div className="mobil-cta"><span>Passenden Vertrieb finden</span><Link href="/bewerben" className="btn btn--brand">Starten <Pfeil /></Link></div>
    </>
  );
}
