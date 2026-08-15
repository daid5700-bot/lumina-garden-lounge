"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/public/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

export function Header({ locale, siteName }: { locale: Locale; siteName: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = ui[locale];
  const isHome = pathname === `/${locale}`;
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`header ${!isHome || scrolled ? "scrolled" : ""} ${open ? "mobile-open" : ""}`}>
      <div className="nav-container">
        <ul className="nav-links left-links">
          <li><Link href={`/${locale}`} onClick={closeMenu} className={isHome ? "active" : ""}>{t.nav.home}</Link></li>
          <li><Link href={`/${locale}#about`} onClick={closeMenu}>{t.nav.about}</Link></li>
          {locale === "vi" && <li><Link href="/vi/lounge-quan-5" onClick={closeMenu}>Lounge Quận 5</Link></li>}
          <li><Link href={`/${locale}/menu`} onClick={closeMenu} className={pathname === `/${locale}/menu` ? "active" : ""}>{t.nav.menu}</Link></li>
        </ul>
        <div className="logo">
          <Link href={`/${locale}`} onClick={closeMenu} aria-label={siteName}>
            <h1><span>909</span> LUMINA</h1>
            <p>GARDEN LOUNGE</p>
          </Link>
        </div>
        <ul className="nav-links right-links">
          <li><Link href={`/${locale}/gallery`} onClick={closeMenu} className={pathname === `/${locale}/gallery` ? "active" : ""}>{t.nav.gallery}</Link></li>
          <li><Link href={`/${locale}/news`} onClick={closeMenu} className={pathname.startsWith(`/${locale}/news`) ? "active" : ""}>{t.nav.news}</Link></li>
          <li><Link href={`/${locale}#booking`} onClick={closeMenu}>{t.nav.contact}</Link></li>
        </ul>
        <div className="legacy-language-switcher"><LanguageSwitcher current={locale} /></div>
      </div>
      <button className="mobile-menu-btn" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  );
}
