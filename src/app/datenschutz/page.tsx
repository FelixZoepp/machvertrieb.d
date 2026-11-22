import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false }, alternates: { canonical: "/datenschutz" } };

// Entwurf, vor Livegang juristisch prüfen lassen.
export default function Datenschutz() {
  return (
    <div className="wrap rechtstext">
      <h1>Datenschutzerklärung</h1>
      <h2>1. Verantwortlicher</h2>
      <p>Zoepp Consulting GmbH, Bornitzstraße 73-75, 10365 Berlin, E-Mail: <a href="mailto:felix@zoeppmedia.de">felix@zoeppmedia.de</a></p>
      <h2>2. Bewerbung über den 2-Minuten-Check</h2>
      <p>Wenn du dich über unseren Online-Check bewirbst, verarbeiten wir deine Angaben: Name, Telefonnummer, E-Mail-Adresse, Postleitzahl, gewünschter Umkreis sowie deine Antworten zu Arbeitsstil, gewünschter Rolle, Branchen, Erfahrung, Schulabschluss, Arbeitsumfang, Wunschgehalt und Motivation, Mobilität, Starttermin, Sprachkenntnissen und Volljährigkeit. Zweck ist, dich zu kontaktieren und dir passende Stellen bei Vertriebsunternehmen vorzuschlagen.</p>
      <p>Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die Durchführung vorvertraglicher Maßnahmen auf deine Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Mit deiner Einwilligung stellen wir dein Profil passenden Vertriebsunternehmen zunächst ohne Namen und Kontaktdaten vor. Name und Kontaktdaten geben wir erst weiter, wenn ein Unternehmen dich kennenlernen möchte. Du kannst die Einwilligung jederzeit per E-Mail an uns widerrufen.</p>
      <p>Wir speichern deine Daten, solange wir dir passende Stellen vorschlagen können, und löschen sie spätestens 12 Monate nach dem letzten Kontakt oder sofort nach deinem Widerruf, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
      <h2>3. Herkunft deines Besuchs</h2>
      <p>Um zu verstehen, über welche Kanäle Bewerber zu uns finden, speichern wir in deinem Browser (Local Storage) Kampagnenparameter aus dem Link (zum Beispiel utm_source), ob ein Klick-Kennzeichen von Werbeplattformen vorhanden war, die verweisende Seite und die Einstiegsseite. Diese Angaben werden nur zusammen mit deiner Bewerbung an uns übertragen. Es werden keine Cookies von Drittanbietern gesetzt.</p>
      <h2>4. Hosting und Datenbank</h2>
      <p>Die Website wird bei Vercel Inc. gehostet. Bewerbungen werden in einer Datenbank bei Supabase Inc. gespeichert (Serverstandort EU). Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung. Beim Aufruf der Website verarbeitet der Hoster technisch notwendige Daten wie IP-Adresse, Zeitpunkt und aufgerufene Seite (Art. 6 Abs. 1 lit. f DSGVO).</p>
      <h2>5. Schriftarten</h2>
      <p>Die Schriftart wird beim Erstellen der Website lokal eingebunden. Beim Aufruf wird keine Verbindung zu Google-Servern aufgebaut.</p>
      <h2>6. Deine Rechte</h2>
      <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Schreib uns dafür einfach eine E-Mail.</p>
    </div>
  );
}
