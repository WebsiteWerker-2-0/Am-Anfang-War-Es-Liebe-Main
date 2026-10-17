import type { PageData } from "../model";
import { tel } from "./helpers";

// Aussagen des Selbstchecks, übernommen von der Altseite.
// OFFEN: Textfreigabe durch den AG (Z-02).
const statements = [
  "macht Sie verantwortlich für seinen Frust und Ärger und gibt Ihnen die Schuld",
  "beleidigt Sie, wertet Sie vor Freund*innen und Familie ab und macht Sie lächerlich",
  "isoliert Sie, ist stark eifersüchtig und verbietet Ihnen, Freund*innen, Verwandte oder Kolleg*innen zu treffen",
  "hindert Sie daran, das Haus zu verlassen, zum Beispiel indem er Ihnen die Schlüssel wegnimmt",
  "kontrolliert Ihre Finanzen, teilt Ihnen das Geld zu und überprüft, was Sie kaufen",
  "verbietet Ihnen, arbeiten zu gehen",
  "droht, Sie, die Kinder, Freund*innen, Verwandte, Haustiere oder sich selbst zu verletzen oder zu töten",
  "setzt Sie unter Druck, damit Sie bei ihm bleiben",
  "rastet aus, wenn er wütend ist, wirft mit Gegenständen und verbreitet Angst",
  "beschädigt Ihre persönlichen Sachen",
  "schlägt oder tritt Sie, drängt Sie in die Ecke, vielleicht sogar vor den Kindern",
  "macht beim Sex, was er will, und hört nicht auf, wenn Sie „Nein“ sagen oder Schmerzen haben",
  "droht, Sie im Internet bloßzustellen, oder tut es bereits",
  "akzeptiert die Trennung nicht und belästigt Sie selbst oder über Bekannte",
  "verfolgt Sie oder terrorisiert Sie per Telefon, Handy oder auf anderen Wegen",
];

export const selfCheck: PageData = {
  slug: "selbstcheck",
  title: "Selbstcheck: Gewalt hat viele Gesichter",
  metaTitle: "Selbstcheck",
  description: "Gewalt hat viele Gesichter. Hinterfragen Sie Ihre Situation in Ruhe, nichts wird gespeichert.",
  intro:
    "Manchmal ist es schwer zu sagen, ob das, was man erlebt, schon Gewalt ist. Gehen Sie die Fragen in Ruhe durch. Am Ende sehen Sie, wer Ihnen helfen kann.",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "callout",
      kind: "notice",
      measure: true,
      content: `<p><strong>Ihr Selbstcheck wird nicht gespeichert.</strong> Ihre Antworten bleiben in diesem Fenster und werden nirgendwohin gesendet. Wenn Sie die Seite verlassen, sind sie weg.</p>`,
    },
    {
      blockType: "selfCheck",
      legend: "Ihr (Ex-)Partner, (Ex-)Ehemann oder eine andere Person …",
      statements: statements.map((text) => ({ text })),
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "bedeutung",
      heading: "Was bedeutet das?",
      items: [
        {
          blockType: "rich",
          content: `<p><strong>Jede dieser Verhaltensweisen ist Gewalt, ob körperlich, seelisch, sexuell oder wirtschaftlich.</strong> Sie verletzt Ihre Würde, macht abhängig und kann seelisch und körperlich krank machen. Häusliche Gewalt betrifft immer auch die Kinder.</p>
<p>Sie sind damit nicht allein. Frauen aus allen Schichten, jedem Alter, allen Religionen und Kulturen erleben Gewalt. Viele schweigen lange aus Scham oder weil sie glauben, selbst schuld zu sein. Das sind Sie nicht.</p>
<p>Sie haben ein Recht auf Respekt, Wertschätzung und ein Leben ohne Gewalt.</p>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "weiter",
      heading: "Wie kann es weitergehen?",
      items: [
        {
          blockType: "rich",
          content: `<p>Sprechen Sie mit jemandem darüber. Das Hilfetelefon ist rund um die Uhr für Sie da, anonym und kostenlos: ${tel("116 016")}.</p>`,
        },
        { blockType: "button", label: "Anlaufstellen im Kreis Höxter", href: "/hilfe" },
        {
          blockType: "note",
          content: `<p>Möchten Sie Ihre Spuren im Browser löschen? <a href="/internetspuren">So geht es.</a></p>`,
        },
      ],
    },
  ],
};
