import Link from "next/link";
import Image from "next/image";
import { JOBS } from "@/lib/jobs";
import { alleArtikel } from "@/lib/wissen";
import { STIMMEN } from "@/lib/stimmen";
import { STORY, STORY_SICHTBAR } from "@/lib/story";
import { JobsBoard } from "@/components/jobs-board";
import { Faq, JsonLd, faqSchema } from "@/components/faq";
import { IconBuch, IconEuro, IconStart, IconStufen, IconTeam, IconUhr, Pfeil } from "@/components/icons";

import hero from "../../public/img/hero.jpg";
import cockpit from "../../public/img/cockpit.jpg";
import garage from "../../public/img/garage.jpg";
import detail from "../../public/img/detail.jpg";
import beraterin from "../../public/img/beraterin.jpg";
import haustuer from "../../public/img/haustuer.jpg";
import team from "../../public/img/team.jpg";
import rooftop from "../../public/img/rooftop.jpg";
import felix from "../../public/img/felix.jpg";

// Optional: Video-Header. Datei nach public/video/hero.mp4 legen und hier eintragen.
const HERO_VIDEO: string | null = null;

const BAND = ["Glasfaser", "Strom & Gas", "Photovoltaik", "Telekommunikation", "Versicherung", "Finanzen", "Immobilien"];

const VORHER = [
  { alt: "Gehalt mit Deckel", neu: <>Verdienst <em>nach oben offen</em></> },
  { alt: "Schichtplan von oben", neu: <>Termine, <em>die du planst</em></> },
  { alt: "Lebenslauf entscheidet", neu: <><em>Ehrgeiz</em> entscheidet</> },
  { alt: "Warten auf Beförderung", neu: <>Aufstieg <em>nach Leistung</em></> },
];

const SICHER = [
  { icon: <IconTeam />, t: "Nur geprüfte Partner", p: "Wir arbeiten nur mit Vertrieben, deren Produkt wir selbst vertreten würden. Keine Drückerkolonnen, keine Abzocke, kein Produkt, für das du dich schämen musst." },
  { icon: <IconEuro />, t: "Provisionen, die wirklich kommen", p: "Unsere Partner rechnen transparent und pünktlich ab. Du weißt vor dem Start, wofür du bezahlt wirst und wann. Wer das nicht einhält, arbeitet nicht mehr mit uns." },
  { icon: <IconBuch />, t: "Echte Ausbildung", p: "Einarbeitung, Mitlaufen bei erfahrenen Leuten, feste Ansprechpartner. Wir vermitteln nur an Vertriebe, die ihre Leute ausbilden statt verheizen." },
  { icon: <IconStart />, t: "Vorbereitet statt ins kalte Wasser", p: "Mit unserer Masterclass startest du mit dem richtigen Mindset und weißt, was dich erwartet. Das merken die Vertriebe sofort." },
  { icon: <IconStufen />, t: "Du hast die Wahl", p: "Dein Profil geht anonym an mehrere passende Vertriebe. Die melden sich bei dir, und du entscheidest, wo du zum Probetag gehst." },
  { icon: <IconUhr />, t: "Wir bleiben dein Ansprechpartner", p: "Auch nach dem Start. Läuft etwas nicht wie besprochen, sagst du es uns, und wir kümmern uns darum." },
];

const SCHRITTE = [
  { t: "Der Match-Check", z: "2 Minuten online", p: "Du sagst uns, wie du arbeiten willst: kleine oder große Tickets, Closen oder Leads, was du verdienen willst und wofür. So finden wir, wo du wirklich hinpasst." },
  { t: "Kennenlern-Telefonat", z: "Vorqualifizierung", p: "Wir rufen dich an, lernen dich kennen und klären letzte Fragen. Danach weißt du genau, welche Vertriebe für dich in Frage kommen." },
  { t: "Die Masterclass", z: "Online, ca. 1 Stunde", p: "Mindset, die Kernqualitäten guter Vertriebler und wie du im Gespräch überzeugst. Kostenlos und die Grundlage für deinen Start." },
  { t: "Vertriebe melden sich", z: "Anonym, mehrere Angebote", p: "Wir stellen dein Profil anonym passenden Partnern in deiner Region vor. Die rufen dich an. Du suchst dir aus, wer zu dir passt." },
  { t: "Probetag", z: "Vor Ort", p: "Kein klassisches Vorstellungsgespräch mehr. Du bist vorqualifiziert und vorbereitet, also geht es direkt in den Alltag." },
  { t: "Start", z: "Mit Einarbeitung", p: "Passt es für beide Seiten, startest du sofort. In Vollzeit oder Teilzeit, mit Einarbeitung und Team." },
];

