import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { toImg } from "@/lib/images";
import { Rich } from "@/lib/rich";

function FooterLink({ href, label }: { href: string; label: string }) {
  // Dateien (Download) sind normale Links, Seiten gehen über den Router
  return /^\/(downloads|dateien)\//.test(href) ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>;
}

export async function SiteFooter() {
  const { footer } = await getSite();
  const logo = toImg(footer.fundingLogo);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner wide">
        <div className="stack">
          <h2>{footer.organisation}</h2>
          <Rich value={footer.address} telClass={false} />
          <Rich value={footer.emergency} telClass={false} />
        </div>
        <nav aria-label="Service">
          <h2>Service</h2>
          <ul>
            {footer.serviceLinks.map((link) => (
              <li key={link.href}>
                <FooterLink {...link} />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Rechtliches">
          <h2>Rechtliches</h2>
          <ul>
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <FooterLink {...link} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__funding stack">
          <p>{footer.fundingLabel}</p>
          {logo && (
            <div className="funding-logo">
              <Image src={logo} alt={footer.fundingAlt} sizes="22rem" />
            </div>
          )}
          {footer.draftNote && <p className="draft-note">{footer.draftNote}</p>}
        </div>
      </div>
    </footer>
  );
}
