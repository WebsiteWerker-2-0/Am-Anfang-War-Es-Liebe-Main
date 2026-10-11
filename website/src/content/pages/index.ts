import type { PageData } from "../model";
import { browsingTraces } from "./browsing-traces";
import { contact } from "./contact";
import { courses } from "./courses";
import { help } from "./help";
import { home } from "./home";
import { info } from "./info";
import { languages } from "./languages";
import { legalNotice } from "./legal-notice";
import { news } from "./news";
import { privacy } from "./privacy";
import { selfCheck } from "./self-check";
import { workingGroup } from "./working-group";

// Standardinhalt aller Seiten. Er ist die Vorlage für das CMS (Seeding) und die
// Ersatzanzeige, solange das CMS nicht erreichbar ist.
export const defaultPages: PageData[] = [
  home,
  help,
  selfCheck,
  news,
  courses,
  info,
  workingGroup,
  contact,
  browsingTraces,
  languages,
  legalNotice,
  privacy,
];

export const defaultPageBySlug = new Map(defaultPages.map((page) => [page.slug, page]));
