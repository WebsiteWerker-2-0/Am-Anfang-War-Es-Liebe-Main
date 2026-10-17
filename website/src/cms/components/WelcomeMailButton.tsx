"use client";

import { toast, useDocumentInfo } from "@payloadcms/ui";
import { useState } from "react";

// Knopf „Zugangs-E-Mail senden“ im Konto (nur Admins): schickt die E-Mail mit dem Link zum Backend erneut
export function WelcomeMailButton() {
  const { id } = useDocumentInfo();
  const [busy, setBusy] = useState(false);
  if (!id) return null;

  async function send() {
    setBusy(true);
    try {
      const response = await fetch(`/backend/api/users/${id}/zugang`, { method: "POST", credentials: "include" });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      (response.ok ? toast.success : toast.error)(body.message ?? "Unbekannte Antwort des Servers.");
    } catch {
      toast.error("Der Server ist nicht erreichbar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginBlock: "1rem" }}>
      <button type="button" className="btn btn--style-secondary btn--size-medium" onClick={send} disabled={busy}>
        {busy ? "Wird gesendet …" : "Zugangs-E-Mail senden"}
      </button>
      <p style={{ marginBlockStart: "0.5rem", opacity: 0.7 }}>Schickt der Person einen neuen Link zum Festlegen ihres Passworts. Ein bisheriger Link wird damit ungültig.</p>
    </div>
  );
}
