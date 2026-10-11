import { Fragment, createElement, type ReactNode } from "react";

// Wandelt den einfachen HTML-Standardinhalt (Absatz, Zwischenüberschrift, Liste, fett,
// kursiv, Link, Zeilenumbruch) in React-Elemente um, mit denselben Klassen, die
// auch die Darstellung des CMS-Textes (lib/rich.tsx) vergibt. So entstehen echte
// Geschwisterelemente ohne Hülle, auf die die Abstände der Website (.stack) wirken.

type Node = { tag: string; attrs: Record<string, string>; children: Node[] } | string;

const VOID = new Set(["br"]);
const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };

function decode(text: string) {
  return text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity);
}

function parse(html: string): Node[] {
  const root: Node = { tag: "root", attrs: {}, children: [] };
  const stack: Exclude<Node, string>[] = [root];
  const token = /<(\/?)([a-z0-9]+)([^>]*?)(\/?)>|([^<]+)/gi;
  for (const match of html.matchAll(token)) {
    const [, closing, tag, rawAttrs, selfClosing, text] = match;
    const current = stack[stack.length - 1];
    if (text !== undefined) {
      // Zeilenumbrüche zwischen Absätzen im Quelltext sind Formatierung, kein Text
      if (!/^\s*\n\s*$/.test(text)) current.children.push(decode(text));
    } else if (closing) {
      if (stack.length > 1) stack.pop();
    } else {
      const attrs: Record<string, string> = {};
      for (const attr of rawAttrs.matchAll(/([a-z-]+)="([^"]*)"/gi)) attrs[attr[1]] = decode(attr[2]);
      const node = { tag: tag.toLowerCase(), attrs, children: [] as Node[] };
      current.children.push(node);
      if (!VOID.has(node.tag) && !selfClosing) stack.push(node);
    }
  }
  return root.children;
}

function render(nodes: Node[], parentTag: string, telClass: boolean): ReactNode[] {
  return nodes.map((node, index) => {
    if (typeof node === "string") return node;
    const children = render(node.children, node.tag, telClass);
    switch (node.tag) {
      case "ul":
        return createElement("ul", { key: index, className: "list-bullets" }, children);
      case "ol":
        return createElement("ol", { key: index, className: "list-steps" }, children);
      case "li":
        // Nummerierte Schritte stehen in einer Zeile mit Zähler, daher span (siehe globals.css)
        return createElement("li", { key: index }, parentTag === "ol" ? createElement("span", null, children) : children);
      case "a": {
        const href = node.attrs.href ?? "";
        const props: Record<string, string | undefined> = { key: String(index), href };
        if (href.startsWith("tel:") && telClass) props.className = "tel";
        if (/^https?:/.test(href)) props.rel = "noreferrer";
        return createElement("a", props, children);
      }
      case "br":
        return createElement("br", { key: index });
      default:
        return createElement(node.tag, { key: index }, children);
    }
  });
}

export function htmlToJsx(html: string, options: { telClass?: boolean } = {}): ReactNode {
  return createElement(Fragment, null, render(parse(html), "root", options.telClass ?? true));
}

/** Nur der Inhalt des ersten Absatzes, für Zeilen in Hinweiskästen und Kleingedrucktem */
export function htmlToInlineJsx(html: string, options: { telClass?: boolean } = {}): ReactNode {
  const first = parse(html).find((node) => typeof node !== "string" && node.tag === "p");
  const children = first && typeof first !== "string" ? first.children : parse(html);
  return createElement(Fragment, null, render(children, "p", options.telClass ?? true));
}
