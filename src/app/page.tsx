import Link from "next/link";
import Image from "next/image";
import { JOBS } from "@/lib/jobs";
import { alleArtikel } from "@/lib/wissen";
import { STIMMEN } from "@/lib/stimmen";
import { JobsBoard } from "@/components/jobs-board";
import { Faq, JsonLd, faqSchema } from "@/components/faq";
import {
  IcArrow, IcBell, IcBolt, IcBriefcase, IcBuilding, IcCalendar, IcCap, IcCar, IcCheck, IcClock, IcEyeOff, IcFile, IcHandshake,
  IcHome, IcLayers, IcLock, IcPhone, IcPin, IcPlay, IcSearch, IcShield, IcSignal, IcSpark, IcStar, IcSun, IcTarget, IcTrend,
  IcTrophy, IcUser, IcUsers, IcWallet, IcWifi, IcX, Pfeil,
} from "@/components/icons";
import felix from "../../public/img/felix.jpg";

const BRANCHEN = [
  { n: "Glasfaser", i: <IcWifi /> },
  { n: "Strom & Gas", i: <IcBolt /> },
  { n: "Photovoltaik", i: <IcSun /> },
  { n: "Versicherung", i: <IcShield /> },
  { n: "Immobilien", i: <IcHome /> },
];

const PARTNER_KRITERIEN_L = [
  { i: <IcLayers />, t: "Produkt mit echtem Nutzen", p: "Nur Produkte, hinter denen du stehen kannst. Keine Abo-Fallen, keine Drückerkolonne." },
  { i: <IcWallet />, t: "Provisionen, die kommen", p: "Transparentes Modell, pünktliche Abrechnung. Vor dem Start weißt du, wofür du bezahlt wirst." },
  { i: <IcCap />, t: "Echte Einarbeitung", p: "Mitlaufen, Schulungen, feste Ansprechpartner. Kein Sprung ins kalte Wasser." },
];
const PARTNER_KRITERIEN_R = [
  { i: <IcUsers />, t: "Team, das bleibt", p: "Wir schauen, wie lange Leute bei einem Partner bleiben. Hohe Fluktuation ist ein Ausschlussgrund." },
  { i: <IcTrend />, t: "Aufstieg nach Leistung", p: "Klare Wege zum Teamleiter, nicht nach Betriebszugehörigkeit." },
  { i: <IcHandshake />, t: "Fairer Umgang", p: "Hält ein Partner Zusagen nicht ein, arbeiten wir nicht mehr mit ihm. Du sagst uns Bescheid, wir kümmern uns." },
];

const STORY = [
  { i: <IcBolt />, j: "2018", t: "„Aus mir wird nichts.“", p: "Schlechte Noten, jeden Tag gezockt, kein Plan. Ich habe mir selbst gesagt, dass aus mir nichts wird." },
  { i: <IcCap />, j: "2021", t: "Studium. Gezwungenermaßen.", p: "Nebenbei Social-Media-Beiträge, Videokurse für 50 €. Eineinhalb Jahre rumgedümpelt, ohne wirklich Geld zu verdienen." },
  { i: <IcPhone />, j: "Der Wendepunkt", t: "Nur noch eins: verkaufen lernen.", p: "Agenturdienstleistungen, alles Mögliche. Im dritten Monat zum ersten Mal 10.000 € in einem Monat. Danach den ersten Vertrieb aus dem Kinderzimmer aufgebaut." },
  { i: <IcClock />, j: "2022 bis 2024", t: "14 Stunden am Tag. Fast pleite.", p: "Erstes Büro, ein kleiner Raum. Treue Leute gewonnen, viele verloren. Vom 500-€-Passat zum ersten Arteon, sechs Vollzeitkräfte und trotzdem fast pleite." },
  { i: <IcBuilding />, j: "Ende 2024", t: "Nicht aufgegeben.", p: "Neues Büro mit 130 Quadratmetern. 2025 ein gutes Jahr, 2026 ein noch besseres." },
  { i: <IcCar />, j: "Heute", t: "Porsche mit 23.", p: "Über 100 Kunden, sechsstellige Monatsumsätze, Beteiligungen an Sales-Unternehmen, über 300.000 € in Coachings investiert. Diese Chance gebe ich mit machvertrieb.de weiter." },
];

