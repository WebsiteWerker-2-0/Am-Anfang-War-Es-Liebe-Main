import type { PageData } from "../model";

// Startseite. OFFEN: Formulierungen der Wege auf Basis der Broschüre, Textfreigabe durch den AG (Z-01)
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
          reason: "Sie in Ihrer Beziehung verletzt, bedroht oder kontrolliert werden",
          target: "Selbstcheck und Hilfe",
          href: "/selbstcheck",
        },
        {
          reason: "Sie von Ihrem Ex-Partner verfolgt oder belästigt werden",
          target: "Anlaufstellen und Ihre Rechte",
          href: "/hilfe#stalking",
        },
        {
          reason: "Sie jemanden kennen, der Gewalt erlebt",
          target: "Hilfe für Angehörige und Freunde",
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
        { title: "Kostenlos", text: "Beratung und Schutz kosten Sie nichts." },
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
      heading: "Die Wanderausstellung",
      intro:
        "„Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren. Hier sehen Sie alle zwölf Tafeln.",
      // Tafeln der Wanderausstellung 2022, gerendert aus dem Ausstellungs-PDF der Altseite.
      // OFFEN: Kurztexte und Alternativtexte vom AG (Z-07)
      panels: [
        { image: { asset: "exhibition/panel-01" }, title: "Am Anfang war es Liebe …" },
        { image: { asset: "exhibition/panel-02" }, title: "Häusliche Gewalt ist durch nichts zu rechtfertigen" },
        { image: { asset: "exhibition/panel-03" }, title: "Formen von häuslicher Gewalt erkennen" },
        { image: { asset: "exhibition/panel-04" }, title: "Hilfen aus der Gewalt" },
        { image: { asset: "exhibition/panel-05" }, title: "Erste Unterstützung für Frauen in Not" },
        { image: { asset: "exhibition/panel-06" }, title: "Beratung für Frauen und Mädchen in der Region" },
        { image: { asset: "exhibition/panel-07" }, title: "Wer schlägt, der geht! Ruf 110" },
        { image: { asset: "exhibition/panel-08" }, title: "Wenn das Kindeswohl gefährdet ist" },
        { image: { asset: "exhibition/panel-09" }, title: "Das liebe Geld: Es geht auch ohne ihn" },
        { image: { asset: "exhibition/panel-10" }, title: "Du hast eine Vermutung?" },
        { image: { asset: "exhibition/panel-11" }, title: "Was Sie selbst tun können" },
        { image: { asset: "exhibition/panel-12" }, title: "Die Idee des Arbeitskreises" },
      ],
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
