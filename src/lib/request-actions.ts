"use server";

// Server action pengiriman request publik (tanpa login).
// Alur sesuai spec §4–§7: honeypot -> validasi -> batas kirim per IP
// -> cek judul ke artikel terbit -> tolak duplikat antrian -> simpan.

import { headers } from "next/headers";
import {
  createRequest,
  findPendingRequestDuplicate,
  listPublishedContents,
  listRequestHitTimes,
  recordRequestHit,
} from "@/lib/db";
import { parseDbDateTime } from "@/lib/db-types";
import {
  findMatchingArticles,
  hashIp,
  isHoneypotTriggered,
  isRateLimited,
  normalizeTitle,
  validateRequestInput,
  RATE_LIMIT_WINDOW_MS,
  type RequestKind,
} from "@/lib/requests";

export type SubmitRequestState =
  | { status: "idle" }
  | {
      status: "error";
      errors: { name?: string; title?: string; note?: string };
    }
  | { status: "found"; articles: { title: string; slug: string }[] }
  | { status: "saved" }
  | { status: "duplicate" }
  | { status: "limited" };

export async function submitRequestAction(
  _prev: SubmitRequestState,
  formData: FormData,
): Promise<SubmitRequestState> {
  // Honeypot: kolom "website" disembunyikan dari manusia; bot yang
  // mengisinya ditolak diam-diam — tampil seperti sukses, tidak disimpan,
  // tidak dihitung ke batas kirim.
  if (isHoneypotTriggered(formData.get("website"))) {
    return { status: "saved" };
  }

  const kindRaw = String(formData.get("kind") ?? "");
  if (kindRaw !== "shalawat" && kindRaw !== "maulid") {
    return { status: "error", errors: { title: "Jenis request tidak valid." } };
  }
  const kind: RequestKind = kindRaw;

  const validation = validateRequestInput({
    name: formData.get("name"),
    title: formData.get("title"),
    note: formData.get("note"),
  });
  if (!validation.ok) return { status: "error", errors: validation.errors };
  const { name, title, note } = validation.value;

  // Batas kirim per IP (IP hanya disimpan sebagai hash).
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const ipHash = hashIp(ip);
  const now = Date.now();
  const sinceIso = new Date(now - RATE_LIMIT_WINDOW_MS).toISOString();
  const hitTimes = (await listRequestHitTimes(ipHash, sinceIso)).map((t) =>
    parseDbDateTime(t).getTime(),
  );
  if (isRateLimited(hitTimes, now)) return { status: "limited" };
  await recordRequestHit(ipHash, sinceIso);

  // Cek otomatis: judul yang sudah terbit diarahkan ke artikelnya,
  // request tidak disimpan (spec §5).
  const published = await listPublishedContents(
    kind === "shalawat" ? "SHALAWAT" : "MAULID",
  );
  const matches = findMatchingArticles(title, published);
  if (matches.length > 0) return { status: "found", articles: matches };

  // Duplikat persis yang masih menunggu di antrian (spec §7).
  const duplicate = await findPendingRequestDuplicate(
    kind,
    normalizeTitle(title),
    name,
  );
  if (duplicate) return { status: "duplicate" };

  await createRequest({ kind, name, title, note });
  return { status: "saved" };
}
