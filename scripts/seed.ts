import bcrypt from "bcryptjs";
import { upsertAdmin } from "../src/lib/db.ts";

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@perpustakaan.local")
    .toLowerCase()
    .trim();
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  if (!process.env.ADMIN_PASSWORD) {
    console.warn("ADMIN_PASSWORD tidak di-set, pakai default dev.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await upsertAdmin(email, passwordHash, "ADMIN");
  console.log(`Admin siap: ${admin.email}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
