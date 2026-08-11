import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuImagePager } from "@/components/public/MenuImagePager";
import { getMenu } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";
import { getSiteContent } from "@/lib/content";
import { sectionMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = await getSiteContent(locale);
  const description = locale === "vi" ? "Xem thực đơn hình ảnh của 909 Lumina Garden Lounge tại Quận 5, TP. Hồ Chí Minh." : locale === "en" ? "Browse the visual menu at 909 Lumina Garden Lounge in District 5, Ho Chi Minh City." : site.translation.seoDescription;
  return sectionMetadata({ locale, path: "/menu", title: legacyCopy[locale].menuTitle.join(" "), description, image: site.heroImage });
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const menu = await getMenu(locale);

  return (
    <div className="legacy-menu-page">
      <h1 className="page-header-title glow-text-cyan" data-aos="fade-down">
        {legacyCopy[locale].menuTitle.join(" ")}
      </h1>
      <div className="menu-wrapper" data-aos="zoom-in">
        <MenuImagePager pages={menu.pages} />
      </div>
      <div className="legacy-page-spacer" />
    </div>
  );
}
