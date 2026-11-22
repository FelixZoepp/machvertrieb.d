import Link from "next/link";
import { JOBS } from "@/lib/jobs";
import { alleArtikel } from "@/lib/wissen";
import { JobsBoard } from "@/components/jobs-board";
import { Faq, JsonLd, faqSchema } from "@/components/faq";
import {
  IconBuch, IconDeckel, IconEuro, IconKalender, IconPapier, IconSackgasse, IconSchleife, IconStart, IconStille, IconStufen, IconTeam, IconUhr, Pfeil,
} from "@/components/icons";

const PROBLEME = [
  { icon: <IconDeckel />, t: "Dein Gehalt hat einen Deckel.", s: "Egal, wie gut du bist.", p: "Du gibst jeden Tag alles, und am Monatsende steht trotzdem dieselbe Zahl auf dem Konto." },
  { icon: <IconKalender />, t: "Der Schichtplan bestimmt", s: "dein Leben.", p: "Wochenenden, Feiertage, Spätdienst. Freizeit gibt es, wenn der Plan es erlaubt." },
  { icon: <IconSackgasse />, t: "Aufstieg ist nicht in Sicht.", s: "Seit Jahren.", p: "Die nächste Stufe hängt an Betriebszugehörigkeit oder Abschlüssen, nicht an deiner Leistung." },
  { icon: <IconPapier />, t: "Der Lebenslauf entscheidet,", s: "nicht du.", p: "Ohne den passenden Abschluss wirst du gar nicht erst eingeladen, egal was du draufhast." },
  { icon: <IconSchleife />, t: "Jeder Tag ist", s: "derselbe Tag.", p: "Gleiche Aufgaben, gleiche Abläufe, kein echtes Ziel, auf das du hinarbeitest." },
  { icon: <IconStille />, t: "Deine Stärke mit Menschen", s: "bleibt ungenutzt.", p: "Du kannst gut reden und Leute überzeugen, aber in deinem Job zählt das nicht." },
];

const VORTEILE = [
  { icon: <IconEuro />, t: "Verdienst nach Leistung", p: "Im Vertrieb verdienst du an jedem Kunden mit. Wie viel, hängt von deinem Einsatz und deinem Können ab, nicht von einer Gehaltstabelle.", a: "Mehr Einsatz, mehr auf dem Konto." },
  { icon: <IconUhr />, t: "Mehr Freiheit im Alltag", p: "Viele Vertriebe arbeiten mit festen Gebieten oder Terminen statt Stechuhr. Vollzeit, Teilzeit oder nebenberuflich ist oft möglich.", a: "Dein Tag, deine Planung." },
  { icon: <IconStart />, t: "Quereinstieg ausdrücklich erwünscht", p: "Gastro, Handwerk, Einzelhandel, Pflege oder Studium: Viele unserer Partner suchen genau Leute wie dich und arbeiten dich ein.", a: "Kein Lebenslauf nötig." },
  { icon: <IconStufen />, t: "Aufstieg, der an dir hängt", p: "Wer gute Zahlen bringt und andere mitzieht, kann im Direktvertrieb Teamleiter werden, oft schneller als in klassischen Jobs.", a: "Vom Berater zur Führungskraft." },
  { icon: <IconTeam />, t: "Ein Team statt Einzelkampf", p: "Du startest nicht allein. Einarbeitung, Mitlaufen bei erfahrenen Kollegen und feste Ansprechpartner gehören bei unseren Partnern dazu.", a: "Lernen von Leuten, die es können." },
  { icon: <IconBuch />, t: "Fähigkeiten fürs Leben", p: "Gespräche führen, mit Einwänden umgehen, sicher auftreten: Was du im Vertrieb lernst, hilft dir in jedem Job und auch privat.", a: "Das nimmt dir keiner mehr." },
];

