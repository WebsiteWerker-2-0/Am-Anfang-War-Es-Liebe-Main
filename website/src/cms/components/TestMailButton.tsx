"use client";

import { toast } from "@payloadcms/ui";
import { useState } from "react";

// Knopf „Test-E-Mail senden“: prüft die Zugangsdaten, ohne dass jemand eine Anmeldung ausfüllen muss
export function TestMailButton() {
  const [busy, setBusy] = useState(false);

  async function send() {
    setBusy(true);
    try {
      const response = await fetch("/backend/api/globals/mail/test-mail", { method: "POST", credentials: "include" });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      (response.ok ? toast.success : toast.error)(body.message ?? "Unbekannte Antwort des Servers.");
    } catch {
      toast.error("Der Server ist nicht erreichbar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginBlock: "1.5rem" }}>
      <button type="button" className="btn btn--style-primary btn--size-medium" onClick={send} disabled={busy}>
        {busy ? "Wird gesendet …" : "Test-E-Mail senden"}
      </button>
      <p style={{ marginBlockStart: "0.5rem", opacity: 0.7 }}>
        Speichern Sie zuerst Ihre Angaben. Die Test-E-Mail geht an die Adresse für Kursanmeldungen.
      </p>
    </div>
  );
}
