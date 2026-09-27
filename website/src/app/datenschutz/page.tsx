import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Datenschutz" };

// OFFEN: Datenschutzerklärung für Produktion (Hetzner) erstellen
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Datenschutz" />
      <div className="wide measure stack">
        <p className="notice small">
          Entwurf: Die vollständige Datenschutzerklärung wird vor der Veröffentlichung erstellt.
        </p>
        <h2>Das Wichtigste in Kürze</h2>
        <ul className="list-bullets">
          <li>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.</li>
          <li>Alle Schriften, Bilder und Skripte werden vom eigenen Server geladen, nicht von fremden Diensten.</li>
          <li>Der Selbstcheck läuft nur in Ihrem Browser. Ihre Antworten werden weder gespeichert noch gesendet.</li>
          <li>Nachrichten über das Kontaktformular werden nicht auf der Website gespeichert.</li>
        </ul>
      </div>
    </>
  );
}
