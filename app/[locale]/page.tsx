import Image from "next/image";
import Link from "next/link";
import { CircleCheck, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/public/BookingForm";
import { MenuImagePager } from "@/components/public/MenuImagePager";
import { getGallery, getMenu, getSiteContent } from "@/lib/content";
import { isLocale, ui } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";

export default async function HomePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ booking?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [{ booking }, site, menu, gallery] = await Promise.all([
    searchParams,
    getSiteContent(locale),
    getMenu(locale),
    getGallery(locale)
  ]);
  const t = ui[locale];
  const copy = legacyCopy[locale];
  const aboutWords = site.translation.aboutHeading.trim().split(/\s+/);
  const aboutHighlight = aboutWords.splice(-2).join(" ");
  const aboutLead = aboutWords.join(" ");
  const contactWords = site.translation.contactTitle.trim().split(/\s+/);
  const contactLead = contactWords.splice(0, 2).join(" ");
  const contactHighlight = contactWords.splice(0, 2).join(" ");
  const contactTail = contactWords.join(" ");
  const zaloUrl = site.zalo.startsWith("http") ? site.zalo : `https://zalo.me/${site.zalo}`;
  const zaloDigits = site.zalo.replace(/\D/g, "");
  const zaloDisplay = zaloDigits.length === 10
    ? `${zaloDigits.slice(0, 4)}.${zaloDigits.slice(4, 7)}.${zaloDigits.slice(7)}`
    : site.zalo;
  const originalGalleryOrder = [gallery[2], gallery[0], gallery[1], gallery[3]].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.siteName,
    image: [site.heroImage, ...gallery.slice(0, 2).map((item) => item.image)],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN"
    },
    telephone: site.phone,
    email: site.email,
    priceRange: "₫₫₫",
    openingHours: "Mo-Su 18:00-02:00",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}`,
    servesCuisine: ["Vietnamese", "Fusion", "Cocktails"],
    acceptsReservations: true,
    menu: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}/menu`,
    sameAs: [site.facebook, site.instagram].filter(Boolean)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <section className="hero" id="home">
        <Image
          src={site.heroImage}
          alt=""
          className="hero-background-image"
          fill
          priority
          sizes="100vw"
        />
        {site.heroVideo && (
          <video
            className="hero-video"
            src={site.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h2 className="glow-text-cyan" data-aos="fade-down" data-aos-duration="1000">
            {copy.welcome}
          </h2>
          <h1
            className="glow-text-magenta title-large"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            {site.translation.heroTitle}
          </h1>
          <p className="subtitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            {site.translation.heroSubtitle}
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
            <Link href="#booking" className="btn btn-primary"><span>{t.common.bookNow}</span></Link>
            <Link href="#about" className="btn btn-secondary"><span>{t.common.discover}</span></Link>
          </div>
        </div>
      </section>

      <section className="about-section neon-border-top" id="about">
        <div className="container">
          <div className="text-center mb-50">
            <h2 className="section-main-title" data-aos="zoom-in">
              <span className="glow-text-magenta">{copy.aboutTitle[0]}</span>{" "}
              <span className="glow-text-cyan">{copy.aboutTitle[1]}</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-image glowing-box" data-aos="fade-right" data-aos-duration="1200">
              <Image
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={site.siteName}
                width={800}
                height={533}
                sizes="(max-width: 992px) 84vw, 42vw"
              />
            </div>
            <div className="about-text" data-aos="fade-left" data-aos-duration="1200">
              <h2 className="sub-title">{aboutLead}<br /><span>{aboutHighlight}</span></h2>
              <p>{site.translation.aboutBody}</p>
              <p>{site.translation.aboutBodySecondary}</p>
              <ul className="features-list">
                <li><CircleCheck aria-hidden="true" /> {site.translation.aboutFeatureOne}</li>
                <li><CircleCheck aria-hidden="true" /> {site.translation.aboutFeatureTwo}</li>
                <li><CircleCheck aria-hidden="true" /> {site.translation.aboutFeatureThree}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section neon-border-top" id="menu">
        <div className="container">
          <div className="text-center mb-50">
            <h2 className="section-main-title" data-aos="zoom-in">
              {copy.menuTitle[0]} <span className="glow-text-magenta">{copy.menuTitle[1]}</span>
            </h2>
          </div>
          <div className="menu-wrapper" data-aos="zoom-in">
            <MenuImagePager pages={menu.pages} />
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="text-center mb-50">
            <h2 className="section-main-title" data-aos="zoom-in">
              {copy.galleryTitle[0]} <span className="glow-text-cyan">{copy.galleryTitle[1]}</span>
            </h2>
          </div>
          <div className="gallery-grid">
            {originalGalleryOrder.map((item, index) => (
              <Link
                href={`/${locale}/gallery`}
                className="gallery-item skew-box"
                data-aos="flip-left"
                data-aos-duration="1000"
                data-aos-delay={String(index * 200)}
                key={item.id}
              >
                <div className="skew-image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="gallery-overlay"><h4>{item.title}</h4></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-section neon-border-top" id="booking">
        <div className="container">
          <div className="text-center mb-50">
            <h2 className="section-main-title" data-aos="zoom-in">
              {copy.bookingTitle[0]} <span className="glow-text-cyan">{copy.bookingTitle[1]}</span>
            </h2>
          </div>
          <div className="booking-wrapper">
            <div className="booking-info" data-aos="fade-right" data-aos-duration="1000">
              <h2 className="sub-title">
                {contactLead} {contactHighlight && <span>{contactHighlight}</span>} {contactTail}
              </h2>
              <p>{site.translation.contactDescription}</p>
              <div className="contact-methods">
                <a href={zaloUrl} target="_blank" rel="noreferrer" className="zalo-contact-card">
                  <div className="zalo-icon-wrap"><strong>Zalo</strong></div>
                  <div className="zalo-text"><h4>{copy.zaloLabel}</h4><p>{zaloDisplay}</p></div>
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hotline-card">
                  <PhoneCall aria-hidden="true" />
                  <div className="hotline-text"><h4>{copy.hotlineLabel}</h4><p>{site.phone}</p></div>
                </a>
              </div>
            </div>
            <div className="booking-form glowing-box" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <div className="form-inner">
                <h3>{copy.bookingFormTitle}</h3>
                <BookingForm locale={locale} status={booking} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
