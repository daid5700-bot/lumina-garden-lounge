import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat"
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const site = await getSiteContent(rawLocale);
  const url = siteUrl();
  return {
    title: { absolute: site.translation.seoTitle },
    description: site.translation.seoDescription,
    alternates: localizedAlternates("", rawLocale),
    openGraph: {
      title: site.translation.seoTitle,
      description: site.translation.seoDescription,
      url: `${url}/${rawLocale}`,
      siteName: site.siteName,
      locale: rawLocale === "zh" ? "zh_CN" : rawLocale === "ko" ? "ko_KR" : rawLocale === "en" ? "en_US" : "vi_VN",
      type: "website",
      images: [{ url: site.heroImage, width: 1200, height: 630, alt: site.siteName }]
    },
    twitter: { card: "summary_large_image", title: site.translation.seoTitle, description: site.translation.seoDescription, images: [site.heroImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const site = await getSiteContent(rawLocale);
  return (
    <div className={`${montserrat.variable} public-site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header locale={rawLocale} siteName={site.siteName} />
      <LegacyAos />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <FloatingActions messenger={site.messenger} zalo={site.zalo} />
    </div>
  );
}
