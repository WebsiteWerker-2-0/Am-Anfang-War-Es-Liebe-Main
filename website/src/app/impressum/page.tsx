import type { Metadata } from "next";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Telefon } from "@/components/Telefon";

export const metadata: Metadata = { title: "Impressum" };

// OFFEN: Impressum nach DDG mit dem AG abstimmen. Angaben von der Altseite.
export default function ImpressumSeite() {
  return (
    <>
      <Seitenkopf titel="Impressum" />
      <div className="wide measure stack">
        <p>
          Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“
          <br />
          c/o Gleichstellungsbeauftragte des Kreises Höxter
          <br />
          Moltkestraße 12
          <br />
          37671 Höxter
        </p>
        <p>
          Telefon <Telefon nummer="05271 9659904" />
          <br />
          E-Mail <a href="mailto:gleichstellung@kreis-hoexter.de">gleichstellung@kreis-hoexter.de</a>
        </p>
        <h2>Gestaltung</h2>
        <p>Illustrationen und Gestaltung der Broschüre: fien-design, Höxter</p>
        <p className="hinweis small">
          Entwurf: Das vollständige Impressum wird vor der Veröffentlichung mit dem Arbeitskreis abgestimmt.
        </p>
      </div>
    </>
  );
}
