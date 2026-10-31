// Anlaufstellen im Kreis Höxter.
// Hauptanlaufstellen und Caritas: Texte der Stellen selbst, geliefert vom AG am 28.10.2026.
// Korrekturen der Frauenberatungsstelle vom 21.10.2026 sind eingearbeitet.
// OFFEN: Die übrigen Daten stammen von der Altseite (Stand 2026) und aus der Broschüre 2016.
// Nummern, Zeiten und Adressen vor Livegang vom AG bestätigen lassen (Z-03).

export type Phone = { label?: string; number: string; note?: string };

export type SupportService = {
  id: string;
  /** Überschrift als Frage aus der Broschüre, nur bei Hauptanlaufstellen */
  question?: string;
  name: string;
  provider?: string;
  /** Zielgruppe oder Voraussetzungen */
  audience?: string;
  phones: Phone[];
  availability?: string;
  addresses?: string[];
  /** Hinweis unter den Standorten */
  addressNote?: string;
  email?: string | string[];
  /** Kurzer Zusatz hinter der E-Mail-Adresse */
  emailNote?: string;
  website?: { url: string; label: string };
  description?: string;
  /** Themen der Beratung, als Liste */
  topics?: string[];
  /** Was die Beraterinnen anbieten, als Liste */
  offers?: string[];
  /** Einleitung der Liste `offers`, wenn sie von „Die Beraterinnen bieten:“ abweicht */
  offersLabel?: string;
  /** Kurzfassung für den Schnellzugriff der Startseite: die ersten `phoneCount` Nummern (Standard 1) */
  quick?: { label: string; note: string; phoneCount?: number };
};

export type ServiceGroup = { title: string; services: SupportService[] };

// Wählbare Form einer Nummer: nur Ziffern und führendes +
export function telHref(number: string) {
  return "tel:" + number.replace(/[^\d+]/g, "");
}

const helpline: SupportService = {
  id: "hilfetelefon",
  question: "Was kann das Hilfetelefon für Sie tun?",
  name: "Hilfetelefon „Gewalt gegen Frauen“",
  provider: "Bundesamt für Familie und zivilgesellschaftliche Aufgaben",
  phones: [{ number: "116 016" }],
  availability: "Rund um die Uhr, anonym, kostenlos, in 18 Sprachen",
  website: { url: "https://www.hilfetelefon.de", label: "hilfetelefon.de" },
  description:
    "Erstberatung, erste Informationen und auf Wunsch Weitervermittlung an eine passende Stelle in Ihrer Nähe. Das Hilfetelefon ist auch für Angehörige, Freund*innen und Fachkräfte da.",
  quick: {
    label: "Hilfetelefon „Gewalt gegen Frauen“",
    note: "Rund um die Uhr, anonym, kostenlos, in 18 Sprachen",
  },
};

