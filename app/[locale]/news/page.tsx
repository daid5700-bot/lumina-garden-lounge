import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleList } from "@/components/public/NewsArticleList";
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
      <NewsArticleList locale={locale} posts={posts} />
      <div className="legacy-page-spacer" />
    </div>
  );
}
