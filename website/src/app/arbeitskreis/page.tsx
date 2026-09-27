import type { Metadata } from "next";
import band from "@/assets/illustrationen/band-13.jpg";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = {
  title: "Der Arbeitskreis",
  description: "Seit 1997 setzt sich der Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter ein.",
};

// OFFEN: Mitgliederliste von der Altseite, vom AG aktualisieren lassen
const mitglieder = [
  { name: "Anna Lütkefend", rolle: "Gleichstellungsbeauftragte des Kreises Höxter" },
  { name: "Nadine Nolte", rolle: "Gleichstellungsbeauftragte der Stadt Höxter" },
  { name: "Karin Apel", rolle: "Gleichstellungsbeauftragte der Stadt Beverungen" },
  { name: "Frauenberatungsstelle der AWO", rolle: "Beratungsstelle gegen Gewalt an Frauen, Kreis Höxter" },
  { name: "Frauen- und Kinderschutzhaus im Kreis Höxter", rolle: "Sozialdienst katholischer Frauen e.V., Warburg" },
  { name: "Isabell Schröder", rolle: "AWO Migrationsberatung Kreis Höxter" },
  { name: "Mareike Stöver", rolle: "AWO Beratungsstellen für Schwangerschaft, Partnerschaft und Sexualität" },
  { name: "Daniela Resem und Sandra Pflug", rolle: "Caritas Beratungszentrum Brakel, Beratung für Eltern, Kinder und Jugendliche" },
  { name: "M. Merschbrock", rolle: "Caritas Beratungszentrum Brakel, Ehe-, Familien- und Lebensberatung" },
  { name: "Judith Fabeck", rolle: "Kreispolizeibehörde Höxter, Opferschutzbeauftragte" },
  { name: "Stephanie Werk-Ferber", rolle: "Kreis Höxter, Abteilung Kinder, Jugend und Familie" },
  { name: "Fachberatung Kinderschutz", rolle: "Kreis Höxter" },
  { name: "Britta Kukuk", rolle: "Kreissportbund Höxter e.V." },
  { name: "Christiane Tewes-Assauer", rolle: "Lebenshilfe Höxter, Werkstätten am Grünen Berg" },
  { name: "Eleonore Horst", rolle: "Weisser Ring, Außenstelle Höxter" },
  { name: "Ingrid Roland", rolle: "Ehrenamtliche Mitarbeiterin" },
  { name: "Martina Weskamp-Dittmann", rolle: "Ehrenamtliche Mitarbeiterin" },
];

export default function ArbeitskreisSeite() {
  return (
    <>
      <Seitenkopf
        titel="Der Arbeitskreis"
        band={band}
        einleitung="Der Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“ hat sich im Juni 1997 auf Initiative des Frauen- und Kinderschutzhauses gegründet, um dem öffentlichen Schweigen etwas entgegenzusetzen."
      />
      <div className="wide stack-lg">
        <section className="measure stack" aria-labelledby="ziele">
          <h2 id="ziele">Was wir tun</h2>
          <p>
            Im Arbeitskreis arbeiten Fachfrauen aus Beratungsstellen, Behörden, Polizei und Ehrenamt zusammen. Wir
            treffen uns alle zwei Monate, tauschen Erfahrungen aus und planen Aktionen und Veranstaltungen. Wir wollen:
          </p>
          <ul className="liste-punkte">
            <li>Gewalt gegen Frauen und Kinder im Kreis Höxter wahrnehmen, ernst nehmen und sichtbar machen</li>
            <li>Bürgerinnen und Bürger informieren und sensibilisieren, etwa mit Aktionen und Ausstellungen</li>
            <li>betroffene Frauen und Kinder unterstützen</li>
            <li>vorbeugen, zum Beispiel mit Fachveranstaltungen und Selbstbehauptungskursen</li>
            <li>Lücken in Information und Beratung im Kreis aufdecken und schließen</li>
            <li>notwendige politische Veränderungen anregen</li>
          </ul>
          <p>
            Wir betrachten Gewalt aus der Perspektive von Frauen und haben deshalb vor allem die Belange von Frauen und
            Mädchen im Blick.
          </p>
        </section>

        <section aria-labelledby="mitglieder">
          <h2 id="mitglieder" style={{ marginBlockEnd: "var(--space-4)" }}>
            Wer im Arbeitskreis mitarbeitet
          </h2>
          <ul className="personen">
            {mitglieder.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong>
                <br />
                <span className="muted">{m.rolle}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
