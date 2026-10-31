// Inhalt des interaktiven Selbstchecks (Entscheidungsbaum mit Ampel, entscheidungen.md 17.10.2026).
// Bewusst im Code und nicht im CMS: Ein falsch verknüpfter Ast führte eine Betroffene ins Leere,
// src/lib/self-check.test.ts prüft, dass jeder Weg an einem Ergebnis ankommt.
//
// OFFEN: Texte, Gewichte, Warnzeichen und Schwellen sind ein Entwurf nach anerkannten Risikofaktoren
// (u. a. Danger Assessment nach Campbell). Vor dem Livegang fachlich und schriftlich vom AG freigeben
// lassen (Z-02). Die 15 Aussagen der Altseite sind übernommen, neue Aussagen tragen `added: true`.

export type Subject = "self" | "other" | "child";
export type Level = "green" | "yellow" | "red";
export type AreaId = "control" | "physical" | "sexual" | "economic" | "stalking" | "children" | "child";

export type Statement = {
  id: string;
  /** Text für „mich selbst“ und für Kinder */
  self: string;
  /** Text für „eine Person, die ich kenne“ (entfällt im Bereich Kinder) */
  other?: string;
  /** 1 bis 3, zählt bei „Ja“ */
  weight: 1 | 2 | 3;
  /** Warnzeichen: „Ja“ führt immer zu Rot, „Weiß nicht“ mindestens zu Gelb */
  warning?: true;
  added?: true;
};

export type HelpLink = { label: string; href: string; phone?: string };

export type Area = {
  id: AreaId;
  label: string;
  description: string;
  statements: Statement[];
  help: HelpLink[];
};

// Schwellen für die Summe der Gewichte aller Ja-Antworten
export const THRESHOLDS = { yellow: 2, red: 6 } as const;

export const LEGENDS: Record<Subject, string> = {
  self: "Ihr (Ex-)Partner, (Ex-)Ehemann oder eine andere Person …",
  other: "Der (Ex-)Partner der Frau, um die Sie sich sorgen, oder eine andere Person …",
  child: "Das Kind oder die*der Jugendliche …",
};

const HELP = {
  police: { label: "Polizei, im Notfall", href: "/hilfe#polizei", phone: "110" },
  helpline: { label: "Hilfetelefon Gewalt gegen Frauen, rund um die Uhr", href: "/hilfe#hilfetelefon", phone: "116 016" },
  counselling: { label: "Frauenberatungsstelle im Kreis Höxter", href: "/hilfe#frauenberatungsstelle" },
  shelter: { label: "Frauen- und Kinderschutzhaus", href: "/hilfe#schutzhaus" },
  evidence: { label: "Anonyme Spurensicherung nach einer Sexualstraftat", href: "/hilfe#spurensicherung" },
  stalking: { label: "Was Sie gegen Stalking tun können", href: "/hilfe#stalking" },
  relatives: { label: "Was Angehörige und Freund*innen tun können", href: "/hilfe#angehoerige" },
  youthOffice: { label: "Allgemeiner Sozialer Dienst (Jugendamt) des Kreises Höxter", href: "/hilfe#asd" },
  childLine: { label: "Nummer gegen Kummer für Kinder, Jugendliche und Eltern", href: "/hilfe#nummer-gegen-kummer" },
  girlsHouse: { label: "Mädchenhaus", href: "/hilfe#maedchenhaus" },
  traces: { label: "Spuren dieses Besuchs im Browser löschen", href: "/internetspuren" },
} satisfies Record<string, HelpLink>;

