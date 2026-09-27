"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { hauptnavigation, sprachen } from "@/content/navigation";
import { NotausgangLink } from "./Notausgang";

function istAktiv(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function Kopf() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>

      {/* Reihenfolge im DOM: Notausgang, Sprachwahl, Hilfetelefon (Abschnitt 6.1) */}
      <div className="hilfeleiste">
        <div className="hilfeleiste__inner wide">
          <NotausgangLink />
          <nav className="hilfeleiste__sprachen" aria-label="Sprache">
            <ul>
              {sprachen.map((s) => (
                <li key={s.code}>
                  <a
                    href={s.href}
                    lang={s.code}
                    hrefLang={s.code}
                    dir={s.code === "ar" ? "rtl" : undefined}
                    aria-current={s.code === "de" && pathname !== "/sprachen" ? "true" : undefined}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="hilfeleiste__telefon">
            Hilfetelefon <a href="tel:116016">116&#8239;016</a>
            <span className="nur-breit">, rund um die Uhr</span>
          </p>
        </div>
      </div>

      <header className="kopf">
        <div className="kopf__inner wide">
          <Link href="/" className="logo">
            <span className="logo__titel">
              Am Anfang war es <span>Liebe …</span>
            </span>
            <span className="logo__zusatz">
              Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Hauptnavigation">
            <ul>
              {hauptnavigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={istAktiv(pathname, n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <details className="nav-mobil" ref={menu}>
            <summary>Menü</summary>
            <nav aria-label="Hauptnavigation">
              <ul>
                {hauptnavigation.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={istAktiv(pathname, n.href) ? "page" : undefined}
                      onClick={() => menu.current?.removeAttribute("open")}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
