import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { isLocale, ui } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";
import { localizedAlternates, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(locale, slug);
  return post ? {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: localizedAlternates(`/news/${slug}`, locale),
    openGraph: { type: "article", url: `${siteUrl()}/${locale}/news/${slug}`, title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt, images: [{ url: post.coverImage, alt: post.title }], publishedTime: post.publishedAt },
    twitter: { card: "summary_large_image", title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt, images: [post.coverImage] }
  } : {};
}

function formatLegacyDate(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [post, posts] = await Promise.all([getPost(locale, slug), getPosts(locale)]);
  if (!post) notFound();

  const copy = legacyCopy[locale];
  const t = ui[locale];
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);
  const sidebarFallback = {
    id: "birthday-fallback",
    slug: "lumina-ladies-night",
    coverImage: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    title: locale === "vi"
      ? "Gói tổ chức sinh nhật siêu hoành tráng tặng kèm set trang trí Neon"
      : t.sections.news
  };
  const sidebarItems = [...related, ...(related.length < 3 ? [sidebarFallback] : [])].slice(0, 3);
  const isOriginalDjArticle = locale === "vi" && slug === "special-guest-dj-night";
  const articleJsonLd = { "@context": "https://schema.org", "@type": "NewsArticle", headline: post.title, description: post.excerpt, image: [post.coverImage], datePublished: post.publishedAt, dateModified: post.publishedAt, mainEntityOfPage: `${siteUrl()}/${locale}/news/${post.slug}`, author: { "@type": "Organization", name: "909 Lumina Garden Lounge" }, publisher: { "@type": "Organization", name: "909 Lumina Garden Lounge" } };
  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.nav.home, item: `${siteUrl()}/${locale}` }, { "@type": "ListItem", position: 2, name: t.nav.news, item: `${siteUrl()}/${locale}/news` }, { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl()}/${locale}/news/${post.slug}` }] };

  return (
    <div className="legacy-news-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <div className="breadcrumb" data-aos="fade-down">
        <Link href={`/${locale}`}>{t.nav.home}</Link> &gt;{" "}
        <Link href={`/${locale}/news`}>{t.nav.news}</Link> &gt; <span>{post.title}</span>
      </div>

      <div className="news-detail-layout">
        <article className="news-main-content" data-aos="fade-up">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">{formatLegacyDate(post.publishedAt)} | 67 {copy.views}</div>
          <div className="article-body">
            {isOriginalDjArticle ? (
              <>
                <p>Đêm nhạc đặc biệt với sự góp mặt của dàn DJ đình đám hứa hẹn mang lại không gian bùng nổ chưa từng có. Hãy đến và trải nghiệm một bữa tiệc âm nhạc thực thụ, nơi ánh sáng, âm thanh và đam mê hòa quyện vào nhau để đánh thức mọi giác quan của bạn.</p>
                <Image src={post.coverImage} alt="DJ Night Event" width={1200} height={800} sizes="(max-width: 992px) 84vw, 62vw" priority />
                <h4>SỰ KIỆN CÓ GÌ HOT?</h4>
                <p>Trong khuôn khổ sự kiện &quot;Quẩy Tung Đêm Hè&quot;, chúng tôi mang đến hệ thống âm thanh Line Array siêu khủng kết hợp cùng ma trận ánh sáng Laser xuyên thấu phong cách Cyberpunk độc nhất vô nhị. Khách hàng sẽ được tận hưởng những bản mix Vinahouse, EDM, và Trap bùng nổ xuyên màn đêm.</p>
                <h4>CHƯƠNG TRÌNH ƯU ĐÃI KÈM THEO:</h4>
                <ul>
                  <li>Giảm ngay 20% cho tất cả các gói Combo Rượu đặt trước.</li>
                  <li>Tặng 1 dĩa trái cây tươi khổng lồ cho bàn từ 5 khách.</li>
                  <li>Trải nghiệm miễn phí shisha vị mới nhất (phiên bản giới hạn).</li>
                </ul>
                <Image
                  src="https://images.unsplash.com/photo-1574096079513-d8259312b78a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Lumina Space"
                  width={1200}
                  height={800}
                  sizes="(max-width: 992px) 84vw, 62vw"
                />
                <p>Chỗ ngồi cực kỳ có hạn, đừng bỏ lỡ cơ hội trở thành tâm điểm của đêm tiệc hoành tráng nhất tháng này. Hãy gọi ngay cho chúng tôi qua Hotline hoặc Zalo để giữ vị trí VIP cho bạn và hội bạn thân nhé!</p>
              </>
            ) : (
              <>
                {post.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <Image src={post.coverImage} alt={post.title} width={1200} height={800} sizes="(max-width: 992px) 84vw, 62vw" priority />
              </>
            )}
          </div>
        </article>

        <aside className="news-sidebar" data-aos="fade-left">
          <h3 className="sidebar-title">{copy.related}</h3>
          {sidebarItems.map((item, index) => (
            <Link
              href={`/${locale}/news/${item.slug}`}
              className={`sidebar-item ${index === 0 ? "featured" : "row-style"}`}
              key={`${item.id}-${index}`}
            >
              <Image
                src={item.coverImage}
                alt={item.title}
                className="sidebar-item-img"
                width={index === 0 ? 600 : 150}
                height={index === 0 ? 360 : 150}
              />
              <div className="sidebar-item-title">{item.title}</div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
