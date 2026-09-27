import type { Metadata } from "next";
import band from "@/assets/illustrations/band-p15.jpg";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: "Aktionen, Ausstellungen und Beiträge des Arbeitskreises gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader title="Aktuelles" band={band} intro="Aktionen, Ausstellungen und Beiträge des Arbeitskreises." />
      <div className="wide">
        <PostList posts={posts} />
      </div>
    </>
  );
}
