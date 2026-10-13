import type { Metadata } from "next";
import Image from "next/image";
import groupPhoto from "@/assets/photos/working-group.jpg";
import { PageHeader } from "@/components/PageHeader";
import { pageBands } from "@/content/page-bands";

export const metadata: Metadata = {
  title: "Der Arbeitskreis",
  description: "Seit 1997 setzt sich der Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter ein.",
};

// OFFEN: Mitgliederliste von der Altseite. Der AG schickt nach dem Treffen am 13.10.2026 die aktuelle Liste in einheitlichem Format
const members = [
  { name: "Anna Lütkefend", role: "Gleichstellungsbeauftragte des Kreises Höxter" },
  { name: "Nadine Nolte", role: "Gleichstellungsbeauftragte der Stadt Höxter" },
  { name: "Karin Apel", role: "Gleichstellungsbeauftragte der Stadt Beverungen" },
  { name: "Frauenberatungsstelle der AWO", role: "Beratungsstelle gegen Gewalt an Frauen, Kreis Höxter" },
  { name: "Frauen- und Kinderschutzhaus im Kreis Höxter", role: "Sozialdienst katholischer Frauen e.V., Warburg" },
  { name: "Isabell Schröder", role: "AWO Migrationsberatung Kreis Höxter" },
  { name: "Mareike Stöver", role: "AWO Beratungsstellen für Schwangerschaft, Partnerschaft und Sexualität" },
  { name: "Daniela Resem und Sandra Pflug", role: "Caritas Beratungszentrum Brakel, Beratung für Eltern, Kinder und Jugendliche" },
  { name: "M. Merschbrock", role: "Caritas Beratungszentrum Brakel, Ehe-, Familien- und Lebensberatung" },
  { name: "Judith Fabeck", role: "Kreispolizeibehörde Höxter, Opferschutzbeauftragte" },
  { name: "Stephanie Werk-Ferber", role: "Kreis Höxter, Abteilung Kinder, Jugend und Familie" },
  { name: "Fachberatung Kinderschutz", role: "Kreis Höxter" },
  { name: "Britta Kukuk", role: "Kreissportbund Höxter e.V." },
  { name: "Christiane Tewes-Assauer", role: "Lebenshilfe Höxter, Werkstätten am Grünen Berg" },
  { name: "Eleonore Horst", role: "Weisser Ring, Außenstelle Höxter" },
  { name: "Ingrid Roland", role: "Ehrenamtliche Mitarbeiterin" },
  { name: "Martina Weskamp-Dittmann", role: "Ehrenamtliche Mitarbeiterin" },
];

