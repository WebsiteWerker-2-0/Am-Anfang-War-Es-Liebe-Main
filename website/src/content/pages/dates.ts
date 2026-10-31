import type { PageData } from "../model";

// Termine: datierte Angebote mit freien Plätzen und Anmeldung, gepflegt im Backend unter „Termine“
export const dates: PageData = {
  slug: "termine",
  title: "Termine",
  description: "Termine des Arbeitskreises gegen Gewalt an Frauen und Kindern im Kreis Höxter, mit Anmeldung.",
  intro: "Hier finden Sie die nächsten Termine. Wo es eine Anmeldung gibt, melden Sie sich direkt hier an.",
  band: "courses",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "courseList",
      anchor: "termine",
      heading: "Termine und Anmeldung",
      emptyNotice: `<p><strong>Termine 2026:</strong> folgen. Die Anmeldung ist künftig direkt hier auf der Website möglich.</p>`,
    },
  ],
};
