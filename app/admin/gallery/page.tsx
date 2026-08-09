import { AdminShell } from "@/components/admin/AdminShell";
import { deleteGalleryAction, upsertGalleryAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminImagePicker } from "@/components/admin/AdminImagePicker";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  let items: any[] = [];
  let ready = Boolean(process.env.DATABASE_URL);
  if (ready) try {
    items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    ready = false;
  }

  return (
    <AdminShell title="Thư viện hình ảnh" description="Thêm, thay hoặc xoá ảnh hiển thị trên website.">
      {!ready && <div className="admin-alert warning">Cần kết nối MySQL để quản lý hình ảnh.</div>}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><h2>Gallery</h2><p>{items.length} hình ảnh đang hiển thị</p></div>
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <GalleryUploadForm sortOrder={items.length} disabled={!ready} />
        </div>

        <div className="admin-subheading" style={{ marginTop: 0, paddingTop: "24px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "1rem", color: "#101828" }}>Danh sách ảnh hiện tại</h3>
        </div>
        <div className="admin-gallery-grid">
          {items.map((item) => <GalleryCard item={item} key={item.id} />)}
        </div>
      </section>
    </AdminShell>
  );
}

function GalleryUploadForm({ sortOrder, disabled }: { sortOrder: number; disabled: boolean }) {
  return (
    <form action={upsertGalleryAction} className="admin-form" style={{ padding: "20px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
      <input type="hidden" name="sortOrder" value={sortOrder} />
      <input type="hidden" name="active" value="on" />
      <AdminImagePicker alt="Ảnh gallery xem trước" fileName="imageFile" fileLabel="Chọn ảnh từ máy tính để thêm vào Gallery" required disabled={disabled} />
      <button className="admin-primary-button" disabled={disabled} style={{ minHeight: "46px", padding: "0 24px", marginTop: "16px" }}>Đăng ảnh mới</button>
    </form>
  );
}

function GalleryCard({ item }: { item: any }) {
  return (
    <form action={upsertGalleryAction} className="admin-gallery-card">
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="currentImage" value={item.image} />
      <input type="hidden" name="sortOrder" value={item.sortOrder} />
      <input type="hidden" name="active" value="on" />
      <AdminImagePicker currentImage={item.image} alt="Ảnh gallery" fileName="imageFile" fileLabel="Thay ảnh" compact />
      <div className="admin-gallery-actions">
        <button className="admin-primary-button">Lưu ảnh mới</button>
        <DeleteButton action={deleteGalleryAction} label="Xoá ảnh" />
      </div>
    </form>
  );
}
