import Image from "next/image";
import Link from "next/link";
import sun from "@/assets/illustrations/sun.jpg";
import thoughts from "@/assets/illustrations/thoughts.jpg";
import { ExhibitionSlider } from "@/components/ExhibitionSlider";
import { PhoneLink } from "@/components/PhoneLink";
import { PostList } from "@/components/PostList";
import { panels } from "@/content/exhibition";
import { posts } from "@/content/posts";
import { quickAccess } from "@/content/support-services";

// Wege im Einstieg „Sie sind hier, weil …“.
// OFFEN: Formulierungen auf Basis der Broschüre, Textfreigabe durch den AG (Z-01)
const paths = [
  {
    reason: "Sie in Ihrer Beziehung verletzt, bedroht oder kontrolliert werden",
    target: "Selbstcheck und Hilfe",
    href: "/selbstcheck",
  },
  {
    reason: "Sie von Ihrem Ex-Partner verfolgt oder belästigt werden",
    target: "Anlaufstellen und Ihre Rechte",
    href: "/hilfe#stalking",
  },
  {
    reason: "Sie jemanden kennen, der Gewalt erlebt",
    target: "Hilfe für Angehörige und Freunde",
    href: "/hilfe#angehoerige",
  },
  {
    reason: "Sie helfen möchten oder sich informieren wollen",
    target: "Infos und Arbeitskreis",
    href: "/infos",
  },
];

export default function HomePage() {
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="entry wide" aria-labelledby="einstieg-titel">
        <div>
          <h1 id="einstieg-titel" className="entry__title">
            Sie sind hier, weil …
          </h1>
          <ul className="paths">
            {paths.map((path) => (
              <li key={path.href}>
                <Link href={path.href}>
                  <span className="paths__reason">{path.reason}</span>
                  <span className="paths__target">{path.target}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="entry__image">
          <Image src={sun} alt="" priority sizes="(min-width: 64em) 40vw, 100vw" />
        </div>
      </section>

      <div className="wide">
        <ul className="promises">
          <li>
            <strong>Vertraulich</strong>
            <span>Die Beraterinnen haben Schweigepflicht.</span>
          </li>
          <li>
            <strong>Kostenlos</strong>
            <span>Beratung und Schutz kosten Sie nichts.</span>
          </li>
          <li>
            <strong>Sie entscheiden</strong>
            <span>Niemand drängt Sie zu einem Schritt, den Sie nicht wollen.</span>
          </li>
        </ul>
      </div>

      <section className="section wide" aria-labelledby="sofort-titel">
        <div className="section__header">
          <h2 id="sofort-titel">Hier bekommen Sie sofort Hilfe</h2>
          <Link href="/hilfe" className="text-link">
            Alle Anlaufstellen im Kreis Höxter
          </Link>
        </div>
        <ul className="service-list">
          {quickAccess.map((service) => (
            <li key={service.id}>
              <span className="service-list__name">{service.quick?.label ?? service.name}</span>
              {service.quick && <span className="muted">{service.quick.note}</span>}
              <PhoneLink number={service.phones[0].number} className="service-list__number" />
            </li>
          ))}
        </ul>
      </section>

      <section className="band" aria-labelledby="selbstcheck-titel">
        <div className="band__inner wide">
          <div className="band__text stack">
            <h2 id="selbstcheck-titel">Gewalt hat viele Gesichter</h2>
            <p className="lead measure">
              Nicht jede Gewalt hinterlässt blaue Flecken. Kontrolle, Drohungen und Demütigungen gehören genauso dazu.
              Der Selbstcheck hilft Ihnen, Ihre Situation in Ruhe für sich zu hinterfragen.
            </p>
            <p className="privacy-note">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <rect x="4" y="9" width="12" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              Ihr Selbstcheck wird nicht gespeichert.
            </p>
            <p>
              <Link href="/selbstcheck" className="button">
                Zum Selbstcheck
              </Link>
            </p>
          </div>
          <div className="band__image">
            <Image src={thoughts} alt="" sizes="(min-width: 64em) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section wide" aria-labelledby="ausstellung-titel">
        <div className="section__header">
          <h2 id="ausstellung-titel">Die Wanderausstellung</h2>
        </div>
        <p className="lead measure" style={{ marginBlockEnd: "var(--space-5)" }}>
          „Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis
          Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren. Hier sehen Sie alle zwölf Tafeln.
        </p>
        <ExhibitionSlider panels={panels} />
      </section>

      <section className="section wide" aria-labelledby="aktuelles-titel">
        <div className="section__header">
          <h2 id="aktuelles-titel">Aktuelles</h2>
          <Link href="/aktuelles" className="text-link">
            Alle Beiträge
          </Link>
        </div>
        <PostList posts={latestPosts} headingLevel={3} />
      </section>
    </>
  );
}
