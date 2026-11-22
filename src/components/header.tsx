"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pfeil } from "./icons";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="machvertrieb.de Startseite">
      <b>mach</b>vertrieb<i>.de</i>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <a href="#inhalt" className="skip">Zum Inhalt springen</a>
      <div className="wrap header__in">
        <Logo />
        <nav className="nav" aria-label="Hauptnavigation">
          <Link href="/#prinzip">Prinzip</Link>
          <Link href="/#felix">Felix</Link>
          <Link href="/#sicherheit">Sicherheit</Link>
          <Link href="/#jobs">Jobs</Link>
          <Link href="/wissen">Ratgeber</Link>
        </nav>
        <Link href="/bewerben" className="btn btn--gold btn--sm">Match-Check <Pfeil /></Link>
      </div>
    </header>
  );
}
