"use client";

import { FieldDescription, FieldLabel, useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { SECRET_STORED } from "../secret-marker";

// Eingabe für das Postfach-Passwort: zeigt nie den gespeicherten Wert (der kommt gar nicht erst im Browser an),
// nur ob eines gespeichert ist. Wer etwas eintippt, ersetzt es beim Speichern.
export const SecretField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path: path ?? field.name });
  const stored = value === SECRET_STORED;
  return (
    <div className="field-type text" style={{ marginBlockEnd: "var(--spacing-field, 1.5rem)" }}>
      <FieldLabel label={field.label} path={path} />
      <input
        type="password"
        autoComplete="new-password"
        value={stored ? "" : (value ?? "")}
        placeholder={stored ? "•••••••• gespeichert. Zum Ändern neues Passwort eingeben." : "Passwort des Postfachs"}
        onChange={(event) => setValue(event.target.value || (stored ? SECRET_STORED : ""))}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
      />
      <FieldDescription
        description="Wird verschlüsselt gespeichert und nie wieder angezeigt, auch nicht für Admins. Leer lassen: Das gespeicherte Passwort bleibt."
        path={path}
      />
    </div>
  );
};
