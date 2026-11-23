import Link from "next/link";
import { Logo } from "./header";
import { SITE } from "@/lib/site";
import { alleArtikel } from "@/lib/wissen";

export function Footer() {
  const artikel = alleArtikel().slice(0, 5);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <Logo />
            <p>Jobs im Vertrieb, auch für Quereinsteiger. Wir bringen dich mit Vertrieben in deiner Region zusammen, die wirklich einarbeiten.</p>
          </div>
          <div>
            <h4>Bewerber</h4>
            <ul>
              <li><Link href="/bewerben">Jetzt bewerben</Link></li>
              <li><Link href="/#partner">Partner-Netzwerk</Link></li>
              <li><Link href="/#ablauf">So funktioniert&apos;s</Link></li>
              <li><Link href="/#faq">Häufige Fragen</Link></li>
            </ul>
          </div>
          <div>
            <h4>Ratgeber</h4>
            <ul>
              {artikel.map((a) => (
                <li key={a.slug}><Link href={`/wissen/${a.slug}`}>{a.title.split(":")[0]}</Link></li>
              ))}
              <li><Link href="/wissen">Alle Artikel</Link></li>
            </ul>
          </div>
          <div>
            <h4>Rechtliches</h4>
            <ul>
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__unten">
          <span>© {new Date().getFullYear()} {SITE.name} · ein Angebot der {SITE.firma}</span>
          <span>Für Bewerber kostenlos</span>
        </div>
      </div>
    </footer>
  );
}
