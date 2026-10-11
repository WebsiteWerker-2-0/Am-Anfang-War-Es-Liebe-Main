import type { PageData } from "../model";

export const news: PageData = {
  slug: "aktuelles",
  title: "Aktuelles",
  description:
    "Aktionen, Ausstellungen und Beiträge des Arbeitskreises gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
  intro: "Aktionen, Ausstellungen und Beiträge des Arbeitskreises.",
  band: { asset: "illustrations/band-p15" },
  layout: "wide",
  blocks: [{ blockType: "newsList", variant: "page" }],
};
