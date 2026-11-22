import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Artikel = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  summary: string;
  faq: { q: string; a: string }[];
  html: string;
  toc: { id: string; text: string }[];
  minuten: number;
};

const DIR = path.join(process.cwd(), "content", "wissen");

export function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function render(md: string) {
  const toc: { id: string; text: string }[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = slugify(text);
    if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens);
    const merke = /<strong>Merke:?<\/strong>/.test(body);
    return `<aside class="${merke ? "merke" : "zitat"}">${body}</aside>\n`;
  };
  renderer.table = function (token) {
    const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
    const rows = token.rows
      .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="tabelle"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
  };
  const html = marked.parse(md, { renderer, async: false }) as string;
  return { html, toc };
}

let cache: Artikel[] | null = null;

export function alleArtikel(): Artikel[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(DIR)) return [];
  const list = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { data, content } = matter(raw);
      const { html, toc } = render(content);
      const words = content.split(/\s+/).length;
      return {
        slug: f.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        category: String(data.category ?? "Ratgeber"),
        keywords: (data.keywords as string[]) ?? [],
        summary: String(data.summary ?? ""),
        faq: (data.faq as { q: string; a: string }[]) ?? [],
        html,
        toc,
        minuten: Math.max(1, Math.round(words / 220)),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  cache = list;
  return list;
}

export function artikel(slug: string) {
  return alleArtikel().find((a) => a.slug === slug);
}
