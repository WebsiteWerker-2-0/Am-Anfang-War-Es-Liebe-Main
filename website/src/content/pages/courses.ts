import { courseOffersHeading } from "../course-offers";
import type { PageData } from "../model";

// Kurse: Beschreibungen aus dem Backend (Bereich „Kurse“), Standardfassung in content/course-offers.ts.
// Die Termine mit Anmeldung stehen auf der eigenen Seite „Termine“ (content/pages/dates.ts).
export const courses: PageData = {
  slug: "kurse",
  title: courseOffersHeading,
  description: "Krav Maga und WenDo: Kurse für Frauen, Mädchen und Kinder im Kreis Höxter.",
  band: "courses",
  layout: "stack-lg",
  blocks: [{ blockType: "courseOffers", datesLink: { label: "Termine und Anmeldung", href: "/termine" } }],
};
