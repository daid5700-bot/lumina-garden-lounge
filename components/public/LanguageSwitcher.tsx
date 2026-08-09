"use client";

import { usePathname, useRouter } from "next/navigation";
import { FlagIcon } from "@/components/public/FlagIcon";
import { localeInfo, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || `/${locale}`);
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      {locales.map((locale) => (
        <button
          type="button"
          key={locale}
          className={`language-option${locale === current ? " active" : ""}`}
          onClick={() => switchLocale(locale)}
          aria-label={localeInfo[locale].label}
          aria-current={locale === current ? "true" : undefined}
          title={localeInfo[locale].label}
        >
          <FlagIcon locale={locale} />
          <span>{localeInfo[locale].short}</span>
        </button>
      ))}
    </div>
  );
}
