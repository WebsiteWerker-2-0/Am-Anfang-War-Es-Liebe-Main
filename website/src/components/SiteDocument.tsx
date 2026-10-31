import { Epilogue, IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import { QuickExitBehavior, QuickExitLink } from "@/components/QuickExit";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSite } from "@/lib/content";

// Schriften werden von next/font beim Build geladen und vom eigenen Server
// ausgeliefert, der Browser fragt nie bei Google an (ADR-0002).
// Vorgeladen wird nur Latein; Kyrillisch und Arabisch kommen per unicode-range.
// Epilogue trägt Überschriften und Text. Sie hat kein Kyrillisch, dafür springt IBM Plex Sans ein,
// für Arabisch Plex Sans Arabic und Noto Naskh.
const epilogue = Epilogue({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
  preload: false,
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
export async function SiteDocument({ children }: { children: ReactNode }) {
  const site = await getSite();
  return (
    <html
      lang="de"
      dir="ltr"
      className={`${epilogue.variable} ${plex.variable} ${naskh.variable} ${plexArabic.variable}`}
    >
      <body>
        <QuickExitBehavior />
        <SiteHeader site={site} />
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <QuickExitLink fixed />
      </body>
    </html>
  );
}
