# 909 Lumina Garden Lounge

Website Next.js App Router đa ngôn ngữ (Việt, Anh, Trung, Hàn), tối ưu SEO, dùng PostgreSQL/Supabase + Prisma và có CMS dành cho chủ quán.

## Chạy giao diện ngay

```bash
npm install
cp .env.example .env
npm run dev
```

Nếu chưa có PostgreSQL, các trang public vẫn dùng dữ liệu mẫu. CMS chỉ ghi dữ liệu sau khi database được cấu hình.

## Khởi tạo Supabase/PostgreSQL và CMS

1. Tạo Supabase project, mở **Project Settings → Database → Connect** và lấy URI PostgreSQL.
2. Đổi `DATABASE_URL` bằng **Supavisor Transaction pooler** (port `6543`) và thêm `pgbouncer=true&sslmode=require`; đặt `DIRECT_URL` là direct connection (port `5432`) hoặc Session pooler.
3. Tạo schema:

```bash
npm run db:push
```

4. Trong Supabase SQL Editor, chạy file `supabase-data.sql` đã xuất từ dữ liệu MySQL/TiDB cũ. Chỉ chạy `npm run db:seed` nếu muốn dữ liệu mẫu mới thay vì dữ liệu cũ.
5. Mở `/admin/login` bằng tài khoản đã được chuyển từ dữ liệu cũ.

## Cấu trúc chính

- `/vi`, `/en`, `/zh`, `/ko`: trang public theo từng ngôn ngữ.
- `/admin`: dashboard và CMS.
- `prisma/schema.prisma`: thiết kế database PostgreSQL/Supabase.
- `prisma/seed.ts`: nội dung mẫu và tài khoản chủ quán.
- `lib/content.ts`: truy vấn PostgreSQL với dữ liệu fallback an toàn.

## SEO

Mỗi ngôn ngữ có metadata riêng, canonical/hreflang, Open Graph, Twitter Card, JSON-LD Restaurant, `sitemap.xml`, `robots.txt`, URL bài viết riêng và HTML render phía máy chủ.

## Lưu ý triển khai

Ảnh upload từ CMS được lưu trên Cloudflare R2; cần cấu hình các biến `R2_*` trong `.env` và Vercel.

Trên Vercel cần thêm cả `DATABASE_URL` và `DIRECT_URL`; Supavisor Transaction mode không hỗ trợ prepared statements, nên `DATABASE_URL` bắt buộc có `pgbouncer=true`.

## Bảo mật khi triển khai

- Trên Vercel Firewall, tạo rate-limit theo IP cho `/admin/login` (10 request / 15 phút) và các Server Actions booking; bật Attack Challenge Mode khi có dấu hiệu bị bot tấn công.
- Giữ `AUTH_SECRET`, `DATABASE_URL`, `DIRECT_URL` và `R2_API_TOKEN` chỉ trong Environment Variables, không đưa vào Git hay client-side code.
- Website đã có CSP, HSTS, chặn iframe/clickjacking và giới hạn 8MB cho request upload.
