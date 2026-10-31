import { courseOffersHeading } from "../course-offers";
import type { PageData } from "../model";

// Kurse: Beschreibungen aus dem Backend (Bereich „Kurse“), Standardfassung in content/course-offers.ts.
// Die Termine mit Anmeldung stehen auf der eigenen Seite „Termine“ (content/pages/dates.ts).
export const courses: PageData = {
  slug: "kurse",
  // Kurz und allgemein, damit die Überschrift auf eine Zeile passt (Wunsch Steffen 31.10.2026);
  // die Überschrift aus dem Dokument des AG steht darunter als Einleitung
  title: "Unsere Kurse",
  intro: `${courseOffersHeading} für Frauen, Mädchen und Kinder im Kreis Höxter.`,
  description: "Krav Maga und Wendo: Kurse für Frauen, Mädchen und Kinder im Kreis Höxter.",
  band: "courses",
  layout: "stack-lg",
  blocks: [{ blockType: "courseOffers", datesLink: { label: "Termine und Anmeldung", href: "/termine" } }],
};
