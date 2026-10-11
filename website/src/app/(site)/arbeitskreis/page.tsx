import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „arbeitskreis“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("arbeitskreis");

export default function WorkingGroupPage() {
  return <CmsPage slug="arbeitskreis" />;
}
