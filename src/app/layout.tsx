import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Archivo, Newsreader } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import RevealObserver from "@/components/motion/RevealObserver";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteHeader from "@/components/shell/SiteHeader";
import { youtubeChannel } from "@/data/films";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

// Display + UI: Archivo's width axis runs from condensed (62) to expanded (125).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

// Reading + italic accents.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
  // Not preloaded: it's the reading face and swaps in quietly, leaving bandwidth for the
  // display face and the hero image.
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0E1311",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  icons: {
    icon: [{ url: "/drifters-favicon.png", type: "image/png" }],
    apple: "/drifters-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable}`}
    >
      <body className="surface-ink">
        <SiteHeader />
        <ViewTransition default="page">
          <main id="main">{children}</main>
        </ViewTransition>
        <SiteFooter />
        <RevealObserver />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: siteUrl.href,
            logo: new URL(site.logo, siteUrl).href,
            sameAs: [youtubeChannel],
          }}
        />
      </body>
    </html>
  );
}
