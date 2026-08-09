import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

if (!process.env.DATABASE_URL) {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || DB_PASSWORD === undefined || !DB_NAME) {
    console.error("Missing DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME in .env");
    process.exit(1);
  }
  const auth = `${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}`;
  process.env.DATABASE_URL = `mysql://${auth}@${DB_HOST}:${DB_PORT || "3306"}/${encodeURIComponent(DB_NAME)}`;
}

const prismaCli = resolve("node_modules/prisma/build/index.js");
const result = spawnSync(process.execPath, [prismaCli, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env
});

process.exit(result.status ?? 1);
