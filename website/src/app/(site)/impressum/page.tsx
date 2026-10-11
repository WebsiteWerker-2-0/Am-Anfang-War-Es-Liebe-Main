import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";

export const metadata: Metadata = { title: "Impressum" };

// OFFEN: Impressum nach DDG mit dem AG abstimmen. Angaben von der Altseite.
export default function LegalNoticePage() {
  return (
    <>
      <PageHeader title="Impressum" />
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
          Telefon <PhoneLink number="05271 9659904" />
          <br />
          E-Mail <a href="mailto:gleichstellung@kreis-hoexter.de">gleichstellung@kreis-hoexter.de</a>
        </p>
        <h2>Gestaltung</h2>
        <p>Illustrationen und Gestaltung der Broschüre: fien-design, Höxter</p>
        <p className="notice small">
          Entwurf: Das vollständige Impressum wird vor der Veröffentlichung mit dem Arbeitskreis abgestimmt.
        </p>
      </div>
    </>
  );
}
