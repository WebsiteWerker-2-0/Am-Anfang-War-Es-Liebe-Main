import type { SupportService } from "@/content/support-services";
import { PhoneLink } from "./PhoneLink";

// Eine Anlaufstelle. Feste Reihenfolge der Daten: Name, Träger, Telefon,
// Erreichbarkeit, Adresse, E-Mail, Website (Abschnitt 6.4)
export function SupportServiceSection({ service, level = 2 }: { service: SupportService; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  const headingId = `anlaufstelle-${service.id}`;

  return (
    <section className="service" aria-labelledby={headingId} id={service.id}>
      <Heading id={headingId}>{service.question ?? service.name}</Heading>
      {service.question && <p className="service__name">{service.name}</p>}
      <dl className="facts">
        {service.provider && (
          <>
            <dt>Träger</dt>
            <dd>{service.provider}</dd>
          </>
        )}
        <dt>Telefon</dt>
        <dd>
          <ul>
            {service.phones.map((phone) => (
              <li key={phone.number}>
                {phone.label && <>{phone.label}: </>}
                <PhoneLink number={phone.number} />
                {phone.note && <span className="muted"> ({phone.note})</span>}
              </li>
            ))}
          </ul>
        </dd>
        {service.availability && (
          <>
            <dt>Erreichbarkeit</dt>
            <dd>{service.availability}</dd>
          </>
        )}
        {service.addresses && (
          <>
            <dt>{service.addresses.length > 1 ? "Standorte" : "Adresse"}</dt>
            <dd>
              <ul>
                {service.addresses.map((address) => (
                  <li key={address}>{address}</li>
                ))}
              </ul>
            </dd>
          </>
        )}
        {service.email && (
          <>
            <dt>E-Mail</dt>
            <dd>
              <a href={`mailto:${service.email}`}>{service.email}</a>
            </dd>
          </>
        )}
        {service.website && (
          <>
            <dt>Website</dt>
            <dd>
              <a href={service.website.url} rel="noreferrer">
                {service.website.label}
              </a>
            </dd>
          </>
        )}
      </dl>
      {service.description && <p className="measure">{service.description}</p>}
      {service.offers && (
        <div className="measure service__offers">
          <p>Die Beraterinnen bieten:</p>
          <ul className="list-bullets">
            {service.offers.map((offer) => (
              <li key={offer}>{offer}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
