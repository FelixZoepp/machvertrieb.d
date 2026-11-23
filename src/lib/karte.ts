// Partner-Standorte für die Deutschlandkarte. Gleiche belegte Einsatzgebiete wie auf felixzoepp.de (src/content/karte.ts).
// Keine Firmennamen anzeigen. Neuen Ort: Eintrag mit ort, branche, lat, lon anhängen.
export type Standort = { ort: string; branche: string; lat: number; lon: number };

export const SITZ = { name: "Zoepp Consulting GmbH", strasse: "Bornitzstraße 73-75", plzOrt: "10365 Berlin", lat: 52.5146, lon: 13.4884 };

export const PARTNER_ORTE: Standort[] = [
  { ort: "Hannover", branche: "Glasfaser", lat: 52.3759, lon: 9.732 },
  { ort: "Erfurt", branche: "Photovoltaik", lat: 50.9848, lon: 11.0299 },
  { ort: "Köln", branche: "Versicherung", lat: 50.9375, lon: 6.9603 },
  { ort: "Landshut", branche: "Versicherung", lat: 48.5372, lon: 12.1522 },
  { ort: "München", branche: "Versicherung", lat: 48.1351, lon: 11.582 },
  { ort: "Stralsund", branche: "Strom & Gas", lat: 54.3091, lon: 13.0818 },
  { ort: "Grimmen", branche: "Strom & Gas", lat: 54.11, lon: 13.041 },
  { ort: "Demmin", branche: "Strom & Gas", lat: 53.905, lon: 13.044 },
];

export const PARTNER_REGIONEN = [
  { id: "DE-BY", name: "Bayern", branche: "Zulagenberatung" },
  { id: "DE-BW", name: "Baden-Württemberg", branche: "Zulagenberatung" },
];
