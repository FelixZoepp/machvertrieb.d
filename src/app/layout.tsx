import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrackingCapture } from "@/components/tracking";
import { JsonLd } from "@/components/faq";
import { SITE } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Jobs im Vertrieb, auch für Quereinsteiger | machvertrieb.de", template: "%s | machvertrieb.de" },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE.name, url: SITE.url, title: "Mach Vertrieb. Dein Einstieg in den Vertrieb", description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={manrope.variable}>
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
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
