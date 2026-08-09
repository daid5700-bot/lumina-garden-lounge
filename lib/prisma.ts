import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databaseUrlFromParts() {
  const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
  if (!POSTGRES_HOST || !POSTGRES_USER || POSTGRES_PASSWORD === undefined || !POSTGRES_DATABASE) return null;
  const auth = `${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}`;
  return `postgresql://${auth}@${POSTGRES_HOST}:${POSTGRES_PORT || "5432"}/${encodeURIComponent(POSTGRES_DATABASE)}?sslmode=require`;
}

if (!process.env.DATABASE_URL) {
  const url = databaseUrlFromParts();
  if (url) process.env.DATABASE_URL = url;
}

export const databaseConfigured = Boolean(process.env.DATABASE_URL);

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
