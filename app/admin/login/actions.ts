"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  let user: { id: string; email: string; name: string; passwordHash?: string } | null = null;

  if (process.env.DATABASE_URL) {
    try {
      const record = await prisma.adminUser.findUnique({ where: { email } });
      if (record?.active && await bcrypt.compare(password, record.passwordHash)) user = record;
    } catch (error) {
      console.error("Database login failed", error);
    }
  } else if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && email === process.env.ADMIN_EMAIL.toLowerCase() && password === process.env.ADMIN_PASSWORD) {
    user = { id: "env-owner", email, name: "Lumina Owner" };
  }

  if (!user) redirect("/admin/login?error=invalid");
  await createAdminSession(user);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
