const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const supportedImages = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"]
]);

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const apiToken = process.env.R2_API_TOKEN?.trim();
  const bucketName = process.env.R2_BUCKET_NAME?.trim();
  const publicUrl = process.env.R2_PUBLIC_URL?.trim();

  if (!accountId || !apiToken || !bucketName || !publicUrl) {
    throw new Error("Cloudflare R2 chưa được cấu hình đầy đủ.");
  }

  return { accountId, apiToken, bucketName, publicUrl: publicUrl.replace(/\/+$/, "") };
}

export async function uploadImageToR2(file: File) {
  if (file.size > MAX_IMAGE_SIZE) throw new Error("Ảnh vượt quá 8MB");

  const extension = supportedImages.get(file.type);
  if (!extension) throw new Error("Chỉ chấp nhận ảnh JPG, PNG, WEBP, GIF hoặc AVIF");

  const { accountId, apiToken, bucketName, publicUrl } = getR2Config();
  const prefix = (process.env.R2_UPLOAD_PREFIX || "909-lumina").replace(/^\/+|\/+$/g, "");
  const objectKey = `${prefix ? `${prefix}/` : ""}${crypto.randomUUID()}.${extension}`;
  const objectPath = objectKey.split("/").map(encodeURIComponent).join("/");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/r2/buckets/${encodeURIComponent(bucketName)}/objects/${objectPath}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": file.type
    },
    body: Buffer.from(await file.arrayBuffer()),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Không thể tải ảnh lên Cloudflare R2 (mã ${response.status})`);
  }

  return `${publicUrl}/${objectPath}`;
}
