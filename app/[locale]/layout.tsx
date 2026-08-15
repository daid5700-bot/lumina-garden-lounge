import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingActions } from "@/components/public/FloatingActions";
import { Header } from "@/components/public/Header";
import { LegacyAos } from "@/components/public/LegacyAos";
import { getSiteContent } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
import { localizedAlternates, siteUrl } from "@/lib/seo";
import "../legacy-base.css";
import "../legacy-public.css";

type LocaleLayoutProps = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const site = await getSiteContent(rawLocale);
  const url = siteUrl();
  const isVietnameseHomepage = rawLocale === "vi";
  const title = isVietnameseHomepage ? "909 Lumina Garden Lounge | Lounge Sân Vườn Quận 5" : site.translation.seoTitle;
  const description = isVietnameseHomepage
    ? "Khám phá 909 Lumina Garden Lounge tại Quận 5 với không gian sân vườn, cocktail, DJ, âm nhạc và các sự kiện giải trí về đêm."
    : site.translation.seoDescription;
  return {
    title: { absolute: title },
    description,
    alternates: localizedAlternates("", rawLocale),
    openGraph: {
      title,
      description,
      url: `${url}/${rawLocale}`,
      siteName: site.siteName,
      locale: rawLocale === "zh" ? "zh_CN" : rawLocale === "ko" ? "ko_KR" : rawLocale === "en" ? "en_US" : "vi_VN",
      type: "website",
      images: [{ url: site.heroImage, width: 1200, height: 630, alt: site.siteName }]
    },
    twitter: { card: "summary_large_image", title, description, images: [site.heroImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const site = await getSiteContent(rawLocale);
  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header locale={rawLocale} siteName={site.siteName} />
      <LegacyAos />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <FloatingActions phone={site.phone} zalo={site.zalo} />
    </div>
  );
}
