import {
  convertLexicalToHTML,
  type HTMLConvertersFunction,
} from "@payloadcms/richtext-lexical/html";
import { mediaUrl } from "./cms-content";
import { figureClass } from "./figure";

// Formatierter Text aus dem CMS als HTML-Text, für Teile der Website, die im Browser erzeugt werden
// (Terminliste). Dieselben Bausteine wie in rich.tsx, die Klassen kommen aus .prose.

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Doc = Record<string, unknown>;

const converters: HTMLConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    datei: ({ node }: { node: { fields?: Record<string, unknown> } }) => {
      const fields = node.fields ?? {};
      const file = fields.file as Doc | number | undefined;
      // Nicht aufgelöste Dateien (nur eine Nummer) lassen sich nicht darstellen
      if (!file || typeof file !== "object") return "";
      const label = escape(String(fields.label || file.title || file.filename));
      const url = escape(mediaUrl(file));
      if (String(file.mimeType).startsWith("image/")) {
        const alt = escape(String(file.alt ?? ""));
        return `<figure class="${figureClass(fields.position)}"><img src="${url}" alt="${alt}" loading="lazy"${file.width ? ` width="${file.width}" height="${file.height}"` : ""}>${fields.label ? `<figcaption>${label}</figcaption>` : ""}</figure>`;
      }
      return `<p class="file-link"><a href="${url}" download>${label}</a></p>`;
    },
  },
});

export function richToHtml(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  try {
    return convertLexicalToHTML({ data: value as never, converters });
  } catch (error) {
    console.error("Text konnte nicht umgewandelt werden.", error);
    return "";
  }
}