const counselling: SupportService = {
  id: "frauenberatungsstelle",
  question: "Was kann die Frauenberatungsstelle für Sie tun?",
  name: "Frauenberatungsstelle der AWO für den Kreis Höxter",
  provider: "Arbeiterwohlfahrt Kreisverband Höxter e.V., Beratungsstelle gegen Gewalt an Frauen",
  audience:
    "Frauen ab 18 Jahren, die Gewalt erleben oder von Gewalt bedroht sind, außerdem unterstützende Personen, Angehörige und Fachkräfte",
  phones: [
    { number: "0160 93793030", note: "auch Signal" },
    { number: "0160 93793035", note: "auch Signal" },
  ],
  availability:
    "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr. Kurzfristig telefonische oder persönliche Beratung und Beratung per E-Mail.",
  addresses: [
    "AWO Familienstützpunkt, Gartenstraße 7, 37671 Höxter",
    "AWO Beratungsstellen, Caspar-Heinrich-Straße 7, 33014 Bad Driburg",
    "AWO Familienstützpunkt, Pyrmonter Straße 8, 32839 Steinheim",
    "Rathaus Peckelsheim, Abdinghofweg 1, 34439 Willebadessen-Peckelsheim",
  ],
  addressNote:
    "Termine nach Vereinbarung, nach Absprache auch an weiteren Orten im Kreis Höxter. An allen Standorten ist nach vorheriger Absprache eine barrierefreie Beratung möglich.",
  email: "fbs@awo-hoexter.de", // laut Text der Beratungsstelle, Flyer 2026 und Mitgliederliste (28.10.2026)
  website: {
    url: "https://awo-hx.de/einrichtungen/beratungsstellen/frauenberatung/",
    label: "awo-hx.de",
  },
  description:
    "In einem geschützten Rahmen werden Ihre persönlichen Ziele zur Stärkung und zum Schutz herausgearbeitet und Ihnen Wege aufgezeigt, diese zu erreichen. Ihre Entscheidungen bestimmen den weiteren Verlauf. Solange wie nötig werden Sie während dieses Beratungsprozesses begleitet, bestärkt und unterstützt. Die Beratung ist parteilich, vertraulich und kostenfrei.",
  topics: [
    "Häusliche Gewalt: Gewalt zwischen Menschen, die in nahen Beziehungen zueinander stehen oder standen. Sie zeigt sich zum Beispiel durch Drohungen, Erniedrigungen, soziale Kontrolle und Isolation, Schlagen, Tritte, Einsperren, Kontaktverbote, Kontrolle der Finanzen oder das Erzwingen sexueller Handlungen",
    "Sexualisierte Gewalt wie Vergewaltigung und sexuelle Nötigung oder Belästigung",
    "Sexueller Missbrauch in der Kindheit und Jugend",
    "Digitale Gewalt",
    "Stalking",
    "Zwangsheirat",
    "Gewalt im Namen der Ehre",
  ],
  offersLabel: "Die Beraterinnen unterstützen Sie:",
  offers: [
    "bei der Bewältigung akuter Krisensituationen",
    "bei der Aufarbeitung des Gewaltgeschehens",
    "bei Ihrer individuellen Schutz- und Sicherheitsplanung",
    "bei der Beantragung einer Schutzanordnung nach dem Gewaltschutzgesetz",
    "bei der Informationssuche zum Gewaltschutz und zu Opferrechten",
    "bei Ihrer Existenzsicherung",
    "bei gerichtlichen Angelegenheiten",
    "bei Gesprächen mit Rechtsanwält*innen, Ärzt*innen und anderen",
    "bei der Kontaktaufnahme zu Frauenhäusern",
    "bei der Vermittlung an andere Beratungs- und Fachdienste",
  ],
  quick: {
    label: "Frauenberatungsstelle der AWO",
    note: "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr",
    // Beide Nummern auf der Startseite (Wunsch Frauenberatungsstelle, 21.10.2026)
    phoneCount: 2,
  },
};

const shelter: SupportService = {
  id: "schutzhaus",
  question: "Was kann das Frauen- und Kinderschutzhaus für Sie tun?",
  name: "Frauen- und Kinderschutzhaus im Kreis Höxter",
  provider: "Sozialdienst katholischer Frauen e.V., 34414 Warburg",
  audience:
    "Voraussetzungen für die Aufnahme: Sie sind mindestens 18 Jahre alt und haben seelische, körperliche, sexualisierte und/oder finanzielle Gewalt erlebt.",
  phones: [{ number: "0171 5430155", note: "rund um die Uhr" }],
  availability: "Täglich, 24 Stunden",
  email: "Frauenhaus@skf-warburg.de",
  website: { url: "https://www.skf-warburg.de", label: "skf-warburg.de" },
  description:
    "Das Frauen- und Kinderschutzhaus im Kreis Höxter bietet Schutz, Beratung und Begleitung auf dem Weg in ein gewaltfreies Leben. Die Beratung ist absolut vertraulich. Die Anschrift des Frauenhauses bleibt zum Schutz der dort wohnenden Frauen anonym, Sie erreichen es telefonisch oder per E-Mail.",
  quick: {
    label: "Frauen- und Kinderschutzhaus im Kreis Höxter",
    note: "Rund um die Uhr erreichbar",
  },
};

