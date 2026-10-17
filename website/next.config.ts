import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Sicherheits-Header nach DESIGN-UND-ENTWICKLUNG.md, Abschnitt 10.5.
// Die CSP läuft im Entwurf als Report-Only, bis sie auf Staging geprüft ist.
const securityHeaders = [
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "img-src 'self' data:",
      "font-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "media-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
    ].join("; "),
  },
  // Entwurf: nicht in Suchmaschinen aufnehmen (Abschnitt 10.6)
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

// Redaktionsbereich (/backend): nie indexieren, nie zwischenspeichern.
// Die Admin-Oberfläche von Payload braucht Inline-Skripte und -Styles, daher gilt
// die CSP der Website dort nicht.
const backendHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Cache-Control", value: "no-store" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Eigene 404-Seite trotz zweier Root-Layouts (Website und Backend), siehe src/app/global-not-found.tsx
  experimental: { globalNotFound: true },
  // Das Einspielen des Standardinhalts ins CMS liest Bilder (src/assets) und Dateien (public) zur Laufzeit.
  // Auf Vercel gehören sie deshalb ausdrücklich zu den Backend-Funktionen.
  // Die Schlüssel sind Muster, daher ein Stern statt der Routen mit eckigen Klammern.
  outputFileTracingIncludes: {
    "/backend/**": ["./public/medien/**/*", "./public/downloads/**/*", "./src/assets/**/*"],
  },
  async headers() {
    const withoutCsp = securityHeaders.filter((header) => header.key !== "Content-Security-Policy-Report-Only");
    return [
      // Website: alle Adressen außer /backend
      { source: "/((?!backend(?:/|$)).*)", headers: securityHeaders },
      { source: "/backend/:path*", headers: [...withoutCsp, ...backendHeaders] },
    ];
  },
};

export default withPayload(nextConfig);
