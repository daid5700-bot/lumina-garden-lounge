"use client";

export function DeleteButton({ action, label = "Xoá" }: { action: (formData: FormData) => void | Promise<void>; label?: string }) {
  return <button type="submit" formAction={action} className="admin-danger-button" onClick={(event) => { if (!window.confirm("Bạn chắc chắn muốn xoá? Dữ liệu này không thể khôi phục.")) event.preventDefault(); }}>{label}</button>;
}
