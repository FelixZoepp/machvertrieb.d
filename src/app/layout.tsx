import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrackingCapture } from "@/components/tracking";
import { Effekte } from "@/components/effekte";
import { JsonLd } from "@/components/faq";
import { SITE } from "@/lib/site";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Jobs im Vertrieb, auch für Quereinsteiger | machvertrieb.de", template: "%s | machvertrieb.de" },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE.name, url: SITE.url, title: "Mach Vertrieb. Wir finden den besten Vertrieb für dich", description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#070707", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Organization", "@id": `${SITE.url}/#org`, name: SITE.name, url: SITE.url, parentOrganization: { "@type": "Organization", name: SITE.firma, address: { "@type": "PostalAddress", streetAddress: SITE.adresse[0], postalCode: "10365", addressLocality: "Berlin", addressCountry: "DE" } } },
              { "@type": "WebSite", "@id": `${SITE.url}/#web`, name: SITE.name, url: SITE.url, inLanguage: "de-DE", publisher: { "@id": `${SITE.url}/#org` } },
            ],
          }}
        />
        <TrackingCapture />
        <Effekte />
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
