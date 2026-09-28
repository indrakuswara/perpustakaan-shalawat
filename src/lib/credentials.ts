import bcrypt from "bcryptjs";
import { findAdminByEmail, type AdminRow } from "./db.ts";

// Logic credential murni (tanpa next/headers) — bisa di-unit-test.

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function authenticate(
  email: string,
  password: string,
): Promise<AdminRow | null> {
  const admin = await findAdminByEmail(email);
  if (!admin) return null;
  const ok = await verifyPassword(password, admin.passwordHash);
  return ok ? admin : null;
}