export const AREAS: Area[] = [
  {
    id: "control",
    label: "Kontrolle und seelische Gewalt",
    description: "Abwerten, Schuld zuweisen, Eifersucht, Isolieren, Überwachen",
    help: [HELP.counselling, HELP.helpline],
    statements: [
      {
        id: "blame",
        self: "macht Sie verantwortlich für seinen Frust und Ärger und gibt Ihnen die Schuld",
        other: "macht sie verantwortlich für seinen Frust und Ärger und gibt ihr die Schuld",
        weight: 1,
      },
      {
        id: "insult",
        self: "beleidigt Sie, wertet Sie vor Freund*innen und Familie ab und macht Sie lächerlich",
        other: "beleidigt sie, wertet sie vor Freund*innen und Familie ab und macht sie lächerlich",
        weight: 1,
      },
      {
        id: "isolate",
        self: "isoliert Sie, ist stark eifersüchtig und verbietet Ihnen, Freund*innen, Verwandte oder Kolleg*innen zu treffen",
        other: "isoliert sie, ist stark eifersüchtig und verbietet ihr, Freund*innen, Verwandte oder Kolleg*innen zu treffen",
        weight: 2,
      },
      {
        id: "confine",
        self: "hindert Sie daran, das Haus zu verlassen, zum Beispiel indem er Ihnen die Schlüssel wegnimmt",
        other: "hindert sie daran, das Haus zu verlassen, zum Beispiel indem er ihr die Schlüssel wegnimmt",
        weight: 2,
      },
      {
        id: "pressure",
        self: "setzt Sie unter Druck, damit Sie bei ihm bleiben",
        other: "setzt sie unter Druck, damit sie bei ihm bleibt",
        weight: 1,
      },
      {
        id: "monitor",
        self: "kontrolliert Ihr Handy, liest Ihre Nachrichten oder will immer wissen, wo Sie sind",
        other: "kontrolliert ihr Handy, liest ihre Nachrichten oder will immer wissen, wo sie ist",
        weight: 2,
        added: true,
      },
    ],
  },
  {
    id: "physical",
    label: "Körperliche Gewalt und Drohungen",
    description: "Schlagen, Stoßen, Würgen, Drohen, Sachen zerstören",
    help: [HELP.counselling, HELP.shelter, HELP.helpline],
    statements: [
      {
        id: "rage",
        self: "rastet aus, wenn er wütend ist, wirft mit Gegenständen und verbreitet Angst",
        other: "rastet aus, wenn er wütend ist, wirft mit Gegenständen und verbreitet Angst",
        weight: 2,
      },
      {
        id: "damage",
        self: "beschädigt Ihre persönlichen Sachen",
        other: "beschädigt ihre persönlichen Sachen",
        weight: 1,
      },
      {
        id: "hit",
        self: "schlägt oder tritt Sie, drängt Sie in die Ecke, vielleicht sogar vor den Kindern",
        other: "schlägt oder tritt sie, drängt sie in die Ecke, vielleicht sogar vor den Kindern",
        weight: 3,
      },
      {
        id: "threat",
        self: "droht, Sie, die Kinder, Freund*innen, Verwandte, Haustiere oder sich selbst zu verletzen oder zu töten",
        other: "droht, sie, die Kinder, Freund*innen, Verwandte, Haustiere oder sich selbst zu verletzen oder zu töten",
        weight: 3,
        warning: true,
      },
      {
        id: "strangle",
        self: "hat Sie schon einmal gewürgt oder Ihnen die Luft abgedrückt",
        other: "hat sie schon einmal gewürgt oder ihr die Luft abgedrückt",
        weight: 3,
        warning: true,
        added: true,
      },
      {
        id: "weapon",
        self: "besitzt eine Waffe oder hat Ihnen mit einer Waffe gedroht",
        other: "besitzt eine Waffe oder hat ihr mit einer Waffe gedroht",
        weight: 3,
        warning: true,
        added: true,
      },
      {
        id: "escalation",
        self: "wird in letzter Zeit häufiger oder heftiger gewalttätig",
        other: "wird in letzter Zeit häufiger oder heftiger gewalttätig",
        weight: 3,
        warning: true,
        added: true,
      },
      {
        id: "pregnancy",
        self: "hat Sie während einer Schwangerschaft geschlagen oder bedroht",
        other: "hat sie während einer Schwangerschaft geschlagen oder bedroht",
        weight: 3,
        warning: true,
        added: true,
      },
    ],
  },
  {
    id: "sexual",
    label: "Sexuelle Gewalt",
    description: "Sex gegen den eigenen Willen, Druck, Nacktbilder",
    help: [HELP.evidence, HELP.counselling, HELP.helpline],
    statements: [
      {
        id: "rape",
        self: "macht beim Sex, was er will, und hört nicht auf, wenn Sie „Nein“ sagen oder Schmerzen haben",
        other: "macht beim Sex, was er will, und hört nicht auf, wenn sie „Nein“ sagt oder Schmerzen hat",
        weight: 3,
        warning: true,
      },
      {
        id: "coerce",
        self: "drängt Sie zu sexuellen Handlungen, die Sie nicht wollen, oder dazu, Nacktbilder zu schicken",
        other: "drängt sie zu sexuellen Handlungen, die sie nicht will, oder dazu, Nacktbilder zu schicken",
        weight: 2,
        added: true,
      },
    ],
  },
  {
    id: "economic",
    label: "Geld und Arbeit",
    description: "Geld zuteilen, Arbeit verbieten, Schulden machen",
    help: [HELP.counselling, HELP.helpline],
    statements: [
      {
        id: "finances",
        self: "kontrolliert Ihre Finanzen, teilt Ihnen das Geld zu und überprüft, was Sie kaufen",
        other: "kontrolliert ihre Finanzen, teilt ihr das Geld zu und überprüft, was sie kauft",
        weight: 2,
      },
      {
        id: "work",
        self: "verbietet Ihnen, arbeiten zu gehen",
        other: "verbietet ihr, arbeiten zu gehen",
        weight: 2,
      },
      {
        id: "debts",
        self: "schließt Verträge oder macht Schulden auf Ihren Namen",
        other: "schließt Verträge oder macht Schulden auf ihren Namen",
        weight: 2,
        added: true,
      },
    ],
  },
  {
    id: "stalking",
    label: "Stalking und digitale Gewalt",
    description: "Verfolgen, Belästigen nach der Trennung, Überwachen mit Technik, Bloßstellen im Netz",
    help: [HELP.stalking, HELP.counselling, HELP.helpline],
    statements: [
      {
        id: "separation",
        self: "akzeptiert die Trennung nicht und belästigt Sie selbst oder über Bekannte",
        other: "akzeptiert die Trennung nicht und belästigt sie selbst oder über Bekannte",
        weight: 2,
      },
      {
        id: "harass",
        self: "verfolgt Sie oder terrorisiert Sie per Telefon, Handy oder auf anderen Wegen",
        other: "verfolgt sie oder terrorisiert sie per Telefon, Handy oder auf anderen Wegen",
        weight: 2,
      },
      {
        id: "lurk",
        self: "lauert Ihnen auf oder verfolgt Sie, seit Sie sich getrennt haben oder trennen wollen",
        other: "lauert ihr auf oder verfolgt sie, seit sie sich getrennt hat oder trennen will",
        weight: 3,
        warning: true,
        added: true,
      },
      {
        id: "expose",
        self: "droht, Sie im Internet bloßzustellen, oder tut es bereits",
        other: "droht, sie im Internet bloßzustellen, oder tut es bereits",
        weight: 2,
      },
      {
        id: "digital",
        self: "überwacht Sie mit Technik, zum Beispiel über Handy, Kameras, Alexa, Tracker oder Smart Home",
        other: "überwacht sie mit Technik, zum Beispiel über Handy, Kameras, Alexa, Tracker oder Smart Home",
        weight: 2,
        added: true,
      },
    ],
  },
  // Wunsch der Frauenberatungsstelle vom 21.10.2026. OFFEN: Gewichte und Warnzeichen fachlich bestätigen lassen (Z-02)
  {
    id: "children",
    label: "Druck über die Kinder",
    description: "Kinder ausspielen, Besuchsrecht für Drohungen nutzen, mit Entführung drohen",
    help: [HELP.counselling, HELP.youthOffice, HELP.helpline],
    statements: [
      {
        id: "turnAgainst",
        self: "spielt die Kinder gegen Sie aus oder benutzt sie als Boten, auch nach einer Trennung",
        other: "spielt die Kinder gegen sie aus oder benutzt sie als Boten, auch nach einer Trennung",
        weight: 2,
        added: true,
      },
      {
        id: "visitation",
        self: "nutzt das Besuchsrecht für Drohungen oder um Sie zu kontrollieren",
        other: "nutzt das Besuchsrecht für Drohungen oder um sie zu kontrollieren",
        weight: 2,
        added: true,
      },
      {
        id: "abduction",
        self: "droht, die Kinder zu entführen oder Ihnen wegzunehmen",
        other: "droht, die Kinder zu entführen oder ihr wegzunehmen",
        weight: 3,
        warning: true,
        added: true,
      },
    ],
  },
  {
    id: "child",
    label: "Gewalt gegen ein Kind",
    description: "Miterleben, Schlagen, sexuelle Übergriffe, Vernachlässigung",
    help: [HELP.youthOffice, HELP.childLine, HELP.girlsHouse],
    statements: [
      { id: "witness", self: "erlebt mit, wie zu Hause geschlagen, gedroht oder geschrien wird", weight: 2, added: true },
      { id: "demean", self: "wird beschimpft, gedemütigt oder bedroht", weight: 2, added: true },
      { id: "beaten", self: "wird geschlagen, geschüttelt oder eingesperrt", weight: 3, warning: true, added: true },
      {
        id: "abused",
        self: "wird gegen den eigenen Willen angefasst oder zu sexuellen Handlungen gedrängt, auch über das Internet",
        weight: 3,
        warning: true,
        added: true,
      },
      {
        id: "neglect",
        self: "bekommt nicht genug zu essen, keine Pflege oder bei Krankheit keine ärztliche Hilfe",
        weight: 2,
        added: true,
      },
      { id: "afraid", self: "hat Angst, nach Hause zu gehen", weight: 2, added: true },
    ],
  },
];