const TYPEN = [
  { i: <IcTarget />, t: "Closer", p: "Du bekommst qualifizierte Termine und schließt ab. Länger beim Kunden, dafür große Tickets.", ticket: 5, termine: 2 },
  { i: <IcHome />, t: "Berater im Außendienst", p: "Du sprichst Haushalte in deinem Gebiet an und schließt direkt ab. Konstante Provision.", ticket: 2, termine: 5 },
  { i: <IcSignal />, t: "Lead-Generierung", p: "Du findest Interessenten und legst Termine, ohne selbst zu verkaufen. Klarer Einstieg.", ticket: 1, termine: 5 },
  { i: <IcPhone />, t: "Telefonvertrieb", p: "Qualifizieren oder abschließen am Telefon, oft remote möglich.", ticket: 3, termine: 4 },
  { i: <IcShield />, t: "Finanzen & Versicherung", p: "Beratung zu Absicherung und Vorsorge, teils mit Bestandskunden zum Start.", ticket: 4, termine: 3 },
  { i: <IcTrophy />, t: "Teamleitung", p: "Du baust ein Team auf und verdienst an den Ergebnissen deines Teams mit.", ticket: 5, termine: 3 },
];

const FAQ = [
  { q: "Woher weiß ich, dass der Vertrieb seriös ist?", a: "Weil jeder Partner unseren Partner-Check durchläuft: Produkt, Provisionsmodell, Auszahlung, Einarbeitung und wie lange Leute dort bleiben. Felix und sein Team von Zoepp Consulting arbeiten täglich mit Direktvertrieben und wissen, wer seine Leute fair behandelt." },
  { q: "Werden die Provisionen wirklich ausgezahlt?", a: "Unsere Partner verpflichten sich zu transparenter, pünktlicher Abrechnung. Du weißt vor dem Start, wofür du bezahlt wirst. Hält sich ein Partner nicht daran, arbeiten wir nicht mehr mit ihm." },
  { q: "Warum nicht einfach selbst irgendwo bewerben?", a: "Weil du dann oft nicht weißt, woran du bist: Ist das Produkt gut? Wird ausgebildet? Kommt die Provision? Viele verspielen ihre Chance im falschen Vertrieb. Über uns bekommst du geprüfte Partner, Vorbereitung und mehrere Angebote zur Auswahl." },
  { q: "Brauche ich Erfahrung?", a: "Nein. Viele Partner suchen ausdrücklich Quereinsteiger. Wichtiger sind Ehrgeiz, Zuverlässigkeit und der Wille zu lernen. Den Rest bekommst du in der Masterclass und der Einarbeitung." },
  { q: "Geht das auch nebenberuflich?", a: "Nein. Unsere Partner suchen Leute, die es ernst meinen: Vollzeit oder Teilzeit." },
  { q: "Wird mein Profil anonym weitergegeben?", a: "Ja. Wir stellen dein Profil zuerst ohne Namen und Kontaktdaten vor. Erst wenn ein Partner dich kennenlernen möchte, bringen wir euch zusammen." },
  { q: "Warum fragt ihr nach Wunschgehalt und Abschluss?", a: "Damit wir dich dorthin vermitteln, wo dein Ziel realistisch ist und die Voraussetzungen passen. Je besser wir dich kennen, desto genauer passt der Vertrieb." },
  { q: "Kostet mich das etwas?", a: "Nein. Match-Check, Telefonat, Masterclass und Vermittlung sind für dich komplett kostenlos." },
];

const Haken = () => <span className="haken"><IcCheck /></span>;
const Skala = ({ n }: { n: number }) => <span className="skala__p">{[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= n ? "an" : ""} />)}</span>;

