# Handbuch für die Redaktion

So pflegen Sie die Website selbst. Sie brauchen dafür nur einen Browser und Ihr Konto. Änderungen erscheinen **sofort** auf der Website.

**Anmelden:** Adresse der Website, dahinter `/backend`, zum Beispiel `https://am-anfang-war-es-liebe.de/backend`. Der Bereich ist nirgends verlinkt. Geben Sie die Adresse nur an Kolleginnen weiter, die mitarbeiten.

Nach dem Anmelden sehen Sie die **Startseite** mit großen Schaltflächen für die häufigsten Aufgaben. Das Menü links ist in vier Gruppen geordnet.

| Gruppe | Wofür |
|---|---|
| Aktuelles und Kurse | Meldungen schreiben, Kurse anlegen, Anmeldungen ansehen |
| Seiten der Website | Texte der Seiten ändern, Anlaufstellen, Menü und Fußbereich |
| Dateien | Bilder, Flyer und PDFs hochladen |
| Verwaltung | Konten und E-Mail-Einstellungen (nur für Admins) |

## Eine Meldung schreiben (Aktuelles)

1. Auf der Startseite **Neuen Beitrag schreiben** wählen.
2. **Titel** und **Datum** eintragen, bei **Kurzfassung** zwei Sätze für die Liste.
3. Ein **Titelbild** wählen oder hochladen (Bildbeschreibung nicht vergessen, sie hilft Screenreadern).
4. Den **Text** schreiben. Mit den Knöpfen oben im Textfeld gibt es Zwischenüberschriften, Listen, fett und Links.
5. Oben rechts bei **Status** wählen: **Entwurf** (nur Sie sehen es), **Veröffentlicht** (alle sehen es) oder **Archiviert** (bleibt erhalten, ist aber nicht mehr zu sehen).
6. **Speichern**. Mit **Auf der Website ansehen** rechts prüfen Sie das Ergebnis.

**Reihenfolge ändern:** In der Liste „Aktuelles“ die Zeilen am Griff links ziehen. **Dokument anhängen:** im Beitrag unter „Dokumente zum Download“ eine Datei wählen.

## Einen Kurs anlegen

1. Auf der Startseite **Neuen Kurs anlegen** wählen.
2. **Name**, **Beginn** und **Ort** eintragen. **Für wen**, **Kosten** und **Kursleitung** sind freiwillig.
3. Bei **Plätze insgesamt** die Teilnehmerzahl eintragen. **Angemeldet** zählt das System selbst.
4. **Warteliste anbieten** schalten Sie ein, wenn sich auch bei vollem Kurs Interessentinnen eintragen dürfen.
5. Status auf **Veröffentlicht** stellen und speichern. Der Kurs erscheint auf der Seite „Kurse“ mit den freien Plätzen und einem Anmeldeformular. Die Anzeige aktualisiert sich von selbst, wenn sich jemand anmeldet.

**Kurs absagen oder beenden:** Status auf **Archiviert** stellen. Ein Kurs, für den es Anmeldungen gibt, lässt sich nicht löschen, damit keine Anmeldedaten verloren gehen.

## Anmeldungen ansehen und verwalten

Jede Anmeldung kommt als E-Mail an die eingestellte Adresse **und** wird unter **Kursanmeldungen** gespeichert. Dort sehen Sie Name, E-Mail, Telefon und Nachricht.

- **Platz wieder freigeben:** bei der Anmeldung den Status auf **Storniert** stellen. Der Platz ist sofort wieder frei.
- **Warteliste:** Steht jemand auf der Warteliste, setzen Sie den Status von Hand auf **Angemeldet**, sobald ein Platz frei ist, und schreiben der Person.
- **Mit einer Teilnehmerin schreiben:** Antworten Sie einfach auf die E-Mail der Anmeldung.
- **Datenschutz:** Die Angaben sind persönliche Daten. Bitte nur für den Kurs verwenden und **nach dem Kurs löschen**.

## Texte einer Seite ändern

1. Im Menü **Seiten** wählen und die Seite öffnen. Sie sehen ihre Teile in derselben Reihenfolge wie auf der Website.
2. Einen Teil öffnen, den Text ändern, **Speichern**.
3. Teile verschieben Sie am Griff links, neue fügen Sie mit **Block hinzufügen** ein.
4. Unter **Erweitert (nur bei Bedarf)** stehen seltene Einstellungen. Die Sprungmarke bitte nicht ändern, Links wie `/hilfe#stalking` hängen daran.

Seiten lassen sich bearbeiten, aber nicht anlegen oder löschen.

**Etwas rückgängig machen:** Oben in jeder Seite, jedem Beitrag und jedem Kurs gibt es den Reiter **Versionen**. Dort wählen Sie einen früheren Stand und stellen ihn wieder her.

## Anlaufstellen, Menü und Fußbereich

- **Anlaufstellen:** Telefon, Zeiten, Adresse. Die vier **Hauptanlaufstellen** stehen auf der Hilfeseite zuerst, die anderen sind aufklappbar nach Gruppen.
- **Kopf und Fuß der Seite:** Menüpunkte, Sprachwahl, Hilfetelefon und Fußbereich.
- Der Knopf **Seite verlassen** (Notausgang) lässt sich bewusst nicht ändern.

## Bilder und Dateien

Unter **Dateien** laden Sie Bilder und PDFs hoch. Geben Sie bei Bildern einen **Alternativtext** an. Dateien, die niemand mehr sehen soll, stellen Sie auf **nicht öffentlich**.

## Nur für Admins: E-Mail und Anmeldungen einrichten

Unter **Verwaltung → E-Mail und Anmeldungen**:

1. Bei **Kursanmeldungen gehen an** die Adresse eintragen, die die Anmeldungen bekommen soll.
2. Unter **Postfach für den Versand** die Angaben eines E-Mail-Postfachs eintragen. Bei Hostinger finden Sie sie in hPanel beim Postfach: Server (meist `smtp.hostinger.com`), Port `465`, „Verschlüsselt“ an, Benutzername und Passwort des Postfachs.
3. **Speichern** und dann **Test-E-Mail senden**. Kommt die E-Mail im Postfach an, ist alles richtig. Sonst zeigt Ihnen die Meldung den Grund.

Bei einem einzelnen Kurs können Sie unter „Anmeldungen für diesen Kurs gehen an“ eine andere Adresse eintragen.

**Neues Konto:** Unter **Verwaltung → Redakteur:innen** ein Konto anlegen. Die Rolle **Redaktion** darf Inhalte pflegen, **Admin** zusätzlich Konten und E-Mail-Einstellungen verwalten. Ein Konto sperrt sich nach fünf falschen Passwörtern für zehn Minuten.

## Wenn etwas nicht klappt

- **Anmeldung kommt nicht per E-Mail an:** Bei der Anmeldung steht „E-Mail an den Arbeitskreis: Nicht gesendet“. Prüfen Sie dann „E-Mail und Anmeldungen“ und senden Sie die Test-E-Mail. Die Anmeldung selbst ist trotzdem gespeichert.
- **Änderung erscheint nicht:** Seite neu laden. Bei Änderungen an Bildern kann der Browser das alte Bild merken (Strg/Cmd + Umschalt + R).
- **Passwort vergessen:** Eine Admin setzt es unter Redakteur:innen neu.
