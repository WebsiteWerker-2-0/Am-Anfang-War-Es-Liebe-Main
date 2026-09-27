import type { Anlaufstelle as Stelle } from "@/content/anlaufstellen";
import { Telefon } from "./Telefon";

// Feste Reihenfolge: Name, Träger, Telefon, Erreichbarkeit, Adresse, E-Mail, Website (Abschnitt 6.4)
export function Anlaufstelle({ stelle, ebene = 2 }: { stelle: Stelle; ebene?: 2 | 3 }) {
  const H = ebene === 2 ? "h2" : "h3";
  return (
    <section className="anlaufstelle" aria-labelledby={`stelle-${stelle.id}`} id={stelle.id}>
      <H id={`stelle-${stelle.id}`}>{stelle.frage ?? stelle.name}</H>
      {stelle.frage && <p className="anlaufstelle__name">{stelle.name}</p>}
      <dl className="daten">
        {stelle.traeger && (
          <>
            <dt>Träger</dt>
            <dd>{stelle.traeger}</dd>
          </>
        )}
        <dt>Telefon</dt>
        <dd>
          <ul>
            {stelle.telefon.map((t) => (
              <li key={t.nummer}>
                {t.label && <>{t.label}: </>}
                <Telefon nummer={t.nummer} />
                {t.hinweis && <span className="muted"> ({t.hinweis})</span>}
              </li>
            ))}
          </ul>
        </dd>
        {stelle.erreichbarkeit && (
          <>
            <dt>Erreichbarkeit</dt>
            <dd>{stelle.erreichbarkeit}</dd>
          </>
        )}
        {stelle.adressen && (
          <>
            <dt>{stelle.adressen.length > 1 ? "Standorte" : "Adresse"}</dt>
            <dd>
              <ul>
                {stelle.adressen.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </dd>
          </>
        )}
        {stelle.email && (
          <>
            <dt>E-Mail</dt>
            <dd>
              <a href={`mailto:${stelle.email}`}>{stelle.email}</a>
            </dd>
          </>
        )}
        {stelle.website && (
          <>
            <dt>Website</dt>
            <dd>
              <a href={stelle.website.url} rel="noreferrer">
                {stelle.website.label}
              </a>
            </dd>
          </>
        )}
      </dl>
      {stelle.text && <p className="measure">{stelle.text}</p>}
      {stelle.leistungen && (
        <>
          <p className="measure" style={{ marginBlockStart: "var(--space-4)" }}>
            Die Beraterinnen
          </p>
          <ul className="liste-punkte measure" style={{ marginBlockStart: "var(--space-2)" }}>
            {stelle.leistungen.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
