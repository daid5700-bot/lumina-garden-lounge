import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { defaultCategories, defaultGallery, defaultMenuItems, defaultMenuPages, defaultPosts, siteBase, siteTranslations } from "../lib/default-content";
import { locales } from "../lib/i18n";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "owner@909lumina.vn").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  if (!existingAdmin && !password) throw new Error("ADMIN_PASSWORD is required when creating the first admin account");
  if (existingAdmin) {
    await prisma.adminUser.update({
      where: { email },
      data: { name: "Lumina Owner", active: true, ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}) }
    });
  } else {
    await prisma.adminUser.create({ data: { email, name: "Lumina Owner", passwordHash: await bcrypt.hash(password!, 12) } });
  }

  await prisma.siteSetting.upsert({
    where: { id: "main" },
    create: siteBase,
    update: siteBase
  });
  for (const locale of locales) {
    const values = siteTranslations[locale];
    await prisma.siteTranslation.upsert({ where: { siteId_locale: { siteId: "main", locale } }, create: { siteId: "main", locale, ...values }, update: values });
  }

  for (const category of defaultCategories) {
    await prisma.menuCategory.upsert({ where: { id: category.id }, create: { id: category.id, slug: category.slug, sortOrder: category.sortOrder }, update: { slug: category.slug, sortOrder: category.sortOrder, active: true } });
    for (const locale of locales) await prisma.menuCategoryTranslation.upsert({ where: { categoryId_locale: { categoryId: category.id, locale } }, create: { categoryId: category.id, locale, name: category.name[locale] }, update: { name: category.name[locale] } });
  }

  for (const item of defaultMenuItems) {
    await prisma.menuItem.upsert({ where: { id: item.id }, create: { id: item.id, categoryId: item.categoryId, image: item.image, price: item.price, featured: item.featured, sortOrder: item.sortOrder }, update: { categoryId: item.categoryId, image: item.image, price: item.price, featured: item.featured, sortOrder: item.sortOrder, active: true } });
    for (const locale of locales) await prisma.menuItemTranslation.upsert({ where: { menuItemId_locale: { menuItemId: item.id, locale } }, create: { menuItemId: item.id, locale, name: item.name[locale], description: item.description[locale] }, update: { name: item.name[locale], description: item.description[locale] } });
  }

  for (const page of defaultMenuPages) await prisma.menuPage.upsert({ where: { id: page.id }, create: page, update: { image: page.image, alt: page.alt, sortOrder: page.sortOrder, active: true } });

  for (const gallery of defaultGallery) {
    await prisma.galleryItem.upsert({ where: { id: gallery.id }, create: { id: gallery.id, image: gallery.image, sortOrder: gallery.sortOrder }, update: { image: gallery.image, sortOrder: gallery.sortOrder, active: true } });
    for (const locale of locales) await prisma.galleryItemTranslation.upsert({ where: { galleryId_locale: { galleryId: gallery.id, locale } }, create: { galleryId: gallery.id, locale, title: gallery.title[locale], alt: gallery.alt[locale] }, update: { title: gallery.title[locale], alt: gallery.alt[locale] } });
  }

  for (const post of defaultPosts) {
    await prisma.post.upsert({ where: { id: post.id }, create: { id: post.id, slug: post.slug, coverImage: post.coverImage, published: true, featured: post.featured, publishedAt: new Date(post.publishedAt) }, update: { slug: post.slug, coverImage: post.coverImage, published: true, featured: post.featured, publishedAt: new Date(post.publishedAt) } });
    for (const locale of locales) await prisma.postTranslation.upsert({ where: { postId_locale: { postId: post.id, locale } }, create: { postId: post.id, locale, title: post.title[locale], excerpt: post.excerpt[locale], content: post.content[locale] }, update: { title: post.title[locale], excerpt: post.excerpt[locale], content: post.content[locale] } });
  }

  console.log(`Seed complete. Admin: ${email}`);
}

main().finally(() => prisma.$disconnect());