export default function Home() {
  const artikel = alleArtikel().slice(0, 3);
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <span className="tag tag--voll">Vertrieb mit Anspruch</span>
            <h1 className="h1">Finde den Vertrieb, der <span className="b">dich groß macht.</span></h1>
            <p className="lead">Wir vermitteln dich an geprüfte Vertriebe in deiner Region: faire Provisionen, echte Ausbildung, ein Produkt mit Nutzen. Vorqualifiziert und vorbereitet musst du nur noch zum Probetag.</p>
            <ul className="vorteile-box">
              <li><Haken />Nur geprüfte Partner</li>
              <li><Haken />Mehrere Angebote, du wählst</li>
              <li><Haken />Kostenlose Masterclass</li>
              <li><Haken />Vollzeit oder Teilzeit</li>
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/bewerben" className="btn btn--brand">Kostenlosen Match-Check starten <Pfeil /></Link>
            </div>
            <div className="felix-chip">
              <Image src={felix} alt="Felix Zoepp" width={80} height={80} />
              <span>Initiiert von <strong>Felix Zoepp</strong> · 103 Vertriebe arbeiten mit seinem System</span>
            </div>
          </div>

          <div className="buehne" aria-hidden="true">
            <div className="buehne__felix">
              <Image src={felix} alt="" sizes="300px" priority />
            </div>
            <div className="handy">
              <div className="handy__screen">
                <div className="handy__notch" />
                <div className="app-kopf"><b>Match-Check</b><span>fertig</span></div>
                <div className="app-titel">3 Vertriebe <span>passen zu dir</span></div>
                {[
                  { i: <IcWifi />, n: "Glasfaser-Vertrieb", o: "Region 10365 · 12 km", p: "96 %", t: ["Provision pro Kunde", "Einarbeitung"] },
                  { i: <IcSun />, n: "Photovoltaik", o: "Region 10365 · 24 km", p: "91 %", t: ["Große Tickets", "Termine gestellt"] },
                  { i: <IcBolt />, n: "Energie-Vertrieb", o: "Region 10365 · 8 km", p: "88 %", t: ["Fixum + Provision"] },
                ].map((m) => (
                  <div key={m.n} className="match">
                    <div className="match__top">
                      <span className="match__logo">{m.i}</span>
                      <div><div className="match__name">{m.n}</div><div className="match__ort">{m.o}</div></div>
                      <span className="match__prozent">{m.p}</span>
                    </div>
                    <div className="match__tags">{m.t.map((t) => <span key={t} className="mini-tag">{t}</span>)}<span className="mini-tag mini-tag--ok">geprüft</span></div>
                  </div>
                ))}
                <div className="app-btn">Profil anonym senden</div>
              </div>
            </div>
            <div className="schwebe schwebe--2"><span className="schwebe__icon"><IcPlay /></span><div><b>Masterclass</b><span>8 von 8 Modulen</span></div></div>
            <div className="schwebe schwebe--1"><span className="schwebe__icon schwebe__icon--ok"><IcPhone /></span><div><b>Partner ruft an</b><span>Glasfaser-Vertrieb</span></div></div>
            <div className="schwebe schwebe--3"><span className="schwebe__icon"><IcCalendar /></span><div><b>Probetag</b><span>Do · 10:00 Uhr</span></div></div>
          </div>
        </div>
      </section>

      {/* ================= BRANCHEN ================= */}
      <div className="wrap leiste">
        <p>Unsere Partner kommen aus diesen Branchen</p>
        <div className="leiste__reihe">{BRANCHEN.map((b) => <div key={b.n} className="leiste__item">{b.i}{b.n}</div>)}</div>
      </div>

      {/* ================= PROBLEM ================= */}
      <section className="section">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Das Problem</span>
            <h2 className="h2">Kennst du das aus <span className="b">deinem Job?</span></h2>
            <p className="lead">Du arbeitest viel und kannst gut mit Menschen. Trotzdem geht es nicht voran. Und wer in den Vertrieb will, landet oft beim Falschen.</p>
          </div>
          <div className="grid grid--3">
            <div className="card" data-reveal>
              <div className="mock">
                <div className="mock__label">Gehaltsabrechnung</div>
                <div className="mock__zeile"><span>Grundgehalt</span><small>fix</small></div>
                <div className="mock__zeile"><span>Leistungsbonus</span><small>0,00 €</small></div>
                <div className="mock__zeile"><span>Gehaltsband</span><span className="rot" style={{ fontWeight: 800 }}>max. erreicht</span></div>
              </div>
              <span className="card__linie"><IcWallet /></span>
              <h3>Dein Gehalt hat einen Deckel. Egal, wie gut du bist.</h3>
              <p>Du gibst alles, am Monatsende steht dieselbe Zahl auf dem Konto.</p>
            </div>
            <div className="card" data-reveal style={{ ["--d" as string]: "100ms" }}>
              <div className="mock">
                <div className="mock__label">Schichtplan · KW 48</div>
                <div className="schicht">{["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d, k) => <div key={d} className={k >= 5 || k === 2 ? "x" : ""}>{d}</div>)}</div>
                <div className="mock__zeile" style={{ marginTop: 8 }}><span>Wochenende frei</span><span className="rot" style={{ fontWeight: 800 }}>nein</span></div>
              </div>
              <span className="card__linie"><IcCalendar /></span>
              <h3>Der Schichtplan bestimmt dein Leben.</h3>
              <p>Wochenenden, Spätdienst, Feiertage. Freizeit gibt es, wenn der Plan es erlaubt.</p>
            </div>
            <div className="card" data-reveal style={{ ["--d" as string]: "200ms" }}>
              <div className="mock mock__fade">
                <div className="mock__label">Jobbörse · „Vertrieb“</div>
                <div className="mock__zeile"><span>2.413 Anzeigen</span><small>alle gleich</small></div>
                <div className="mock__zeile"><span>Top-Verdienst garantiert!!</span><small>?</small></div>
                <div className="mock__zeile"><span>Karriere ohne Grenzen</span><small>?</small></div>
                <div className="mock__zeile"><span>Sofort-Start, keine Fragen</span><small>?</small></div>
              </div>
              <span className="card__linie"><IcSearch /></span>
              <h3>Jede Anzeige klingt gleich gut.</h3>
              <p>Ob Produkt, Provision und Einarbeitung stimmen, siehst du erst, wenn es zu spät ist.</p>
            </div>
            <div className="card" data-reveal>
              <span className="card__linie"><IcX /></span>
              <h3>Provision versprochen, nie gesehen.</h3>
              <p>Unklare Modelle, Stornoabzüge, Ausreden. Viele hören nach ein paar Monaten frustriert auf.</p>
            </div>
            <div className="card" data-reveal style={{ ["--d" as string]: "100ms" }}>
              <span className="card__linie"><IcUser /></span>
              <h3>Ins kalte Wasser geworfen.</h3>
              <p>Keine Einarbeitung, kein Mindset, keine Ansprechpartner. Wer so startet, verliert schnell die Lust.</p>
            </div>
            <div className="card" data-reveal style={{ ["--d" as string]: "200ms" }}>
              <span className="card__linie"><IcFile /></span>
              <h3>Der Lebenslauf entscheidet, nicht du.</h3>
              <p>Ohne passenden Abschluss wirst du gar nicht erst eingeladen, egal was du draufhast.</p>
            </div>
          </div>
          <div className="cta-zeile"><Link href="/bewerben" className="btn btn--brand">Den richtigen Vertrieb finden <Pfeil /></Link></div>
        </div>
      </section>

      {/* ================= METHODE ================= */}
      <section id="methode" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">So funktioniert&apos;s</span>
            <h2 className="h2">Die <span className="b">machvertrieb</span>-Methode</h2>
            <p className="lead">Statt dich auf gut Glück zu bewerben, durchläufst du einen klaren Prozess: Wir finden, wo du hinpasst, bereiten dich vor und bringen die Vertriebe zu dir.</p>
          </div>
          <div className="methode">
            <article className="panel">
              <div className="panel__bild">
                <div className="chipwolke">
                  <span className="chip"><IcTarget />Arbeitsstil</span>
                  <span className="chip"><IcWallet />Wunschgehalt</span>
                  <span className="chip"><IcPin />Region & PLZ</span>
                  <span className="chip"><IcCap />Abschluss</span>
                  <div className="trichter"><div className="trichter__form" /></div>
                  <div style={{ gridColumn: "span 2", justifySelf: "center" }} className="profil"><span className="icon"><IcUser /></span><div><b>Dein Profil</b><small>Closer · Große Tickets · Vollzeit</small></div></div>
                </div>
              </div>
              <div className="panel__text">
                <div className="panel__nr"><b>01</b><i /></div>
                <h3>Der Match-Check</h3>
                <div className="panel__unter">2 Minuten. Kein Lebenslauf.</div>
                <p>Kleine oder große Tickets? Closen oder Leads? Wie viel willst du verdienen, und wofür? <strong>Aus deinen Antworten entsteht dein Profil</strong>, mit dem wir die passenden Partner finden.</p>
              </div>
            </article>
            <article className="panel">
              <div className="panel__bild">
                <div className="ui">
                  <div className="ui__titel">Masterclass <span className="chip chip--brand">8 / 8</span></div>
                  <div className="fortschritt"><i style={{ width: "100%" }} /></div>
                  {["Mindset im Vertrieb", "Die 5 Kernqualitäten", "So überzeugst du im Gespräch", "Realistische Verdienstmöglichkeiten"].map((m) => (
                    <div key={m} className="ui__zeile"><span className="icon icon--brand"><IcPlay /></span><span>{m}</span><small className="ok"><IcCheck width={16} height={16} /></small></div>
                  ))}
                </div>
              </div>
              <div className="panel__text">
                <div className="panel__nr"><b>02</b><i /></div>
                <h3>Telefonat & Masterclass</h3>
                <div className="panel__unter">Vorqualifiziert. Vorbereitet.</div>
                <p>Wir lernen dich am Telefon kennen und schalten dir die Masterclass frei: 8 Module, etwa eine Stunde. <strong>Mindset, Kernqualitäten, Gesprächsführung.</strong> So startest du nicht bei null.</p>
              </div>
            </article>
            <article className="panel">
              <div className="panel__bild">
                <div className="anrufe">
                  <div className="ui" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className="icon"><IcEyeOff /></span>
                    <div><b style={{ fontSize: 14 }}>Profil #4821 · anonym</b><div style={{ color: "var(--muted)", fontSize: 12 }}>an 3 passende Partner gesendet</div></div>
                  </div>
                  {[["Glasfaser-Vertrieb", "möchte dich kennenlernen"], ["Photovoltaik-Partner", "möchte dich kennenlernen"]].map(([n, s]) => (
                    <div key={n} className="anruf"><span className="anruf__ring"><IcPhone /></span><div><b>{n}</b><small>{s}</small></div><em>Anfrage</em></div>
                  ))}
                </div>
              </div>
              <div className="panel__text">
                <div className="panel__nr"><b>03</b><i /></div>
                <h3>Vertriebe melden sich</h3>
                <div className="panel__unter">Anonym. Mehrere Angebote.</div>
                <p>Dein Profil geht <strong>ohne Namen</strong> an die passenden Partner in deiner Region. Wer dich kennenlernen will, meldet sich. <strong>Du entscheidest</strong>, wo du hingehst.</p>
              </div>
            </article>
            <article className="panel">
              <div className="panel__bild">
                <div className="ui">
                  <div className="ui__titel">Dein Probetag <span className="chip chip--brand"><IcCalendar />Do · 10:00</span></div>
                  {([["Team kennenlernen", <IcUsers key="u" />], ["Mitlaufen im Alltag", <IcBriefcase key="b" />], ["Provisionsmodell schwarz auf weiß", <IcFile key="f" />], ["Start mit Einarbeitung", <IcBolt key="z" />]] as const).map(([t, i]) => (
                    <div key={t} className="ui__zeile"><span className="icon">{i}</span><span>{t}</span><small className="ok"><IcCheck width={16} height={16} /></small></div>
                  ))}
                </div>
              </div>
              <div className="panel__text">
                <div className="panel__nr"><b>04</b><i /></div>
                <h3>Probetag & Start</h3>
                <div className="panel__unter">Kein Vorstellungsgespräch mehr.</div>
                <p>Du bist vorqualifiziert und vorbereitet, also geht es <strong>direkt in den Alltag</strong>. Passt es für beide Seiten, startest du sofort mit Einarbeitung. Wir bleiben dein Ansprechpartner.</p>
              </div>
            </article>
          </div>
          <div className="cta-zeile"><Link href="/bewerben" className="btn btn--brand">Match-Check starten <Pfeil /></Link></div>
        </div>
      </section>

      {/* ================= PARTNER-CHECK ================= */}
      <section id="partner" className="section section--soft">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Wofür wir stehen</span>
            <h2 className="h2">Der <span className="b">Partner-Check</span></h2>
            <p className="lead">Im Vertrieb gibt es großartige Unternehmen und welche, die Leute benutzen. Jeder Partner muss durch unseren Check, bevor wir auch nur einen Bewerber vermitteln.</p>
          </div>
          <div className="radar-wrap">
            <div className="radar-spalte">
              {PARTNER_KRITERIEN_L.map((k) => <div key={k.t} className="radar-karte" data-reveal><span className="icon icon--brand">{k.i}</span><div><b>{k.t}</b><span>{k.p}</span></div></div>)}
            </div>
            <div className="radar" aria-hidden="true">
              <div className="radar__innen">
                <div className="radar__kreuz" />
                {[8, 20, 32].map((p) => <div key={p} className="radar__ring" style={{ inset: `${p}%` }} />)}
                <div className="radar__strahl" />
                <span className="radar__blip" style={{ left: "22%", top: "30%" }} />
                <span className="radar__blip" style={{ left: "72%", top: "64%" }} />
                <span className="radar__blip" style={{ left: "64%", top: "18%" }} />
                <div className="radar__mitte"><div><IcShield /><b>Geprüfter Partner</b><small>machvertrieb.de</small></div></div>
              </div>
            </div>
            <div className="radar-spalte">
              {PARTNER_KRITERIEN_R.map((k) => <div key={k.t} className="radar-karte" data-reveal><span className="icon icon--brand">{k.i}</span><div><b>{k.t}</b><span>{k.p}</span></div></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VERGLEICH ================= */}
      <section className="section">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Vergleich</span>
            <h2 className="h2">Selbst bewerben oder <span className="b">mit uns starten</span></h2>
            <p className="lead">Der Unterschied liegt nicht in der Zahl der Anzeigen, sondern darin, wie viel Risiko bei dir bleibt.</p>
          </div>
          <div className="vergleich">
            <div className="vergleich__col">
              <span className="icon"><IcSearch /></span>
              <h3>Jobbörse</h3>
              <ul>{["Tausende Anzeigen, alle gleich", "Lebenslauf und Anschreiben", "Oft keine Rückmeldung", "Produkt und Provision unklar"].map((t) => <li key={t}><IcX />{t}</li>)}</ul>
            </div>
            <div className="vergleich__col vergleich__col--top">
              <span className="icon" style={{ background: "var(--brand)", color: "#1a1206", boxShadow: "none" }}><IcStar /></span>
              <h3>Mit machvertrieb.de</h3>
              <ul>{["Nur geprüfte Partner", "Transparente, gezahlte Provisionen", "Masterclass vor dem Start", "Mehrere Angebote, du wählst", "Nur noch Probetag", "Für dich kostenlos"].map((t) => <li key={t}><IcCheck />{t}</li>)}</ul>
            </div>
            <div className="vergleich__col">
              <span className="icon"><IcUser /></span>
              <h3>Beim Erstbesten anfangen</h3>
              <ul>{["Keine Vergleichsmöglichkeit", "Einarbeitung ist Glückssache", "Passt es nicht, ist die Chance verspielt", "Allein, wenn es schiefgeht"].map((t) => <li key={t}><IcX />{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FELIX ================= */}
      <section id="felix" className="section section--soft">
        <div className="wrap felix">
          <div className="felix__bild" data-reveal>
            <Image src={felix} alt="Felix Zoepp" placeholder="blur" sizes="(max-width: 960px) 100vw, 40vw" />
            <div className="felix__karte"><span className="icon icon--brand"><IcSpark /></span><div><b>Felix Zoepp</b><small>Gründer Zoepp Consulting · Initiator machvertrieb.de</small></div></div>
          </div>
          <div className="head" style={{ maxWidth: "none" }}>
            <span className="tag">Wer dahinter steht</span>
            <h2 className="h2">Vom Zocker im Kinderzimmer <span className="b">zum Porsche mit 23.</span></h2>
            <p className="lead">Kein reicher Papa, keine guten Noten, kein Plan. Nur die Entscheidung, verkaufen zu lernen. Heute baut Felix mit Zoepp Consulting den Vertrieb für über 100 Unternehmen auf.</p>
            <div className="zahlen">
              <div className="zahl"><b>3.<span> Monat</span></b><small>erstmals 10.000 € in einem Monat</small></div>
              <div className="zahl"><b>103</b><small>Vertriebe arbeiten mit seinem System</small></div>
              <div className="zahl"><b>300k<span>+</span></b><small>€ in Coachings investiert</small></div>
              <div className="zahl"><b>23</b><small>Jahre alt</small></div>
            </div>
            <ol className="zeitleiste">
              {STORY.map((s) => (
                <li key={s.j} data-reveal>
                  <span className="zeitleiste__punkt">{s.i}</span>
                  <div className="zeitleiste__inhalt"><div className="zeitleiste__jahr">{s.j}</div><h3>{s.t}</h3><p>{s.p}</p></div>
                </li>
              ))}
            </ol>
            <p className="hinweis">Das ist Felix&apos; Weg, kein Einkommensversprechen. Was du verdienst, hängt von dir, deinem Einsatz und deinem Vertrieb ab.</p>
          </div>
        </div>
      </section>

      {/* ================= ERFAHRUNGEN (erst mit echten Videos sichtbar) ================= */}
      {STIMMEN.length > 0 && (
        <section id="erfahrungen" className="section">
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

      {/* ================= TYPEN ================= */}
      <section className="section">
        <div className="wrap">
          <div className="head center" data-reveal>
            <span className="tag">Welcher Typ bist du?</span>
            <h2 className="h2">Große Tickets oder <span className="b">viele Abschlüsse?</span></h2>
            <p className="lead">Jeder Vertriebstyp hat seinen Platz. Im Match-Check finden wir heraus, welcher deiner ist.</p>
          </div>
          <div className="grid grid--3">
            {TYPEN.map((t, k) => (
              <div key={t.t} className="card" data-reveal style={{ ["--d" as string]: `${(k % 3) * 90}ms` }}>
                <span className="icon icon--brand">{t.i}</span>
                <h3>{t.t}</h3>
                <p>{t.p}</p>
                <div className="skala">
                  <div className="skala__z"><span>Ticketgröße</span><Skala n={t.ticket} /></div>
                  <div className="skala__z"><span>Termine pro Woche</span><Skala n={t.termine} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section id="jobs" className="section section--soft">
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="tag">Aktuell gesucht</span>
            <h2 className="h2">Offene Stellen <span className="b">bei Partnern</span></h2>
            <p className="lead">Eine Auswahl. Die meisten Stellen vergeben wir direkt über den Match-Check, ohne dass sie hier stehen.</p>
          </div>
          <JobsBoard jobs={JOBS} />
        </div>
      </section>

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
            <div className="cta-zeile"><Link href="/wissen" className="btn btn--ghost">Alle Artikel</Link></div>
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      <section id="faq" className="section section--soft">
        <div className="wrap">
          <div className="head center"><span className="tag">FAQ</span><h2 className="h2">Ehrliche <span className="b">Antworten.</span></h2></div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* ================= ABSCHLUSS ================= */}
      <section className="section">
        <div className="wrap">
          <div className="banner">
            <span className="tag tag--dunkel">Dein nächster Schritt</span>
            <h2 className="h2">Die Frage ist nicht, ob du es kannst. <span style={{ color: "var(--brand-2)" }}>Sondern wo.</span></h2>
            <p>2 Minuten Match-Check. Wir finden die Vertriebe, die zu dir passen. Du musst nur noch zum Probetag.</p>
            <Link href="/bewerben" className="btn btn--brand">Kostenlosen Match-Check starten <Pfeil /></Link>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><IcLock width={16} height={16} />Anonym vorgestellt</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><IcShield width={16} height={16} />Nur geprüfte Partner</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><IcBell width={16} height={16} />Für dich kostenlos</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mobil-cta"><span>Match-Check · 2 Min.</span><Link href="/bewerben" className="btn btn--brand">Starten <Pfeil /></Link></div>
    </>
  );
}