export default function WorkingGroupPage() {
  return (
    <>
      <PageHeader
        title="Gemeinsam gegen Gewalt an Frauen und Kindern"
        band={pageBands.workingGroup}
        intro="Gewalt gegen Frauen und Kinder findet überall statt, auch im Kreis Höxter. Sie betrifft Personen aller kulturellen und sozialen Hintergründe."
      />
      <div className="wide stack-lg">
        {/* Text vom AG, Lieferung 11.10.2026 (Z-01) */}
        <section className="measure stack" aria-label="Über den Arbeitskreis">
          <p>
            Die Gewalt findet häufig im Verborgenen statt. Viel zu häufig bleibt sie unsichtbar. Genau hier setzt der
            Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“ an.
          </p>
          <p>
            Auf Initiative des Frauen- und Kinderschutzhauses wurde der Arbeitskreis im Juni 1997 gegründet. Seitdem
            arbeiten Expertinnen aus unterschiedlichen Einrichtungen und Institutionen gemeinsam daran, Gewalt sichtbar zu
            machen, Ursachen zu diskutieren und Veränderungen anzustoßen.
          </p>
          <p>
            Der Arbeitskreis beschäftigt sich mit unterschiedlichen Formen von Gewalt gegen Frauen und Kinder und nimmt
            dabei auch die gesellschaftlichen Aspekte der strukturellen Gewalt gegen Frauen in den Blick. Gemeinsam werden
            aktuelle Entwicklungen diskutiert, Erfahrungen ausgetauscht und konkrete Aktionen und Veranstaltungen auf den
            Weg gebracht.
          </p>
        </section>

        {/* OFFEN: Bildunterschrift mit Namen nur, wenn der AG sie liefert und alle Abgebildeten einverstanden sind (Z-08) */}
        <figure className="photo">
          <Image
            src={groupPhoto}
            alt="Gruppenfoto: rund zwanzig Frauen aus dem Arbeitskreis stehen auf einer Treppe vor einem Fachwerkhaus."
            sizes="(min-width: 72rem) 72rem, 100vw"
            placeholder="blur"
          />
          <figcaption>Der Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“</figcaption>
        </figure>

        <section className="measure stack" aria-labelledby="ziele">
          <h2 id="ziele">Was wir tun</h2>
          <p>Die Vertreterinnen des Arbeitskreises kommen regelmäßig zusammen, um:</p>
          <ul className="list-bullets">
            <li>
              die verschiedenen Formen und Anzeichen von Gewalt gegen Frauen und Kinder im Kreis Höxter ernst zu nehmen
              und sichtbar zu machen
            </li>
            <li>die Öffentlichkeit zu diversen Aspekten der Gewalt gegen Frauen und Kinder zu informieren und zu sensibilisieren</li>
            <li>betroffene Frauen und Kinder zu unterstützen</li>
            <li>Prävention zu stärken, beispielsweise durch Fachtage und andere Veranstaltungen</li>
            <li>Beratungs- und Informationsdefizite im Kreis Höxter aufzudecken und deren Abbau zu unterstützen</li>
            <li>notwendige politische Änderungen anzuregen.</li>
          </ul>
        </section>

        <section className="measure stack" aria-labelledby="sichtbar">
          <h2 id="sichtbar">Gemeinsam sichtbar werden</h2>
          <p>
            Gewalt ist keine Privatsache. Sie geht uns alle an. Deshalb ist Vernetzung ein zentraler Bestandteil unserer
            Arbeit. Im Arbeitskreis kommen unterschiedliche Fachstellen und Institutionen zusammen, bündeln ihre
            Erfahrungen und entwickeln gemeinsame Ideen. So entsteht ein Netzwerk, das nicht nur reagiert, sondern auch
            präventiv arbeitet und neue Impulse setzt.
          </p>
          <p>
            Ein besonderer Schwerpunkt liegt auf der Öffentlichkeitsarbeit: Wir wollen Wissen vermitteln, Aufmerksamkeit
            für dieses wichtige Thema schaffen und dazu beitragen, dass Betroffene Unterstützung finden, ohne Angst, Scham
            oder Vorurteile.
          </p>
        </section>

        <section className="measure stack" aria-labelledby="austausch">
          <h2 id="austausch">Im Austausch bleiben</h2>
          <p>
            Der Arbeitskreis trifft sich regelmäßig alle zwei Monate. Wir planen Veranstaltungen und Aktionen, besprechen
            aber auch aktuelle Probleme, fachliche Fragen oder akute Notfälle.
          </p>
          <p>
            Der Arbeitskreis arbeitet aus der Perspektive der betroffenen Frauen und richtet seinen Blick deshalb besonders
            auf die Belange und Lebensrealitäten von Frauen und Mädchen.
          </p>
          <p className="lead">
            Seit 1997 gilt dabei: Wir schauen hin, wir vernetzen uns und setzen uns gemeinsam dafür ein, Gewalt gegen
            Frauen und Kinder im Kreis Höxter in all ihren Formen entgegenzuwirken.
          </p>
        </section>

        <section aria-labelledby="mitglieder">
          <h2 id="mitglieder" style={{ marginBlockEnd: "var(--space-4)" }}>
            Wer im Arbeitskreis mitarbeitet
          </h2>
          <ul className="people">
            {members.map((member) => (
              <li key={member.name}>
                <strong>{member.name}</strong>
                <br />
                <span className="muted">{member.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