const ROLLEN = [
  { t: "Berater an der Haustür", p: "Du besuchst Haushalte in deinem Gebiet und berätst zu Glasfaser, Strom oder Photovoltaik. Klare Gebiete, klares Produkt.", tags: ["Außendienst", "Quereinstieg"], branchen: "Glasfaser · Energie · PV" },
  { t: "Lead-Berater ohne Verkauf", p: "Du findest interessierte Hausbesitzer und vereinbarst Termine. Den Abschluss machen die Fachberater, du konzentrierst dich aufs Gespräch.", tags: ["Außendienst", "Einstieg"], branchen: "Photovoltaik" },
  { t: "Telefonvertrieb und Terminierung", p: "Du sprichst Interessenten am Telefon an, qualifizierst sie und legst Termine. Häufig von zu Hause aus möglich.", tags: ["Telefon", "oft remote"], branchen: "Alle Branchen" },
  { t: "Fachberater und Closer", p: "Du führst Beratungsgespräche mit Interessenten, die schon Bedarf haben, und bringst sie zum Abschluss.", tags: ["Termine", "mit Erfahrung"], branchen: "PV · Finanzen · Immobilien" },
  { t: "Berater Versicherung und Finanzen", p: "Du betreust Kunden rund um Absicherung, Vorsorge oder Zulagen. Manche Partner bringen dir Bestandskunden zum Start mit.", tags: ["Beratung", "Ausbildung möglich"], branchen: "Versicherung & Finanzen" },
  { t: "Teamleiter im Direktvertrieb", p: "Du baust ein eigenes Team auf, arbeitest neue Leute ein und verdienst an den Ergebnissen deines Teams mit.", tags: ["Führung", "mit Erfahrung"], branchen: "Alle Branchen" },
];

const BRANCHEN_BAND = ["Glasfaser", "Strom & Gas", "Photovoltaik", "Telekommunikation", "Versicherung", "Finanzen", "Immobilien", "Quereinstieg"];

// Prinzip der Vermittlung: vorqualifizieren → vorbereiten (Masterclass) → Vertriebe melden sich → nur noch Probetag und Start
const SCHRITTE = [
  { t: "2-Minuten-Check", z: "Online, jetzt", p: "Ein paar Klicks zu dir, deinen Wünschen und deiner Postleitzahl. Kein Lebenslauf, kein Anschreiben." },
  { t: "Kennenlern-Telefonat", z: "Vorqualifizierung", p: "Wir rufen dich an und klären, was zu dir passt: Branche, Region, Vollzeit oder nebenbei. Danach weißt du, ob es passt." },
  { t: "Deine Vorbereitung", z: "Online, ca. 1 Stunde", p: "Wir schalten dir unsere Masterclass frei: Mindset, die Kernqualitäten guter Vertriebler und wie du im Gespräch überzeugst." },
  { t: "Vertriebe melden sich", z: "Du entscheidest", p: "Bist du vorbereitet, stellen wir dich passenden Vertrieben in deiner Region vor. Die rufen dich an, du suchst dir aus, wer zu dir passt." },
  { t: "Probetag", z: "Vor Ort", p: "Du lernst Team und Alltag kennen. Kein klassisches Vorstellungsgespräch mehr, du bist ja schon vorbereitet." },
  { t: "Start", z: "Mit Einarbeitung", p: "Passt es für beide Seiten, startest du mit Einarbeitung im Team. Wir bleiben auch danach dein Ansprechpartner." },
];