const police: SupportService = {
  id: "polizei",
  question: "Was kann die Polizei für Sie tun?",
  name: "Kreispolizeibehörde Höxter",
  phones: [
    { label: "Im Notfall", number: "110" },
    { label: "In allen anderen Fällen", number: "05271 962-0" },
    { label: "Opferschutz, Judith Fabeck, Kriminalhauptkommissarin und Opferschutzbeauftragte", number: "05271 9621350", note: "zu Bürozeiten" },
  ],
  addresses: ["Bismarckstraße 18, 37671 Höxter"],
  email: "judith.fabeck@polizei.nrw.de",
  emailNote: "Opferschutz",
  website: { url: "https://hoexter.polizei.nrw", label: "hoexter.polizei.nrw" },
  description:
    "Wenn Sie oder Ihre Kinder bedroht werden, können Sie sich jederzeit an die Polizei wenden. Die Polizei kann die gewalttätige Person für zehn Tage aus der Wohnung verweisen und ein Rückkehrverbot aussprechen, auch wenn die Wohnung ihr gehört. Der polizeiliche Opferschutz informiert Sie über den Ablauf eines Strafverfahrens, Ihre Rechte als Opfer sowie Antrags- und Entschädigungsmöglichkeiten. Sie erfahren, welche Hilfseinrichtungen es gibt, und werden bei Bedarf zeitnah an professionelle Hilfe vermittelt.",
  quick: {
    label: "Polizei im Notfall",
    note: "Wenn Sie oder Ihre Kinder in Gefahr sind",
  },
};

/** Die vier Hauptanlaufstellen in der Reihenfolge der Hilfeseite */
export const mainServices = [helpline, counselling, shelter, police];

