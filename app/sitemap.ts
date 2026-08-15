import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { localizedAlternates, siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const staticEntries = locales.flatMap((locale) => ["", "/menu", "/gallery", "/news"].map((path) => ({ url: `${base}/${locale}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.8, alternates: { languages: localizedAlternates(path, locale).languages } })));
  const postGroups = await Promise.all(locales.map(async (locale) => ({ locale, posts: await getPosts(locale) })));
  return [...staticEntries, { url: `${base}/vi/lounge-quan-5`, changeFrequency: "monthly" as const, priority: 0.9 }, ...postGroups.flatMap(({ locale, posts }) => posts.map((post) => ({ url: `${base}/${locale}/news/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: localizedAlternates(`/news/${post.slug}`, locale).languages } })) )];
}
