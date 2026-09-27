import Link from "next/link";
import { PhoneLink } from "./PhoneLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner wide">
        <div className="stack">
          <h2>Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“</h2>
          <p>
            c/o Gleichstellungsbeauftragte des Kreises Höxter
            <br />
            Moltkestraße 12, 37671 Höxter
            <br />
            Telefon <PhoneLink number="05271 9659904" className="" />
          </p>
          <p>
            Im Notfall: Polizei <PhoneLink number="110" className="" /> · Hilfetelefon{" "}
            <PhoneLink number="116 016" className="" />
          </p>
        </div>
        <nav aria-label="Service">
          <h2>Service</h2>
          <ul>
            <li>
              <Link href="/internetspuren">Internetspuren löschen</Link>
            </li>
            <li>
              <Link href="/kontakt">Kontakt</Link>
            </li>
            <li>
              <a href="/downloads/broschuere-am-anfang-war-es-liebe-2016.pdf">Broschüre (PDF)</a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Rechtliches">
          <h2>Rechtliches</h2>
          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
          </ul>
        </nav>
        <div className="site-footer__funding stack">
          {/* Förderhinweis. OFFEN: Logo gemäß Fördervorgaben (Z-11) */}
          <span className="logo-placeholder">Logo MKJFGFI NRW (folgt)</span>
          <p>
            Gefördert vom Ministerium für Kinder, Jugend, Familie, Gleichstellung, Flucht und Integration des Landes
            Nordrhein-Westfalen.
          </p>
          <p className="draft-note">
            Entwurf, Stand 27.09.2026. Inhalte und Gestaltung sind noch nicht freigegeben. Illustrationen: fien-design,
            Höxter.
          </p>
        </div>
      </div>
    </footer>
  );
}
