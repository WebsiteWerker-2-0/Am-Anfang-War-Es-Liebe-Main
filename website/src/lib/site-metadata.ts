import type { Metadata, Viewport } from "next";

// Meta-Angaben der Website, gemeinsam für das Root-Layout und global-not-found.tsx
export const siteMetadata: Metadata = {
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
export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};
