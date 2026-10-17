import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import type { Rich } from "@/content/model";
import { mediaToImg, mediaUrl } from "./cms-content";
import { htmlToInlineJsx, htmlToJsx } from "./html-to-jsx";

// Formatierter Text aus dem Standardinhalt (HTML) oder dem CMS (Lexical), beide mit
// denselben Klassen: Aufzählung = list-bullets, Nummerierung = list-steps (mit span),
// Telefonlinks = tel, fremde Links = rel="noreferrer".

function converters(telClass: boolean, inline: boolean, prose = false): JSXConvertersFunction {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      return inline ? <>{children}</> : <p>{children}</p>;
    },
    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      if (prose) return node.tag === "ol" ? <ol>{children}</ol> : <ul>{children}</ul>;
      return node.tag === "ol" ? <ol className="list-steps">{children}</ol> : <ul className="list-bullets">{children}</ul>;
    },
    listitem: ({ node, nodesToJSX, parent }) => {
      const children = nodesToJSX({ nodes: node.children });
      const ordered = "tag" in parent && parent.tag === "ol";
      return <li>{ordered && !prose ? <span>{children}</span> : children}</li>;
    },
    blocks: {
      // Datei oder Bild an einer Stelle im Text (Backend: Baustein „Datei oder Bild“)
      datei: ({ node }: { node: { fields?: Record<string, unknown> } }) => {
        const fields = (node.fields ?? {}) as { file?: Record<string, unknown> | number; label?: string };
        const file = fields.file;
        if (!file || typeof file !== "object") return null;
        const label = fields.label || String(file.title ?? file.filename);
        const image = String(file.mimeType).startsWith("image/") ? mediaToImg(file) : null;
        if (image) {
          return (
            <figure>
              <Image src={image} alt={typeof file.alt === "string" ? file.alt : ""} sizes="(min-width: 64em) 40rem, 100vw" />
              {fields.label && <figcaption>{fields.label}</figcaption>}
            </figure>
          );
        }
        return (
          <p className="file-link">
            <a href={mediaUrl(file)} download>
              {label}
            </a>
          </p>
        );
      },
    },
    link: ({ node, nodesToJSX }) => {
      const href: string = node.fields.url ?? "";
      const children = nodesToJSX({ nodes: node.children });
      const className = href.startsWith("tel:") && telClass ? "tel" : undefined;
      const rel = /^https?:/.test(href) ? "noreferrer" : undefined;
      return (
        <a href={href} className={className} rel={rel}>
          {children}
        </a>
      );
    },
  });
}

export function Rich({
  value,
  telClass = true,
  prose = false,
}: {
  value: Rich | null | undefined;
  telClass?: boolean;
  /** Fließtext eines Beitrags: Listen ohne Klassen, die Gestaltung kommt von .prose */
  prose?: boolean;
}) {
  if (!value) return null;
  if (typeof value === "string") return <>{htmlToJsx(value, { telClass })}</>;
  return <RichText data={value} disableContainer converters={converters(telClass, false, prose)} />;
}

/** Nur der Inhalt des ersten Absatzes (ohne <p>), für Zeilen in Hinweiskästen */
export function RichInline({ value, telClass = true }: { value: Rich | null | undefined; telClass?: boolean }) {
  if (!value) return null;
  if (typeof value === "string") return <>{htmlToInlineJsx(value, { telClass })}</>;
  return <RichText data={value} disableContainer converters={converters(telClass, true)} />;
}
