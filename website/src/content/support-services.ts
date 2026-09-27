// Anlaufstellen im Kreis Höxter.
// OFFEN: Daten stammen von der Altseite (Stand 2026) und aus der Broschüre 2016.
// Nummern, Zeiten und Adressen vor Livegang vom AG bestätigen lassen (Z-03).

export type Phone = { label?: string; number: string; note?: string };

export type SupportService = {
  id: string;
  /** Überschrift als Frage aus der Broschüre, nur bei Hauptanlaufstellen */
  question?: string;
  name: string;
  provider?: string;
  phones: Phone[];
  availability?: string;
  addresses?: string[];
  email?: string;
  website?: { url: string; label: string };
  description?: string;
  /** Was die Beraterinnen anbieten, als Liste */
  offers?: string[];
  /** Kurzfassung für den Schnellzugriff der Startseite, gewählt wird die erste Nummer */
  quick?: { label: string; note: string };
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
    "Erstberatung, erste Informationen und auf Wunsch Weitervermittlung an eine passende Stelle in Ihrer Nähe. Das Hilfetelefon ist auch für Angehörige, Freundinnen und Freunde und Fachkräfte da.",
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
  phones: [{ number: "0160 93793030" }, { number: "0160 93793035" }],
  availability:
    "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr. Termine nach Vereinbarung per Telefon, E-Mail oder Signal-Messenger.",
  addresses: [
    "AWO Familienstützpunkt, Gartenstraße 7, 37671 Höxter",
    "AWO Beratungsstellen, Caspar-Heinrich-Straße 7, 33014 Bad Driburg",
    "AWO Familienstützpunkt, Pyrmonter Straße 8, 32839 Steinheim",
  ],
  email: "fbs@awo-hoexter.de",
  website: {
    url: "https://awo-hx.de/einrichtungen/beratungsstellen/frauenberatung/",
    label: "awo-hx.de",
  },
  description:
    "Die Frauenberatungsstelle ist ein sicherer Ort für Frauen, die Gewalt erleben oder erlebt haben. Die Beratung ist vertraulich und kostenfrei, die Beraterinnen haben Schweigepflicht. Sie werden zu nichts gedrängt: Sie entscheiden selbst, was Sie möchten, wann Sie es möchten und ob Sie es möchten.",
  offers: [
    "Begleitung in der akuten Krise und bei der Verarbeitung des Erlebten",
    "Ein Schutz- und Sicherheitsplan für Sie und Ihre Kinder, auch wenn Sie bei Ihrem Partner bleiben",
    "Informationen zu Ihren Rechten, Unterstützung bei Anträgen nach dem Gewaltschutzgesetz (Kontaktverbot, Wohnungszuweisung)",
    "Hilfe im Umgang mit Behörden und bei der Klärung Ihrer finanziellen Lage",
    "Vermittlung an weitere Anlaufstellen",
  ],
  quick: {
    label: "Frauenberatungsstelle der AWO",
    note: "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr",
  },
};

const shelter: SupportService = {
  id: "schutzhaus",
  question: "Was kann das Frauen- und Kinderschutzhaus für Sie tun?",
  name: "Frauen- und Kinderschutzhaus im Kreis Höxter",
  provider: "Sozialdienst katholischer Frauen e.V. Warburg",
  phones: [{ number: "0171 5430155", note: "rund um die Uhr" }],
  availability: "Telefonisch 24 Stunden am Tag, an jedem Tag im Jahr",
  website: { url: "https://www.skf-warburg.de", label: "skf-warburg.de" },
  description:
    "Das Schutzhaus bietet Ihnen und Ihren Kindern Zuflucht, Schutz und Unterstützung. Sie können so lange bleiben, bis Sie entschieden haben, wie es für Sie weitergeht. Die Mitarbeiterinnen helfen bei allen Fragen, auch bei Behördenkontakten. Die Adresse des Schutzhauses wird zu Ihrer Sicherheit nicht veröffentlicht.",
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
    { label: "Opferschutzbeauftragte", number: "05271 9621350" },
  ],
  addresses: ["Bismarckstraße 18, 37671 Höxter"],
  website: { url: "https://hoexter.polizei.nrw", label: "hoexter.polizei.nrw" },
  description:
    "Wenn Sie oder Ihre Kinder bedroht werden, können Sie sich jederzeit an die Polizei wenden. Die Polizei kann die gewalttätige Person für zehn Tage aus der Wohnung verweisen und ein Rückkehrverbot aussprechen, auch wenn die Wohnung ihr gehört.",
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
        provider: "Beratungszentrum der Caritas für den Kreis Höxter",
        phones: [{ number: "05272 371460" }],
        addresses: ["Kirchplatz 2, 33034 Brakel"],
        website: { url: "https://www.caritas-hx.de", label: "caritas-hx.de" },
        description:
          "Hilfe bei der Frage, wie sich Gewalt auf Ihre Kinder auswirkt, sowie bei Fragen zu Sorge- und Umgangsrecht.",
      },
      {
        id: "diakonie",
        name: "Familien- und Lebensberatung",
        provider: "Diakonie Paderborn-Höxter e.V.",
        phones: [
          { label: "Höxter", number: "05271 921983" },
          { label: "Warburg", number: "05641 788810" },
        ],
        addresses: ["Brüderstraße 7, 37671 Höxter", "Sternstraße 19, 34414 Warburg"],
        website: { url: "https://www.diakonie-pbhx.de", label: "diakonie-pbhx.de" },
      },
      {
        id: "awo-schwangerschaft",
        name: "Beratungsstelle für Schwangerschaft, Partnerschaft und Sexualität",
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
        website: { url: "https://awo-hx.de", label: "awo-hx.de" },
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
        name: "Allgemeiner Sozialer Dienst des Kreises Höxter",
        phones: [{ number: "05271 965-3306" }],
        availability:
          "Montag bis Freitag 8:30 bis 12:30 Uhr, Montag bis Donnerstag 14 bis 16 Uhr oder nach Vereinbarung",
        addresses: ["Kreishaus, Moltkestraße 12, 37671 Höxter"],
        description:
          "Hilfe in akuten Krisen, etwa bei sexuellem Missbrauch und Misshandlung, bei Trennung und Scheidung, Sorgerecht und Umgang.",
      },
      {
        id: "gleichstellung",
        name: "Gleichstellungsbeauftragte des Kreises Höxter und der Städte",
        phones: [{ number: "05271 9650", note: "Vermittlung" }],
        description: "Ansprechpartnerinnen und Rufnummern erfahren Sie bei den Städten und beim Kreis Höxter.",
      },
      {
        id: "weisser-ring",
        name: "Weisser Ring, Außenstelle Höxter",
        phones: [{ number: "0151 55164762" }],
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
    title: "Telefonische Beratung",
    services: [
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
