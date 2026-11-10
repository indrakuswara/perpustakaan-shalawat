"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { deleteRequest, updateRequestStatus } from "@/lib/db";
import type { RequestStatus } from "@/lib/requests";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login?next=%2Fadmin%2Frequests");
}

function parseStatus(raw: unknown): RequestStatus {
  if (raw === "baru" || raw === "selesai" || raw === "ditolak") return raw;
  throw new Error("Status request tidak valid");
}

// Redirect ke daftar request dengan parameter sukses, sambil
// mempertahankan filter aktif pemanggil (temuan reviewer I3).
// Nilai yang tidak dikenal diabaikan.
function requestsRedirect(flag: string, formData: FormData): never {
  const params = new URLSearchParams();
  const kind = formData.get("returnKind");
  const status = formData.get("returnStatus");
  if (kind === "shalawat" || kind === "maulid") params.set("kind", kind);
  if (status === "baru" || status === "selesai" || status === "ditolak")
    params.set("status", status);
  params.set(flag, "1");
  return redirect(`/admin/requests?${params.toString()}`);
}

export async function setRequestStatusAction(
  id: string,
  status: RequestStatus,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await updateRequestStatus(id, parseStatus(status));
  revalidatePath("/admin/requests");
  // Sebelumnya tidak ada redirect: halaman me-render ulang di tempat
  // tanpa umpan balik apa pun. Redirect membawa ?updated=1 yang
  // memicu banner sukses di daftar request.
  requestsRedirect("updated", formData);
}

export async function deleteRequestAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await deleteRequest(id);
  revalidatePath("/admin/requests");
  requestsRedirect("deleted", formData);
}
