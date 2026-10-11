import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { mailboxes } from "@/content/contact";

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
          </p>
        </section>

        <section className="measure stack" aria-labelledby="e-mail">
          <h2 id="e-mail">E-Mail</h2>
          <dl className="facts">
            <dt>{mailboxes.help.label}</dt>
            <dd>
              <a href={`mailto:${mailboxes.help.email}`}>{mailboxes.help.email}</a>
              <br />
              <span className="small muted">Frauenberatungsstelle der AWO für den Kreis Höxter</span>
            </dd>
            <dt>{mailboxes.information.label}</dt>
            <dd>
              <a href={`mailto:${mailboxes.information.email}`}>{mailboxes.information.email}</a>
              <br />
              <span className="small muted">Gleichstellungsstelle des Kreises Höxter</span>
            </dd>
          </dl>
        </section>

        <section className="stack" aria-labelledby="formular">
          <h2 id="formular">Nachricht schreiben</h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
