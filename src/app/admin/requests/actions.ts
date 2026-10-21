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

export async function setRequestStatusAction(
  id: string,
  status: RequestStatus,
): Promise<void> {
  await requireAdmin();
  await updateRequestStatus(id, parseStatus(status));
  revalidatePath("/admin/requests");
}

export async function deleteRequestAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteRequest(id);
  revalidatePath("/admin/requests");
}
