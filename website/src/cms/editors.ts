import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

// Nur die Formate, die das Design der Website kennt: Absatz, Zwischenüberschrift,
// Liste, Nummerierung, fett, kursiv, Link. Alles andere würde auf der Seite nicht gestaltet.
export const bodyEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h3"] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});

// Ein einzelner Absatz, etwa in Hinweiskästen
export const inlineEditor = lexicalEditor({
  features: [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature(), InlineToolbarFeature()],
});
