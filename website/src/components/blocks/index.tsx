import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { CalloutBlock, PageBlock, SectionItem } from "@/content/model";
import { QUICK_EXIT_HINTS } from "@/content/navigation";
import { TEXTS } from "@/content/self-check-tree";
import { toImg } from "@/lib/images";
import { getArchivedPosts, getCourseOffers, getMembers, getPosts, getPublicCourses, getServices, getSite } from "@/lib/content";
import { Rich, RichInline } from "@/lib/rich";
import { ContactForm } from "../ContactForm";
import { CourseList } from "../CourseList";
import { ExhibitionSlider } from "../ExhibitionSlider";
import { PhoneLink } from "../PhoneLink";
import { PostList } from "../PostList";
import { QuickExitLink } from "../QuickExit";
import { SelfCheck } from "../SelfCheck";
import { newsPageHref, newsPaging, PER_PAGE_OPTIONS, type NewsPaging, type NewsPagingParams } from "@/lib/news-paging";
import { OpenDetailsOnHash } from "../OpenDetailsOnHash";
import { SupportServiceSection } from "../SupportService";

// Darstellung der Seitenblöcke (content/model.ts). Das Markup entspricht den früheren
// handgeschriebenen Seiten, damit Gestaltung und Abstände (globals.css) unverändert gelten.

function cx(...names: (string | false | undefined)[]) {
  return names.filter(Boolean).join(" ") || undefined;
}

export function Callout({ block }: { block: CalloutBlock }) {
  if (block.kind === "emergency") {
    return (
      <div className="emergency measure" role="note">
        <p>
          <RichInline value={block.content} />
        </p>
        {block.number && <PhoneLink number={block.number} className="emergency__number" />}
      </div>
    );
  }
  return (
    <p className={cx("notice", block.small && "small", block.measure && "measure")}>
      <RichInline value={block.content} />
    </p>
  );
}

