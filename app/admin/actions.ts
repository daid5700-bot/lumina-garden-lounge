"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { locales } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uploadImageToR2 } from "@/lib/r2";

const text = (data: FormData, key: string) => String(data.get(key) || "").trim();
const checked = (data: FormData, key: string) => data.get(key) === "on";

async function imageValue(data: FormData, key = "image") {
  const file = data.get(`${key}File`);
  if (file instanceof File && file.size > 0) {
    return uploadImageToR2(file);
  }
  return text(data, `${key}Url`) || text(data, `current${key[0].toUpperCase()}${key.slice(1)}`);
}

function revalidatePublic() {
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/menu`);
    revalidatePath(`/${locale}/gallery`);
    revalidatePath(`/${locale}/news`);
  }
}

export async function updateSiteAction(data: FormData) {
  await requireAdmin();
  const heroImage = await imageValue(data, "heroImage");
  await prisma.siteSetting.upsert({
    where: { id: "main" },
    create: { id: "main", siteName: text(data, "siteName"), heroImage, heroVideo: text(data, "heroVideo") || null, phone: text(data, "phone"), zalo: text(data, "zalo"), messenger: text(data, "messenger") || null, email: text(data, "email") || null, address: text(data, "address"), mapUrl: text(data, "mapUrl") || null, openingHours: text(data, "openingHours"), facebook: text(data, "facebook") || null, instagram: text(data, "instagram") || null },
    update: { siteName: text(data, "siteName"), heroImage, heroVideo: text(data, "heroVideo") || null, phone: text(data, "phone"), zalo: text(data, "zalo"), messenger: text(data, "messenger") || null, email: text(data, "email") || null, address: text(data, "address"), mapUrl: text(data, "mapUrl") || null, openingHours: text(data, "openingHours"), facebook: text(data, "facebook") || null, instagram: text(data, "instagram") || null }
  });
  const keys = ["seoTitle", "seoDescription", "heroEyebrow", "heroTitle", "heroSubtitle", "aboutTitle", "aboutHeading", "aboutBody", "aboutBodySecondary", "aboutFeatureOne", "aboutFeatureTwo", "aboutFeatureThree", "featureOneTitle", "featureOneBody", "featureTwoTitle", "featureTwoBody", "featureThreeTitle", "featureThreeBody", "contactTitle", "contactDescription"] as const;
  await Promise.all(locales.map((locale) => {
    const values = Object.fromEntries(keys.map((key) => [key, text(data, `${locale}_${key}`)])) as Record<(typeof keys)[number], string>;
    return prisma.siteTranslation.upsert({ where: { siteId_locale: { siteId: "main", locale } }, create: { siteId: "main", locale, ...values }, update: values });
  }));
  revalidatePublic(); revalidatePath("/admin/settings");
}

export async function upsertCategoryAction(data: FormData) {
  await requireAdmin();
  const id = text(data, "id");
  const base = { slug: text(data, "slug"), sortOrder: Number(text(data, "sortOrder") || 0), active: checked(data, "active") };
  const category = id ? await prisma.menuCategory.update({ where: { id }, data: base }) : await prisma.menuCategory.create({ data: base });
  await Promise.all(locales.map((locale) => prisma.menuCategoryTranslation.upsert({ where: { categoryId_locale: { categoryId: category.id, locale } }, create: { categoryId: category.id, locale, name: text(data, `${locale}_name`) }, update: { name: text(data, `${locale}_name`) } })));
  revalidatePublic(); revalidatePath("/admin/menu");
}

export async function deleteCategoryAction(data: FormData) { await requireAdmin(); await prisma.menuCategory.delete({ where: { id: text(data, "id") } }); revalidatePublic(); revalidatePath("/admin/menu"); }

export async function upsertMenuItemAction(data: FormData) {
  await requireAdmin();
  const id = text(data, "id");
  const image = await imageValue(data);
  const base = { categoryId: text(data, "categoryId"), image: image || null, price: Number(text(data, "price") || 0), currency: "VND", featured: checked(data, "featured"), active: checked(data, "active"), sortOrder: Number(text(data, "sortOrder") || 0) };
  const item = id ? await prisma.menuItem.update({ where: { id }, data: base }) : await prisma.menuItem.create({ data: base });
  await Promise.all(locales.map((locale) => prisma.menuItemTranslation.upsert({ where: { menuItemId_locale: { menuItemId: item.id, locale } }, create: { menuItemId: item.id, locale, name: text(data, `${locale}_name`), description: text(data, `${locale}_description`) || null }, update: { name: text(data, `${locale}_name`), description: text(data, `${locale}_description`) || null } })));
  revalidatePublic(); revalidatePath("/admin/menu");
}

export async function deleteMenuItemAction(data: FormData) { await requireAdmin(); await prisma.menuItem.delete({ where: { id: text(data, "id") } }); revalidatePublic(); revalidatePath("/admin/menu"); }

export async function upsertMenuPageAction(data: FormData) {
  await requireAdmin();
  const id = text(data, "id"); const image = await imageValue(data);
  const base = { image, alt: text(data, "alt") || "Menu page", sortOrder: Number(text(data, "sortOrder") || 0), active: checked(data, "active") };
  if (id) await prisma.menuPage.update({ where: { id }, data: base }); else await prisma.menuPage.create({ data: base });
  revalidatePublic(); revalidatePath("/admin/menu");
}
export async function deleteMenuPageAction(data: FormData) { await requireAdmin(); await prisma.menuPage.delete({ where: { id: text(data, "id") } }); revalidatePublic(); revalidatePath("/admin/menu"); }

export async function upsertGalleryAction(data: FormData) {
  await requireAdmin(); const id = text(data, "id"); const image = await imageValue(data);
  const base = { image, sortOrder: Number(text(data, "sortOrder") || 0), active: checked(data, "active") };
  const item = id ? await prisma.galleryItem.update({ where: { id }, data: base }) : await prisma.galleryItem.create({ data: base });
  if (!id) await Promise.all(locales.map((locale) => prisma.galleryItemTranslation.create({ data: { galleryId: item.id, locale, title: "Gallery", alt: "Gallery image" } })));
  revalidatePublic(); revalidatePath("/admin/gallery");
}
export async function deleteGalleryAction(data: FormData) { await requireAdmin(); await prisma.galleryItem.delete({ where: { id: text(data, "id") } }); revalidatePublic(); revalidatePath("/admin/gallery"); }

export async function upsertPostAction(data: FormData) {
  await requireAdmin(); const id = text(data, "id"); const coverImage = await imageValue(data, "coverImage");
  const dateValue = text(data, "publishedAt");
  const base = { slug: text(data, "slug"), coverImage, published: checked(data, "published"), featured: checked(data, "featured"), publishedAt: dateValue ? new Date(`${dateValue}T12:00:00`) : null };
  const post = id ? await prisma.post.update({ where: { id }, data: base }) : await prisma.post.create({ data: base });
  await Promise.all(locales.map((locale) => prisma.postTranslation.upsert({ where: { postId_locale: { postId: post.id, locale } }, create: { postId: post.id, locale, title: text(data, `${locale}_title`), excerpt: text(data, `${locale}_excerpt`), content: text(data, `${locale}_content`), metaTitle: text(data, `${locale}_metaTitle`) || null, metaDescription: text(data, `${locale}_metaDescription`) || null }, update: { title: text(data, `${locale}_title`), excerpt: text(data, `${locale}_excerpt`), content: text(data, `${locale}_content`), metaTitle: text(data, `${locale}_metaTitle`) || null, metaDescription: text(data, `${locale}_metaDescription`) || null } })));
  revalidatePublic(); revalidatePath("/admin/posts");
}
export async function deletePostAction(data: FormData) { await requireAdmin(); await prisma.post.delete({ where: { id: text(data, "id") } }); revalidatePublic(); revalidatePath("/admin/posts"); }

export async function updateBookingStatusAction(data: FormData) {
  await requireAdmin();
  const status = text(data, "status") as "NEW" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  await prisma.booking.update({ where: { id: text(data, "id") }, data: { status } });
  revalidatePath("/admin"); revalidatePath("/admin/bookings");
}
