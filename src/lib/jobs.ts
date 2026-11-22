// Offene Vertriebsstellen (Quelle: öffentliche Stellenanzeigen der Kunden, Stand 22.11.2026).
// Bewerbung läuft immer über das Quiz /bewerben?stelle=<slug>. Beendete Stellen entfernen.

export type Job = {
  slug: string;
  title: string;
  company: string;
  branche: "Energie" | "Glasfaser & Telekommunikation" | "Photovoltaik" | "Versicherung & Finanzen" | "Immobilien";
  ort: string;
  /** Für Google Jobs: Stadt/Region und Bundesland, oder remote */
  location: { city?: string; region?: string; remote?: boolean };
  modell: string;
  verdienst?: string;
  highlights: string[];
  summary: string;
  quereinstieg: boolean;
  datePosted: string;
};

export const JOBS: Job[] = [
  {
    slug: "glasfaser-vertrieb-hannover",
    title: "Glasfaser-Vertrieb im Außendienst (m/w/d)",
    company: "Major Vertrieb",
    branche: "Glasfaser & Telekommunikation",
    ort: "Hannover",
    location: { city: "Hannover", region: "Niedersachsen" },
    modell: "Außendienst, Haustür",
    verdienst: "bis zu 300 € pro Kunde",
    highlights: ["Quereinsteiger willkommen", "Einarbeitung im Team", "7 kurze Fragen, Rückruf in 48 Stunden"],
    summary: "Vertriebler und Quereinsteiger für den Glasfaser-Außendienst in Hannover. Du berätst Haushalte zum Glasfaseranschluss und wirst im Team eingearbeitet.",
    quereinstieg: true,
    datePosted: "2026-10-21",
  },
  {
    slug: "lead-berater-photovoltaik-thueringen",
    title: "Lead-Berater Photovoltaik im Außendienst (m/w/d)",
    company: "Major Vertrieb",
    branche: "Photovoltaik",
    ort: "Thüringen",
    location: { region: "Thüringen" },
    modell: "Außendienst, ohne Verkauf",
    verdienst: "bis zu 70 € pro Lead",
    highlights: ["Quereinsteiger willkommen", "Kein Verkauf: du findest interessierte Hausbesitzer", "Rückruf in 48 Stunden"],
    summary: "Du findest im Außendienst interessierte Hausbesitzer für Photovoltaik und vereinbarst Termine. Der Verkauf läuft über die Berater, du konzentrierst dich auf das Gespräch an der Tür.",
    quereinstieg: true,
    datePosted: "2026-10-26",
  },
  {
    slug: "zulagenberater-bayern-baden-wuerttemberg",
    title: "Zulagenberater im Außendienst (m/w/d)",
    company: "SEP Vertrieb",
    branche: "Versicherung & Finanzen",
    ort: "Bayern und Baden-Württemberg",
    location: { region: "Bayern" },
    modell: "Außendienst",
    verdienst: "bis zu 150 € pro Abschluss",
    highlights: ["Ohne Vorerfahrung", "Probetag und 1:1-Einarbeitung", "Bayern und Baden-Württemberg"],
    summary: "Du hilfst tariflichen Angestellten in Einzelhandel und Industrie, ihre Zulage vom Arbeitgeber zu bekommen. Start mit Probetag und Einarbeitung eins zu eins.",
    quereinstieg: true,
    datePosted: "2026-09-06",
  },
  {
    slug: "versicherung-vertriebspartner-landshut-muenchen",
    title: "Vertriebspartner Versicherung in Vollzeit (m/w/d)",
    company: "Florian König",
    branche: "Versicherung & Finanzen",
    ort: "Landshut und München",
    location: { city: "Landshut", region: "Bayern" },
    modell: "Vollzeit, Versicherungsvertrieb",
    verdienst: "bis zu 2.000 € Fixum, nicht zurückzahlbar, Provision zusätzlich",
    highlights: ["1.200 Bestandskunden zum Start", "Junges Team", "Versicherungs-Ausbildung oder §34d erforderlich"],
    summary: "Für Vertriebler mit Versicherungs-Ausbildung oder §34d im Raum Landshut und München. Du startest mit einem Bestand von 1.200 Kunden und einem Fixum.",
    quereinstieg: false,
    datePosted: "2026-10-27",
  },
  {
    slug: "agenturpartner-versicherung-koeln",
    title: "Agenturpartner Versicherung (m/w/d)",
    company: "Allianz Agentur Aslan & Özdemir",
    branche: "Versicherung & Finanzen",
    ort: "Köln",
    location: { city: "Köln", region: "Nordrhein-Westfalen" },
    modell: "Agenturpartner",
    verdienst: "Fixum, Provision und Kundenstamm",
    highlights: ["Kundenstamm vorhanden", "Für Versicherungsprofis mit Ausbildung oder §34d", "4 kurze Fragen, Rückruf der Inhaber in 48 Stunden"],
    summary: "Für Versicherungsprofis, die nicht bei null anfangen wollen: Fixum, Provision und ein bestehender Kundenstamm im Raum Köln.",
    quereinstieg: false,
    datePosted: "2026-10-19",
  },
  {
    slug: "vertriebspartner-immobilien-deutschlandweit",
    title: "Vertriebspartner Immobilien (m/w/d)",
    company: "Tobias Krohn",
    branche: "Immobilien",
    ort: "Deutschlandweit",
    location: { remote: true },
    modell: "Selbstständig, deutschlandweit",
    verdienst: "vierstellige Provision pro Abschluss",
    highlights: ["Quereinsteiger und Vertriebstalente", "Für die Bewerbung kein §34c nötig", "5 kurze Fragen, kein Lebenslauf"],
    summary: "Für Quereinsteiger und Vertriebstalente aus ganz Deutschland im Immobilienvertrieb. Keine Vorerfahrung nötig, Rückruf innerhalb von 48 Stunden.",
    quereinstieg: true,
    datePosted: "2026-11-12",
  },
  {
    slug: "vermittler-immobilien-crowdinvesting-remote",
    title: "Vermittler Immobilien-Crowdinvesting, Telefon und remote (m/w/d)",
    company: "Exporo",
    branche: "Immobilien",
    ort: "Remote",
    location: { remote: true },
    modell: "Telefon, 100 % remote",
    verdienst: "ca. 750 € Provision pro vermitteltem Kunden",
    highlights: ["Keine Kaltakquise: bestehende Anleger", "100 % remote", "Nur für erfahrene Vertriebler"],
    summary: "Du informierst bestehende Anleger telefonisch über neue Immobilienprojekte und vermittelst den Kontakt. Komplett remote, für erfahrene Vertriebler.",
    quereinstieg: false,
    datePosted: "2026-11-15",
  },
];

export const JOB_BRANCHEN = Array.from(new Set(JOBS.map((j) => j.branche)));
