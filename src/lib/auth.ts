import { cookies } from "next/headers";
import { findAdminById, type AdminRow } from "./db.ts";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSessionToken,
  verifySessionToken,
} from "./session.ts";

// Session cookie (butuh Next.js runtime via next/headers).

export async function createSession(adminId: string): Promise<void> {
  const token = await signSessionToken(adminId);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionAdminId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentAdmin(): Promise<AdminRow | null> {
  const adminId = await getSessionAdminId();
  if (!adminId) return null;
  return findAdminById(adminId);
}
