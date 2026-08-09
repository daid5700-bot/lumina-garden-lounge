import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

if (!process.env.DATABASE_URL) {
  const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
  if (!POSTGRES_HOST || !POSTGRES_USER || POSTGRES_PASSWORD === undefined || !POSTGRES_DATABASE) {
    console.error("Missing DATABASE_URL or POSTGRES_HOST/POSTGRES_USER/POSTGRES_PASSWORD/POSTGRES_DATABASE in .env");
    process.exit(1);
  }
  const auth = `${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}`;
  process.env.DATABASE_URL = `postgresql://${auth}@${POSTGRES_HOST}:${POSTGRES_PORT || "5432"}/${encodeURIComponent(POSTGRES_DATABASE)}?sslmode=require`;
}

const prismaCli = resolve("node_modules/prisma/build/index.js");
const result = spawnSync(process.execPath, [prismaCli, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env
});

process.exit(result.status ?? 1);