const MODULE = [
  { t: "Dein Weg in den Vertrieb", p: "Was dich erwartet, wie die Vermittlung abläuft und was du von uns bekommst." },
  { t: "Mindset im Vertrieb", p: "Was erfolgreiche Vertriebler anders machen, wie du mit einem Nein umgehst und dranbleibst." },
  { t: "Die 5 Kernqualitäten", p: "Welche Eigenschaften einen guten Vertriebler ausmachen und wie du sie trainierst." },
  { t: "Unser Qualitätsstandard", p: "Warum wir nur an Vertriebe vermitteln, die wirklich einarbeiten, und was wir von dir erwarten." },
  { t: "Von der Bewerbung bis zur Einstellung", p: "Jeder Schritt bis zu deinem ersten Arbeitstag, ohne Überraschungen." },
  { t: "So überzeugst du im Gespräch", p: "Was unseren Partnern wichtig ist und wie du beim Telefonat und Probetag punktest." },
  { t: "Realistische Verdienstmöglichkeiten", p: "Wie Verdienst im Vertrieb entsteht, was realistisch ist und woran du faire Modelle erkennst." },
  { t: "Deine nächsten Schritte", p: "Was nach der Vorbereitung passiert und wie die Vertriebe auf dich zukommen." },
];

const FAQ = [
  { q: "Brauche ich Erfahrung im Vertrieb?", a: "Nein. Viele unserer Partner suchen ausdrücklich Quereinsteiger, zum Beispiel aus Gastronomie, Handwerk, Einzelhandel oder Pflege. Wichtiger als Erfahrung sind Zuverlässigkeit, Lust auf Menschen und der Wille, dazuzulernen." },
  { q: "Kostet mich die Bewerbung oder Vermittlung etwas?", a: "Nein. Für dich als Bewerber ist alles kostenlos, vom Check über das Telefonat bis zur Vorstellung bei passenden Vertrieben." },
  { q: "Brauche ich einen Lebenslauf?", a: "Nein. Für die Bewerbung reichen die Antworten im 2-Minuten-Check und deine Kontaktdaten. Alles Weitere klären wir im Telefonat." },
  { q: "Wie viel verdient man im Vertrieb?", a: "Das hängt von Branche, Modell und deiner Leistung ab. Manche Stellen haben ein Fixum plus Provision, andere zahlen pro Kunde oder pro Termin. Bei den offenen Stellen siehst du, was der jeweilige Vertrieb angibt. Mehr dazu im Ratgeber zum Verdienst für Einsteiger." },
  { q: "Kann ich auch nebenberuflich oder in Teilzeit anfangen?", a: "Bei vielen Partnern ja. Gib im Check einfach an, wie du arbeiten möchtest. Dann schlagen wir dir nur Vertriebe vor, bei denen das passt." },
  { q: "Wie schnell meldet ihr euch?", a: "Wir sehen uns jede Bewerbung an und melden uns telefonisch für das Kennenlern-Telefonat. Halte dein Handy also in der Nähe." },
  { q: "Was ist die Masterclass und muss ich sie machen?", a: "Die Masterclass ist eine kurze Online-Vorbereitung in 8 Videos, insgesamt etwa eine Stunde. Du lernst Mindset, die Kernqualitäten guter Vertriebler und wie du im Gespräch überzeugst. Sie ist für dich kostenlos und die Voraussetzung dafür, dass wir dich Vertrieben vorstellen. So startest du nicht bei null und musst nur noch zum Probetag." },
  { q: "Muss ich mich bei jedem Vertrieb einzeln bewerben?", a: "Nein. Du bewirbst dich einmal bei uns. Nach deiner Vorbereitung stellen wir dich passenden Vertrieben in deiner Region vor, und die melden sich bei dir. Du entscheidest, zu wem du zum Probetag gehst." },
  { q: "Was passiert mit meinen Daten?", a: "Wir nutzen deine Angaben nur, um dir passende Stellen vorzuschlagen, und geben dein Profil nur an Vertriebe weiter, die zu dir passen. Du kannst deine Einwilligung jederzeit widerrufen." },
];

