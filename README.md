# 909 Lumina Garden Lounge

Website Next.js App Router đa ngôn ngữ (Việt, Anh, Trung, Hàn), tối ưu SEO, dùng MySQL/Prisma và có CMS dành cho chủ quán.

## Chạy giao diện ngay

```bash
npm install
cp .env.example .env
npm run dev
```

Nếu chưa có MySQL, các trang public vẫn dùng dữ liệu mẫu. CMS chỉ ghi dữ liệu sau khi database được cấu hình.

## Khởi tạo MySQL và CMS

1. Đổi toàn bộ mật khẩu trong `.env.example`, sau đó tạo `.env`.
2. Khởi động MySQL đã cài trên máy (ví dụ Homebrew: `brew services start mysql`). Docker không bắt buộc.
3. Trong `.env`, có thể dùng `DATABASE_URL` hoặc bộ biến `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
4. Tạo bảng và dữ liệu mẫu:

```bash
npm run db:push
npm run db:seed
```

5. Mở `/admin/login` và đăng nhập bằng `ADMIN_EMAIL` / `ADMIN_PASSWORD` trong `.env`.

## Cấu trúc chính

- `/vi`, `/en`, `/zh`, `/ko`: trang public theo từng ngôn ngữ.
- `/admin`: dashboard và CMS.
- `prisma/schema.prisma`: thiết kế database MySQL.
- `prisma/seed.ts`: nội dung mẫu và tài khoản chủ quán.
- `lib/content.ts`: truy vấn MySQL với dữ liệu fallback an toàn.
- `public/uploads`: ảnh upload từ CMS khi chạy trên VPS/server có ổ đĩa bền vững.

## SEO

Mỗi ngôn ngữ có metadata riêng, canonical/hreflang, Open Graph, Twitter Card, JSON-LD Restaurant, `sitemap.xml`, `robots.txt`, URL bài viết riêng và HTML render phía máy chủ.

## Lưu ý triển khai

Upload hiện ghi vào `public/uploads`, phù hợp VPS/Docker có volume bền vững. Nếu triển khai Vercel/serverless, nên thay `imageValue()` trong `app/admin/actions.ts` bằng Cloudinary, S3 hoặc dịch vụ object storage tương đương.
