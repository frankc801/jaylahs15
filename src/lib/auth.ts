import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "jaylah_admin_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing SESSION_SECRET environment variable.");
  }
  return secret;
}

function getAdminPassword() {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }
  return pwd;
}

/** Deterministic session token derived from the password + secret. */
function expectedToken() {
  return createHmac("sha256", getSecret())
    .update(`admin:${getAdminPassword()}`)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Validate a submitted password (constant-time). */
export function verifyPassword(password: string): boolean {
  return safeEqual(password, getAdminPassword());
}

/** Set the signed admin session cookie. */
export function createSession() {
  cookies().set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

/** True when the current request carries a valid admin session cookie. */
export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    return safeEqual(token, expectedToken());
  } catch {
    return false;
  }
}
