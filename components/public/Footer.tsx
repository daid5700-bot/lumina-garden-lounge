import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/default-content";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

export function Footer({ locale, site }: { locale: Locale; site: SiteContent }) {
  const t = ui[locale];
  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand"><span>909</span> LUMINA</div>
          <p className="footer-intro">{site.translation.heroSubtitle}</p>
          <div className="socials">
            {site.facebook && <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>}
            {site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>}
          </div>
        </div>
        <div>
          <h3>{t.footer.explore}</h3>
          <div className="footer-links">
            <Link href={`/${locale}/menu`}>{t.nav.menu}</Link>
            <Link href={`/${locale}/gallery`}>{t.nav.gallery}</Link>
            <Link href={`/${locale}/news`}>{t.nav.news}</Link>
            {locale === "vi" && <Link href="/vi/lounge-quan-5">Lounge Quận 5</Link>}
          </div>
        </div>
        <div>
          <h3>{t.footer.contact}</h3>
          <div className="footer-contact">
            <span><MapPin />{site.address}</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}><Phone />{site.phone}</a>
            {site.email && <a href={`mailto:${site.email}`}><Mail />{site.email}</a>}
          </div>
        </div>
        <div>
          <h3>{t.footer.hours}</h3>
          <p className="hours">{site.openingHours}</p>
          <p className="footer-note">{t.footer.recommendation}</p>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} 909 Lumina. {t.footer.rights}</div>
    </footer>
  );
}
