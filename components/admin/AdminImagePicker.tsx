"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";

type AdminImagePickerProps = {
  currentImage?: string;
  alt: string;
  fileName: string;
  fileLabel: string;
  urlName?: string;
  urlLabel?: string;
  required?: boolean;
  disabled?: boolean;
  compact?: boolean;
};

export function AdminImagePicker({
  currentImage = "",
  alt,
  fileName,
  fileLabel,
  urlName,
  urlLabel,
  required = false,
  disabled = false,
  compact = false
}: AdminImagePickerProps) {
  const [preview, setPreview] = useState(currentImage);
  const [previewError, setPreviewError] = useState(false);
  const objectUrl = useRef<string | null>(null);

  useEffect(() => () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
  }, []);

  const setPreviewUrl = (url: string) => {
    setPreview(url);
    setPreviewError(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setPreviewUrl(objectUrl.current);
  };

  return (
    <div className={`admin-image-picker${compact ? " compact" : ""}`}>
      <figure className="admin-image-preview">
        <figcaption>{preview ? "Xem trước ảnh" : "Chưa chọn ảnh"}</figcaption>
        {preview && !previewError ? (
          <img src={preview} alt={alt} onError={() => setPreviewError(true)} />
        ) : (
          <div className="admin-image-preview-empty">{previewError ? "Không thể tải ảnh từ URL này" : "Chọn ảnh để xem trước"}</div>
        )}
      </figure>

      {urlName && (
        <label>
          <span>{urlLabel || "URL ảnh"}</span>
          <input
            name={urlName}
            type="url"
            defaultValue={currentImage}
            disabled={disabled}
            onChange={(event) => setPreviewUrl(event.target.value.trim())}
          />
        </label>
      )}

      <label className="admin-file">
        <span>{fileLabel}</span>
        <input
          name={fileName}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          required={required}
          disabled={disabled}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
