import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const title = "Lounge Quận 5 | 909 Lumina Garden Lounge";
const description = "Khám phá 909 Lumina Garden Lounge tại Quận 5 với không gian sân vườn, cocktail, âm nhạc và các sự kiện giải trí về đêm.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "vi") return {};
  const url = `${siteUrl()}/vi/lounge-quan-5`;
  return { title, description, alternates: { canonical: url }, openGraph: { type: "website", url, title, description }, twitter: { card: "summary_large_image", title, description } };
}

export default async function LoungeQuan5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "vi") notFound();
  const [site, posts] = await Promise.all([getSiteContent(locale), getPosts(locale)]);
  const url = `${siteUrl()}/vi/lounge-quan-5`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", name: title, description, url, isPartOf: { "@type": "WebSite", name: site.siteName, url: siteUrl() } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trang chủ", item: `${siteUrl()}/vi` }, { "@type": "ListItem", position: 2, name: "Lounge Quận 5", item: url }] }
  ] };
  const faq = [
    ["909 Lumina Garden Lounge nằm ở đâu?", `909 Lumina Garden Lounge có thông tin liên hệ tại ${site.address}. Bạn có thể xem chỉ dẫn hoặc liên hệ trực tiếp trước khi đến.`],
    ["Có cần đặt bàn trước không?", "Nên liên hệ hoặc đặt bàn trước, đặc biệt vào cuối tuần và các ngày có sự kiện, để đội ngũ có thể xác nhận chỗ ngồi phù hợp."],
    ["909 Lumina có cocktail không?", "Menu của 909 Lumina có các lựa chọn đồ uống và cocktail. Xem menu hiện tại để biết thêm chi tiết."],
    ["Làm thế nào để đặt bàn?", "Bạn có thể dùng biểu mẫu đặt bàn trên trang chủ hoặc liên hệ qua các kênh liên hệ hiển thị trên website."]
  ];
  return <div className="legacy-news-page seo-landing"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="seo-landing-inner"><nav className="breadcrumb"><Link href="/vi">Trang chủ</Link> &gt; <span>Lounge Quận 5</span></nav><h1>Lounge Quận 5 – Trải nghiệm tại 909 Lumina Garden Lounge</h1>
    <p className="seo-lead">909 Lumina Garden Lounge là điểm hẹn để gặp gỡ, thưởng thức cocktail và tận hưởng không khí giải trí về đêm tại Quận 5. Không gian sân vườn cùng âm nhạc tạo nên lựa chọn phù hợp cho buổi hẹn hò, cuộc gặp bạn bè hoặc một dịp kỷ niệm cần đặt bàn trước.</p>
    <h2>Tìm lounge tại Quận 5 nên lựa chọn dựa trên những yếu tố nào?</h2><p>Một buổi tối trọn vẹn thường bắt đầu từ không gian, đồ uống, âm nhạc và sự thuận tiện khi đặt chỗ. Hãy xem trước menu, lịch tin tức/sự kiện và thông tin liên hệ để lựa chọn trải nghiệm phù hợp với nhóm của bạn.</p>
    <h2>Không gian sân vườn tại 909 Lumina</h2><p>909 Lumina hướng đến một không gian lounge để trò chuyện và thư giãn vào buổi tối. Đây là nơi để cảm nhận nhịp điệu riêng của một lounge sân vườn tại Quận 5, thay vì chỉ ghé qua để dùng đồ uống.</p>
    <h2>Cocktail, âm nhạc và các sự kiện</h2><p>Khám phá <Link href="/vi/menu">menu đồ uống</Link> trước khi đến và theo dõi các <Link href="/vi/news">sự kiện mới tại 909 Lumina</Link>. Các thông tin này được cập nhật theo nội dung đang hiển thị trên website.</p>
    <h2>909 Lumina phù hợp với những dịp nào?</h2><p>Không gian phù hợp cho gặp gỡ bạn bè, hẹn hò, sinh nhật hoặc đi chơi cuối tuần. Với các nhóm và dịp cần sắp xếp chỗ ngồi, hãy chủ động liên hệ trước để được xác nhận.</p>
    <h2>Các sự kiện mới tại 909 Lumina</h2><div className="seo-related">{posts.slice(0, 3).map(post => <Link key={post.id} href={`/vi/news/${post.slug}`}>{post.title}</Link>)}</div>
    <h2>Câu hỏi thường gặp</h2><div className="seo-faq">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    <h2>Đặt bàn tại 909 Lumina</h2><p>Liên hệ trước để xác nhận nhu cầu đặt bàn và thời điểm ghé thăm.</p><Link className="btn-rect" href="/vi#booking">Đặt bàn tại 909 Lumina</Link></section></div>;
}
