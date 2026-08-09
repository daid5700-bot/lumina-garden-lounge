import type { Locale } from "@/lib/i18n";

export function FlagIcon({ locale }: { locale: Locale }) {
  const common = { width: 22, height: 16, viewBox: "0 0 22 16", role: "img" as const, "aria-hidden": true };
  if (locale === "vi") return <svg {...common}><rect width="22" height="16" rx="2" fill="#DA251D"/><path fill="#FF0" d="m11 3 1.13 3.49h3.67l-2.97 2.15 1.14 3.49L11 9.97l-2.97 2.16 1.14-3.49L6.2 6.49h3.67z"/></svg>;
  if (locale === "en") return <svg {...common}><rect width="22" height="16" rx="2" fill="#21468B"/><path stroke="#fff" strokeWidth="4" d="m0 0 22 16M22 0 0 16"/><path stroke="#C8102E" strokeWidth="2" d="m0 0 22 16M22 0 0 16"/><path fill="#fff" d="M9 0h4v16H9zM0 6h22v4H0z"/><path fill="#C8102E" d="M10 0h2v16h-2zM0 7h22v2H0z"/></svg>;
  if (locale === "zh") return <svg {...common}><rect width="22" height="16" rx="2" fill="#DE2910"/><path fill="#FFDE00" d="m5 2 1 2.8h3L6.6 6.6l.9 2.9L5 7.8 2.5 9.5l.9-2.9L1 4.8h3z"/><circle cx="11" cy="3" r=".8" fill="#FFDE00"/><circle cx="13" cy="5" r=".8" fill="#FFDE00"/><circle cx="13" cy="8" r=".8" fill="#FFDE00"/></svg>;
  return <svg {...common}><rect width="22" height="16" rx="2" fill="#fff"/><circle cx="11" cy="8" r="4" fill="#CD2E3A"/><path fill="#0047A0" d="M7 8a4 4 0 0 0 8 0 4 2 0 0 1-8 0"/><g stroke="#111" strokeWidth=".8"><path d="m4 3 3 2M3.5 4 6.5 6M18 3l-3 2M18.5 4l-3 2M4 13l3-2M3.5 12l3-2M18 13l-3-2M18.5 12l-3-2"/></g></svg>;
}
