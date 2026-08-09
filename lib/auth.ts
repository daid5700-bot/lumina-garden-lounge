import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "lumina_admin";
const MAX_AGE = 60 * 60 * 8;
type SessionPayload = { sub: string; email: string; name: string; exp: number };

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value && process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET is required in production");
  return value || "development-only-lumina-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export async function createAdminSession(user: { id: string; email: string; name: string }) {
  const payload: SessionPayload = { sub: user.id, email: user.email, name: user.name, exp: Math.floor(Date.now() / 1000) + MAX_AGE };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const token = `${encoded}.${sign(encoded)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: MAX_AGE, priority: "high" });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as SessionPayload;
    return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function destroyAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
