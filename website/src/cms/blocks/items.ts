import type { Block } from "payload";
import { bodyEditor, inlineEditor } from "../editors";

// Inhalte innerhalb eines Textabschnitts (siehe `SectionItem` in content/model.ts)

export const calloutBlock: Block = {
  slug: "callout",
  labels: { singular: "Hinweis- oder Notfallkasten", plural: "Hinweis- und Notfallkästen" },
  fields: [
    {
      name: "kind",
      type: "select",
      label: "Art",
      required: true,
      defaultValue: "notice",
      options: [
        { label: "Hinweis", value: "notice" },
        { label: "Notfall (hervorgehoben)", value: "emergency" },
      ],
    },
    { name: "content", type: "richText", label: "Text", required: true, editor: inlineEditor },
    {
      name: "number",
      type: "text",
      label: "Notrufnummer unter dem Text",
      admin: { condition: (_, sibling) => sibling?.kind === "emergency", description: "Zum Beispiel 110." },
    },
    {
      type: "row",
      fields: [
        { name: "small", type: "checkbox", label: "Kleine Schrift" },
        { name: "measure", type: "checkbox", label: "Auf Lesebreite begrenzen" },
      ],
    },
  ],
};

const label = { components: { Label: "/cms/components/BlockLabel#BlockLabel" } } as const;

/** Zeigt in der Blockliste die Überschrift oder den Anfang des Inhalts statt „Ohne Titel“ */
export const withLabel = (blocks: Block[]): Block[] =>
  blocks.map((block) => ({ ...block, admin: { ...block.admin, ...label } }));

export const sectionItems: Block[] = withLabel([
  {
    slug: "rich",
    labels: { singular: "Text", plural: "Texte" },
    fields: [
      {
        name: "content",
        type: "richText",
        label: "Text",
        required: true,
        editor: bodyEditor,
        admin: { description: "Absätze, Zwischenüberschriften, Listen und Nummerierungen." },
      },
    ],
  },
  {
    slug: "lead",
    labels: { singular: "Hervorgehobener Satz", plural: "Hervorgehobene Sätze" },
    fields: [{ name: "text", type: "textarea", label: "Text", required: true }],
  },
  {
    slug: "note",
    labels: { singular: "Kleingedrucktes", plural: "Kleingedrucktes" },
    fields: [{ name: "content", type: "richText", label: "Text", required: true, editor: inlineEditor }],
  },
  calloutBlock,
  {
    slug: "button",
    labels: { singular: "Schaltfläche", plural: "Schaltflächen" },
    fields: [
      { name: "label", type: "text", label: "Beschriftung", required: true },
      { name: "href", type: "text", label: "Ziel", required: true, admin: { description: "Zum Beispiel /hilfe" } },
    ],
  },
  {
    slug: "facts",
    labels: { singular: "Angaben (Bezeichnung und Wert)", plural: "Angaben (Bezeichnung und Wert)" },
    fields: [
      {
        name: "entries",
        type: "array",
        label: "Angaben",
        labels: { singular: "Angabe", plural: "Angaben" },
        required: true,
        fields: [
          {
            name: "term",
            type: "text",
            label: "Bezeichnung",
            admin: { description: "Bei einem Postfach leer lassen, dann erscheint dessen Name." },
          },
          { name: "value", type: "text", label: "Text" },
          { name: "phone", type: "text", label: "Telefonnummer (wird anrufbar)" },
          {
            name: "mailbox",
            type: "select",
            label: "Postfach der Website (wird als E-Mail-Link gezeigt)",
            options: [
              { label: "Sie suchen Hilfe", value: "help" },
              { label: "Sie möchten sich informieren", value: "information" },
            ],
          },
          { name: "note", type: "text", label: "Kleiner Hinweis darunter" },
        ],
      },
    ],
  },
  {
    slug: "definitions",
    labels: { singular: "Merkliste (fette Zeile mit Erklärung)", plural: "Merklisten" },
    fields: [
      {
        name: "entries",
        type: "array",
        label: "Einträge",
        labels: { singular: "Eintrag", plural: "Einträge" },
        required: true,
        fields: [
          { name: "term", type: "text", label: "Fette Zeile", required: true },
          { name: "text", type: "textarea", label: "Erklärung", required: true },
        ],
      },
    ],
  },
]);