const MODULE = [
  { t: "Dein Weg in den Vertrieb", p: "Was dich erwartet und was du von uns bekommst." },
  { t: "Mindset im Vertrieb", p: "Was erfolgreiche Vertriebler anders machen." },
  { t: "Die 5 Kernqualitäten", p: "Was einen guten Vertriebler ausmacht." },
  { t: "Unser Qualitätsstandard", p: "Warum wir nur an geprüfte Partner vermitteln." },
  { t: "Bewerbung bis Einstellung", p: "Jeder Schritt bis zum ersten Arbeitstag." },
  { t: "So überzeugst du im Gespräch", p: "Was unseren Partnern wirklich wichtig ist." },
  { t: "Realistische Verdienstmöglichkeiten", p: "Wie Einkommen im Vertrieb entsteht." },
  { t: "Deine nächsten Schritte", p: "Wie die Vertriebe auf dich zukommen." },
];

const ROLLEN = [
  { t: "Closer", p: "Du bekommst qualifizierte Termine und konzentrierst dich nur aufs Beraten und Abschließen. Wenige, große Tickets, länger beim Kunden.", tags: ["Große Tickets", "Termine gestellt"] },
  { t: "Berater im Außendienst", p: "Du bist in deinem Gebiet unterwegs, sprichst Haushalte an und schließt direkt ab. Viele Gespräche, kleinere Tickets, konstante Provision.", tags: ["Viele Abschlüsse", "Quereinstieg"] },
  { t: "Lead-Generierung", p: "Du findest Interessenten und legst Termine für die Closer. Kein Verkaufsdruck, dafür klare Ziele pro Tag.", tags: ["Ohne Verkauf", "Einstieg"] },
  { t: "Telefonvertrieb", p: "Du qualifizierst Interessenten am Telefon oder schließt direkt ab. Oft remote möglich.", tags: ["Telefon", "oft remote"] },
  { t: "Finanzen & Versicherung", p: "Beratung zu Absicherung, Vorsorge oder Zulagen. Manche Partner geben dir Bestandskunden zum Start.", tags: ["Beratung", "Qualifikation hilft"] },
  { t: "Teamleitung", p: "Du baust ein Team auf, bildest Leute aus und verdienst an den Ergebnissen deines Teams mit.", tags: ["Führung", "mit Erfahrung"] },
];

const FAQ = [
  { q: "Woher weiß ich, dass der Vertrieb seriös ist?", a: "Weil wir nur mit Partnern arbeiten, die wir kennen und geprüft haben: Produkt, Abrechnung, Einarbeitung. Felix und sein Team von Zoepp Consulting arbeiten täglich mit Direktvertrieben zusammen und wissen, wer seine Leute fair behandelt und wer nicht." },
  { q: "Werden die Provisionen wirklich ausgezahlt?", a: "Unsere Partner verpflichten sich zu transparenter und pünktlicher Abrechnung. Du weißt vor dem Start, wofür du bezahlt wirst. Hält sich ein Partner nicht daran, arbeiten wir nicht mehr mit ihm, und du sagst uns Bescheid." },
  { q: "Warum sollte ich mich nicht einfach selbst bewerben?", a: "Weil du dann oft nicht weißt, woran du bist: Ist das Produkt gut? Wird ausgebildet? Kommt die Provision? Viele verspielen ihre Chance im falschen Vertrieb. Über uns bekommst du geprüfte Partner, eine Vorbereitung und mehrere Angebote zur Auswahl." },
  { q: "Brauche ich Erfahrung im Vertrieb?", a: "Nein. Viele Partner suchen ausdrücklich Quereinsteiger. Wichtiger sind Ehrgeiz, Zuverlässigkeit und der Wille zu lernen. Den Rest bekommst du in der Masterclass und der Einarbeitung." },
  { q: "Geht das auch nebenberuflich?", a: "Nein. Unsere Partner suchen Leute, die es ernst meinen: Vollzeit oder Teilzeit. Nebenberufliche Stellen vermitteln wir nicht." },
  { q: "Wird mein Profil anonym weitergegeben?", a: "Ja. Wir stellen dein Profil zuerst ohne Namen und Kontaktdaten vor. Erst wenn ein Partner dich kennenlernen möchte, bringen wir euch zusammen." },
  { q: "Kostet mich das etwas?", a: "Nein. Match-Check, Telefonat, Masterclass und Vermittlung sind für dich komplett kostenlos." },
  { q: "Warum fragt ihr nach Wunschgehalt und Abschluss?", a: "Weil wir dich nicht irgendwohin vermitteln wollen, sondern dorthin, wo du dein Ziel erreichen kannst. Je besser wir dich kennen, desto genauer passt der Vertrieb, den wir für dich finden." },
];

