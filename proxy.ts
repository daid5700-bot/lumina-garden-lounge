import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("lumina_admin")?.value;
    if (!session) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const locale = locales.find((item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`)) || "vi";
  const headers = new Headers(request.headers);
  headers.set("x-lumina-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"] };