/** Bereiche, die bei „mich selbst“ und „eine Person, die ich kenne“ zur Wahl stehen */
export const ADULT_AREAS: AreaId[] = ["control", "physical", "sexual", "economic", "stalking", "children"];

export const TEXTS = {
  dangerQuestion: "Sind Sie oder ist jemand anderes gerade in Gefahr?",
  dangerHelp: {
    heading: "Holen Sie sich jetzt Hilfe",
    police: "Rufen Sie die Polizei:",
    helpline: "Das Hilfetelefon ist rund um die Uhr für Sie da, anonym und kostenlos:",
    exit: "Mit „Seite verlassen“ oder zweimal Esc verlassen Sie diese Seite sofort.",
    continue: "Selbstcheck trotzdem machen",
  },
  subjectQuestion: "Um wen geht es?",
  subjects: {
    self: "Um mich selbst",
    other: "Um eine Frau, die ich kenne",
    child: "Um ein Kind oder eine*n Jugendliche*n",
  } satisfies Record<Subject, string>,
  areaQuestion: "Worum geht es? Sie können mit einem Bereich anfangen und danach weitere ansehen.",
  allAreas: "Alle Bereiche nacheinander",
  allAreasDescription: (n: number) => `${n} kurze Aussagen`,
  moreQuestion: "Möchten Sie noch einen Bereich ansehen?",
  toResult: "Zum Ergebnis",
  answers: { yes: "Ja", no: "Nein", unsure: "Weiß nicht", skip: "Überspringen" },
  back: "Zurück",
  restart: "Neu beginnen",
  privacyNote: "Ihr Selbstcheck wird nicht gespeichert und nirgendwohin gesendet.",
  progress: (n: number, total: number) => `Aussage ${n} von ${total}`,
  resultPrefix: "Ergebnis: ",
  warningsIntro: "Diese Antworten weisen auf eine hohe Gefahr hin:",
  helpHeading: "Wer Ihnen helfen kann",
  disclaimer:
    "Dieser Selbstcheck ist keine fachliche Einschätzung und ersetzt keine Beratung. Wenn Sie sich bedroht fühlen, nehmen Sie das ernst, auch wenn das Ergebnis etwas anderes sagt.",
};

