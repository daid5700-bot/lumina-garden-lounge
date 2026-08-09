import { AdminShell } from "@/components/admin/AdminShell";
import { deleteMenuPageAction, upsertMenuPageAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminImagePicker } from "@/components/admin/AdminImagePicker";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  let pages: any[] = [];
  let ready = Boolean(process.env.DATABASE_URL);
  if (ready) try {
    pages = await prisma.menuPage.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    ready = false;
  }

  return (
    <AdminShell title="Quản lý thực đơn" description="Thêm, thay hoặc xoá các ảnh menu hiển thị cho khách.">
      {!ready && <div className="admin-alert warning">Cần kết nối MySQL để quản lý thực đơn.</div>}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><h2>Ảnh menu</h2><p>{pages.length} ảnh menu đang hiển thị</p></div>
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <MenuUploadForm sortOrder={pages.length} disabled={!ready} />
        </div>

        <div className="admin-subheading" style={{ marginTop: 0, paddingTop: "24px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "1rem", color: "#101828" }}>Danh sách ảnh hiện tại</h3>
        </div>
        <div className="admin-menu-grid">
          {pages.map((page) => <MenuCard page={page} key={page.id} />)}
        </div>
      </section>
    </AdminShell>
  );
}

function MenuUploadForm({ sortOrder, disabled }: { sortOrder: number; disabled: boolean }) {
  return (
    <form action={upsertMenuPageAction} className="admin-form" style={{ padding: "20px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
      <input type="hidden" name="sortOrder" value={sortOrder} />
      <input type="hidden" name="active" value="on" />
      <AdminImagePicker alt="Ảnh menu xem trước" fileName="imageFile" fileLabel="Chọn ảnh từ máy tính để thêm vào thực đơn" required disabled={disabled} />
      <button className="admin-primary-button" disabled={disabled} style={{ minHeight: "46px", padding: "0 24px", marginTop: "16px" }}>Đăng ảnh mới</button>
    </form>
  );
}

function MenuCard({ page }: { page: any }) {
  return (
    <form action={upsertMenuPageAction} className="admin-menu-card">
      <input type="hidden" name="id" value={page.id} />
      <input type="hidden" name="currentImage" value={page.image} />
      <input type="hidden" name="sortOrder" value={page.sortOrder} />
      <input type="hidden" name="active" value="on" />
      <AdminImagePicker currentImage={page.image} alt="Ảnh menu" fileName="imageFile" fileLabel="Thay ảnh" compact />
      <div className="admin-gallery-actions">
        <button className="admin-primary-button">Lưu ảnh mới</button>
        <DeleteButton action={deleteMenuPageAction} label="Xoá ảnh" />
      </div>
    </form>
  );
}
