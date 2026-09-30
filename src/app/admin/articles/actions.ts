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
  redirect(`/admin/articles/${id}`);
}

export async function publishArticleAction(id: string): Promise<void> {
  await requireAdmin();
  await publishContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  redirect("/admin/articles");
}

export async function unpublishArticleAction(id: string): Promise<void> {
  await requireAdmin();
  await unpublishContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteContent(id);
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  redirect("/admin/articles");
}
