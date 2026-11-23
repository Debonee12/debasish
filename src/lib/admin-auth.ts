import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "dc_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "ward4-admin-2026";
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || `${getPassword()}-session-signing-key`;
}

export function isUsingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = getPassword();
  const a = Buffer.from(candidate, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createAdminSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const nonce = crypto.randomBytes(12).toString("hex");
  const payload = `${exp}.${nonce}`;
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const payload = `${expStr}.${nonce}`;
  const expectedSig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expectedSig, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}
