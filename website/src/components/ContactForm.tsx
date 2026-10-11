"use client";

import { useState } from "react";

// Kontaktanfrage (F-04) als Entwurf: Oberfläche vollständig, Versand noch nicht angebunden.
// Das Anliegen bestimmt das Postfach (Seite „Kontakt“ im CMS).
// OFFEN: Zustellweg ohne Speicherung klären (ADR-0003)
export function ContactForm({ concerns }: { concerns: { label: string }[] }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="status" role="status">
        <p>
          <strong>Hinweis zum Entwurf:</strong> Das Formular verschickt noch keine Nachrichten. Bitte nutzen Sie bis
          dahin Telefon oder E-Mail.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="field">
        <fieldset>
          <legend>Worum geht es?</legend>
          {concerns.map((concern, index) => (
            <label className="radio" key={concern.label}>
              <input type="radio" name="concern" value={concern.label} defaultChecked={index === 0} />
              {concern.label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="field">
        <label htmlFor="message">
          Ihre Nachricht <span className="field__hint">(Pflichtfeld)</span>
        </label>
        <textarea id="message" name="message" required />
      </div>

      <div className="field">
        <label htmlFor="name">
          Name <span className="field__hint">(freiwillig, auch ein Vorname oder ein erfundener Name genügt)</span>
        </label>
        <input id="name" name="name" type="text" />
      </div>

      <div className="field">
        <label htmlFor="reply-to">
          Telefon oder E-Mail für eine Antwort <span className="field__hint">(freiwillig)</span>
        </label>
        <input id="reply-to" name="reply-to" type="text" aria-describedby="reply-to-hint" />
        <p id="reply-to-hint" className="field__hint">
          Wenn Sie eine Antwort möchten, geben Sie bitte eine Telefonnummer oder E-Mail-Adresse an, auf die nur Sie
          Zugriff haben.
        </p>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Bitte leer lassen</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="small muted measure">
        Ihre Nachricht wird nur per E-Mail an den Arbeitskreis übermittelt und nicht auf dieser Website gespeichert.
        Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <div>
        <button type="submit" className="button">
          Nachricht senden
        </button>
      </div>
    </form>
  );
}
