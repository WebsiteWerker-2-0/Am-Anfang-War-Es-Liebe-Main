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
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { FileBlock } from "./blocks/datei";

// Nur die Formate, die das Design der Website kennt: Absatz, Zwischenüberschrift,
// Liste, Nummerierung, fett, kursiv, unterstrichen, Link und Datei/Bild an einer Stelle im Text.
// Schriftart, -größe und Farbe lassen sich bewusst nicht ändern: Die Website gestaltet den Text einheitlich.
export const bodyEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h3"] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    LinkFeature(),
    BlocksFeature({ blocks: [FileBlock] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
