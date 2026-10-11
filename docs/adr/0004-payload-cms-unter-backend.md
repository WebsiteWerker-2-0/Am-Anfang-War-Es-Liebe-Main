# Payload CMS im selben Projekt unter /backend

Aktuelles, Veranstaltungen und Seitentexte pflegt der Arbeitskreis selbst (F-05 bis F-07). Dafür läuft Payload CMS (selbst gehostet, SQLite) als Teil der Next.js-App unter `/backend`, mit eigenem Root-Layout. Damit bleibt ein Deployment für Vercel-Vorschau und Hostinger, und es gehen keine Inhalte an Dritte (ADR-0002).

**Status:** angenommen, 11.10.2026

## Folgen

- Konten gibt es nur durch eine Admin, es gibt keine Registrierung. Das erste Konto entsteht per `npm run cms:create-admin`; der Weg über den Browser ist ohne `CMS_ALLOW_FIRST_USER=true` gesperrt (`src/proxy.ts`).
- `/backend` ist nirgends verlinkt, sendet `X-Robots-Tag: noindex` und `Cache-Control: no-store`. Die CSP der Website gilt dort nicht, weil die Admin-Oberfläche Inline-Skripte braucht. GraphQL ist abgeschaltet.
- Zwei Root-Layouts brauchen `src/app/global-not-found.tsx` (experimentell in Next.js 16), sonst verlöre die 404-Seite den Notausgang. Das Seitengerüst liegt gemeinsam in `SiteDocument`.
- Öffentlich lesbar sind über die Schnittstelle nur veröffentlichte Inhalte und als öffentlich markierte Dateien. Entwürfe und Archiv sieht nur die Redaktion.
- Datenbank und Uploads liegen unter `CMS_DATA_DIR`, nicht im Git. Auf Vercel ist der Speicher flüchtig. Auf Hostinger ist vor dem Umzug zu klären, ob Dateien ein Deployment überleben.
- Kontaktanfragen dürfen nicht im CMS landen (ADR-0003). Anmeldungen zu Kursen (F-11) werden eine eigene Sammlung.
- Die öffentlichen Seiten lesen noch aus `src/content/`. Die Anbindung ans CMS folgt in einem eigenen Schritt, danach entfällt `posts.json`.
