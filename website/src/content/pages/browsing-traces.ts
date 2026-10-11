import type { PageData } from "../model";

// OFFEN: Anleitungen vor Livegang gegen aktuelle Browserversionen prüfen
export const browsingTraces: PageData = {
  slug: "internetspuren",
  title: "Internetspuren löschen",
  description: "So verlassen Sie diese Seite schnell und löschen Ihren Browserverlauf.",
  intro: "Wenn Sie nicht möchten, dass jemand sieht, dass Sie auf dieser Seite waren, helfen diese Schritte.",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "section",
      variant: "stack",
      anchor: "notausgang",
      heading: "Seite schnell verlassen",
      items: [
        {
          blockType: "rich",
          content: `<p>Oben auf jeder Seite und auf dem Handy unten rechts finden Sie den Knopf <strong>„Seite verlassen“</strong>. Er bringt Sie sofort zu einer Wettervorhersage bei Google. Mit der Tastatur geht es noch schneller: Drücken Sie <strong>zweimal kurz hintereinander die Esc-Taste</strong>.</p>`,
        },
        {
          blockType: "callout",
          kind: "notice",
          content: `<p>Wichtig: Der Knopf ersetzt nur die aktuelle Seite. Andere Seiten dieser Website, die Sie vorher angesehen haben, stehen weiter im Verlauf. Löschen Sie deshalb danach Ihren Verlauf, wie unten beschrieben.</p>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "privat",
      heading: "Am besten: privates Fenster nutzen",
      items: [
        {
          blockType: "rich",
          content: `<p>In einem privaten Fenster speichert der Browser keinen Verlauf. Sobald Sie es schließen, sind die Spuren weg.</p>
<ul><li>Chrome und Edge: Strg + Umschalt + N (Mac: Cmd + Umschalt + N)</li><li>Firefox: Strg + Umschalt + P (Mac: Cmd + Umschalt + P)</li><li>Safari auf dem Mac: Cmd + Umschalt + N</li><li>Auf dem Handy: im Browser-Menü „Neuer Inkognito-Tab“ oder „Privat“ wählen</li></ul>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "loeschen",
      heading: "Verlauf nachträglich löschen",
      items: [
        {
          blockType: "rich",
          content: `<h3>Chrome, Edge und Firefox am Computer</h3>
<ol><li>Drücken Sie Strg + Umschalt + Entf (Mac: Cmd + Umschalt + Entf).</li><li>Wählen Sie als Zeitraum „Gesamte Zeit“ oder „Letzte Stunde“.</li><li>Setzen Sie Haken bei Verlauf, Cookies und zwischengespeicherten Dateien und bestätigen Sie.</li></ol>
<h3>Safari am Mac</h3>
<ol><li>Öffnen Sie oben im Menü „Verlauf“ und wählen Sie „Verlauf löschen …“.</li><li>Wählen Sie den Zeitraum und klicken Sie auf „Verlauf löschen“.</li></ol>
<h3>iPhone und iPad</h3>
<ol><li>Öffnen Sie die Einstellungen und dann Apps, Safari.</li><li>Tippen Sie auf „Verlauf und Websitedaten löschen“.</li></ol>
<h3>Android mit Chrome</h3>
<ol><li>Tippen Sie oben rechts auf die drei Punkte und dann auf „Verlauf“.</li><li>Tippen Sie auf „Browserdaten löschen“, wählen Sie den Zeitraum und bestätigen Sie.</li></ol>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "mehr",
      heading: "Was Sie außerdem bedenken sollten",
      items: [
        {
          blockType: "rich",
          content: `<ul><li>Anrufe bei Beratungsstellen stehen in der Anrufliste Ihres Telefons. Löschen Sie sie bei Bedarf.</li><li>Ein gemeinsam genutzter Computer oder ein Handy, zu dem jemand anderes das Passwort kennt, ist nicht sicher. Nutzen Sie wenn möglich das Gerät einer Vertrauensperson.</li><li>Wenn Sie vermuten, dass Ihr Handy überwacht wird, sprechen Sie die Frauenberatungsstelle darauf an.</li></ul>`,
        },
      ],
    },
  ],
};
