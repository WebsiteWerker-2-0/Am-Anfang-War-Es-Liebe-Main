# Kurse mit Plätzen und Anmeldung per E-Mail

Der Arbeitskreis pflegt Kurse selbst im Backend: Termin, Ort, Plätze, Warteliste. Die Seite „Kurse“ zeigt veröffentlichte Kurse mit den freien Plätzen und einem Anmeldeformular. Jede Anmeldung wird im CMS gespeichert und löst eine E-Mail an eine Adresse aus, die ein Admin im Backend hinterlegt (F-11, Pflichtenheft). Kontaktanfragen bleiben davon getrennt und werden weiterhin nirgends gespeichert (ADR-0003).

**Status:** angenommen, 17.10.2026

## Entscheidung

- **Sammlungen:** `courses` (Kurs mit Plätzen, Warteliste, Status mit Archiv) und `registrations` (Anmeldung mit Status „Angemeldet“, „Warteliste“, „Storniert“). Anmeldungen entstehen nur über das Formular, nicht im Backend (`create: false`). Ein Kurs mit Anmeldungen lässt sich nicht löschen, nur archivieren.
- **Plätze:** Belegt sind Anmeldungen mit Status „Angemeldet“. Stornieren gibt den Platz sofort frei. Ist der Kurs voll, kommt je nach Einstellung eine Warteliste oder die Anmeldung wird abgelehnt.
- **Anmeldung:** `POST /api/kurse/anmeldung` (`src/lib/registration.ts`). Prüft Eingaben, Herkunft (Origin), verstecktes Feld gegen Bots, höchstens 10 Anmeldungen je Adresse und Stunde (nur im Arbeitsspeicher, `CMS_REGISTRATION_LIMIT`). Plätze werden nacheinander vergeben, damit zwei gleichzeitige Anfragen nicht denselben letzten Platz bekommen. Das gilt für einen Prozess, der auf Hostinger der Normalfall ist.
- **Interaktive Anzeige:** Die Seite ist zwischengespeichert (ISR, 60 s). Die Kursliste (`src/components/CourseList.tsx`) fragt `GET /api/kurse` (ohne Cache) nach dem Laden und dann alle 30 Sekunden ab, solange die Seite sichtbar ist. Sie lädt auch Kurse nach, wenn die Seite ohne Kurse erzeugt wurde.
- **E-Mail:** nodemailer über SMTP (`src/lib/mail.ts`). Empfänger, Postfach und Zugangsdaten stehen in der Global `mail` („E-Mail und Anmeldungen“), nur für Admins sichtbar, mit Knopf „Test-E-Mail senden“. Umgebungsvariablen `SMTP_*` und `MAIL_FROM` haben Vorrang. Je Kurs lässt sich ein anderer Empfänger eintragen. Scheitert der Versand, bleibt die Anmeldung gespeichert, die Anmeldung zeigt „E-Mail nicht gesendet“ mit Fehlermeldung.
- **Redaktion:** Menü in Gruppen („Aktuelles und Kurse“, „Seiten der Website“, „Dateien“, „Verwaltung“), Startseite mit großen Schaltflächen, Link „Auf der Website ansehen“, Versionsverlauf für Seiten, Aktuelles und Kurse, seltene Felder eingeklappt unter „Erweitert“.

## Folgen

- Anmeldungen enthalten persönliche Daten (Name, E-Mail, Telefon, Nachricht) und gehen per E-Mail an den Arbeitskreis. Das muss in der Datenschutzerklärung und im AVV stehen. **Offen:** Löschfrist (Pflichtenheft § 13). Bis dahin nach dem Kurs von Hand löschen.
- Die IP-Adresse wird nicht gespeichert, nur flüchtig für die Begrenzung im Arbeitsspeicher gehalten.
- Das Passwort des Postfachs liegt im Klartext in der Datenbank (nur Admins lesbar). Wer das nicht will, setzt `SMTP_PASSWORD` als Umgebungsvariable.
- Die Sammlung `events` (Veranstaltungen, F-06) ist angelegt, aber im Menü ausgeblendet, bis die Seite „Veranstaltungen“ gebaut ist.
- Ohne CMS (Vercel-Vorschau, Fehler) gibt es keine Kurse; die Seite zeigt den Hinweis „Termine folgen“.