export default function Home() {
  const artikel = alleArtikel().slice(0, 6);
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <div className="pill"><span>Neu</span> Quereinsteiger willkommen</div>
            <h1 className="h1">
              Mach Vertrieb. Verdien nach <span className="mark">Leistung</span>, nicht nach Stechuhr.
            </h1>
            <p className="lead">
              Du bewirbst dich einmal. Wir bereiten dich mit unserer Masterclass auf Mindset und Gespräch vor, und dann melden sich
              passende Vertriebe aus deiner Region bei dir. Du musst nur noch zum Probetag und starten. Auch ohne Erfahrung.
            </p>
            <ul className="checks">
              <li>Bewerbung in 2 Minuten, ohne Lebenslauf</li>
              <li>Kostenlose Vorbereitung: Mindset, Gesprächsführung, Verdienst</li>
              <li>Vertriebe melden sich bei dir, du entscheidest</li>
              <li>Vollzeit, Teilzeit oder nebenberuflich, für dich kostenlos</li>
            </ul>
            <div className="hero__cta">
              <Link href="/bewerben" className="btn btn--red">Jetzt in 2 Minuten bewerben <Pfeil /></Link>
              <Link href="#jobs" className="btn btn--ghost">Offene Stellen ansehen</Link>
            </div>
          </div>

          <div className="visual" aria-hidden="true">
            <div className="visual__bg" />
            <div className="sticker">Mach Vertrieb.</div>
            <div className="karte">
              <div className="karte__kopf">
                <span className="karte__titel">Deine Bewerbung</span>
                <span className="live">LIVE</span>
              </div>
              <div className="schritt ok"><span className="schritt__nr">✓</span><div><div className="schritt__t">2-Minuten-Check</div><div className="schritt__s">Quereinstieg · Vollzeit · PLZ 10365</div></div><span className="schritt__status">Erledigt</span></div>
              <div className="schritt ok"><span className="schritt__nr">✓</span><div><div className="schritt__t">Kennenlern-Telefonat</div><div className="schritt__s">Wünsche und Region geklärt</div></div><span className="schritt__status">Erledigt</span></div>
              <div className="schritt ok"><span className="schritt__nr">✓</span><div><div className="schritt__t">Masterclass</div><div className="schritt__s">8 von 8 Modulen · Mindset sitzt</div></div><span className="schritt__status">Erledigt</span></div>
              <div className="schritt aktiv"><span className="schritt__nr">4</span><div><div className="schritt__t">Vertriebe melden sich</div><div className="schritt__s">Glasfaser · Photovoltaik · 30 km</div></div><span className="schritt__status">Läuft</span></div>
              <div className="schritt"><span className="schritt__nr">5</span><div><div className="schritt__t">Probetag und Start</div><div className="schritt__s">Du entscheidest, wo</div></div><span className="schritt__status">Bald</span></div>
              <div className="tag-chips">
                <span className="chip chip--y">Quereinstieg</span><span className="chip">Einarbeitung</span><span className="chip chip--r">Verdienst nach Leistung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true">
        <div className="band__track">
          {[...BRANCHEN_BAND, ...BRANCHEN_BAND].map((b, i) => (<span key={i} className="band__item">{b}</span>))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="section section--warm">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Das Problem</span>
            <h2 className="h2">Kennst du das aus deinem Job?</h2>
            <p className="lead">Du arbeitest viel, kannst gut mit Menschen, und trotzdem geht es nicht voran. Das liegt selten an dir, sondern an einem System, das Leistung nicht belohnt.</p>
          </div>
          <div className="grid grid--3">
            {PROBLEME.map((x) => (
              <div key={x.t} className="card card--x">
                <div className="card__icon">{x.icon}</div>
                <h3>{x.t}<span>{x.s}</span></h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
          <div className="after-cta"><Link href="/bewerben" className="btn btn--red">Raus aus dem Hamsterrad <Pfeil /></Link></div>
        </div>
      </section>

      {/* VORTEILE */}
      <section id="vorteile" className="section section--dark">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Der bessere Weg</span>
            <h2 className="h2">Warum so viele in den Vertrieb wechseln</h2>
            <p className="lead">Im Vertrieb zählt, was du draufhast. Nicht dein Abschluss, nicht dein Alter, nicht wie lange du schon dabei bist.</p>
          </div>
          <div className="grid grid--3">
            {VORTEILE.map((v) => (
              <div key={v.t} className="vorteil">
                <div className="card__icon">{v.icon}</div>
                <h3>{v.t}</h3>
                <p>{v.p}</p>
                <div className="pfeiltext">→ {v.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLLEN */}
      <section id="moeglichkeiten" className="section">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Was du machen kannst</span>
            <h2 className="h2">Vertrieb ist mehr als <span className="mark">Klinkenputzen</span>.</h2>
            <p className="lead">Ob draußen bei den Leuten, am Telefon oder später mit eigenem Team: Es gibt die passende Rolle für deinen Typ und dein Leben.</p>
          </div>
          <div className="grid grid--3">
            {ROLLEN.map((r, i) => (
              <div key={r.t} className="card rolle">
                <span className="rolle__nr">0{i + 1} · {r.branchen}</span>
                <h3>{r.t}</h3>
                <p>{r.p}</p>
                <div className="rolle__meta">{r.tags.map((t) => (<span key={t} className="chip">{t}</span>))}</div>
              </div>
            ))}
          </div>
          <div className="after-cta"><Link href="/bewerben" className="btn btn--red">Finde heraus, was zu dir passt <Pfeil /></Link></div>
        </div>
      </section>

      {/* ABLAUF */}
      <section id="ablauf" className="section section--warm">
        <div className="wrap">
          <div className="head center">
            <span className="eyebrow">So funktioniert&apos;s</span>
            <h2 className="h2">Einmal bewerben. Vorbereitet zum <span className="mark">Probetag</span>.</h2>
            <p className="lead">Statt dutzende Bewerbungen zu schreiben und dich in Vorstellungsgesprächen zu verkaufen, bewirbst du dich einmal. Wir qualifizieren dich vor, bereiten dich vor und bringen die Vertriebe zu dir.</p>
          </div>
          <ol className="ablauf ablauf--6">
            {SCHRITTE.map((s) => (
              <li key={s.t}>
                <span className="zeit">{s.z}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
          <div className="after-cta"><Link href="/bewerben" className="btn btn--red">Schritt 1 starten <Pfeil /></Link></div>
        </div>
      </section>

      {/* VORBEREITUNG / MASTERCLASS */}
      <section id="vorbereitung" className="section section--dark">
        <div className="wrap mc">
          <div className="head">
            <span className="eyebrow">Deine Vorbereitung</span>
            <h2 className="h2">Du startest nicht bei null. Du startest <span className="mark">vorbereitet</span>.</h2>
            <p className="lead">
              Bevor dich ein Vertrieb kennenlernt, bekommst du unsere Masterclass: 8 kurze Videos, insgesamt etwa eine Stunde, online und
              kostenlos. Danach weißt du, wie Vertrieb funktioniert, was von dir erwartet wird und wie du im Probetag überzeugst. Die
              Vertriebe wissen das auch und melden sich deshalb gezielt bei dir.
            </p>
            <ul className="checks mc__checks">
              <li>Das richtige Mindset, bevor der erste Kunde Nein sagt</li>
              <li>Kein Vorstellungsgespräch mehr, nur noch Probetag</li>
              <li>Realistische Erwartungen statt leerer Versprechen</li>
            </ul>
          </div>
          <ol className="module">
            {MODULE.map((m, i) => (
              <li key={m.t}>
                <span className="module__nr">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{m.t}</h3>
                  <p>{m.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap after-cta"><Link href="/bewerben" className="btn btn--yellow">Vorbereitung freischalten <Pfeil /></Link></div>
      </section>

      {/* JOBS */}
      <section id="jobs" className="section">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Offene Stellen</span>
            <h2 className="h2">Aktuell gesucht</h2>
            <p className="lead">Eine Auswahl der Stellen, für die unsere Partner gerade Leute suchen. Nicht jede Stelle steht öffentlich hier. Nichts Passendes dabei? Bewirb dich trotzdem, wir schauen, was in deiner Region frei ist.</p>
          </div>
          <JobsBoard jobs={JOBS} />
          <div className="after-cta"><Link href="/bewerben" className="btn btn--ghost">Initiativ bewerben <Pfeil /></Link></div>
        </div>
      </section>

      {/* VERGLEICH */}
      <section className="section section--warm">
        <div className="wrap">
          <div className="head center">
            <span className="eyebrow">Vergleich</span>
            <h2 className="h2">Selbst suchen oder mit uns starten</h2>
            <p className="lead">Der Unterschied liegt nicht in der Zahl der Anzeigen, sondern darin, wie viel Arbeit und Risiko bei dir bleibt.</p>
          </div>
          <div className="vergleich">
            <div className="vergleich__col">
              <span className="eyebrow" style={{ color: "var(--muted)" }}>Jobbörse</span>
              <h3>Allein durch die Anzeigen</h3>
              <ul>
                <li>Hunderte Anzeigen, die alle gleich klingen</li>
                <li>Lebenslauf und Anschreiben für jede Stelle</li>
                <li>Oft keine Rückmeldung</li>
                <li>Unklar, wer wirklich einarbeitet</li>
              </ul>
            </div>
            <div className="vergleich__col vergleich__col--top">
              <span className="eyebrow">Mit machvertrieb.de</span>
              <h3>Einmal bewerben, vorbereitet starten</h3>
              <ul>
                <li>2-Minuten-Check statt Lebenslauf</li>
                <li>Persönliches Telefonat statt Funkstille</li>
                <li>Masterclass: vorbereitet statt ins kalte Wasser</li>
                <li>Vertriebe aus deiner Region melden sich bei dir</li>
                <li>Nur noch Probetag und Start</li>
                <li>Für dich kostenlos</li>
              </ul>
            </div>
            <div className="vergleich__col">
              <span className="eyebrow" style={{ color: "var(--muted)" }}>Bauchgefühl</span>
              <h3>Beim Erstbesten anfangen</h3>
              <ul>
                <li>Keine Vergleichsmöglichkeit</li>
                <li>Einarbeitung ist Glückssache</li>
                <li>Passt es nicht, fängst du von vorn an</li>
                <li>Keiner, der dich berät</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RATGEBER */}
      {artikel.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Ratgeber</span>
              <h2 className="h2">Alles, was du vor dem Start wissen solltest</h2>
              <p className="lead">Ehrliche Antworten zu Einstieg, Verdienst und Alltag im Vertrieb.</p>
            </div>
            <div className="grid grid--3">
              {artikel.map((a) => (
                <Link key={a.slug} href={`/wissen/${a.slug}`} className="card artikel-karte">
                  <span className="kat">{a.category} · {a.minuten} Min.</span>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <span className="mehr">Weiterlesen →</span>
                </Link>
              ))}
            </div>
            <div className="after-cta"><Link href="/wissen" className="btn btn--ghost">Alle Artikel <Pfeil /></Link></div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="section section--warm">
        <div className="wrap">
          <div className="head center">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">Häufige Fragen</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* ABSCHLUSS */}
      <section className="section">
        <div className="wrap">
          <div className="final">
            <h2 className="h2">Dein neuer Job ist <span className="mark">2 Minuten</span> entfernt.</h2>
            <p>Kein Lebenslauf, kein Anschreiben, keine Kosten. Beantworte ein paar Fragen, den Rest klären wir am Telefon.</p>
            <Link href="/bewerben" className="btn btn--yellow">Jetzt bewerben <Pfeil /></Link>
          </div>
        </div>
      </section>

      <div className="mobil-cta">
        <span>Bewerbung in 2 Min.</span>
        <Link href="/bewerben" className="btn btn--red">Bewerben <Pfeil /></Link>
      </div>
    </>
  );
}
