// Anlaufstellen im Kreis Höxter.
// OFFEN: Daten stammen von der Altseite (Stand 2026) und aus der Broschüre 2016.
// Nummern, Zeiten und Adressen vor Livegang vom AG bestätigen lassen (Z-03).

export type Telefon = { label?: string; nummer: string; hinweis?: string };

export type Anlaufstelle = {
  id: string;
  frage?: string;
  name: string;
  traeger?: string;
  telefon: Telefon[];
  erreichbarkeit?: string;
  adressen?: string[];
  email?: string;
  website?: { url: string; label: string };
  text?: string;
  leistungen?: string[];
};

export type Gruppe = { titel: string; stellen: Anlaufstelle[] };

// Wählbare Form einer Nummer: nur Ziffern und führendes +
export function telHref(nummer: string) {
  return "tel:" + nummer.replace(/[^\d+]/g, "");
}

export const hilfetelefon: Anlaufstelle = {
  id: "hilfetelefon",
  frage: "Was kann das Hilfetelefon für Sie tun?",
  name: "Hilfetelefon „Gewalt gegen Frauen“",
  traeger: "Bundesamt für Familie und zivilgesellschaftliche Aufgaben",
  telefon: [{ nummer: "116 016" }],
  erreichbarkeit: "Rund um die Uhr, anonym, kostenlos, in 18 Sprachen",
  website: { url: "https://www.hilfetelefon.de", label: "hilfetelefon.de" },
  text: "Erstberatung, erste Informationen und auf Wunsch Weitervermittlung an eine passende Stelle in Ihrer Nähe. Das Hilfetelefon ist auch für Angehörige, Freundinnen und Freunde und Fachkräfte da.",
};

export const hauptstellen: Anlaufstelle[] = [
  {
    id: "frauenberatungsstelle",
    frage: "Was kann die Frauenberatungsstelle für Sie tun?",
    name: "Frauenberatungsstelle der AWO für den Kreis Höxter",
    traeger: "Arbeiterwohlfahrt Kreisverband Höxter e.V., Beratungsstelle gegen Gewalt an Frauen",
    telefon: [{ nummer: "0160 93793030" }, { nummer: "0160 93793035" }],
    erreichbarkeit:
      "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr. Termine nach Vereinbarung per Telefon, E-Mail oder Signal-Messenger.",
    adressen: [
      "AWO Familienstützpunkt, Gartenstraße 7, 37671 Höxter",
      "AWO Beratungsstellen, Caspar-Heinrich-Straße 7, 33014 Bad Driburg",
      "AWO Familienstützpunkt, Pyrmonter Straße 8, 32839 Steinheim",
    ],
    email: "fbs@awo-hoexter.de",
    website: {
      url: "https://awo-hx.de/einrichtungen/beratungsstellen/frauenberatung/",
      label: "awo-hx.de",
    },
    text: "Die Frauenberatungsstelle ist ein sicherer Ort für Frauen, die Gewalt erleben oder erlebt haben. Die Beratung ist vertraulich und kostenfrei, die Beraterinnen haben Schweigepflicht. Sie werden zu nichts gedrängt: Sie entscheiden selbst, was Sie möchten, wann Sie es möchten und ob Sie es möchten.",
    leistungen: [
      "Begleitung in der akuten Krise und bei der Verarbeitung des Erlebten",
      "Ein Schutz- und Sicherheitsplan für Sie und Ihre Kinder, auch wenn Sie bei Ihrem Partner bleiben",
      "Informationen zu Ihren Rechten, Unterstützung bei Anträgen nach dem Gewaltschutzgesetz (Kontaktverbot, Wohnungszuweisung)",
      "Hilfe im Umgang mit Behörden und bei der Klärung Ihrer finanziellen Lage",
      "Vermittlung an weitere Stellen",
    ],
  },
  {
    id: "schutzhaus",
    frage: "Was kann das Frauen- und Kinderschutzhaus für Sie tun?",
    name: "Frauen- und Kinderschutzhaus im Kreis Höxter",
    traeger: "Sozialdienst katholischer Frauen e.V. Warburg",
    telefon: [{ nummer: "0171 5430155", hinweis: "rund um die Uhr" }],
    erreichbarkeit: "Telefonisch 24 Stunden am Tag, an jedem Tag im Jahr",
    website: { url: "https://www.skf-warburg.de", label: "skf-warburg.de" },
    text: "Das Schutzhaus bietet Ihnen und Ihren Kindern Zuflucht, Schutz und Unterstützung. Sie können so lange bleiben, bis Sie entschieden haben, wie es für Sie weitergeht. Die Mitarbeiterinnen helfen bei allen Fragen, auch bei Behördenkontakten. Die Adresse des Schutzhauses wird zu Ihrer Sicherheit nicht veröffentlicht.",
  },
  {
    id: "polizei",
    frage: "Was kann die Polizei für Sie tun?",
    name: "Kreispolizeibehörde Höxter",
    telefon: [
      { label: "Im Notfall", nummer: "110" },
      { label: "In allen anderen Fällen", nummer: "05271 962-0" },
      { label: "Opferschutzbeauftragte", nummer: "05271 9621350" },
    ],
    adressen: ["Bismarckstraße 18, 37671 Höxter"],
    website: { url: "https://hoexter.polizei.nrw", label: "hoexter.polizei.nrw" },
    text: "Wenn Sie oder Ihre Kinder bedroht werden, können Sie sich jederzeit an die Polizei wenden. Die Polizei kann die gewalttätige Person für zehn Tage aus der Wohnung verweisen und ein Rückkehrverbot aussprechen – auch wenn die Wohnung ihr gehört.",
  },
];

