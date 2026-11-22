// Felix' Heldenreise für die Startseite. Inhalte von Felix (Sprachnachricht 23.11.2026), nur sprachlich geglättet.
// Bilder: KI-Stimmungsbilder (Higgsfield). Echte Fotos (Büro, Auto, Team) gern austauschen: Datei nach public/img/story/ legen.
export type Kapitel = { jahr: string; titel: string; text: string; bild?: string; entwurf?: boolean };

export const STORY: Kapitel[] = [
  {
    jahr: "2018",
    titel: "„Aus mir wird nichts.“",
    text: "Schlechte Noten, jeden Tag gezockt, kein Plan. Ich habe mir selbst gesagt, dass aus mir nichts wird. Und ehrlich: Es sah auch genau danach aus.",
    bild: "/img/story/2018.jpg",
  },
  {
    jahr: "2021",
    titel: "Studium. Gezwungenermaßen.",
    text: "Ich habe ein Studium angefangen, weil man das eben so macht. Nebenbei habe ich alles Mögliche versucht: Social-Media-Beiträge, Videokurse für 50 €. Eineinhalb Jahre habe ich so rumgedümpelt, ohne wirklich Geld zu verdienen.",
    bild: "/img/story/2021.jpg",
  },
  {
    jahr: "Der Wendepunkt",
    titel: "Dann kam Sales.",
    text: "Ich habe aufgehört, alles gleichzeitig zu probieren, und nur noch eins gemacht: verkaufen lernen. Agenturdienstleistungen, alles Mögliche. Im dritten Monat habe ich zum ersten Mal 10.000 € in einem Monat verdient. Aus meinem Kinderzimmer heraus habe ich danach meinen ersten Vertrieb aufgebaut und fünfstellig gemacht.",
    bild: "/img/story/wendepunkt.jpg",
  },
  {
    jahr: "2022 bis 2024",
    titel: "Hustle. Und fast alles verloren.",
    text: "Mein erstes eigenes Büro war ein kleiner Raum. 14 Stunden am Tag, jeden Tag. Ich hatte treue Leute an meiner Seite und habe viele wieder verloren. 2023 kam das erste richtige Auto, ein VW Arteon. Davor bin ich einen Passat für 500 € gefahren, der auseinandergefallen ist. Sechs Vollzeitmitarbeiter, und trotzdem bin ich fast pleite gegangen.",
    bild: "/img/story/hustle.jpg",
  },
  {
    jahr: "Ende 2024",
    titel: "Nicht aufgegeben.",
    text: "Statt hinzuschmeißen, bin ich größer geworden: neues Büro, 130 Quadratmeter. 2025 war ein gutes Jahr. 2026 ein noch besseres.",
    bild: "/img/story/buero.jpg",
  },
  {
    jahr: "Heute",
    titel: "23 Jahre. Und angekommen.",
    text: "Mehrere Vollzeitmitarbeiter, über 100 Kunden, für die wir den Vertrieb aufbauen, sechsstellige Monatsumsätze, Beteiligungen an mehreren Sales-Unternehmen. Über 300.000 € habe ich in Coachings und meine Sales-Skills investiert. Und mit 23 steht ein Porsche vor der Tür. Vertrieb hat mein Leben komplett verändert. Genau diese Chance will ich mit machvertrieb.de weitergeben.",
    bild: "/img/story/heute.jpg",
  },
];

export const STORY_SICHTBAR = STORY.length > 0 && STORY.every((k) => !k.entwurf);
