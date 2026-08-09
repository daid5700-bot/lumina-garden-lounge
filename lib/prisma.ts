import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databaseUrlFromParts() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || DB_PASSWORD === undefined || !DB_NAME) return null;
  const auth = `${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}`;
  return `mysql://${auth}@${DB_HOST}:${DB_PORT || "3306"}/${encodeURIComponent(DB_NAME)}`;
}

if (!process.env.DATABASE_URL) {
  const url = databaseUrlFromParts();
  if (url) process.env.DATABASE_URL = url;
}

export const databaseConfigured = Boolean(process.env.DATABASE_URL);

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
