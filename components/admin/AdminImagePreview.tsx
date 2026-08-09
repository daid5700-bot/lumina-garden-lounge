export function AdminImagePreview({ src, alt = "Ảnh hiện tại" }: { src?: string; alt?: string }) {
  return (
    <figure className="admin-image-preview">
      <figcaption>Ảnh hiện tại</figcaption>
      {src ? <img src={src} alt={alt} /> : <div className="admin-image-preview-empty">Chưa có ảnh</div>}
    </figure>
  );
}
