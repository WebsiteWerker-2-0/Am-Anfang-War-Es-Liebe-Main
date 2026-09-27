import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "So erreichen Sie den Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Kontakt"
        intro="Sie haben eine Frage an den Arbeitskreis oder möchten eine Veranstaltung anfragen? Schreiben Sie uns oder rufen Sie an."
      />
      <div className="wide stack-lg">
        <div className="emergency measure" role="note">
          <p>
            <strong>Brauchen Sie jetzt Hilfe?</strong> Das Formular ist nicht für Notfälle gedacht. Rufen Sie im
            Notfall die Polizei unter <PhoneLink number="110" /> oder das Hilfetelefon unter <PhoneLink number="116 016" />{" "}
            an.
          </p>
        </div>

        <section className="measure stack" aria-labelledby="anschrift">
          <h2 id="anschrift">Anschrift</h2>
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
        </section>

        <section className="stack" aria-labelledby="formular">
          <h2 id="formular">Nachricht schreiben</h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
