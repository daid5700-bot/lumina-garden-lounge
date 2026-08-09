import { CalendarClock, GalleryHorizontalEnd, Newspaper, Soup } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Tổng quan quản trị", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { menu: 0, gallery: 0, posts: 0, bookings: 0 };
  let recent: { id: string; name: string; phone: string; guests: number; date: Date; status: string }[] = [];
  let databaseReady = Boolean(process.env.DATABASE_URL);
  if (databaseReady) try {
    const [menu, gallery, posts, bookings, rows] = await Promise.all([prisma.menuItem.count(), prisma.galleryItem.count(), prisma.post.count(), prisma.booking.count({ where: { status: "NEW" } }), prisma.booking.findMany({ take: 6, orderBy: { createdAt: "desc" } })]);
    stats = { menu, gallery, posts, bookings }; recent = rows;
  } catch { databaseReady = false; }
  const cards = [["Món trong menu", stats.menu, Soup], ["Ảnh gallery", stats.gallery, GalleryHorizontalEnd], ["Bài viết", stats.posts, Newspaper], ["Booking mới", stats.bookings, CalendarClock]] as const;
  return <AdminShell title="Tổng quan" description="Theo dõi nội dung và yêu cầu đặt bàn mới nhất.">{!databaseReady && <div className="admin-alert warning"><strong>Database chưa sẵn sàng.</strong> Hãy cấu hình DATABASE_URL, chạy <code>npm run db:push</code> và <code>npm run db:seed</code>.</div>}<div className="admin-stats">{cards.map(([label, count, Icon]) => <article key={label}><span><Icon /></span><div><strong>{count}</strong><p>{label}</p></div></article>)}</div><section className="admin-panel"><div className="admin-panel-heading"><div><h2>Booking gần đây</h2><p>Yêu cầu mới gửi từ website.</p></div></div>{recent.length ? <div className="admin-table-wrap"><table><thead><tr><th>Khách hàng</th><th>Liên hệ</th><th>Ngày đến</th><th>Số khách</th><th>Trạng thái</th></tr></thead><tbody>{recent.map((booking) => <tr key={booking.id}><td><strong>{booking.name}</strong></td><td>{booking.phone}</td><td>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(booking.date)}</td><td>{booking.guests}</td><td><span className={`status status-${booking.status.toLowerCase()}`}>{booking.status}</span></td></tr>)}</tbody></table></div> : <div className="admin-empty">Chưa có booking nào.</div>}</section></AdminShell>;
}
