"use client";

import { useState } from "react";

// F-04 als Entwurf: Oberfläche vollständig, Versand noch nicht angebunden.
// OFFEN: Zustellweg ohne Speicherung klären (Abschnitt 0, Regeln 3 und 8).
export function Kontaktformular() {
  const [gesendet, setGesendet] = useState(false);

  if (gesendet) {
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
      className="formular"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        setGesendet(true);
      }}
    >
      <div className="feld">
        <fieldset>
          <legend>Worum geht es?</legend>
          {[
            "Ich brauche Hilfe für mich",
            "Ich mache mir Sorgen um eine andere Person",
            "Ich habe eine Frage an den Arbeitskreis",
            "Etwas anderes",
          ].map((a, i) => (
            <label className="radio" key={a}>
              <input type="radio" name="anliegen" value={a} defaultChecked={i === 0} />
              {a}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="feld">
        <label htmlFor="nachricht">
          Ihre Nachricht <span className="feld__hinweis">(Pflichtfeld)</span>
        </label>
        <textarea id="nachricht" name="nachricht" required />
      </div>

      <div className="feld">
        <label htmlFor="name">
          Name <span className="feld__hinweis">(freiwillig, auch ein Vorname oder ein erfundener Name genügt)</span>
        </label>
        <input id="name" name="name" type="text" />
      </div>

      <div className="feld">
        <label htmlFor="rueckweg">
          Telefon oder E-Mail für eine Antwort <span className="feld__hinweis">(freiwillig)</span>
        </label>
        <input id="rueckweg" name="rueckweg" type="text" aria-describedby="rueckweg-hinweis" />
        <p id="rueckweg-hinweis" className="feld__hinweis">
          Wenn Sie eine Antwort möchten, geben Sie bitte eine Telefonnummer oder E-Mail-Adresse an, auf die nur Sie
          Zugriff haben.
        </p>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Bitte leer lassen</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="small muted measure">
        Ihre Angaben werden nur per E-Mail an den Arbeitskreis übermittelt und nicht auf dieser Website gespeichert.
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
