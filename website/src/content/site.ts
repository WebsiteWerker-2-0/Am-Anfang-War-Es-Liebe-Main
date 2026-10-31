import type { SiteData } from "./model";
import { tel } from "./pages/helpers";

// Seitenrahmen: Navigation, Sprachwahl, Hilfetelefon in der Hilfeleiste, Postfächer, Fuß.
// Ziel und Beschriftung des Notausgangs stehen bewusst im Code (components/QuickExit.tsx), nicht im CMS.
export const defaultSite: SiteData = {
  navigation: [
    { href: "/hilfe", label: "Hilfe" },
    { href: "/selbstcheck", label: "Selbstcheck" },
    { href: "/aktuelles", label: "Aktuelles" },
    { href: "/termine", label: "Termine" },
    { href: "/kurse", label: "Kurse" },
    // Ohne Unterpunkte: Die Seite Infos führt mit Wegweisern zu ihren Bereichen (Entscheidung Steffen 31.10.2026)
    { href: "/infos", label: "Infos" },
    { href: "/arbeitskreis", label: "Arbeitskreis" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  // Sprachfassungen in Eigenschreibung, ohne Flaggen (Abschnitt 6.1)
  languages: [
    { code: "de", label: "Deutsch", href: "/" },
    { code: "ar", label: "العربية", href: "/sprachen#ar" },
    { code: "ru", label: "Русский", href: "/sprachen#ru" },
    { code: "en", label: "English", href: "/sprachen#en" },
    { code: "tr", label: "Türkçe", href: "/sprachen#tr" },
  ],
  helpline: { number: "116 016", suffix: ", rund um die Uhr" },
  // Postfächer und Anliegen der Kontaktanfrage (F-04), Angaben vom AG am 11.10.2026 (Z-09, teilweise).
  mailboxes: {
    help: { label: "Sie suchen Hilfe", email: "fbs@awo-hoexter.de" },
    information: { label: "Sie möchten sich informieren", email: "gleichstellung@kreis-hoexter.de" },
  },
  footer: {
    organisation: "Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“",
    address: `<p>c/o Gleichstellungsbeauftragte des Kreises Höxter<br>Moltkestraße 12, 37671 Höxter<br>Telefon ${tel("05271 9659904")}</p>`,
    emergency: `<p>Im Notfall: Polizei ${tel("110")} · Hilfetelefon ${tel("116 016")}</p>`,
    serviceLinks: [
      { label: "Internetspuren löschen", href: "/internetspuren" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Broschüre (PDF)", href: "/downloads/broschuere-am-anfang-war-es-liebe-2016.pdf" },
    ],
    legalLinks: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    fundingLabel: "Gefördert durch",
    // Förderhinweis. OFFEN: Größe und Schutzzone des Logos nach Fördervorgaben prüfen (Z-11)
    fundingLogo: { asset: "logos/mkjfgfi-nrw" },
    fundingAlt:
      "Ministerium für Kinder, Jugend, Familie, Gleichstellung, Flucht und Integration des Landes Nordrhein-Westfalen",
    draftNote:
      "Illustrationen: fien-design, Höxter.",
  },
};
