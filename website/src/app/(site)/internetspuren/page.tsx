import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „internetspuren“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("internetspuren");

export default function BrowsingTracesPage() {
  return <CmsPage slug="internetspuren" />;
}