export const gruppen: Gruppe[] = [
  {
    titel: "Beratung für Familien, Paare und Eltern",
    stellen: [
      {
        id: "caritas-efl",
        name: "Ehe-, Familien- und Lebensberatung",
        traeger: "Beratungszentrum der Caritas für den Kreis Höxter",
        telefon: [{ nummer: "05272 371460" }],
        adressen: ["Kirchplatz 2, 33034 Brakel"],
        website: { url: "https://www.caritas-hx.de", label: "caritas-hx.de" },
        text: "Unterstützung bei Beziehungsproblemen, familiären Konflikten und Lebenskrisen.",
      },
      {
        id: "caritas-eb",
        name: "Beratungsstelle für Eltern, Kinder und Jugendliche",
        traeger: "Beratungszentrum der Caritas für den Kreis Höxter",
        telefon: [{ nummer: "05272 371460" }],
        adressen: ["Kirchplatz 2, 33034 Brakel"],
        website: { url: "https://www.caritas-hx.de", label: "caritas-hx.de" },
        text: "Hilfe bei der Frage, wie sich Gewalt auf Ihre Kinder auswirkt, sowie bei Fragen zu Sorge- und Umgangsrecht.",
      },
      {
        id: "diakonie",
        name: "Familien- und Lebensberatung",
        traeger: "Diakonie Paderborn-Höxter e.V.",
        telefon: [
          { label: "Höxter", nummer: "05271 921983" },
          { label: "Warburg", nummer: "05641 788810" },
        ],
        adressen: ["Brüderstraße 7, 37671 Höxter", "Sternstraße 19, 34414 Warburg"],
        website: { url: "https://www.diakonie-pbhx.de", label: "diakonie-pbhx.de" },
      },
      {
        id: "awo-schwangerschaft",
        name: "Beratungsstelle für Schwangerschaft, Partnerschaft und Sexualität",
        traeger: "Arbeiterwohlfahrt Kreisverband Höxter e.V.",
        telefon: [
          { label: "Höxter", nummer: "05271 966389" },
          { label: "Bad Driburg und Steinheim", nummer: "05253 9350218" },
        ],
        adressen: [
          "Gartenstraße 7, 37671 Höxter",
          "Caspar-Heinrich-Straße 7, 33014 Bad Driburg",
          "Pyrmonter Straße 8, 32839 Steinheim",
        ],
        website: { url: "https://awo-hx.de", label: "awo-hx.de" },
      },
      {
        id: "donum-vitae",
        name: "Schwangerschafts- und Schwangerschaftskonfliktberatung",
        traeger: "Donum Vitae Regionalverband Paderborn e.V.",
        telefon: [{ nummer: "05271 1070" }],
        adressen: ["Berliner Platz 1, 37671 Höxter"],
      },
    ],
  },
  {
    titel: "Kreis, Städte und Opferhilfe",
    stellen: [
      {
        id: "asd",
        name: "Allgemeiner Sozialer Dienst des Kreises Höxter",
        telefon: [{ nummer: "05271 965-3306" }],
        erreichbarkeit:
          "Montag bis Freitag 8:30 bis 12:30 Uhr, Montag bis Donnerstag 14 bis 16 Uhr oder nach Vereinbarung",
        adressen: ["Kreishaus, Moltkestraße 12, 37671 Höxter"],
        text: "Hilfe in akuten Krisen, etwa bei sexuellem Missbrauch und Misshandlung, bei Trennung und Scheidung, Sorgerecht und Umgang.",
      },
      {
        id: "gleichstellung",
        name: "Gleichstellungsbeauftragte des Kreises Höxter und der Städte",
        telefon: [{ nummer: "05271 9650", hinweis: "Vermittlung" }],
        text: "Ansprechpartnerinnen und Rufnummern erfahren Sie bei den Städten und beim Kreis Höxter.",
      },
      {
        id: "weisser-ring",
        name: "Weisser Ring, Außenstelle Höxter",
        telefon: [{ nummer: "0151 55164762" }],
        website: { url: "https://www.weisser-ring.de", label: "weisser-ring.de" },
        text: "Hilfe für Opfer von Straftaten: menschlicher Beistand, Begleitung zu Behörden, Übernahme von Anwaltskosten und finanzielle Unterstützung.",
      },
    ],
  },
  {
    titel: "Für Mädchen und junge Frauen",
    stellen: [
      {
        id: "maedchenhaus",
        name: "Mädchenhaus Bielefeld e.V.",
        traeger: "Beratungsstelle und Zufluchtsstätte für Mädchen und junge Frauen",
        telefon: [
          { label: "Beratung", nummer: "0521 173016" },
          { label: "Zufluchtsstätte", nummer: "0521 21010", hinweis: "rund um die Uhr" },
        ],
        website: { url: "https://www.maedchenhaus-bielefeld.de", label: "maedchenhaus-bielefeld.de" },
      },
    ],
  },
  {
    titel: "Telefonische Beratung",
    stellen: [
      {
        id: "telefonseelsorge",
        name: "Telefonseelsorge",
        telefon: [{ nummer: "0800 1110111" }, { nummer: "0800 1110222" }],
        erreichbarkeit: "Rund um die Uhr, kostenlos",
      },
      {
        id: "nummer-gegen-kummer",
        name: "Sorgentelefon für Kinder, Jugendliche und Erwachsene",
        telefon: [{ nummer: "0800 1110444" }],
        erreichbarkeit: "Kostenlos",
      },
    ],
  },
];
