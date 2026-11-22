import type { MetadataRoute } from "next";
import { alleArtikel } from "@/lib/wissen";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/bewerben`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/wissen`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...alleArtikel().map((a) => ({ url: `${SITE.url}/wissen/${a.slug}`, lastModified: new Date(a.date), priority: 0.7 })),
  ];
}
