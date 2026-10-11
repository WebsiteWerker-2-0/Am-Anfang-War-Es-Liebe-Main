import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Rich } from "@/content/model";
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
