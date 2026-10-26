"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import type { SiteData } from "@/content/model";
import { QuickExitLink } from "./QuickExit";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function NavigationList({
  items,
  pathname,
  onNavigate,
}: {
  items: SiteData["navigation"];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({ site }: { site: Pick<SiteData, "navigation" | "languages" | "helpline"> }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>

      {/* Hilfeleiste. Reihenfolge im DOM: Notausgang, Sprachwahl, Hilfetelefon (Abschnitt 6.1) */}
      <div className="help-bar">
        <div className="help-bar__inner wide">
          <QuickExitLink />
          <nav className="help-bar__languages" aria-label="Sprache">
            <ul>
              {site.languages.map((language) => (
                <li key={language.code}>
                  <a
                    href={language.href}
                    lang={language.code}
                    hrefLang={language.code}
                    dir={language.code === "ar" ? "rtl" : undefined}
                    aria-current={language.code === "de" && pathname !== "/sprachen" ? "true" : undefined}
                  >
                    {language.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="help-bar__phone">
            Hilfetelefon{" "}
            <a href={`tel:${site.helpline.number.replace(/[^\d+]/g, "")}`}>{site.helpline.number.replace(/ /g, "\u202f")}</a>
            {/* Teal heißt im Theme „erreichbar“: der Hinweis steht als Marke neben der Nummer */}
            {site.helpline.suffix && (
              <span className="tag tag--in wide-only">{site.helpline.suffix.replace(/^,\s*/, "")}</span>
            )}
          </p>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__inner wide">
          <Link href="/" className="logo">
            <span className="logo__title">
              Am Anfang war es <span>Liebe …</span>
            </span>
            <span className="logo__subtitle">Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter</span>
          </Link>

          <nav className="nav-desktop" aria-label="Hauptnavigation">
            <NavigationList items={site.navigation} pathname={pathname} />
          </nav>

          <details className="nav-mobile" ref={mobileMenu}>
            <summary>Menü</summary>
            <nav aria-label="Hauptnavigation">
              <NavigationList
                items={site.navigation}
                pathname={pathname}
                onNavigate={() => mobileMenu.current?.removeAttribute("open")}
              />
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
