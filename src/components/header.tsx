"use client";
import Link from "next/link";
import { Pfeil } from "./icons";

export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  // Bildmarke: schwarzes Quadrat, goldener Aufwärtspfeil aus zwei Stufen (Aufstieg durch Vertrieb)
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#0e0e10" />
      <path d="M8 22l6-6 4 4 6-8" fill="none" stroke="#e8b54a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 11.5H24V16" fill="none" stroke="#e8b54a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="machvertrieb.de Startseite">
      <LogoMark />
      <span className="logo__wort">mach<span>vertrieb</span><small>.de</small></span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="header">
      <a href="#inhalt" className="skip">Zum Inhalt springen</a>
      <div className="header__in">
        <Logo />
        <nav className="nav" aria-label="Hauptnavigation">
          <Link href="/#methode">So funktioniert&apos;s</Link>
          <Link href="/#partner">Partner-Check</Link>
          <Link href="/#felix">Über Felix</Link>
          <Link href="/#jobs">Jobs</Link>
          <Link href="/wissen">Ratgeber</Link>
        </nav>
        <Link href="/bewerben" className="btn btn--brand btn--sm">Match-Check starten <Pfeil /></Link>
      </div>
    </header>
  );
}
