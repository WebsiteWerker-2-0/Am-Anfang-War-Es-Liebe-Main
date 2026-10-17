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
const slugFromTitle: FieldHook = ({ value, data, previousValue }) => {
  // Eine einmal vergebene Adresse ändert sich nicht, wenn der Titel geändert wird (Links bleiben gültig)
  if (!value && previousValue) return previousValue;
  const source = typeof value === "string" && value.trim() ? value : data?.title;
  return typeof source === "string" ? slugify(source) : value;
};

/** Adresse, die die Redaktion nie sieht: sie entsteht aus dem Titel */
export const hiddenSlugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { hidden: true },
  hooks: { beforeValidate: [slugFromTitle] },
};
