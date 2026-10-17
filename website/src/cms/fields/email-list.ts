import type { TextField } from "payload";

// Eine oder mehrere E-Mail-Adressen in einem Feld, getrennt durch Komma, Semikolon oder Zeilenumbruch.
// Gespeichert als „a@b.de, c@d.de“; nodemailer verschickt an alle.

const EMAIL = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

export const splitEmails = (value: unknown) =>
  typeof value === "string" ? value.split(/[\s,;]+/).map((part) => part.trim()).filter(Boolean) : [];

export function emailListField(options: Pick<TextField, "name" | "label" | "access"> & { description: string }): TextField {
  return {
    name: options.name,
    type: "text",
    label: options.label,
    access: options.access,
    admin: {
      placeholder: "kurse@beispiel.de, leitung@beispiel.de",
      description: `${options.description} Mehrere Adressen mit Komma trennen.`,
    },
    validate: (value: unknown) => {
      const wrong = splitEmails(value).filter((address) => !EMAIL.test(address));
      return wrong.length ? `Keine gültige E-Mail-Adresse: ${wrong.join(", ")}` : true;
    },
    hooks: {
      beforeChange: [({ value }) => (splitEmails(value).join(", ") || null)],
    },
  };
}
