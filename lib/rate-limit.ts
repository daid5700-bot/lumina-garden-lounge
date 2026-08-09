import { headers } from "next/headers";

type RateLimitEntry = { count: number; resetAt: number };

const globalRateLimit = globalThis as typeof globalThis & { luminaRateLimit?: Map<string, RateLimitEntry> };
const store = globalRateLimit.luminaRateLimit ?? new Map<string, RateLimitEntry>();

if (process.env.NODE_ENV !== "production") globalRateLimit.luminaRateLimit = store;

function cleanup(now: number) {
  if (store.size < 2_000) return;
  for (const [key, value] of store) {
    if (value.resetAt <= now) store.delete(key);
  }
}

async function visitorKey() {
  const requestHeaders = await headers();
  return requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    || requestHeaders.get("x-real-ip")
    || "unknown";
}

/**
 * Instance-level safeguard for costly Server Actions. Configure Vercel WAF as
 * the shared, edge-level limit for production traffic.
 */
export async function consumeRateLimit(scope: string, limit: number, windowMs: number) {
  const now = Date.now();
  cleanup(now);
  const key = `${scope}:${await visitorKey()}`;
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1_000) };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
