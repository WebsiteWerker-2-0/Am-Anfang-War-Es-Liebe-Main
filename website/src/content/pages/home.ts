import type { PageData } from "../model";
import { exhibitionBooking, exhibitionPanels } from "./helpers";

// Startseite. Formulierungen der Wege von der Frauenberatungsstelle, 21.10.2026
export const home: PageData = {
  slug: "start",
  title: "Sie sind hier, weil …",
  layout: "home",
  blocks: [
    {
      blockType: "entry",
      title: "Sie sind hier, weil …",
      paths: [
        {
          reason: "Sie in Ihrer (Ex-)Beziehung oder durch eine andere Person erniedrigt, verletzt, bedroht oder kontrolliert werden oder wurden",
          target: "Selbstcheck und Hilfe",
          href: "/selbstcheck",
        },
        {
          reason: "Sie von Ihrem (Ex-)Partner oder einer anderen Person verfolgt oder belästigt werden",
          target: "Anlaufstellen und Ihre Rechte",
          href: "/hilfe#stalking",
        },
        {
          reason: "Sie eine Person kennen, die Gewalt erlebt",
          target: "Hilfe für Angehörige und Freund*innen",
          href: "/hilfe#angehoerige",
        },
        {
          reason: "Sie helfen möchten oder sich informieren wollen",
          target: "Infos und Arbeitskreis",
          href: "/infos",
        },
      ],
      image: { asset: "illustrations/sun" },
    },
    {
      blockType: "promises",
      items: [
        { title: "Vertraulich", text: "Die Beraterinnen haben Schweigepflicht." },
        { title: "Kostenlos", text: "Die Beratung kostet Sie nichts." },
        { title: "Sie entscheiden", text: "Niemand drängt Sie zu einem Schritt, den Sie nicht wollen." },
      ],
    },
    {
      blockType: "quickAccess",
      anchor: "sofort-titel",
      heading: "Hier bekommen Sie sofort Hilfe",
      linkLabel: "Alle Anlaufstellen im Kreis Höxter",
      linkUrl: "/hilfe",
    },
    {
      blockType: "teaserBand",
      anchor: "selbstcheck-titel",
      heading: "Gewalt hat viele Gesichter",
      lead: "Nicht jede Gewalt hinterlässt blaue Flecken. Kontrolle, Drohungen und Demütigungen gehören genauso dazu. Der Selbstcheck hilft Ihnen, Ihre Situation in Ruhe für sich zu hinterfragen.",
      privacyNote: "Ihr Selbstcheck wird nicht gespeichert.",
      buttonLabel: "Zum Selbstcheck",
      buttonUrl: "/selbstcheck",
      image: { asset: "illustrations/thoughts" },
    },
    {
      blockType: "exhibition",
      anchor: "ausstellung-titel",
      heading: "Unsere Wanderausstellung",
      intro:
        "„Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren. Hier sehen Sie alle zwölf Tafeln.",
      panels: exhibitionPanels,
      note: exhibitionBooking,
    },
    {
      blockType: "newsList",
      variant: "teaser",
      anchor: "aktuelles-titel",
      heading: "Aktuelles",
      linkLabel: "Alle Beiträge",
      count: 3,
    },
  ],
};
