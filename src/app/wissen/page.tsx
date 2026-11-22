import type { Metadata } from "next";
import Link from "next/link";
import { alleArtikel } from "@/lib/wissen";
import { Pfeil } from "@/components/icons";

export const metadata: Metadata = {
  title: "Ratgeber: Einstieg, Verdienst und Alltag im Vertrieb",
  description: "Ehrliche Ratgeber für deinen Start im Vertrieb: Quereinstieg, Verdienst, Haustürvertrieb, Probetag und die ersten 90 Tage. Von Leuten, die Vertrieb leben.",
  alternates: { canonical: "/wissen" },
};

export default function Wissen() {
  const liste = alleArtikel();
  return (
    <>
      <section className="artikel-kopf">
        <div className="wrap">
          <nav className="brot" aria-label="Brotkrumen"><Link href="/">Start</Link><span>/</span><span>Ratgeber</span></nav>
          <h1>Ratgeber für deinen Start im Vertrieb</h1>
          <p className="lead" style={{ marginTop: 16, maxWidth: 720 }}>Ehrliche Antworten auf die Fragen, die du dir vor dem Einstieg stellst: Passt Vertrieb zu mir, was verdiene ich, wie läuft der Alltag wirklich?</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="grid grid--3" style={{ marginTop: 0 }}>
            {liste.map((a) => (
              <Link key={a.slug} href={`/wissen/${a.slug}`} className="card artikel-karte">
                <span className="kat">{a.category} · {a.minuten} Min.</span>
                <h2 className="h3" style={{ fontSize: 20, lineHeight: 1.25 }}>{a.title}</h2>
                <p>{a.description}</p>
                <span className="mehr">Weiterlesen →</span>
              </Link>
            ))}
          </div>
          <div className="after-cta"><Link href="/bewerben" className="btn btn--red">Direkt bewerben <Pfeil /></Link></div>
        </div>
      </section>
    </>
  );
}
