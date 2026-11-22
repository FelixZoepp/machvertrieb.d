"use client";
import Link from "next/link";
import { Pfeil } from "./icons";

export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  // Bildmarke: goldenes Quadrat, schwarzer Aufwärtspfeil (Aufstieg durch Vertrieb). Passend zur Zoepp-Marke.
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="mvGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8c46a" />
          <stop offset="0.55" stopColor="#c9a13d" />
          <stop offset="1" stopColor="#b28820" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#mvGold)" />
      <path d="M8 22l6-6 4 4 6-8" fill="none" stroke="#1a1305" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 11.5H24V16" fill="none" stroke="#1a1305" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
      <div className="topbar">
        <div className="wrap">
          <span><span className="topbar__punkt" />machvertrieb.de · <span className="topbar__lang">ein Projekt von Felix Zoepp · </span><b>103 Vertriebe arbeiten mit seinem System</b></span>
          <Link href="/bewerben">Vertrieb finden →</Link>
        </div>
      </div>
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
