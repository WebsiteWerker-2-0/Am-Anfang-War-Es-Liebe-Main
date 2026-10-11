import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „sprachen“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("sprachen");

export default function LanguagesPage() {
  return <CmsPage slug="sprachen" />;
}