async function Facts({ entries }: { entries: Extract<SectionItem, { blockType: "facts" }>["entries"] }) {
  const site = await getSite();
  return (
    <dl className="facts">
      {entries.map((entry, index) => {
        const mailbox = entry.mailbox ? site.mailboxes[entry.mailbox] : undefined;
        return (
          <Fragment key={index}>
            <dt>{entry.term || mailbox?.label}</dt>
            <dd>
              {entry.value}
              {entry.phone && <PhoneLink number={entry.phone} />}
              {mailbox && <a href={`mailto:${mailbox.email}`}>{mailbox.email}</a>}
              {entry.note && (
                <>
                  {(mailbox || entry.value || entry.phone) && <br />}
                  <span className="small muted">{entry.note}</span>
                </>
              )}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
}

function SectionItemView({ item }: { item: SectionItem }) {
  switch (item.blockType) {
    case "rich":
      return <Rich value={item.content} />;
    case "lead":
      return <p className="lead">{item.text}</p>;
    case "note":
      return (
        <p className="small muted">
          <RichInline value={item.content} />
        </p>
      );
    case "callout":
      return <Callout block={item} />;
    case "button":
      return (
        <p>
          <Link href={item.href} className="button">
            {item.label}
          </Link>
        </p>
      );
    case "facts":
      return <Facts entries={item.entries} />;
    case "definitions":
      return (
        <dl className="stack">
          {item.entries.map((entry, index) => (
            <div key={index}>
              <dt>
                <strong>{entry.term}</strong>
              </dt>
              <dd>{entry.text}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

type Block<T extends PageBlock["blockType"]> = Extract<PageBlock, { blockType: T }>;

function Section({ block }: { block: Block<"section"> }) {
  const items = block.items.map((item, index) => <SectionItemView key={index} item={item} />);
  const Heading = block.headingLevel === 3 ? "h3" : "h2";
  const heading = block.heading ? <Heading id={block.anchor}>{block.heading}</Heading> : null;

  if (block.variant === "plain") {
    return (
      <>
        {heading}
        {items}
      </>
    );
  }
  if (block.variant === "service" && block.collapsible) {
    return (
      <details className="group" id={block.sectionId} open={block.collapsible === "open"}>
        <summary>
          <h3 id={block.anchor}>{block.heading}</h3>
        </summary>
        <div className="group__content measure stack">{items}</div>
      </details>
    );
  }
  if (block.variant === "service") {
    return (
      <section className="service" id={block.sectionId} aria-labelledby={block.anchor}>
        {heading}
        <div className="measure stack">{items}</div>
      </section>
    );
  }
  return (
    <section
      className="measure stack"
      id={block.sectionId}
      aria-labelledby={block.heading ? block.anchor : undefined}
      aria-label={block.heading ? undefined : block.ariaLabel}
    >
      {heading}
      {items}
    </section>
  );
}

async function SupportServices() {
  const { main } = await getServices();
  return (
    <div>
      {main.map((service) => (
        <SupportServiceSection key={service.id} service={service} level={3} collapseOffers />
      ))}
    </div>
  );
}

async function ServiceGroups({ block }: { block: Block<"serviceGroups"> }) {
  const { groups } = await getServices();
  return (
    <section aria-labelledby={block.heading ? block.anchor : undefined}>
      {block.heading && (
        <h2 id={block.anchor} style={{ marginBlockEnd: "var(--space-4)" }}>
          {block.heading}
        </h2>
      )}
      {groups.map((group) => (
        <details className="group" key={group.title}>
          <summary>{group.title}</summary>
          <div className="group__content">
            {group.services.map((service) => (
              <SupportServiceSection key={service.id} service={service} level={3} />
            ))}
          </div>
        </details>
      ))}
      {block.note && (
        <p className="small muted measure" style={{ marginBlockStart: "var(--space-5)" }}>
          {block.note}
        </p>
      )}
    </section>
  );
}

function DocumentList({ block }: { block: Block<"documentList"> }) {
  return (
    <section aria-labelledby={block.anchor}>
      <h2 id={block.anchor} style={{ marginBlockEnd: "var(--space-4)" }}>
        {block.heading}
      </h2>
      <ul className="documents">
        {block.items.map((doc, index) => (
          <li key={index}>
            <a href={doc.file} download>
              {doc.title}
            </a>
            {doc.meta && <span className="small muted">{doc.meta}</span>}
          </li>
        ))}
      </ul>
      {block.note && (
        <p className="small muted measure" style={{ marginBlockStart: "var(--space-4)" }}>
          <RichInline value={block.note} />
        </p>
      )}
    </section>
  );
}

function TopicLinks({ block }: { block: Block<"topicLinks"> }) {
  return (
    <section aria-labelledby={block.anchor}>
      <h2 id={block.anchor} style={{ marginBlockEnd: "var(--space-4)" }}>
        {block.heading}
      </h2>
      <ul className="documents">
        {block.topics.map((topic, index) => (
          <li key={index}>
            <span>{topic.title}</span>
            <span>
              {topic.links.map((link, linkIndex) => (
                <span key={linkIndex}>
                  {linkIndex > 0 && " · "}
                  <a href={link.url} rel="noreferrer">
                    {link.label}
                  </a>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function MemberListBlock({ block }: { block: Block<"memberList"> }) {
  const people = await getMembers();
  return <PeopleList block={{ blockType: "peopleList", anchor: block.anchor, heading: block.heading, people }} />;
}

function PeopleList({ block }: { block: Block<"peopleList"> }) {
  return (
    <section aria-labelledby={block.anchor}>
      <h2 id={block.anchor} style={{ marginBlockEnd: "var(--space-4)" }}>
        {block.heading}
      </h2>
      <ul className="people">
        {block.people.map((person, index) => (
          <li key={index}>
            <strong>
              {person.url ? (
                <a href={person.url} rel="noreferrer">
                  {person.name}
                </a>
              ) : (
                person.name
              )}
            </strong>
            {person.role && (
              <>
                <br />
                <span className="muted">{person.role}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Campaign({ block }: { block: Block<"campaign"> }) {
  const poster = toImg(block.poster);
  return (
    <section className="campaign" aria-labelledby={block.anchor}>
      <div className="stack">
        <h2 id={block.anchor}>{block.heading}</h2>
        {block.lead && <p className="lead">{block.lead}</p>}
        <Rich value={block.body} />
        {block.download?.file && (
          <p>
            <a href={block.download.file} download>
              {block.download.label}
            </a>{" "}
            {block.download.meta && <span className="small muted">{block.download.meta}</span>}
          </p>
        )}
      </div>
      {poster && (
        <Image src={poster} alt={block.posterAlt ?? ""} sizes="(min-width: 64em) 22rem, 100vw" className="campaign__poster" />
      )}
    </section>
  );
}

function Photo({ block }: { block: Block<"photo"> }) {
  const image = toImg(block.image);
  if (!image) return null;
  return (
    <figure className="photo">
      <Image
        src={image}
        alt={block.alt ?? ""}
        sizes="(min-width: 72rem) 72rem, 100vw"
        placeholder={image.blurDataURL ? "blur" : undefined}
      />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function LanguageVersions({ block }: { block: Block<"languageVersions"> }) {
  return (
    <>
      {block.versions.map((version) => (
        <section
          key={version.code}
          id={version.code}
          lang={version.code}
          dir={version.direction}
          className="language measure stack"
        >
          <h2>{version.title}</h2>
          <p>{version.text}</p>
          <p>
            {version.helplineLabel}{" "}
            <a href="tel:116016" className="tel" dir="ltr">
              116&#8239;016
            </a>
          </p>
          <p>
            {version.emergencyLabel}{" "}
            <a href="tel:110" className="tel" dir="ltr">
              110
            </a>
          </p>
          <p>
            <QuickExitLink label={version.exitLabel} lang={version.code} />
          </p>
          {QUICK_EXIT_HINTS[version.code] && <p className="small">{QUICK_EXIT_HINTS[version.code]}</p>}
        </section>
      ))}
    </>
  );
}

function Exhibition({ block }: { block: Block<"exhibition"> }) {
  const panels = block.panels.flatMap((panel) => {
    const image = toImg(panel.image);
    return image ? [{ image, title: panel.title }] : [];
  });
  return (
    <section className="section wide" aria-labelledby={block.anchor}>
      <div className="section__header">
        <h2 id={block.anchor}>{block.heading}</h2>
      </div>
      {block.intro && (
        <p className="lead measure" style={{ marginBlockEnd: "var(--space-5)" }}>
          {block.intro}
        </p>
      )}
      <ExhibitionSlider panels={panels} />
      {block.booking && (
        <p className="measure" style={{ marginBlockStart: "var(--space-5)" }}>
          {block.booking.text} <a href={`mailto:${block.booking.email}`}>{block.booking.email}</a>
        </p>
      )}
    </section>
  );
}

async function CourseListBlock({ block }: { block: Block<"courseList"> }) {
  const courses = await getPublicCourses();
  // Ohne veröffentlichte Kurse steht der Hinweis, wie früher. Die Liste lädt neue Kurse selbst nach.
  const empty = <Callout block={{ blockType: "callout", kind: "notice", measure: true, content: block.emptyNotice }} />;
  return <CourseList initial={courses} heading={block.heading} anchor={block.anchor} empty={empty} />;
}

// Wegweiser: große Links mit kurzer Erklärung, wie „Sie sind hier, weil …“ auf der Startseite
function LinkHub({ block }: { block: Block<"linkHub"> }) {
  return (
    <nav aria-label={block.ariaLabel} className="measure">
      <ul className="paths">
        {block.items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span className="paths__reason">{item.label}</span>
              {item.note && <span className="paths__target">{item.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Grafiken (z. B. Rad der Gewalt): Vorschau in fester Breite, ein Klick öffnet die Datei in voller Größe
function Graphics({ block }: { block: Block<"graphics"> }) {
  return (
    <section aria-labelledby={block.anchor}>
      <h2 id={block.anchor} style={{ marginBlockEnd: "var(--space-4)" }}>
        {block.heading}
      </h2>
      <div className="graphics">
        {block.items.map((item) => {
          const image = toImg(item.image);
          return (
            <figure key={item.file}>
              <a href={item.file}>
                {image && <Image src={image} alt={item.alt} sizes="(min-width: 40em) 22rem, 100vw" />}
              </a>
              <figcaption>
                <a href={item.file} download>
                  „{item.title}“ herunterladen
                </a>
                {item.meta && <span className="small muted"> ({item.meta})</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

// Kurse aus dem Backend: Sprungmarken zu jedem Kurs, dann je Kurs ein Abschnitt (Gestaltung wie Anlaufstellen)
async function CourseOffersBlock({ block }: { block: Block<"courseOffers"> }) {
  const offers = await getCourseOffers();
  // Übersicht wie Aktuelles: Name und Kurzfassung, der ganze Text steht auf der Seite des Kurses
  return (
    <>
      <ul className="post-list post-list--plain">
        {offers.map((offer) => (
          <li key={offer.slug}>
            <div>
              <h2>
                <Link href={`/kurse/${offer.slug}`}>{offer.title}</Link>
              </h2>
              {offer.excerpt && <p className="muted measure">{offer.excerpt}</p>}
            </div>
          </li>
        ))}
      </ul>
      {block.datesLink && (
        <p>
          <Link className="button" href={block.datesLink.href}>
            {block.datesLink.label}
          </Link>
        </p>
      )}
    </>
  );
}

function NewsPager({ paging, total }: { paging: NewsPaging; total: number }) {
  return (
    <nav className="news-pager" aria-label="Weitere Seiten mit Beiträgen">
      {paging.page > 1 ? (
        <Link href={newsPageHref(paging.perPage, paging.page - 1)}>Zurück</Link>
      ) : (
        <span />
      )}
      <span>
        Seite {paging.page} von {paging.pageCount} ({total} Beiträge)
      </span>
      {paging.page < paging.pageCount ? (
        <Link href={newsPageHref(paging.perPage, paging.page + 1)}>Weiter</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function NewsPerPage({ perPage }: { perPage: number }) {
  return (
    <nav className="news-per-page" aria-label="Anzahl der Beiträge pro Seite">
      <span>Beiträge pro Seite:</span>
      {PER_PAGE_OPTIONS.map((option) => (
        <Link key={option} href={newsPageHref(option, 1)} aria-current={option === perPage ? "true" : undefined}>
          {option}
        </Link>
      ))}
    </nav>
  );
}

async function NewsList({ block, newsParams }: { block: Block<"newsList">; newsParams?: NewsPagingParams }) {
  const posts = await getPosts();
  if (block.variant === "page") {
    const archived = await getArchivedPosts();
    const paging = newsPaging(posts.length, newsParams);
    // Die Auswahl erscheint erst, wenn die Beiträge nicht mehr auf eine Seite passen
    const paged = posts.length > PER_PAGE_OPTIONS[0];
    return (
      <>
        <div id="beitraege" className="news-list">
          {paged && <NewsPerPage perPage={paging.perPage} />}
          <PostList posts={posts.slice(paging.start, paging.end)} />
          {paged && paging.pageCount > 1 && <NewsPager paging={paging} total={posts.length} />}
        </div>
        {archived.length > 0 && (
          // Archivierte Beiträge: eingeklappt am Ende der Seite
          <details className="group archive">
            <summary>Archiv ({archived.length})</summary>
            <div className="group__content">
              <PostList posts={archived} headingLevel={3} />
            </div>
          </details>
        )}
      </>
    );
  }
  return (
    <section className="section wide" aria-labelledby={block.anchor}>
      <div className="section__header">
        <h2 id={block.anchor}>{block.heading}</h2>
        <Link href="/aktuelles" className="text-link">
          {block.linkLabel}
        </Link>
      </div>
      <PostList posts={posts.slice(0, block.count ?? 3)} headingLevel={3} />
    </section>
  );
}

function Entry({ block }: { block: Block<"entry"> }) {
  const image = toImg(block.image);
  return (
    <section className="entry wide" aria-labelledby="einstieg-titel">
      <div>
        <h1 id="einstieg-titel" className="entry__title">
          {block.title}
        </h1>
        <ul className="paths">
          {block.paths.map((path, index) => (
            <li key={index}>
              <Link href={path.href}>
                <span className="paths__reason">{path.reason}</span>
                <span className="paths__target">{path.target}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {image && (
        <div className="entry__image">
          <Image src={image} alt="" priority sizes="(min-width: 64em) 40vw, 100vw" />
        </div>
      )}
    </section>
  );
}

function Promises({ block }: { block: Block<"promises"> }) {
  return (
    <div className="wide">
      <ul className="promises">
        {block.items.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function QuickAccess({ block }: { block: Block<"quickAccess"> }) {
  const { quick } = await getServices();
  return (
    <section className="section wide" aria-labelledby={block.anchor}>
      <div className="section__header">
        <h2 id={block.anchor}>{block.heading}</h2>
        <Link href={block.linkUrl} className="text-link">
          {block.linkLabel}
        </Link>
      </div>
      <ul className="service-list">
        {quick.map((service) => (
          <li key={service.id}>
            <span className="service-list__name">{service.quick?.label ?? service.name}</span>
            {service.quick && <span className="muted">{service.quick.note}</span>}
            <span className="service-list__number">
              {service.phones.slice(0, service.quick?.phoneCount ?? 1).map((phone, index) => (
                <span key={phone.number}>
                  {index > 0 && <br />}
                  <PhoneLink number={phone.number} className="" />
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="4" y="9" width="12" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Der Selbstcheck steht auf einem eigenen Band in Cyan, wie das Band „Gewalt hat viele Gesichter“
// auf der Startseite, von dem man herkommt. Die Illustration hat denselben Grund.
function SelfCheckStage({ block }: { block: Block<"selfCheck"> }) {
  const image = toImg({ asset: "illustrations/thoughts" });
  return (
    <section className="self-check-stage" aria-label="Selbstcheck">
      <div className="self-check-stage__inner">
        <div className="self-check-stage__main stack">
          <p className="privacy-note">
            <LockIcon />
            {TEXTS.privacyNote}
          </p>
          <SelfCheck legend={block.legend} statements={block.statements.map((statement) => statement.text)} />
        </div>
        {image && (
          <div className="self-check-stage__image">
            <Image src={image} alt="" sizes="(min-width: 64em) 24rem, 0px" />
          </div>
        )}
      </div>
    </section>
  );
}

function TeaserBand({ block }: { block: Block<"teaserBand"> }) {
  const image = toImg(block.image);
  return (
    <section className="band" aria-labelledby={block.anchor}>
      <div className="band__inner wide">
        <div className="band__text stack">
          <h2 id={block.anchor}>{block.heading}</h2>
          <p className="lead measure">{block.lead}</p>
          {block.privacyNote && (
            <p className="privacy-note">
              <LockIcon />
              {block.privacyNote}
            </p>
          )}
          <p>
            <Link href={block.buttonUrl} className="button">
              {block.buttonLabel}
            </Link>
          </p>
        </div>
        {image && (
          <div className="band__image">
            <Image src={image} alt="" sizes="(min-width: 64em) 50vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}

function Chapter({ block }: { block: Block<"chapter"> }) {
  return (
    <section className="chapter" aria-labelledby={block.anchor}>
      <h2 className="chapter__title" id={block.anchor}>
        {block.heading}
      </h2>
      <PageBlocks blocks={block.blocks} />
      <OpenDetailsOnHash />
    </section>
  );
}

export function PageBlocks({ blocks, newsParams }: { blocks: PageBlock[]; newsParams?: NewsPagingParams }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "section":
            return <Section key={index} block={block} />;
          case "callout":
            return <Callout key={index} block={block} />;
          case "chapter":
            return <Chapter key={index} block={block} />;
          case "supportServices":
            return <SupportServices key={index} />;
          case "serviceGroups":
            return <ServiceGroups key={index} block={block} />;
          case "documentList":
            return <DocumentList key={index} block={block} />;
          case "topicLinks":
            return <TopicLinks key={index} block={block} />;
          case "peopleList":
            return <PeopleList key={index} block={block} />;
          case "campaign":
            return <Campaign key={index} block={block} />;
          case "photo":
            return <Photo key={index} block={block} />;
          case "selfCheck":
            return <SelfCheckStage key={index} block={block} />;
          case "contactForm":
            return (
              <section key={index} className="stack" aria-labelledby={block.anchor}>
                <h2 id={block.anchor}>{block.heading}</h2>
                <ContactForm concerns={block.concerns} />
              </section>
            );
          case "languageVersions":
            return <LanguageVersions key={index} block={block} />;
          case "exhibition":
            return <Exhibition key={index} block={block} />;
          case "courseList":
            return <CourseListBlock key={index} block={block} />;
          case "courseOffers":
            return <CourseOffersBlock key={index} block={block} />;
          case "memberList":
            return <MemberListBlock key={index} block={block} />;
          case "linkHub":
            return <LinkHub key={index} block={block} />;
          case "graphics":
            return <Graphics key={index} block={block} />;
          case "newsList":
            return <NewsList key={index} block={block} newsParams={newsParams} />;
          case "entry":
            return <Entry key={index} block={block} />;
          case "promises":
            return <Promises key={index} block={block} />;
          case "quickAccess":
            return <QuickAccess key={index} block={block} />;
          case "teaserBand":
            return <TeaserBand key={index} block={block} />;
        }
      })}
    </>
  );
}
