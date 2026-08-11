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
    pages = await prisma.menuPage.findMany({ orderBy: [{ menuType: "asc" }, { sortOrder: "asc" }] });
  } catch {
    ready = false;
  }

  return (
    <AdminShell title="Quản lý thực đơn" description="Đăng ảnh riêng cho Menu Lounge và Menu Garden.">
      {!ready && <div className="admin-alert warning">Cần kết nối cơ sở dữ liệu để quản lý thực đơn.</div>}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><h2>Ảnh menu</h2><p>{pages.length} ảnh menu đang hiển thị</p></div>
        </div>
        <MenuGroup title="Menu Lounge" menuType="LOUNGE" pages={pages.filter((page) => page.menuType !== "GARDEN")} disabled={!ready} />
        <MenuGroup title="Menu Garden" menuType="GARDEN" pages={pages.filter((page) => page.menuType === "GARDEN")} disabled={!ready} />
      </section>
    </AdminShell>
  );
}

function MenuGroup({ title, menuType, pages, disabled }: { title: string; menuType: "LOUNGE" | "GARDEN"; pages: any[]; disabled: boolean }) {
  return (
    <section className="admin-menu-group">
      <div className="admin-menu-group-heading"><div><h3>{title}</h3><p>{pages.length} ảnh</p></div></div>
      <MenuUploadForm sortOrder={pages.length} menuType={menuType} disabled={disabled} />
      {pages.length > 0 && <div className="admin-menu-grid">{pages.map((page) => <MenuCard page={page} key={page.id} />)}</div>}
    </section>
  );
}

function MenuUploadForm({ sortOrder, menuType, disabled }: { sortOrder: number; menuType: "LOUNGE" | "GARDEN"; disabled: boolean }) {
  return (
    <form action={upsertMenuPageAction} className="admin-menu-upload">
      <input type="hidden" name="sortOrder" value={sortOrder} />
      <input type="hidden" name="active" value="on" />
      <input type="hidden" name="menuType" value={menuType} />
      <AdminImagePicker alt="Ảnh menu xem trước" fileName="imageFile" fileLabel="Chọn ảnh từ máy tính để thêm vào thực đơn" required disabled={disabled} />
      <button className="admin-primary-button" disabled={disabled}>Đăng ảnh vào {menuType === "LOUNGE" ? "Menu Lounge" : "Menu Garden"}</button>
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
      <label className="admin-menu-type">
        <span>Hiển thị trong</span>
        <select name="menuType" defaultValue={page.menuType === "GARDEN" ? "GARDEN" : "LOUNGE"}>
          <option value="LOUNGE">Menu Lounge</option>
          <option value="GARDEN">Menu Garden</option>
        </select>
      </label>
      <div className="admin-gallery-actions">
        <button className="admin-primary-button">Lưu ảnh mới</button>
        <DeleteButton action={deleteMenuPageAction} label="Xoá ảnh" />
      </div>
    </form>
  );
}
