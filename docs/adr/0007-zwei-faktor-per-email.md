# Zweiter Faktor per E-Mail-Code für das Backend

Nach dem Passwort verlangt das Backend einen sechsstelligen Code, den die Website an die E-Mail-Adresse des Kontos schickt. Versendet wird über das Postfach aus „E-Mail und Anmeldungen“ (wie die Anmeldemails der Veranstaltungen). Payload kennt keinen zweiten Faktor, deshalb ist er selbst gebaut.

**Status:** angenommen, 17.10.2026

## Entscheidung

- **Ablauf:** Anmeldung mit Passwort (Payload) → `proxy.ts` leitet jede Backend-Seite auf `/backend/zwei-faktor` um und beantwortet Backend-Aufrufe mit 403, solange das Cookie `aal-2fa` fehlt. Die Seite schickt den Code beim ersten Aufruf, „Neuen Code senden“ höchstens einmal pro Minute und sechsmal pro Stunde.
- **Code:** 6 Ziffern, 10 Minuten gültig, 5 Versuche, nur als Hash im Arbeitsspeicher (`src/lib/two-factor-codes.ts`). Nach einem Neustart fordert man einen neuen an.
- **Nachweis:** Cookie `aal-2fa` (httpOnly, SameSite strict, 8 Stunden wie die Anmeldung), HMAC aus `PAYLOAD_SECRET` über Konto und Sitzungsnummer (`sid`) des Payload-Tokens. Neue Anmeldung = neue Sitzung = neuer Code. Auch Aufrufe mit Token in der Kopfzeile (`Authorization: JWT …`) brauchen ihn, sonst ließe sich der zweite Faktor über die API umgehen. Die Vorschau (`/vorschau`) prüft ihn ebenfalls.
- **Ohne zweiten Faktor erreichbar:** Anmelden, Abmelden, Passwort vergessen/zurücksetzen, die Code-Seite.
- **Notschalter:** Umgebungsvariable `CMS_TWO_FACTOR=false` schaltet ihn ab, falls der E-Mail-Versand ausfällt. Ist gar kein Postfach eingetragen, ist keine Anmeldung möglich (Hinweis auf der Seite).

## Folgen

- Fällt das Postfach aus (Passwort geändert, gesperrt), kommt niemand mehr ins Backend, bis der Notschalter gesetzt ist.
- Läuft die App einmal in mehreren Prozessen, müssen die Codes in die Datenbank (heute nur Arbeitsspeicher).
