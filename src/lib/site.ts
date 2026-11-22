export const SITE = {
  name: "machvertrieb.de",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://machvertrieb.de",
  claim: "Mach Vertrieb.",
  description:
    "Jobs im Vertrieb, auch für Quereinsteiger: Glasfaser, Energie, Photovoltaik, Versicherung und Immobilien. In 2 Minuten bewerben, ohne Lebenslauf.",
  firma: "Zoepp Consulting GmbH",
  adresse: ["Bornitzstraße 73-75", "10365 Berlin"],
  email: "felix@zoeppmedia.de",
};

export const BRANCHEN = [
  "Glasfaser & Telekommunikation",
  "Energie",
  "Photovoltaik",
  "Versicherung & Finanzen",
  "Immobilien",
] as const;
