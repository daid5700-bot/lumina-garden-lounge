import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGallery } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";
import { Lightbox } from "@/components/public/Lightbox";
import { getSiteContent } from "@/lib/content";
import { sectionMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = await getSiteContent(locale);
  const description = locale === "vi" ? "Khám phá hình ảnh không gian, sự kiện và trải nghiệm tại 909 Lumina Garden Lounge." : locale === "en" ? "Explore the venue, events and atmosphere at 909 Lumina Garden Lounge." : site.translation.seoDescription;
  return sectionMetadata({ locale, path: "/gallery", title: legacyCopy[locale].galleryPage, description, image: site.heroImage });
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const gallery = await getGallery(locale);
  return (
    <div className="legacy-gallery-page">
      <div className="page-overlay" />
      <h1 className="page-header-title glow-text-cyan" data-aos="fade-down">{legacyCopy[locale].galleryPage}</h1>
      <div className="gallery-wrapper">
        <Lightbox items={gallery.map((item, index) => ({
          ...item,
          delay: String((index % 4) * 100)
        }))} />
      </div>
    </div>
  );
}
