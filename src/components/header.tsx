"use client";
import Link from "next/link";
import { Pfeil } from "./icons";

export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  // Zoepp-Bildmarke (goldenes Z), wie auf felixzoepp.de
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src="/img/zoepp-mark.png" alt="" width={32} height={32} />;
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="machvertrieb.de Startseite">
      <LogoMark />
      <span className="logo__wort">Machvertrieb<small>.de</small></span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <header className="header">
        <a href="#inhalt" className="skip">Zum Inhalt springen</a>
        <div className="header__in">
          <Logo />
          <nav className="nav" aria-label="Hauptnavigation">
            <Link href="/#arten">Vertriebsarten</Link>
            <Link href="/#ablauf">So läuft&apos;s</Link>
            <Link href="/#sicherheit">Sicherheit</Link>
            <Link href="/#felix">Über Felix</Link>
            <Link href="/wissen">Ratgeber</Link>
          </nav>
          <Link href="/bewerben" className="btn btn--brand btn--sm">Vertrieb finden <Pfeil /></Link>
        </div>
      </header>
    </>
  );
}
