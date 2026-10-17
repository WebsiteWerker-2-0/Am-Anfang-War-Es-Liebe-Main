import type { PageData } from "../model";

export const news: PageData = {
  slug: "aktuelles",
  title: "Aktuelles",
  description:
    "Aktionen, Ausstellungen und Beiträge des Arbeitskreises gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
  intro: "Aktionen, Ausstellungen und Beiträge des Arbeitskreises.",
  band: "news",
  layout: "wide",
  blocks: [{ blockType: "newsList", variant: "page" }],
};
