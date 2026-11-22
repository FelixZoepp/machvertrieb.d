import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleArtikel, artikel } from "@/lib/wissen";
import { Faq, JsonLd, faqSchema } from "@/components/faq";
import { Pfeil } from "@/components/icons";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return alleArtikel().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = artikel((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `/wissen/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, url: `${SITE.url}/wissen/${a.slug}`, publishedTime: a.date },
  };
}

const datum = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });

export default async function ArtikelSeite({ params }: { params: Promise<{ slug: string }> }) {
  const a = artikel((await params).slug);
  if (!a) notFound();
  const weitere = alleArtikel().filter((x) => x.slug !== a.slug).slice(0, 3);
  const url = `${SITE.url}/wissen/${a.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Article", headline: a.title, description: a.description, datePublished: a.date, dateModified: a.date, inLanguage: "de-DE", mainEntityOfPage: url, keywords: a.keywords.join(", "), author: { "@id": `${SITE.url}/#org` }, publisher: { "@id": `${SITE.url}/#org` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${SITE.url}/wissen` },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ] },
          ],
        }}
      />
      {a.faq.length > 0 && <JsonLd data={faqSchema(a.faq)} />}
      <header className="artikel-kopf">
        <div className="wrap">
          <nav className="brot" aria-label="Brotkrumen"><Link href="/">Start</Link><span>/</span><Link href="/wissen">Ratgeber</Link><span>/</span><span>{a.category}</span></nav>
          <h1>{a.title}</h1>
          <div className="artikel-meta">
            <span className="chip chip--y">{a.category}</span>
            <span className="chip">{a.minuten} Min. Lesezeit</span>
            <span className="chip">Stand: {datum(a.date)}</span>
          </div>
          {a.summary && <div className="kurz"><strong>Kurz beantwortet</strong>{a.summary}</div>}
        </div>
      </header>
      <div className="wrap artikel-grid">
        <article className="prose" dangerouslySetInnerHTML={{ __html: a.html }} />
        <aside className="toc">
          {a.toc.length > 0 && (
            <nav aria-label="Inhaltsverzeichnis">
              <h2>Inhalt</h2>
              <ol>{a.toc.map((t) => (<li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>))}</ol>
            </nav>
          )}
          <div className="toc-cta">
            <strong>Bereit für deinen Start im Vertrieb?</strong>
            <p>2 Minuten, ohne Lebenslauf, für dich kostenlos.</p>
            <Link href="/bewerben" className="btn btn--red btn--sm">Jetzt bewerben <Pfeil /></Link>
          </div>
        </aside>
      </div>
      {a.faq.length > 0 && (
        <section className="section section--warm" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="wrap">
            <div className="head center"><span className="eyebrow">FAQ</span><h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>Häufige Fragen zum Thema</h2></div>
            <Faq items={a.faq} />
          </div>
        </section>
      )}
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="final" style={{ marginBottom: 56 }}>
            <h2 className="h2" style={{ fontSize: "clamp(28px,4vw,44px)" }}>Genug gelesen? <span className="mark">Mach Vertrieb.</span></h2>
            <p>Bewirb dich in 2 Minuten. Wir rufen dich an und stellen dich passenden Vertrieben in deiner Region vor.</p>
            <Link href="/bewerben" className="btn btn--yellow">Jetzt bewerben <Pfeil /></Link>
          </div>
          <div className="head"><span className="eyebrow">Weiterlesen</span></div>
          <div className="grid grid--3" style={{ marginTop: 20 }}>
            {weitere.map((w) => (
              <Link key={w.slug} href={`/wissen/${w.slug}`} className="card artikel-karte">
                <span className="kat">{w.category}</span>
                <h3>{w.title}</h3>
                <span className="mehr">Weiterlesen →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="mobil-cta"><span>Bewerbung in 2 Min.</span><Link href="/bewerben" className="btn btn--red">Bewerben <Pfeil /></Link></div>
    </>
  );
}
