import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGallery } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";
import { Lightbox } from "@/components/public/Lightbox";
import { getSiteContent } from "@/lib/content";
import { sectionMetadata } from "@/lib/seo";

const fallbackImages = [
  "https://images.unsplash.com/photo-1572116469696-31de0f17cecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1582806297380-49635b71900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
];

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
  const completeGallery = [
    ...gallery,
    ...fallbackImages.slice(Math.max(0, gallery.length - 4)).map((image, index) => ({
      id: `fallback-${index}`,
      image,
      title: legacyCopy[locale].galleryPage,
      alt: `909 Lumina ${index + 1}`,
      sortOrder: gallery.length + index + 1
    }))
  ].slice(0, 8);

  return (
    <div className="legacy-gallery-page">
      <div className="page-overlay" />
      <h1 className="page-header-title glow-text-cyan" data-aos="fade-down">{legacyCopy[locale].galleryPage}</h1>
      <div className="gallery-wrapper">
        <Lightbox items={completeGallery.map((item, index) => ({
          ...item,
          delay: String((index % 4) * 100)
        }))} />
      </div>
    </div>
  );
}
