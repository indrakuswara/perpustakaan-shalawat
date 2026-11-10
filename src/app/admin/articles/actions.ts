"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createContent,
  updateContent,
  publishContent,
  unpublishContent,
  deleteContent,
  type ContentType,
} from "@/lib/db";
import {
  parseBlocks,
  blocksToPlainText,
  type ArticleBlocks,
} from "@/lib/db-types";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login?next=%2Fadmin%2Farticles");
}

function parseType(raw: FormDataEntryValue | null): ContentType {
  const t = String(raw ?? "");
  if (t !== "SHALAWAT" && t !== "MAULID") throw new Error("Tipe tidak valid");
  return t;
}

function parseBlocksField(raw: FormDataEntryValue | null): ArticleBlocks {
  let json: unknown;
  try {
    json = JSON.parse(String(raw ?? ""));
  } catch {
    throw new Error("Data blok tidak valid");
  }
  return parseBlocks(json);
}

// Redirect ke daftar artikel dengan parameter sukses, sambil
// mempertahankan filter status aktif pemanggil (temuan reviewer I3:
// redirect polos me-reset filter). Nilai returnStatus yang tidak
// dikenal diabaikan, jadi input form tidak pernah bisa mengarahkan
// ke URL sembarangan.
function articlesRedirect(flag: string, formData: FormData): never {
  const params = new URLSearchParams();
  const ret = formData.get("returnStatus");
  if (ret === "DRAFT" || ret === "PUBLISHED") params.set("status", ret);
  params.set(flag, "1");
  return redirect(`/admin/articles?${params.toString()}`);
}

export async function createArticleAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const blocks = parseBlocksField(formData.get("blocks"));
  const article = await createContent({
    title: String(formData.get("title") ?? ""),
    type: parseType(formData.get("type")),
    description: String(formData.get("description") ?? ""),
    body: blocksToPlainText(blocks),
    blocks,
  });
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  redirect(`/admin/articles/${article.id}`);
}

export async function updateArticleAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const blocks = parseBlocksField(formData.get("blocks"));
  await updateContent(id, {
    title: String(formData.get("title") ?? ""),
    type: parseType(formData.get("type")),
    description: String(formData.get("description") ?? ""),
    body: blocksToPlainText(blocks),
    blocks,
  });
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  // ?saved=1 memicu banner "Perubahan tersimpan." di halaman edit:
  // tanpa itu, redirect balik ke halaman yang persis sama membuat
  // penyimpanan yang berhasil terlihat seperti tidak terjadi apa-apa.
  redirect(`/admin/articles/${id}?saved=1`);
}

export async function publishArticleAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await publishContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  // Parameter memicu banner sukses di daftar artikel.
  articlesRedirect("published", formData);
}

export async function unpublishArticleAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await unpublishContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  articlesRedirect("unpublished", formData);
}

export async function deleteArticleAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  await deleteContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  articlesRedirect("deleted", formData);
}
