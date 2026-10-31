"use client";

import { useState } from "react";

// Kontaktanfrage (F-04): geht an /api/kontakt und von dort nur per E-Mail an das Postfach des Anliegens
// (lib/contact.ts). Nichts wird gespeichert, auch nicht im Browser (ADR-0003).
type Feedback = { kind: "success" | "error"; text: string } | null;

export function ContactForm({ concerns }: { concerns: { label: string }[] }) {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // currentTarget gibt es nur während des Ereignisses, nach dem await ist es leer
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setBusy(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concern: form.get("concern"),
          message: form.get("message"),
          name: form.get("name"),
          replyTo: form.get("reply-to"),
          website: form.get("website"),
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      if (response.ok) {
        setFeedback({ kind: "success", text: "Danke, Ihre Nachricht ist verschickt. Ihr Anliegen wird zeitnah bearbeitet und vertraulich behandelt." });
        formElement.reset();
      } else {
        setFeedback({
          kind: "error",
          text: body.message ?? "Die Nachricht konnte gerade nicht verschickt werden. Bitte schreiben Sie uns direkt eine E-Mail oder rufen Sie an.",
        });
      }
    } catch {
      setFeedback({ kind: "error", text: "Der Server ist nicht erreichbar. Bitte schreiben Sie uns direkt eine E-Mail oder rufen Sie an." });
    } finally {
      setBusy(false);
    }
  }

  return (
    // method="post": Ohne JavaScript landet die Nachricht so nicht in der Adresszeile (und keinem Log)
    <form className="form" method="post" autoComplete="off" onSubmit={submit}>
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
        <textarea id="message" name="message" required maxLength={5000} />
      </div>

      <div className="field">
        <label htmlFor="name">
          Name <span className="field__hint">(freiwillig, auch ein Vorname oder ein erfundener Name genügt)</span>
        </label>
        <input id="name" name="name" type="text" maxLength={100} />
      </div>

      <div className="field">
        <label htmlFor="reply-to">
          Telefon oder E-Mail für eine Antwort <span className="field__hint">(freiwillig)</span>
        </label>
        <input id="reply-to" name="reply-to" type="text" maxLength={200} aria-describedby="reply-to-hint" />
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
        <button type="submit" className="button" disabled={busy}>
          {busy ? "Wird gesendet …" : "Nachricht senden"}
        </button>
      </div>
      <noscript>
        <p className="small muted">Zum Senden wird JavaScript benötigt. Bitte schreiben Sie sonst direkt eine E-Mail.</p>
      </noscript>
      <div role="status" aria-live="polite">
        {feedback && <p className={feedback.kind === "error" ? "notice" : "status"}>{feedback.text}</p>}
      </div>
    </form>
  );
}
