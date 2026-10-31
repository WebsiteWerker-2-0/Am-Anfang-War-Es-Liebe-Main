import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „aktuelles“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("aktuelles");

export default async function NewsPage({ searchParams }: PageProps<"/aktuelles">) {
  return <CmsPage slug="aktuelles" newsParams={await searchParams} />;
}