// Gelb nur wegen „Weiß nicht“ bei der Gefahrenfrage oder einem Warnzeichen, ohne zutreffende Aussagen
export const UNCERTAIN_TEXT: Record<Subject, string> = {
  self: "Bei einer wichtigen Frage sind Sie unsicher. Das geht vielen so. Nehmen Sie Ihr Gefühl ernst und sprechen Sie mit einer Beratungsstelle darüber, anonym und kostenlos.",
  other:
    "Bei einer wichtigen Frage sind Sie unsicher. Nehmen Sie Ihre Sorge ernst und lassen Sie sich beraten, auch als Angehörige*r oder Freund*in.",
  child:
    "Bei einer wichtigen Frage sind Sie unsicher. Nehmen Sie Ihre Sorge um das Kind ernst und lassen Sie sich beraten, auch ohne Namen zu nennen.",
};

export const LEVELS: Record<Level, { label: string; text: Record<Subject, string> }> = {
  green: {
    label: "Wenige Anzeichen",
    text: {
      self: "Nach Ihren Antworten gibt es wenige Anzeichen für Gewalt. Wenn Sie sich trotzdem unwohl oder bedroht fühlen, vertrauen Sie diesem Gefühl. Sprechen Sie mit jemandem darüber.",
      other:
        "Nach Ihren Antworten gibt es wenige Anzeichen für Gewalt. Wenn Sie sich trotzdem Sorgen machen, nehmen Sie das ernst. Eine Beratungsstelle hilft Ihnen, die Lage einzuschätzen.",
      child:
        "Nach Ihren Antworten gibt es wenige Anzeichen für Gewalt. Wenn Sie sich trotzdem Sorgen um das Kind machen, nehmen Sie das ernst und lassen Sie sich beraten.",
    },
  },
  yellow: {
    label: "Deutliche Anzeichen von Gewalt",
    text: {
      self: "Was Sie beschreiben, ist Gewalt. Sie verletzt Ihre Würde und wird mit der Zeit oft schlimmer. Sie müssen das nicht allein tragen: Lassen Sie sich beraten, anonym und kostenlos.",
      other:
        "Was Sie beschreiben, ist Gewalt. Bleiben Sie mit der Frau in Kontakt, glauben Sie ihr und drängen Sie sie zu nichts. Eine Beratungsstelle unterstützt auch Sie als Angehörige*n oder Freund*in.",
      child:
        "Was Sie beschreiben, gefährdet das Wohl des Kindes. Lassen Sie sich beraten, wie Sie das Kind schützen können. Das Jugendamt berät Sie, auch ohne dass Sie Namen nennen.",
    },
  },
  red: {
    label: "Hinweise auf hohe Gefahr",
    text: {
      self: "Ihre Antworten enthalten Hinweise auf eine hohe Gefahr. Bitte nehmen Sie das ernst. Wenn Sie bedroht werden, rufen Sie die Polizei unter 110. Das Hilfetelefon und die Frauenberatungsstelle helfen Ihnen, einen Plan für Ihre Sicherheit zu machen.",
      other:
        "Ihre Antworten enthalten Hinweise auf eine hohe Gefahr für die Frau. Wenn sie jetzt bedroht wird, rufen Sie die Polizei unter 110. Bringen Sie sich selbst nicht in Gefahr.",
      child:
        "Ihre Antworten enthalten Hinweise auf eine hohe Gefahr für das Kind. Ist das Kind jetzt in Gefahr, rufen Sie die Polizei unter 110. Wenden Sie sich an das Jugendamt, es muss handeln, wenn ein Kind gefährdet ist.",
    },
  },
};

export const ALWAYS_HELP: Record<Subject, HelpLink[]> = {
  self: [HELP.helpline, HELP.traces],
  other: [HELP.relatives, HELP.helpline, HELP.traces],
  child: [HELP.youthOffice, HELP.childLine, HELP.traces],
};

export const EMERGENCY_HELP = HELP.police;
