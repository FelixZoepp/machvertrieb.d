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

// Größere Städte als kleine Punkte: Vermittlung möglich (kein eigener Partner-Standort behauptet).
export const STAEDTE: [string, number, number][] = [
  ["Hamburg", 53.551, 9.993], ["München", 48.137, 11.575], ["Köln", 50.938, 6.96], ["Frankfurt am Main", 50.11, 8.682], ["Stuttgart", 48.776, 9.183],
  ["Düsseldorf", 51.227, 6.773], ["Leipzig", 51.34, 12.375], ["Dortmund", 51.514, 7.465], ["Essen", 51.456, 7.012], ["Bremen", 53.079, 8.802],
  ["Dresden", 51.05, 13.738], ["Hannover", 52.376, 9.732], ["Nürnberg", 49.452, 11.077], ["Duisburg", 51.434, 6.762], ["Bochum", 51.482, 7.216],
  ["Wuppertal", 51.256, 7.15], ["Bielefeld", 52.03, 8.532], ["Bonn", 50.737, 7.098], ["Münster", 51.961, 7.626], ["Mannheim", 49.487, 8.466],
  ["Karlsruhe", 49.007, 8.404], ["Augsburg", 48.371, 10.898], ["Wiesbaden", 50.078, 8.24], ["Mönchengladbach", 51.18, 6.442], ["Gelsenkirchen", 51.517, 7.086],
  ["Aachen", 50.775, 6.084], ["Braunschweig", 52.269, 10.521], ["Kiel", 54.323, 10.123], ["Chemnitz", 50.833, 12.925], ["Halle (Saale)", 51.482, 11.97],
  ["Magdeburg", 52.12, 11.628], ["Freiburg", 47.999, 7.842], ["Krefeld", 51.339, 6.586], ["Mainz", 49.993, 8.247], ["Lübeck", 53.866, 10.686],
  ["Erfurt", 50.985, 11.03], ["Oberhausen", 51.47, 6.852], ["Rostock", 54.092, 12.099], ["Kassel", 51.312, 9.48], ["Hagen", 51.367, 7.463],
  ["Potsdam", 52.391, 13.065], ["Saarbrücken", 49.234, 6.996], ["Hamm", 51.68, 7.82], ["Ludwigshafen", 49.477, 8.445], ["Oldenburg", 53.143, 8.214],
  ["Osnabrück", 52.279, 8.047], ["Leverkusen", 51.046, 7.004], ["Heidelberg", 49.399, 8.672], ["Darmstadt", 49.873, 8.651], ["Solingen", 51.165, 7.067],
  ["Regensburg", 49.013, 12.102], ["Paderborn", 51.718, 8.757], ["Ingolstadt", 48.766, 11.426], ["Würzburg", 49.791, 9.953], ["Ulm", 48.401, 9.988],
  ["Heilbronn", 49.142, 9.218], ["Wolfsburg", 52.423, 10.787], ["Göttingen", 51.541, 9.916], ["Pforzheim", 48.892, 8.695], ["Offenbach", 50.096, 8.776],
  ["Bremerhaven", 53.54, 8.58], ["Bottrop", 51.524, 6.929], ["Trier", 49.75, 6.637], ["Recklinghausen", 51.614, 7.198], ["Reutlingen", 48.491, 9.204],
  ["Jena", 50.927, 11.589], ["Koblenz", 50.356, 7.594], ["Bergisch Gladbach", 50.992, 7.136], ["Cottbus", 51.757, 14.329], ["Schwerin", 53.635, 11.401],
  ["Gera", 50.88, 12.082], ["Zwickau", 50.718, 12.496], ["Flensburg", 54.794, 9.437], ["Neubrandenburg", 53.557, 13.261], ["Frankfurt (Oder)", 52.347, 14.55],
  ["Dessau", 51.835, 12.246], ["Bamberg", 49.898, 10.902], ["Passau", 48.567, 13.431], ["Kempten", 47.728, 10.315], ["Konstanz", 47.66, 9.175],
  ["Rosenheim", 47.856, 12.128], ["Bayreuth", 49.948, 11.578], ["Fulda", 50.555, 9.68], ["Siegen", 50.874, 8.024], ["Görlitz", 51.152, 14.987],
  ["Greifswald", 54.093, 13.388], ["Wismar", 53.89, 11.465], ["Lüneburg", 53.249, 10.408], ["Emden", 53.367, 7.207], ["Plauen", 50.495, 12.137],
  ["Kaiserslautern", 49.444, 7.769], ["Gießen", 50.584, 8.678], ["Hildesheim", 52.15, 9.951], ["Salzgitter", 52.15, 10.333], ["Stralsund", 54.309, 13.082],
];