export default function Home() {
  const artikel = alleArtikel().slice(0, 3);
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* HERO */}
      <section className="hero">
        <div className="hero__bild" aria-hidden="true">
          {HERO_VIDEO ? (
            <video src={HERO_VIDEO} poster={hero.src} autoPlay muted loop playsInline />
          ) : (
            <Image src={hero} alt="" priority placeholder="blur" sizes="100vw" data-parallax="0.12" />
          )}
        </div>
        <div className="wrap">
          <div className="hero__in">
            <div className="hero__felix">
              <Image src={felix} alt="Felix Zoepp" width={80} height={80} />
              <span>Ein Projekt von <strong>Felix Zoepp</strong> · 103 Vertriebe arbeiten mit seinem System</span>
            </div>
            <h1 className="h1">
              <span className="zeile"><span>Du willst mehr.</span></span>
              <span className="zeile"><span className="serif goldtext">Wir wissen, wo.</span></span>
            </h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              Wir vermitteln dich an geprüfte Vertriebe, die fair zahlen, richtig ausbilden und ein Produkt verkaufen, hinter dem du
              stehen kannst. Vorqualifiziert, mit unserer Masterclass vorbereitet. Du musst nur noch zum Probetag.
            </p>
            <div className="hero__cta">
              <Link href="/bewerben" className="btn btn--gold">Finde deinen Vertrieb <Pfeil /></Link>
              <Link href="#prinzip" className="btn btn--ghost">So funktioniert&apos;s</Link>
            </div>
            <div className="hero__fakten">
              <span>Nur geprüfte Partner</span>
              <span>Mehrere Angebote, du wählst</span>
              <span>Vollzeit oder Teilzeit</span>
              <span>Für dich kostenlos</span>
            </div>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true">
        <div className="band__track">
          {[...BAND, ...BAND, ...BAND, ...BAND].map((b, i) => (<span key={i} className="band__item">{b}</span>))}
        </div>
      </div>

      {/* VORHER / NACHHER */}
      <section className="section">
        <div className="wrap split">
          <div className="split__bild" data-reveal="links" data-tilt><Image src={cockpit} alt="Hand am Lenkrad eines Sportwagens bei Nacht" placeholder="blur" sizes="(max-width: 960px) 100vw, 50vw" /></div>
          <div className="head" data-reveal="rechts">
            <span className="eyebrow">Das Spiel</span>
            <h2 className="h2">Gehaltstabelle <span className="serif gold">oder</span> Leistung?</h2>
            <p className="lead">In den meisten Jobs entscheidet jemand anderes, was du wert bist. Im Vertrieb entscheidest du das selbst, mit jedem Gespräch.</p>
            <div className="tafel">
              <div className="tafel__z tafel__kopf"><span>Dein Job heute</span><span>Im Vertrieb</span></div>
              {VORHER.map((v) => (
                <div key={v.alt} className="tafel__z"><span className="tafel__alt">{v.alt}</span><span className="tafel__neu">{v.neu}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AURA */}
      <section className="section section--2">
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="eyebrow">Aura</span>
            <h2 className="h2">Status ist kein Zufall. <span className="serif goldtext">Er ist eine Entscheidung.</span></h2>
            <p className="lead">Niemand schenkt dir Auto, Uhr oder Freiheit. Aber im Vertrieb hängt das nicht an einer Gehaltstabelle, sondern an dir. Wer ehrgeizig ist, gut ausgebildet wird und beim richtigen Vertrieb startet, kann sich etwas aufbauen, das in vielen Jobs ohne Studium kaum erreichbar ist.</p>
          </div>
          <div className="galerie">
            <div className="kachel k1" data-tilt data-reveal="zoom"><Image src={garage} alt="Drei Premium-Autos in einer Tiefgarage" placeholder="blur" sizes="(max-width: 860px) 100vw, 60vw" /><div className="kachel__text"><strong>Anspruch</strong><span>Du entscheidest, was dein Einsatz wert ist.</span></div></div>
            <div className="kachel k2" data-tilt data-reveal="zoom"><Image src={detail} alt="Scheinwerfer eines Sportwagens im Regen" placeholder="blur" sizes="(max-width: 860px) 50vw, 40vw" /><div className="kachel__text"><strong>Status</strong><span>Kauft man nicht. Erarbeitet man sich.</span></div></div>
            <div className="kachel k3" data-tilt data-reveal="zoom"><Image src={beraterin} alt="Vertrieblerin mit Tablet auf dem Weg zum Termin" placeholder="blur" sizes="(max-width: 860px) 50vw, 40vw" /><div className="kachel__text"><strong>Freiheit</strong><span>Eigene Termine, eigenes Tempo.</span></div></div>
            <div className="kachel k4" data-tilt data-reveal="zoom"><Image src={haustuer} alt="Berater im Gespräch an der Haustür" placeholder="blur" sizes="(max-width: 860px) 100vw, 35vw" /><div className="kachel__text"><strong>Vertrauen</strong><span>Gute Vertriebler verkaufen nicht. Sie beraten.</span></div></div>
            <div className="kachel k5" data-tilt data-reveal="zoom"><Image src={team} alt="Vertriebsteam feiert gemeinsam" placeholder="blur" sizes="(max-width: 860px) 100vw, 65vw" /><div className="kachel__text"><strong>Team</strong><span>Du startest nicht allein. Du startest mit Leuten, die gewinnen wollen.</span></div></div>
          </div>
        </div>
      </section>

      {/* FELIX */}
      <section id="felix" className="section">
        <div className="wrap felix">
          <div className="felix__bild" data-reveal="links" data-tilt>
            <Image src={felix} alt="Felix Zoepp" placeholder="blur" sizes="(max-width: 960px) 100vw, 42vw" />
            <div className="felix__name"><strong>Felix Zoepp</strong><span>Gründer Zoepp Consulting · Initiator von machvertrieb.de</span></div>
          </div>
          <div className="head" data-reveal="rechts">
            <span className="eyebrow">Wer dahinter steht</span>
            <h2 className="h2">Felix baut Vertriebe. <span className="serif gold">Jetzt baut er deinen Weg.</span></h2>
            <p className="lead">
              Mit Zoepp Consulting baut Felix das Recruiting für Direktvertriebe auf. 103 Vertriebe arbeiten mit seinem System. Er sieht jeden
              Tag, welche Vertriebe fair zahlen, gut ausbilden und ihre Leute halten, und welche nicht.
            </p>
            <p className="lead">
              Genau dieses Wissen steckt in machvertrieb.de: Statt dich auf gut Glück irgendwo zu bewerben, bringen wir dich zu den Partnern,
              bei denen du dein Ziel wirklich erreichen kannst.
            </p>
            <div><Link href="/bewerben" className="btn btn--gold">Lass uns deinen Vertrieb finden <Pfeil /></Link></div>
          </div>
        </div>
      </section>

      {/* STORY (erscheint, sobald Felix' Kapitel freigegeben sind) */}
      {STORY_SICHTBAR && (
        <section id="story" className="section section--2">
          <div className="wrap">
            <div className="head center" data-reveal>
              <span className="eyebrow">Felix&apos; Story</span>
              <h2 className="h2">Vom Zocker im Kinderzimmer <span className="serif goldtext">zum Porsche mit 23.</span></h2>
              <p className="lead" style={{ maxWidth: 680 }}>Kein reicher Papa, keine guten Noten, kein Plan. Nur die Entscheidung, verkaufen zu lernen. Das hat Vertrieb aus meinem Leben gemacht.</p>
            </div>
            <div className="story" data-progress>
              {STORY.map((k, i) => (
                <article key={k.titel} className="kapitel">
                  <div className="kapitel__bild" data-reveal={i % 2 ? "rechts" : "links"} data-tilt>
                    {k.bild && <Image src={k.bild} alt={k.titel} fill sizes="(max-width: 860px) 100vw, 45vw" />}
                  </div>
                  <div data-reveal={i % 2 ? "links" : "rechts"}>
                    <div className="kapitel__jahr">{k.jahr}</div>
                    <h3>{k.titel}</h3>
                    <p>{k.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="center" style={{ marginTop: 64, color: "var(--muted)", fontSize: 13.5 }}>Das ist Felix&apos; Weg, kein Einkommensversprechen. Was du verdienst, hängt von dir, deinem Einsatz und deinem Vertrieb ab.</p>
            <div className="after-cta"><Link href="/bewerben" className="btn btn--gold">Dein Kapitel beginnt hier <Pfeil /></Link></div>
          </div>
        </section>
      )}

      {/* PRINZIP */}
      <section id="prinzip" className="section section--2">
        <div className="wrap prinzip">
          <div className="prinzip__links">
            <span className="eyebrow">Das Prinzip</span>
            <h2 className="h2">Einmal bewerben. <span className="serif goldtext">Vorbereitet zum Probetag.</span></h2>
            <p className="lead">Kein Bewerbungsmarathon, kein Glücksspiel. Wir finden heraus, wo du hinpasst, bereiten dich vor und bringen die Vertriebe zu dir.</p>
            <div><Link href="/bewerben" className="btn btn--gold">Match-Check starten <Pfeil /></Link></div>
          </div>
          <ol className="schritte" data-reveal>
            {SCHRITTE.map((s, i) => (
              <li key={s.t}>
                <span className="schritte__nr">0{i + 1}</span>
                <div><div className="schritte__z">{s.z}</div><h3>{s.t}</h3><p>{s.p}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MASTERCLASS */}
      <section id="masterclass" className="section">
        <div className="wrap mc">
          <div className="head" data-reveal>
            <span className="eyebrow">Masterclass</span>
            <h2 className="h2">Mindset zuerst. <span className="serif gold">Dann der Vertrag.</span></h2>
            <p className="lead">Bevor dich ein Vertrieb kennenlernt, bekommst du unsere Masterclass: 8 Module, etwa eine Stunde, online und kostenlos. Du weißt danach, wie Vertrieb funktioniert, was von dir erwartet wird und wie du im Probetag überzeugst.</p>
            <ul className="checks">
              <li>Das richtige Mindset, bevor der erste Kunde Nein sagt</li>
              <li>Realistische Erwartungen statt leerer Versprechen</li>
              <li>Vertriebe wissen: Wer von uns kommt, ist vorbereitet</li>
            </ul>
          </div>
          <ol className="module" data-reveal="kippen">
            {MODULE.map((m, i) => (
              <li key={m.t}><span className="module__nr">{i + 1}</span><div><h3>{m.t}</h3><p>{m.p}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {/* SICHERHEIT */}
      <section id="sicherheit" className="section section--2">
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="eyebrow">Wofür wir stehen</span>
            <h2 className="h2">Gute Partner. Faire Provisionen. <span className="serif goldtext">Echte Ausbildung.</span></h2>
            <p className="lead">Im Vertrieb gibt es großartige Unternehmen und welche, die Leute benutzen. Wir sorgen dafür, dass du bei den richtigen landest.</p>
          </div>
          <div className="grid grid--3">
            {SICHER.map((s) => (
              <div key={s.t} className="card" data-tilt data-reveal style={{ ["--d" as string]: `${(SICHER.indexOf(s) % 3) * 110}ms` }}><div className="card__icon">{s.icon}</div><h3>{s.t}</h3><p>{s.p}</p></div>
            ))}
          </div>
          <div className="vergleich" data-reveal="kippen">
            <div className="vergleich__col">
              <span className="card__meta">Selbst irgendwo bewerben</span>
              <h3>Glücksspiel</h3>
              <ul>
                <li>Unklar, ob Produkt und Vertrieb seriös sind</li>
                <li>Provisionsmodell oft intransparent</li>
                <li>Einarbeitung ist Glückssache</li>
                <li>Passt es nicht, ist die Chance verspielt</li>
                <li>Du bist allein, wenn es schiefgeht</li>
              </ul>
            </div>
            <div className="vergleich__col vergleich__col--top">
              <span className="card__meta" style={{ color: "var(--gold)" }}>Über machvertrieb.de</span>
              <h3>Vorqualifiziert. Vorbereitet. Vermittelt.</h3>
              <ul>
                <li>Nur geprüfte Partner mit gutem Produkt</li>
                <li>Transparente, zuverlässig gezahlte Provisionen</li>
                <li>Einarbeitung und Ausbildung garantiert eingeplant</li>
                <li>Mehrere Angebote, du entscheidest</li>
                <li>Wir bleiben dein Ansprechpartner</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ERFAHRUNGEN (erscheint, sobald Videos hinterlegt sind) */}
      {STIMMEN.length > 0 && (
        <section id="erfahrungen" className="section">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Erfahrungen</span>
              <h2 className="h2">Sie haben es gemacht. <span className="serif gold">Hör es von ihnen.</span></h2>
              <p className="lead">Leute, die über uns in den Vertrieb gestartet sind: was sie vorher gemacht haben und wie es heute läuft.</p>
            </div>
            <div className="stimmen">
              {STIMMEN.map((s) => (
                <figure key={s.name} className="stimme" style={{ margin: 0 }}>
                  <video src={s.video} poster={s.poster} controls preload="none" playsInline />
                  <figcaption className="stimme__text"><strong>{s.name}</strong><span>Vorher: {s.vorher} · Heute: {s.heute}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ROLLEN */}
      <section id="rollen" className="section">
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="eyebrow">Was zu dir passt</span>
            <h2 className="h2">Große Tickets oder viele Abschlüsse? <span className="serif gold">Du entscheidest.</span></h2>
            <p className="lead">Jeder Vertriebstyp hat seinen Platz. Im Match-Check finden wir heraus, welcher deiner ist.</p>
          </div>
          <div className="grid grid--3">
            {ROLLEN.map((r, i) => (
              <div key={r.t} className="card" data-tilt data-reveal style={{ ["--d" as string]: `${(i % 3) * 110}ms` }}>
                <span className="card__nr">0{i + 1}</span>
                <h3>{r.t}</h3>
                <p>{r.p}</p>
                <div className="chips">{r.tags.map((t) => (<span key={t} className="chip">{t}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section id="jobs" className="section section--2">
        <div className="wrap">
          <div className="head" data-reveal>
            <span className="eyebrow">Aktuell gesucht</span>
            <h2 className="h2">Offene Stellen <span className="serif gold">bei Partnern</span></h2>
            <p className="lead">Eine Auswahl. Die meisten Stellen vergeben wir direkt über den Match-Check, ohne dass sie hier stehen.</p>
          </div>
          <JobsBoard jobs={JOBS} />
          <div className="after-cta"><Link href="/bewerben" className="btn btn--ghost">Nichts dabei? Match-Check machen <Pfeil /></Link></div>
        </div>
      </section>

      {/* RATGEBER */}
      {artikel.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Ratgeber</span>
              <h2 className="h2">Erst lesen, <span className="serif gold">dann loslegen.</span></h2>
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
      <section id="faq" className="section section--2">
        <div className="wrap">
          <div className="head center">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">Ehrliche Antworten.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* FINALE */}
      <section className="finale">
        <Image src={rooftop} alt="" placeholder="blur" sizes="100vw" data-parallax="0.18" />
        <div className="wrap">
          <span className="eyebrow">Dein nächster Schritt</span>
          <h2 className="h1" style={{ maxWidth: 1000 }}>Die Frage ist nicht, ob du es kannst. <span className="serif goldtext">Sondern wo.</span></h2>
          <p>2 Minuten Match-Check. Wir finden die Vertriebe, die zu dir passen. Du musst nur noch zum Probetag.</p>
          <Link href="/bewerben" className="btn btn--gold">Finde deinen Vertrieb <Pfeil /></Link>
        </div>
      </section>

      <div className="mobil-cta">
        <span>Match-Check · 2 Min.</span>
        <Link href="/bewerben" className="btn btn--gold">Starten <Pfeil /></Link>
      </div>
    </>
  );
}
