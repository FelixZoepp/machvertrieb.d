import { alleArtikel } from "@/lib/wissen";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const a = alleArtikel();
  const txt = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} ist ein Angebot der ${SITE.firma} (Berlin). Bewerber machen einen kurzen Online-Check, werden angerufen und passenden Direktvertrieben in ihrer Region vorgestellt (Glasfaser & Telekommunikation, Strom & Gas, Photovoltaik, Versicherung & Finanzen, Immobilien). Für Bewerber kostenlos, Quereinstieg möglich, kein Lebenslauf nötig.`,
    "",
    "## Wichtige Seiten",
    `- [Bewerben (2-Minuten-Check)](${SITE.url}/bewerben)`,
    `- [Offene Stellen](${SITE.url}/#jobs)`,
    `- [Ratgeber](${SITE.url}/wissen)`,
    "",
    "## Ratgeber",
    ...a.map((x) => `- [${x.title}](${SITE.url}/wissen/${x.slug}): ${x.summary || x.description}`),
    "",
  ].join("\n");
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
