import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// KI-Crawler ausdrücklich erlaubt (GEO): Artikel sollen in ChatGPT, Perplexity, Claude & Co. zitiert werden.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
