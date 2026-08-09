import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";
import { getSiteContent } from "@/lib/content";
import { sectionMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = await getSiteContent(locale);
  const description = locale === "vi" ? "Tin tức, lịch sự kiện và ưu đãi mới nhất tại 909 Lumina Garden Lounge." : locale === "en" ? "News, event updates and offers from 909 Lumina Garden Lounge." : site.translation.seoDescription;
  return sectionMetadata({ locale, path: "/news", title: legacyCopy[locale].newsPage, description, image: site.heroImage });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const posts = await getPosts(locale);
  const copy = legacyCopy[locale];

  return (
    <div className="legacy-news-page">
      <h1 className="page-header-title glow-text-cyan" data-aos="fade-down">{copy.newsPage}</h1>
      <div className="news-wrapper">
        {posts.slice(0, 3).map((post, index) => (
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
      <div className="legacy-page-spacer" />
    </div>
  );
}
