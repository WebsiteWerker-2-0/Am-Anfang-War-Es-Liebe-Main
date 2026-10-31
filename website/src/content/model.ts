import type { SerializedEditorState } from "lexical";
import type { BandKey } from "./band-keys";

// Gemeinsames Datenmodell der Seiten. Die Standardinhalte in `content/pages/`
// und die Seiten aus dem CMS (`lib/cms-content.ts`) haben dieselbe Form, ein
// Renderer (`components/blocks/`) zeigt beide an.

/** Formatierter Text: HTML-Zeichenkette (Standardinhalt) oder Lexical-Zustand (CMS) */
export type Rich = string | SerializedEditorState;

/** Bild im Standardinhalt: Schlüssel aus `content/assets.ts` (z. B. "illustrations/band-p07") */
export type AssetRef = { asset: string };

/** Fertig aufgelöstes Bild, passend für next/image */
export type Img = { src: string; width: number; height: number; blurDataURL?: string };

/** Bild im Modell: Verweis (Standardinhalt) oder aufgelöst (CMS und nach dem Auflösen) */
export type ImageValue = AssetRef | Img | null | undefined;

/** Datei im Modell: Pfad unter /downloads oder /dateien */
export type FileValue = string;

export type Mailbox = "help" | "information";

// ---- Inhalte innerhalb eines Abschnitts -----------------------------------

export type SectionItem =
  | { blockType: "rich"; content: Rich }
  | { blockType: "lead"; text: string }
  | { blockType: "note"; content: Rich }
  | CalloutBlock
  | { blockType: "button"; label: string; href: string }
  | { blockType: "facts"; entries: FactEntry[] }
  | { blockType: "definitions"; entries: { term: string; text: string }[] };

/** Hinweis- oder Notfallkasten */
export type CalloutBlock = {
  blockType: "callout";
  kind: "notice" | "emergency";
  small?: boolean;
  /** Auf Lesebreite begrenzen */
  measure?: boolean;
  /** Text, ein Absatz */
  content: Rich;
  /** Notruf-Nummer unter dem Text (nur bei kind = emergency) */
  number?: string;
};

export type FactEntry = {
  /** Bezeichnung; bei einem Postfach der Name des Postfachs, wenn leer */
  term?: string;
  /** Text der Angabe */
  value?: string;
  /** Telefonnummer, wird als Link zum Anrufen dargestellt */
  phone?: string;
  /** Postfach der Website, wird als E-Mail-Link dargestellt */
  mailbox?: Mailbox;
  /** Kleiner Hinweis unter der Angabe */
  note?: string;
};

// ---- Blöcke einer Seite -----------------------------------------------------

export type PageBlock =
  | {
      blockType: "section";
      /** Kennung der Überschrift (id) und Sprungmarke */
      anchor?: string;
      /** Kennung des Abschnitts selbst, falls abweichend */
      sectionId?: string;
      heading?: string;
      ariaLabel?: string;
      variant: "stack" | "service" | "plain";
      items: SectionItem[];
    }
  | CalloutBlock
  | { blockType: "supportServices" }
  | { blockType: "serviceGroups"; anchor?: string; heading: string; note?: string }
  | {
      blockType: "documentList";
      anchor?: string;
      heading: string;
      items: { title: string; file: FileValue; meta?: string }[];
      note?: Rich;
    }
  | {
      blockType: "topicLinks";
      anchor?: string;
      heading: string;
      topics: { title: string; links: { label: string; url: string }[] }[];
    }
  | { blockType: "peopleList"; anchor?: string; heading: string; people: { name: string; role?: string; url?: string }[] }
  | {
      blockType: "campaign";
      anchor?: string;
      heading: string;
      lead?: string;
      body: Rich;
      download?: { label: string; file: FileValue; meta?: string };
      poster?: ImageValue;
      posterAlt?: string;
    }
  | { blockType: "photo"; image: ImageValue; alt?: string; caption?: string }
  | { blockType: "selfCheck"; legend: string; statements: { text: string }[] }
  | { blockType: "contactForm"; anchor?: string; heading: string; concerns: { label: string; mailbox: Mailbox }[] }
  | {
      blockType: "languageVersions";
      versions: {
        code: string;
        direction: "ltr" | "rtl";
        title: string;
        text: string;
        helplineLabel: string;
        emergencyLabel: string;
        exitLabel: string;
      }[];
    }
  | {
      blockType: "exhibition";
      anchor?: string;
      heading: string;
      intro?: string;
      panels: { image: ImageValue; title: string }[];
      /** Hinweis unter den Tafeln, etwa zum Buchen der Ausstellung */
      note?: Rich;
    }
  | { blockType: "courseList"; anchor?: string; heading: string; emptyNotice: Rich }
  | { blockType: "newsList"; variant: "page" | "teaser"; anchor?: string; heading?: string; linkLabel?: string; count?: number }
  // Startseite
  | {
      blockType: "entry";
      title: string;
      paths: { reason: string; target: string; href: string }[];
      image: ImageValue;
    }
  | { blockType: "promises"; items: { title: string; text: string }[] }
  | { blockType: "quickAccess"; anchor?: string; heading: string; linkLabel: string; linkUrl: string }
  | {
      blockType: "teaserBand";
      anchor?: string;
      heading: string;
      lead: string;
      privacyNote?: string;
      buttonLabel: string;
      buttonUrl: string;
      image: ImageValue;
    };

export type PageLayout = "home" | "stack-lg" | "measure-stack" | "wide";

export type PageData = {
  slug: string;
  /** Überschrift (H1) */
  title: string;
  /** Titel im Browser-Tab, wenn er von der Überschrift abweicht */
  metaTitle?: string;
  description?: string;
  intro?: string;
  /** Illustrationsband im Seitenkopf (Schlüssel aus content/band-keys.ts) */
  band?: BandKey | null;
  layout: PageLayout;
  blocks: PageBlock[];
};

// ---- Anlaufstellen, Beiträge, Seitenrahmen ----------------------------------

export type { SupportService, ServiceGroup } from "./support-services";

export type PostData = {
  slug: string;
  title: string;
  /** JJJJ-MM-TT */
  date: string;
  excerpt: string;
  /** „Verfasst von“ (Pflichtfeld im Backend, fehlt beim Altbestand ohne CMS) */
  author?: string;
  image: Img | null;
  imageAlt?: string;
  /** Text: HTML (Altbestand ohne CMS) oder Lexical */
  content: Rich;
  gallery: { image: Img; alt?: string }[];
  /** Download-Bereich unter dem Text (nur bei eingeschaltetem „Download-Bereich anzeigen“) */
  documents: PostDocument[];
  /** Archiviert: steht eingeklappt im Archiv unten auf „Aktuelles“ */
  archived?: boolean;
};

export type PostDocument = {
  label: string;
  file: FileValue;
  /** Kurzangabe wie „PDF, 1,2 MB“ */
  meta?: string;
  preview?: Img | null;
};

export type SiteData = {
  navigation: { label: string; href: string; children?: { label: string; href: string }[] }[];
  languages: { code: string; label: string; href: string }[];
  helpline: { number: string; suffix: string };
  mailboxes: Record<Mailbox, { label: string; email: string }>;
  footer: {
    organisation: string;
    address: Rich;
    emergency: Rich;
    serviceLinks: { label: string; href: string }[];
    legalLinks: { label: string; href: string }[];
    fundingLabel: string;
    fundingLogo: ImageValue;
    fundingAlt: string;
    draftNote: string;
  };
};
