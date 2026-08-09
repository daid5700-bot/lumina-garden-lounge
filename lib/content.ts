import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n";
import {
  defaultCategories,
  defaultGallery,
  defaultMenuItems,
  defaultMenuPages,
  defaultPosts,
  siteBase,
  siteTranslations,
  type SiteContent
} from "@/lib/default-content";

export type PublicMenuCategory = { id: string; slug: string; name: string; sortOrder: number };
export type PublicMenuItem = { id: string; categoryId: string; name: string; description: string; image: string | null; price: number; currency: string; featured: boolean; sortOrder: number };
export type PublicGalleryItem = { id: string; image: string; title: string; alt: string; sortOrder: number };
export type PublicPost = { id: string; slug: string; coverImage: string; title: string; excerpt: string; content: string; publishedAt: string; featured: boolean; metaTitle?: string | null; metaDescription?: string | null };

export const getSiteContent = cache(async (locale: Locale): Promise<SiteContent> => {
  if (!process.env.DATABASE_URL) return { ...siteBase, translation: siteTranslations[locale] };
  try {
    const site = await prisma.siteSetting.findUnique({
      where: { id: "main" },
      include: { translations: { where: { locale }, take: 1 } }
    });
    const translation = site?.translations[0];
    if (!site || !translation) return { ...siteBase, translation: siteTranslations[locale] };
    return {
      id: site.id,
      siteName: site.siteName,
      logoImage: site.logoImage,
      heroImage: site.heroImage,
      heroVideo: site.heroVideo,
      phone: site.phone,
      zalo: site.zalo,
      messenger: site.messenger,
      email: site.email,
      address: site.address,
      mapUrl: site.mapUrl,
      openingHours: site.openingHours,
      facebook: site.facebook,
      instagram: site.instagram,
      translation
    };
  } catch (error) {
    console.error("Using fallback site content:", error);
    return { ...siteBase, translation: siteTranslations[locale] };
  }
});

export const getMenu = cache(async (locale: Locale): Promise<{ categories: PublicMenuCategory[]; items: PublicMenuItem[]; pages: { id: string; image: string; alt: string; sortOrder: number }[] }> => {
  const fallback = {
    categories: defaultCategories.map((category) => ({ ...category, name: category.name[locale] })),
    items: defaultMenuItems.map((item) => ({ ...item, name: item.name[locale], description: item.description[locale], currency: "VND" })),
    pages: defaultMenuPages
  };
  if (!process.env.DATABASE_URL) return fallback;
  try {
    const [categories, items, pages] = await Promise.all([
      prisma.menuCategory.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { translations: { where: { locale }, take: 1 } } }),
      prisma.menuItem.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { translations: { where: { locale }, take: 1 } } }),
      prisma.menuPage.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } })
    ]);
    if (!categories.length || !items.length) return fallback;
    return {
      categories: categories.map((category) => ({ id: category.id, slug: category.slug, name: category.translations[0]?.name ?? category.slug, sortOrder: category.sortOrder })),
      items: items.map((item) => ({ id: item.id, categoryId: item.categoryId, image: item.image, price: Number(item.price), currency: item.currency, featured: item.featured, sortOrder: item.sortOrder, name: item.translations[0]?.name ?? "", description: item.translations[0]?.description ?? "" })),
      pages: pages.length ? pages : fallback.pages
    };
  } catch (error) {
    console.error("Using fallback menu:", error);
    return fallback;
  }
});

export const getGallery = cache(async (locale: Locale): Promise<PublicGalleryItem[]> => {
  const fallback = defaultGallery.map((item) => ({ ...item, title: item.title[locale], alt: item.alt[locale] }));
  if (!process.env.DATABASE_URL) return fallback;
  try {
    const items = await prisma.galleryItem.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { translations: { where: { locale }, take: 1 } } });
    if (!items.length) return fallback;
    return items.map((item) => ({ id: item.id, image: item.image, sortOrder: item.sortOrder, title: item.translations[0]?.title ?? "", alt: item.translations[0]?.alt ?? "909 Lumina" }));
  } catch (error) {
    console.error("Using fallback gallery:", error);
    return fallback;
  }
});

export const getPosts = cache(async (locale: Locale): Promise<PublicPost[]> => {
  const fallback = defaultPosts.map((post) => ({ ...post, title: post.title[locale], excerpt: post.excerpt[locale], content: post.content[locale] }));
  if (!process.env.DATABASE_URL) return fallback;
  try {
    const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, include: { translations: { where: { locale }, take: 1 } } });
    if (!posts.length) return fallback;
    return posts.map((post) => ({ id: post.id, slug: post.slug, coverImage: post.coverImage, publishedAt: (post.publishedAt ?? post.createdAt).toISOString(), featured: post.featured, title: post.translations[0]?.title ?? post.slug, excerpt: post.translations[0]?.excerpt ?? "", content: post.translations[0]?.content ?? "", metaTitle: post.translations[0]?.metaTitle, metaDescription: post.translations[0]?.metaDescription }));
  } catch (error) {
    console.error("Using fallback posts:", error);
    return fallback;
  }
});

export async function getPost(locale: Locale, slug: string): Promise<PublicPost | null> {
  const posts = await getPosts(locale);
  return posts.find((post) => post.slug === slug) ?? null;
}
