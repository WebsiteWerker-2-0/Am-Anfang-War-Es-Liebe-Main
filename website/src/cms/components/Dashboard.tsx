import type { Payload } from "payload";

// Startseite des Backends: die häufigsten Aufgaben als große Schaltflächen
type Props = { payload: Payload; user?: { name?: string | null; email?: string; role?: string } | null };

const tile: React.CSSProperties = {
  display: "block",
  padding: "1.25rem 1.5rem",
  borderRadius: "8px",
  border: "1px solid var(--theme-elevation-150)",
  background: "var(--theme-elevation-50)",
  textDecoration: "none",
  color: "inherit",
};

function Tile({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <a href={href} style={tile}>
      <strong style={{ display: "block", fontSize: "1.1rem", marginBlockEnd: "0.25rem" }}>{title}</strong>
      <span style={{ opacity: 0.75 }}>{text}</span>
    </a>
  );
}

async function counts(payload: Payload) {
  const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [recent, courses] = await Promise.all([
    payload
      .count({ collection: "registrations", where: { createdAt: { greater_than: week } } })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({ collection: "courses", where: { status: { equals: "published" } } })
      .catch(() => ({ totalDocs: 0 })),
  ]);
  return { recent, courses };
}

export async function Dashboard({ payload, user }: Props) {
  const { recent, courses } = await counts(payload);

  return (
    <div style={{ marginBlockEnd: "2.5rem" }}>
      <h2 style={{ marginBlockEnd: "0.25rem" }}>Willkommen{user?.name ? `, ${user.name}` : ""}!</h2>
      <p style={{ marginBlockEnd: "1.5rem", opacity: 0.8 }}>
        Was möchten Sie tun? Änderungen erscheinen sofort auf der Website.
      </p>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))" }}>
        <Tile
          href="/backend/collections/posts/create"
          title="Neuen Beitrag schreiben"
          text="Eine Meldung für den Bereich Aktuelles"
        />
        <Tile
          href="/backend/collections/courses/create"
          title="Neuen Kurs anlegen"
          text={`Mit Terminen und Plätzen · ${courses.totalDocs} veröffentlicht`}
        />
        <Tile
          href="/backend/collections/registrations"
          title="Kursanmeldungen ansehen"
          text={
            recent.totalDocs
              ? `${recent.totalDocs} neue in den letzten 7 Tagen`
              : "Keine neuen Anmeldungen in den letzten 7 Tagen"
          }
        />
        <Tile href="/backend/collections/pages" title="Seiten bearbeiten" text="Texte der Seiten der Website ändern" />
        <Tile href="/backend/collections/media" title="Bilder und Dateien" text="Fotos, Flyer und PDFs hochladen" />
        <Tile href="/" title="Website ansehen" text="Die Website so ansehen, wie Besucherinnen sie sehen" />
      </div>
    </div>
  );
}
