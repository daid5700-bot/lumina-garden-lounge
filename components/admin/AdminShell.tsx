import Link from "next/link";
import { CalendarCheck, GalleryHorizontalEnd, LayoutDashboard, LogOut, Settings, Soup, Newspaper } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/login/actions";

export async function AdminShell({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  const session = await requireAdmin();
  const links = [
    ["/admin", "Tổng quan", LayoutDashboard],
    ["/admin/settings", "Thông tin web", Settings],
    ["/admin/menu", "Thực đơn", Soup],
    ["/admin/gallery", "Hình ảnh", GalleryHorizontalEnd],
    ["/admin/posts", "Tin tức", Newspaper],
    ["/admin/bookings", "Booking", CalendarCheck]
  ] as const;
  return <div className="admin-app"><aside className="admin-sidebar"><Link href="/admin" className="admin-logo"><span>909</span> LUMINA<small>CONTENT STUDIO</small></Link><nav>{links.map(([href, label, Icon]) => <Link key={href} href={href}><Icon />{label}</Link>)}</nav><div className="admin-user"><div><strong>{session.name}</strong><span>{session.email}</span></div><form action={logoutAction}><button aria-label="Đăng xuất" title="Đăng xuất"><LogOut /></button></form></div></aside><main className="admin-main"><header className="admin-page-header"><div><p>909 LUMINA CMS</p><h1>{title}</h1>{description && <span>{description}</span>}</div><Link href="/vi" target="_blank" className="admin-view-site">Xem website ↗</Link></header>{children}</main></div>;
}
