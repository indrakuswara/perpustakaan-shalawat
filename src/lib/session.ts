import { SignJWT, jwtVerify } from "jose";

// Modul ini edge-safe (tanpa db / bcrypt / next/headers)
// sehingga bisa dipakai di middleware.

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET belum di-set di .env");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(adminId: string): Promise<string> {
  return new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return typeof payload.adminId === "string" ? payload.adminId : null;
  } catch {
    return null;
  }
}
