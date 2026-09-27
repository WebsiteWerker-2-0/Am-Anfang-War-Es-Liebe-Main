import type { Metadata } from "next";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = { title: "Datenschutz" };

// OFFEN: Datenschutzerklärung für Produktion (Hetzner) erstellen
export default function DatenschutzSeite() {
  return (
    <>
      <Seitenkopf titel="Datenschutz" />
      <div className="wide measure stack">
        <p className="hinweis small">
          Entwurf: Die vollständige Datenschutzerklärung wird vor der Veröffentlichung erstellt.
        </p>
        <h2>Das Wichtigste in Kürze</h2>
        <ul className="liste-punkte">
          <li>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.</li>
          <li>Alle Schriften, Bilder und Skripte werden vom eigenen Server geladen, nicht von fremden Diensten.</li>
          <li>Der Selbstcheck läuft nur in Ihrem Browser. Ihre Antworten werden weder gespeichert noch gesendet.</li>
          <li>Nachrichten über das Kontaktformular werden nicht auf der Website gespeichert.</li>
        </ul>
      </div>
    </>
  );
}
