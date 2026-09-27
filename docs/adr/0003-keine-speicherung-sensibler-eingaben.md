# Selbstcheck und Kontaktanfragen werden nie gespeichert

Der Selbstcheck läuft vollständig im Browser, ohne Anfrage, ohne Web Storage und ohne Cookies, und wird beim Zurücknavigieren geleert. Kontaktanfragen werden nur zugestellt, nicht in einer Datenbank, einem Log oder einem Formular-Dienst abgelegt. Beides schützt Besucherinnen, deren Geräte oder Konten mitgelesen werden könnten, und ist vertraglich vereinbart. Anmeldungen zu Kursen dürfen dagegen gespeichert werden; ihre Speicherung darf nie Kontaktanfragen mit erfassen.

**Status:** angenommen, 27.09.2026

## Folgen

- Ein Zustellweg für Kontaktanfragen, der Daten an Dritte gibt (Mail-Relay, API), braucht vorher die AVV-Information an den AG mit vier Wochen Widerspruchsfrist.
- Das CMS (ADR-0001) darf Formulardaten des Kontaktformulars nicht speichern.
