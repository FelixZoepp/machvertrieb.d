// Erfahrungsvideos von Leuten, die über machvertrieb.de gestartet sind.
// Nur echte Personen mit Einverständnis. Videos nach public/video/ legen (MP4, Hochformat 9:16).
// Sobald hier Einträge stehen, erscheint der Abschnitt „Erfahrungen“ auf der Startseite.
export type Stimme = { name: string; vorher: string; heute: string; video: string; poster?: string };

export const STIMMEN: Stimme[] = [
  // { name: "Vorname N.", vorher: "Koch", heute: "Berater Glasfaser in Hannover", video: "/video/stimme-1.mp4", poster: "/img/stimme-1.jpg" },
];
