import type { Field, FieldHook } from "payload";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

// Leere Adresse wird aus dem Titel erzeugt; eine eingegebene Adresse wird bereinigt.
const slugFromTitle: FieldHook = ({ value, data }) => {
  const source = typeof value === "string" && value.trim() ? value : data?.title;
  return typeof source === "string" ? slugify(source) : value;
};

export const slugField: Field = {
  name: "slug",
  type: "text",
  label: "Adresse (URL)",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Teil der Internetadresse. Wird beim Speichern aus dem Titel erzeugt, wenn das Feld leer ist.",
  },
  hooks: { beforeValidate: [slugFromTitle] },
};
