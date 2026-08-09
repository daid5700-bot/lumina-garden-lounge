import Image from "next/image";
import Link from "next/link";
import type { PublicPost } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";

type NewsArticleListProps = {
  locale: Locale;
  posts: PublicPost[];
};

export function NewsArticleList({ locale, posts }: NewsArticleListProps) {
  const copy = legacyCopy[locale];

  return (
    <div className="news-wrapper">
      {posts.map((post, index) => (
        <article className={`news-article${index % 2 ? " even" : ""}`} data-aos="fade-up" key={post.id}>
          <Link href={`/${locale}/news/${post.slug}`} className="news-img-box" aria-label={post.title}>
            <div className="news-img-inner">
              <Image src={post.coverImage} alt={post.title} width={960} height={620} sizes="(max-width: 992px) 82vw, 42vw" />
            </div>
          </Link>
          <div className="news-content">
            <h3><Link href={`/${locale}/news/${post.slug}`}>{post.title}</Link></h3>
            <p>{post.excerpt}</p>
            <Link href={`/${locale}/news/${post.slug}`} className="btn-rect">{copy.readMore}</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
