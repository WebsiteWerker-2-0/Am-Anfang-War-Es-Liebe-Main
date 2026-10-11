import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Literata, Noto_Naskh_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import { QuickExitBehavior, QuickExitLink } from "@/components/QuickExit";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

// Schriften werden von next/font beim Build geladen und vom eigenen Server
// ausgeliefert, der Browser fragt nie bei Google an (ADR-0002).
// Vorgeladen wird nur Latein; Kyrillisch und Arabisch kommen per unicode-range.
const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["600"],
  variable: "--font-naskh",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

// Gemeinsames Gerüst der Website. Es wird vom Root-Layout (site) und von
// global-not-found.tsx genutzt, damit auch die 404-Seite Kopf, Fuß und Notausgang hat.
export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      dir="ltr"
      className={`${literata.variable} ${plex.variable} ${naskh.variable} ${plexArabic.variable}`}
    >
      <body>
        <QuickExitBehavior />
        <SiteHeader />
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <QuickExitLink fixed />
      </body>
    </html>
  );
}
