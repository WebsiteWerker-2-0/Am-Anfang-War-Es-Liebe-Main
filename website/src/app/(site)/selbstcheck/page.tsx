import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „selbstcheck“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("selbstcheck");

export default function SelfCheckPage() {
  return <CmsPage slug="selbstcheck" />;
}