/** Reihenfolge im Schnellzugriff der Startseite: Notfall zuerst */
export const quickAccess = [police, helpline, shelter, counselling];

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Beratung für Familien, Paare und Eltern",
    services: [
      {
        id: "caritas-efl",
        name: "Ehe-, Familien- und Lebensberatung",
        provider: "Beratungszentrum der Caritas für den Kreis Höxter",
        phones: [{ number: "05272 371460" }],
        addresses: ["Kirchplatz 2, 33034 Brakel"],
        website: { url: "https://www.caritas-hx.de", label: "caritas-hx.de" },
        description: "Unterstützung bei Beziehungsproblemen, familiären Konflikten und Lebenskrisen.",
      },
      {
        id: "caritas-eb",
        name: "Beratungsstelle für Eltern, Kinder und Jugendliche",
        provider: "Caritasverband für den Kreis Höxter e.V.",
        audience: "Eltern, Kinder, Jugendliche und junge Erwachsene bis zum 21. Lebensjahr",
        phones: [
          { label: "Zentrale", number: "05272 371460", note: "werktags 9 bis 15 Uhr" },
          { label: "Verwaltung der Beratungsstelle", number: "05272 371435" },
        ],
        addresses: ["Kirchplatz 2, 33034 Brakel"],
        email: ["eb@caritas-hx.de", "info-bz@caritas-hx.de"],
        website: { url: "https://www.caritas-hx.de", label: "caritas-hx.de" },
        description:
          "Allgemeine Beratung zu allen Fragen und Problemen, die in Kindheit, Jugend, Elternschaft und Familienleben auftreten können.",
        offersLabel: "Zusätzlich Fachberatungsstelle bei sexualisierter Gewalt an Kindern, Jugendlichen und jungen Erwachsenen:",
        offers: [
          "Beratung für betroffene Kinder, Jugendliche und junge Erwachsene bis zum 27. Lebensjahr, ihre Angehörigen und Fachkräfte",
          "Präventionsangebote und Schulungen für Fachkräfte und Institutionen",
        ],
      },
      {
        id: "diakonie",
        name: "Familien- und Lebensberatung",
        provider: "Diakonie Paderborn-Höxter e.V.",
        // Nur noch in Warburg (Frauenberatungsstelle, 21.10.2026)
        phones: [{ label: "Warburg", number: "05641 788810" }],
        addresses: ["Sternstraße 19, 34414 Warburg"],
        website: { url: "https://www.diakonie-pbhx.de/familien-und-lebensberatung/", label: "diakonie-pbhx.de" },
      },
      {
        id: "awo-schwangerschaft",
        name: "Beratungsstelle für Schwangerschaft, Partnerschaft und Sexualität der AWO – anerkannte Schwangerschaftskonfliktberatungsstelle gem. §9 SchKG",
        provider: "Arbeiterwohlfahrt Kreisverband Höxter e.V.",
        phones: [
          { label: "Höxter", number: "05271 966389" },
          { label: "Bad Driburg und Steinheim", number: "05253 9350218" },
        ],
        addresses: [
          "Gartenstraße 7, 37671 Höxter",
          "Caspar-Heinrich-Straße 7, 33014 Bad Driburg",
          "Pyrmonter Straße 8, 32839 Steinheim",
        ],
        website: { url: "https://awo-hx.de/einrichtungen/beratungsstellen/schwangerschaftsberatung/", label: "awo-hx.de" },
      },
      {
        id: "donum-vitae",
        name: "Schwangerschafts- und Schwangerschaftskonfliktberatung",
        provider: "Donum Vitae Regionalverband Paderborn e.V.",
        phones: [{ number: "05271 1070" }],
        addresses: ["Berliner Platz 1, 37671 Höxter"],
      },
    ],
  },
  {
    title: "Kreis, Städte und Opferhilfe",
    services: [
      {
        id: "asd",
        name: "Allgemeiner Sozialer Dienst im Jugendamt des Kreises Höxter",
        phones: [{ number: "05271 965-3306" }],
        availability:
          "Montag bis Freitag 8:30 bis 12:30 Uhr, Montag bis Donnerstag 14 bis 16 Uhr oder nach Vereinbarung",
        addresses: ["Kreishaus, Moltkestraße 12, 37671 Höxter"],
        description:
          "Der Hauptzweck des ASD ist es, Kinder, Jugendliche und Familien in schwierigen Lebenslagen (z.B. bei Erziehungsfragen, familiären Konflikten, Trennung oder Scheidung) zu unterstützen, zu beraten und den Schutz von Minderjährigen sicherzustellen.",
      },
      {
        id: "gleichstellung",
        name: "Gleichstellungsbeauftragte des Kreises Höxter und der Städte",
        phones: [{ number: "05271 9650", note: "Vermittlung" }],
        description: "Ansprechpartner*innen und Rufnummern erfahren Sie bei den Städten und beim Kreis Höxter.",
      },
      {
        id: "weisser-ring",
        name: "Weisser Ring, Außenstelle Höxter",
        phones: [{ number: "0152 04786213" }],
        website: { url: "https://www.weisser-ring.de", label: "weisser-ring.de" },
        description:
          "Hilfe für Opfer von Straftaten: menschlicher Beistand, Begleitung zu Behörden, Übernahme von Anwaltskosten und finanzielle Unterstützung.",
      },
    ],
  },
  {
    title: "Für Mädchen und junge Frauen",
    services: [
      {
        id: "maedchenhaus",
        name: "Mädchenhaus Bielefeld e.V.",
        provider: "Beratungsstelle und Zufluchtsstätte für Mädchen und junge Frauen",
        phones: [
          { label: "Beratung", number: "0521 173016" },
          { label: "Zufluchtsstätte", number: "0521 21010", note: "rund um die Uhr" },
        ],
        website: { url: "https://www.maedchenhaus-bielefeld.de", label: "maedchenhaus-bielefeld.de" },
      },
    ],
  },
  {
    title: "Telefonische Beratung / Online Beratung",
    services: [
      {
        id: "big-hotline",
        name: "BIG Hotline",
        provider: "Berlin, bei häuslicher Gewalt, Stalking und mehr",
        phones: [{ number: "030 6110300" }],
        website: { url: "https://www.big-hotline.de", label: "big-hotline.de" },
      },
      {
        id: "hilfe-telefon-missbrauch",
        name: "Hilfe-Telefon Sexueller Missbrauch",
        phones: [{ number: "0800 2255530" }],
        description: "Bei sexuellem Missbrauch.",
        website: { url: "https://www.hilfe-portal-missbrauch.de/hilfe-telefon", label: "hilfe-portal-missbrauch.de" },
      },
      {
        id: "opfer-telefon",
        name: "Opfer-Telefon des Weissen Rings",
        provider: "Für Opfer einer Straftat",
        phones: [{ number: "116 006" }],
        website: { url: "https://weisser-ring.de/hilfe-fuer-opfer/opfer-telefon", label: "weisser-ring.de" },
      },
      {
        id: "telefonseelsorge",
        name: "Telefonseelsorge",
        phones: [{ number: "0800 1110111" }, { number: "0800 1110222" }],
        availability: "Rund um die Uhr, kostenlos",
      },
      {
        id: "nummer-gegen-kummer",
        name: "Sorgentelefon für Kinder, Jugendliche und Erwachsene",
        phones: [{ number: "0800 1110444" }],
        availability: "Kostenlos",
      },
    ],
  },
];
