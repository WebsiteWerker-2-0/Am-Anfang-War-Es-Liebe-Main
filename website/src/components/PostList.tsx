import Link from "next/link";
import { dateParts, type Post } from "@/content/posts";

// Liste von Beiträgen mit Datumsspalte (Abschnitt 6.7)
export function PostList({ posts, headingLevel = 2 }: { posts: Post[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="post-list">
      {posts.map((post) => {
        const date = dateParts(post.date);
        return (
          <li key={post.slug}>
            <time className="date" dateTime={post.date}>
              <span className="date__day">{date.day}</span>
              <span className="date__month">{date.month}</span>
              <span className="date__year">{date.year}</span>
            </time>
            <div>
              <Heading>
                <Link href={`/aktuelles/${post.slug}`}>{post.title}</Link>
              </Heading>
              {post.excerpt && <p className="muted measure">{post.excerpt}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
