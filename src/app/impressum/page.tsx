import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum", robots: { index: false }, alternates: { canonical: "/impressum" } };

// Stand wie felixzoepp.de/impressum. Offen: HRB 20438 gehört noch zur alten UG, Nummer der GmbH nachtragen.
export default function Impressum() {
  return (
    <div className="wrap rechtstext">
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>Zoepp Consulting GmbH<br />Bornitzstraße 73-75<br />10365 Berlin<br />Deutschland</p>
      <p><strong>Vertreten durch:</strong> Felix-Leon Zoepp</p>
      <p><strong>Handelsregister:</strong> HRB 20438</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:felix@zoeppmedia.de">felix@zoeppmedia.de</a></p>
      <h2>Redaktionell verantwortlich</h2>
      <p>Felix-Leon Zoepp, Anschrift wie oben</p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <h2>Haftung für Inhalte</h2>
      <p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen fortlaufend zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
      <h2>Haftung für Links</h2>
      <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.</p>
    </div>
  );
}
