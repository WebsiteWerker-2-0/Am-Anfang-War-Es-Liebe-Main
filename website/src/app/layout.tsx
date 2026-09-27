import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Literata, Noto_Naskh_Arabic } from "next/font/google";
import { Fuss } from "@/components/Fuss";
import { Kopf } from "@/components/Kopf";
import { NotausgangLink, NotausgangVerhalten } from "@/components/Notausgang";
import "./globals.css";

// Schriften werden von next/font beim Build geladen und vom eigenen Server
// ausgeliefert, der Browser fragt nie bei Google an (Abschnitt 0, Regel 1).
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

export const metadata: Metadata = {
  title: {
    default: "Am Anfang war es Liebe … | Hilfe bei Gewalt im Kreis Höxter",
    template: "%s | Am Anfang war es Liebe …",
  },
  description:
    "Hilfe bei häuslicher Gewalt im Kreis Höxter: Selbstcheck, Anlaufstellen und Informationen des Arbeitskreises gegen Gewalt an Frauen und Kindern.",
  // Entwurf: nicht indexieren (Abschnitt 10.6)
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  formatDetection: { telephone: false },
};

// Kein maximum-scale, Zoom bleibt erlaubt (Abschnitt 9)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      dir="ltr"
      className={`${literata.variable} ${plex.variable} ${naskh.variable} ${plexArabic.variable}`}
    >
      <body>
        <NotausgangVerhalten />
        <Kopf />
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
        <Fuss />
        <NotausgangLink fixed />
      </body>
    </html>
  );
}
