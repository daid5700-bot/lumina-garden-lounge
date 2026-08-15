import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "909 Lumina Garden Lounge", template: "%s | 909 Lumina" },
  description: "909 Lumina Garden Lounge",
  applicationName: "909 Lumina Garden Lounge",
  icons: { icon: "/lumina-logo.svg" },
  category: "restaurant",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, email: true, address: true }
};

export const viewport: Viewport = { themeColor: "#060510", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-lumina-locale") || "vi";
  return <html lang={lang} suppressHydrationWarning><body>{children}</body></html>;
}
