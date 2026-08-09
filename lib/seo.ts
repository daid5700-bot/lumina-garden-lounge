import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

const localeTags: Record<Locale, string> = { vi: "vi-VN", en: "en", zh: "zh-CN", ko: "ko-KR" };

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function localizedAlternates(path: string, locale: Locale) {
  const base = siteUrl();
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return {
    canonical: `${base}/${locale}${normalizedPath}`,
    languages: {
      ...Object.fromEntries(locales.map((item) => [localeTags[item], `${base}/${item}${normalizedPath}`])),
      "x-default": `${base}/vi${normalizedPath}`
    }
  };
}

export function sectionMetadata({ locale, path, title, description, image }: { locale: Locale; path: string; title: string; description: string; image?: string }): Metadata {
  const url = `${siteUrl()}/${locale}${path}`;
  return {
    title,
    description,
    alternates: localizedAlternates(path, locale),
    openGraph: { type: "website", title, description, url, images: image ? [{ url: image, alt: title }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined }
  };
}
