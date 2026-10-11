import type { Block, Field } from "payload";
import { bodyEditor, inlineEditor } from "../editors";
import { calloutBlock, sectionItems, withLabel } from "./items";

// Blöcke einer Seite (siehe `PageBlock` in content/model.ts). Sie entsprechen den
// Bausteinen des Frontends: jeder Block erscheint genau so auf der Website.

const anchorField: Field = {
  name: "anchor",
  type: "text",
  label: "Sprungmarke",
  admin: {
    description: "Teil der Adresse nach dem #, zum Beispiel stalking für /hilfe#stalking. Bestehende Links nicht ändern.",
  },
};

const mailboxOptions = [
  { label: "Sie suchen Hilfe", value: "help" },
  { label: "Sie möchten sich informieren", value: "information" },
];

export const pageBlocks: Block[] = withLabel([
  {
    slug: "section",
    labels: { singular: "Textabschnitt", plural: "Textabschnitte" },
    fields: [
      { name: "heading", type: "text", label: "Zwischenüberschrift" },
      anchorField,
      {
        name: "variant",
        type: "select",
        label: "Darstellung",
        required: true,
        defaultValue: "stack",
        options: [
          { label: "Standard", value: "stack" },
          { label: "Mit Trennlinie oben", value: "service" },
          { label: "Ohne Rahmen (nur Überschrift und Text)", value: "plain" },
        ],
      },
      {
        name: "sectionId",
        type: "text",
        label: "Kennung des Abschnitts",
        admin: { description: "Nur für Sprungziele auf den ganzen Abschnitt, selten nötig." },
      },
      {
        name: "ariaLabel",
        type: "text",
        label: "Beschreibung für Screenreader",
        admin: { description: "Nur, wenn der Abschnitt keine Zwischenüberschrift hat." },
      },
      { name: "items", type: "blocks", label: "Inhalt des Abschnitts", blocks: sectionItems },
    ],
  },
  calloutBlock,
  {
    slug: "supportServices",
    labels: { singular: "Hauptanlaufstellen (aus „Anlaufstellen“)", plural: "Hauptanlaufstellen" },
    // Die Einträge selbst werden unter „Anlaufstellen“ gepflegt
    fields: [],
  },
  {
    slug: "serviceGroups",
    labels: { singular: "Weitere Anlaufstellen (aufklappbar)", plural: "Weitere Anlaufstellen" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      { name: "note", type: "textarea", label: "Hinweis unter der Liste" },
    ],
  },
  {
    slug: "documentList",
    labels: { singular: "Dokumente zum Herunterladen", plural: "Dokumentenlisten" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      {
        name: "items",
        type: "array",
        label: "Dokumente",
        labels: { singular: "Dokument", plural: "Dokumente" },
        fields: [
          { name: "title", type: "text", label: "Titel", required: true },
          { name: "file", type: "upload", relationTo: "media", label: "Datei", required: true },
          { name: "meta", type: "text", label: "Angaben unter dem Titel", admin: { description: "Zum Beispiel PDF, 2,1 MB · Deutsch · Stand: 2016" } },
        ],
      },
      { name: "note", type: "richText", label: "Hinweis unter der Liste", editor: inlineEditor },
    ],
  },
  {
    slug: "topicLinks",
    labels: { singular: "Weiterführende Links", plural: "Linklisten" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      {
        name: "topics",
        type: "array",
        label: "Themen",
        labels: { singular: "Thema", plural: "Themen" },
        fields: [
          { name: "title", type: "text", label: "Thema", required: true },
          {
            name: "links",
            type: "array",
            label: "Links",
            labels: { singular: "Link", plural: "Links" },
            fields: [
              { name: "label", type: "text", label: "Anzeigetext", required: true },
              { name: "url", type: "text", label: "Adresse", required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "peopleList",
    labels: { singular: "Personenliste", plural: "Personenlisten" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      {
        name: "people",
        type: "array",
        label: "Personen und Einrichtungen",
        labels: { singular: "Eintrag", plural: "Einträge" },
        fields: [
          { name: "name", type: "text", label: "Name", required: true },
          { name: "role", type: "text", label: "Funktion oder Einrichtung" },
        ],
      },
    ],
  },
  {
    slug: "campaign",
    labels: { singular: "Kampagne mit Plakat", plural: "Kampagnen" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      { name: "lead", type: "text", label: "Hervorgehobener Satz" },
      { name: "body", type: "richText", label: "Text", editor: bodyEditor },
      {
        name: "download",
        type: "group",
        label: "Download",
        fields: [
          { name: "label", type: "text", label: "Linktext" },
          { name: "file", type: "upload", relationTo: "media", label: "Datei" },
          { name: "meta", type: "text", label: "Angabe dahinter", admin: { description: "Zum Beispiel (PDF, 2,7 MB)" } },
        ],
      },
      { name: "poster", type: "upload", relationTo: "media", label: "Plakat" },
      { name: "posterAlt", type: "textarea", label: "Bildbeschreibung des Plakats" },
    ],
  },
  {
    slug: "photo",
    labels: { singular: "Foto mit Unterschrift", plural: "Fotos" },
    fields: [
      { name: "image", type: "upload", relationTo: "media", label: "Foto", required: true },
      { name: "alt", type: "textarea", label: "Bildbeschreibung" },
      { name: "caption", type: "text", label: "Bildunterschrift" },
    ],
  },
  {
    slug: "selfCheck",
    labels: { singular: "Selbstcheck", plural: "Selbstcheck" },
    fields: [
      { name: "legend", type: "text", label: "Einleitung der Liste", required: true },
      {
        name: "statements",
        type: "array",
        label: "Aussagen",
        labels: { singular: "Aussage", plural: "Aussagen" },
        fields: [{ name: "text", type: "textarea", label: "Aussage", required: true }],
      },
    ],
  },
  {
    slug: "contactForm",
    labels: { singular: "Kontaktformular", plural: "Kontaktformular" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      {
        name: "concerns",
        type: "array",
        label: "Anliegen zur Auswahl",
        labels: { singular: "Anliegen", plural: "Anliegen" },
        fields: [
          { name: "label", type: "text", label: "Anliegen", required: true },
          { name: "mailbox", type: "select", label: "Zustellung an", required: true, options: mailboxOptions },
        ],
      },
    ],
  },
  {
    slug: "languageVersions",
    labels: { singular: "Sprachfassungen", plural: "Sprachfassungen" },
    fields: [
      {
        name: "versions",
        type: "array",
        label: "Sprachen",
        labels: { singular: "Sprache", plural: "Sprachen" },
        fields: [
          { name: "code", type: "text", label: "Sprachkürzel", required: true, admin: { description: "ar, ru, en, tr" } },
          {
            name: "direction",
            type: "select",
            label: "Schreibrichtung",
            required: true,
            defaultValue: "ltr",
            options: [
              { label: "Links nach rechts", value: "ltr" },
              { label: "Rechts nach links", value: "rtl" },
            ],
          },
          { name: "title", type: "text", label: "Name der Sprache (in der Sprache)", required: true },
          { name: "text", type: "textarea", label: "Text", required: true },
          { name: "helplineLabel", type: "text", label: "Beschriftung Hilfetelefon", required: true },
          { name: "emergencyLabel", type: "text", label: "Beschriftung Notruf", required: true },
          { name: "exitLabel", type: "text", label: "Beschriftung „Seite verlassen“", required: true },
        ],
      },
    ],
  },
  {
    slug: "exhibition",
    labels: { singular: "Wanderausstellung (Bildergalerie)", plural: "Wanderausstellung" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      { name: "intro", type: "textarea", label: "Einleitung" },
      {
        name: "panels",
        type: "array",
        label: "Tafeln",
        labels: { singular: "Tafel", plural: "Tafeln" },
        fields: [
          { name: "image", type: "upload", relationTo: "media", label: "Bild", required: true },
          { name: "title", type: "text", label: "Titel der Tafel", required: true },
        ],
      },
    ],
  },
  {
    slug: "newsList",
    labels: { singular: "Liste der Beiträge (Aktuelles)", plural: "Beitragslisten" },
    fields: [
      {
        name: "variant",
        type: "select",
        label: "Darstellung",
        required: true,
        defaultValue: "page",
        options: [
          { label: "Alle Beiträge (eigene Seite)", value: "page" },
          { label: "Neueste Beiträge (Teaser auf der Startseite)", value: "teaser" },
        ],
      },
      { name: "heading", type: "text", label: "Überschrift (Teaser)" },
      anchorField,
      { name: "linkLabel", type: "text", label: "Linktext „Alle Beiträge“ (Teaser)" },
      { name: "count", type: "number", label: "Anzahl (Teaser)", min: 1, max: 12, defaultValue: 3 },
    ],
  },
  {
    slug: "entry",
    labels: { singular: "Einstieg „Sie sind hier, weil …“", plural: "Einstieg" },
    fields: [
      { name: "title", type: "text", label: "Überschrift", required: true },
      {
        name: "paths",
        type: "array",
        label: "Wege",
        labels: { singular: "Weg", plural: "Wege" },
        fields: [
          { name: "reason", type: "text", label: "Grund („Sie …“)", required: true },
          { name: "target", type: "text", label: "Ziel (Text)", required: true },
          { name: "href", type: "text", label: "Ziel (Adresse)", required: true },
        ],
      },
      { name: "image", type: "upload", relationTo: "media", label: "Illustration" },
    ],
  },
  {
    slug: "promises",
    labels: { singular: "Drei Zusagen", plural: "Zusagen" },
    fields: [
      {
        name: "items",
        type: "array",
        label: "Zusagen",
        labels: { singular: "Zusage", plural: "Zusagen" },
        fields: [
          { name: "title", type: "text", label: "Stichwort", required: true },
          { name: "text", type: "text", label: "Satz", required: true },
        ],
      },
    ],
  },
  {
    slug: "quickAccess",
    labels: { singular: "Schnellzugriff Anlaufstellen", plural: "Schnellzugriff" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      { name: "linkLabel", type: "text", label: "Linktext", required: true },
      { name: "linkUrl", type: "text", label: "Link", required: true },
    ],
  },
  {
    slug: "teaserBand",
    labels: { singular: "Hervorgehobenes Band mit Bild", plural: "Hervorgehobene Bänder" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift", required: true },
      anchorField,
      { name: "lead", type: "textarea", label: "Text", required: true },
      { name: "privacyNote", type: "text", label: "Hinweis mit Schloss-Symbol" },
      { name: "buttonLabel", type: "text", label: "Beschriftung der Schaltfläche", required: true },
      { name: "buttonUrl", type: "text", label: "Ziel der Schaltfläche", required: true },
      { name: "image", type: "upload", relationTo: "media", label: "Illustration" },
    ],
  },
]);
