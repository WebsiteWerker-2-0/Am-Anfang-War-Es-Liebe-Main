import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „kurse“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("kurse");

export default function CoursesPage() {
  return <CmsPage slug="kurse" />;
}
