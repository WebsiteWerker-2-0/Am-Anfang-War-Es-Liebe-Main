import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { FileBlock } from "./blocks/datei";

// Nur die Formate, die das Design der Website kennt: Absatz, Zwischenüberschriften 2 bis 4,
// Liste, Nummerierung, fett, kursiv, unterstrichen, durchgestrichen, Link und Datei/Bild an einer Stelle im Text.
// Überschrift 1 fehlt bewusst: Das ist der Titel der Seite, je Seite gibt es nur eine.
// Gilt für alle Editoren im Backend (Aktuelles, Termine, Kurse).
// Schriftart, -größe und Farbe lassen sich bewusst nicht ändern: Die Website gestaltet den Text einheitlich.
export const bodyEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    LinkFeature(),
    BlocksFeature({ blocks: [FileBlock] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
