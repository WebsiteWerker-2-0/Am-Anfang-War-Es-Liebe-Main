import type { Metadata, Viewport } from "next";

// Meta-Angaben der Website, gemeinsam für das Root-Layout und global-not-found.tsx
const SITE_TITLE = "Am Anfang war es Liebe … | Hilfe bei Gewalt im Kreis Höxter";

export const siteMetadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Am Anfang war es Liebe …",
  },
  description:
    "Hilfe bei häuslicher Gewalt im Kreis Höxter: Selbstcheck, Anlaufstellen und Informationen des Arbeitskreises gegen Gewalt an Frauen und Kindern.",
  // Entwurf: nicht indexieren (Abschnitt 10.6)
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  formatDetection: { telephone: false },
};

// Die 404-Seite hat keinen Seitentitel, der den Titel-Zusatz bekommen könnte
export const notFoundMetadata: Metadata = { ...siteMetadata, title: SITE_TITLE };

// Kein maximum-scale, Zoom bleibt erlaubt (Abschnitt 9)
export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};
