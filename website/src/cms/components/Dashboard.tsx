import type { Payload } from "payload";

// Startseite des Backends: die häufigsten Aufgaben als große Schaltflächen (Gestaltung: app/(payload)/custom.css)
type Props = { payload: Payload; user?: { name?: string | null; email?: string; role?: string } | null };

function Tile({ href, title, text, target }: { href: string; title: string; text: string; target?: string }) {
  return (
    <a href={href} className="aal-tile" target={target}>
      <span className="aal-tile__title">{title}</span>
      <span className="aal-tile__text">{text}</span>
    </a>
  );
}

async function counts(payload: Payload) {
  const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [recent, events] = await Promise.all([
    payload.count({ collection: "registrations", where: { createdAt: { greater_than: week } } }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: "courses", where: { status: { equals: "published" } } }).catch(() => ({ totalDocs: 0 })),
  ]);
  return { recent: recent.totalDocs, events: events.totalDocs };
}

export async function Dashboard({ payload, user }: Props) {
  const { recent, events } = await counts(payload);
  const isAdmin = user?.role === "admin";

  return (
    <div className="aal-dashboard">
      <h2 className="aal-dashboard__title">Willkommen{user?.name ? `, ${user.name}` : ""}!</h2>
      <p className="aal-dashboard__lead">Was möchten Sie tun? Änderungen erscheinen sofort auf der Website.</p>
      <section aria-labelledby="aal-tools-editorial">
        <h3 id="aal-tools-editorial" className="aal-dashboard__heading">Redaktion</h3>
        <div className="aal-tiles">
          <Tile href="/backend/collections/posts/create" title="Neuen Beitrag schreiben" text="Eine Meldung für den Bereich Aktuelles" />
          <Tile
            href="/backend/collections/courses/create"
            title="Neuen Termin anlegen"
            text={`Termin mit Anmeldung · ${events} veröffentlicht`}
          />
          <Tile href="/backend/collections/course-offers" title="Kurse bearbeiten" text="Krav Maga, WenDo und weitere Kurse" />
          <Tile href="/backend/collections/members" title="Mitglieder bearbeiten" text="Wer im Arbeitskreis mitarbeitet" />
          <Tile
            href="/backend/collections/registrations"
            title="Anmeldungen ansehen"
            text={recent ? `${recent} neue in den letzten 7 Tagen` : "Keine neuen Anmeldungen in den letzten 7 Tagen"}
          />
          <Tile href="/backend/collections/media" title="Dateiarchiv" text="Alle hochgeladenen Bilder und Dokumente" />
          <Tile href="/" target="_blank" title="Website ansehen" text="So sehen Besucherinnen die Website" />
        </div>
      </section>
      {isAdmin && (
        <section className="aal-dashboard__admin" aria-labelledby="aal-tools-admin">
          <h3 id="aal-tools-admin" className="aal-dashboard__heading">Verwaltung</h3>
          <p className="aal-dashboard__note">Nur für Admins sichtbar.</p>
          <div className="aal-tiles">
            <Tile href="/backend/globals/mail" title="E-Mail und Anmeldungen" text="Empfänger und Postfach" />
            <Tile href="/backend/collections/users" title="Konten" text="Redakteur:innen verwalten" />
          </div>
        </section>
      )}
    </div>
  );
}
