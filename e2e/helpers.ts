import type { Page } from "@playwright/test";

// Helpers for the Perpustakaan deploy-validation suite.
//
// Safety rules (approved 2026-10-27):
// - Test data is always marked E2E-TEST and unique per run.
// - Cleanup may ONLY delete data carrying that mark for this run.
// - Credentials come from the environment, never from code.
// - If admin credentials are missing, the CRUD suite must fail loudly,
//   never silently downgrade to read-only checks.

export function runId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const fromEnv = (process.env.E2E_RUN_ID ?? "").trim();
  if (fromEnv) {
    const slug = slugify(fromEnv);
    // Always append a random suffix, even for a supplied run id:
    // reusing a run id (or an orphan with the same title) would
    // otherwise make the app assign a "-2" slug, and every later
    // public assertion would target a slug that does not exist.
    // An empty slug falls back to the generated id.
    return slug ? `${slug}-${rand}` : `${Date.now()}-${rand}`;
  }
  return `${Date.now()}-${rand}`;
}

export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "artikel";
}

export function testTitle(id: string): string {
  return `E2E TEST ${id}`;
}

export function adminCredentials(): { email: string; password: string } {
  const email = (process.env.E2E_ADMIN_EMAIL ?? "").trim();
  const password = process.env.E2E_ADMIN_PASSWORD ?? "";
  if (!email || !password) {
    throw new Error(
      "E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD must be set to run the admin CRUD suite. " +
        "Refusing to silently downgrade to read-only checks.",
    );
  }
  return { email, password };
}

export async function loginAsAdmin(page: Page): Promise<void> {
  const { email, password } = adminCredentials();
  await page.goto("/admin/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Masuk" }).click();
  await page.getByRole("heading", { name: "Dashboard Admin" }).waitFor();
}

export async function createDraftArticle(
  page: Page,
  title: string,
): Promise<{ id: string; slug: string }> {
  await page.goto("/admin/articles/new");
  await page.locator("#title").fill(title);
  await page.locator("#description").fill(`Deskripsi dummy untuk ${title}.`);
  await page
    .getByLabel("Judul bagian 1")
    .fill("Bagian dummy");
  await page
    .getByPlaceholder("Teks biasa / keterangan…")
    .fill(`Isi dummy untuk ${title}. Bukan konten asli.`);
  await page
    .getByRole("button", { name: "Simpan sebagai draft" })
    .click();
  // Do NOT wait for /admin/articles/<something>: the "new" form URL
  // itself already matches that pattern, which previously captured
  // the literal id "new". Wait for the edit page heading instead,
  // then read the real uuid from the URL.
  await page.getByRole("heading", { name: "Edit artikel" }).waitFor();
  const id = page.url().split("/admin/articles/")[1].split("?")[0];
  if (!id || id === "new") {
    throw new Error(`Could not read created article id from URL: ${page.url()}`);
  }
  return { id, slug: slugify(title) };
}

export async function publishArticle(page: Page, id: string): Promise<void> {
  await page.goto(`/admin/articles/${id}`);
  await page
    .getByRole("button", { name: "Publish sekarang" })
    .click();
  await page.waitForURL("/admin/articles");
}

export async function unpublishArticle(page: Page, id: string): Promise<void> {
  await page.goto(`/admin/articles/${id}`);
  const button = page.getByRole("button", { name: "Jadikan draft lagi" });
  if (await button.count()) {
    await button.click();
    await page.waitForURL("/admin/articles");
  }
}

export async function deleteArticle(page: Page, id: string): Promise<void> {
  const response = await page.goto(`/admin/articles/${id}`);
  // Guard for cleanup paths: if this id is already gone, the edit
  // page is a 404 and there is nothing to delete. Without this guard
  // a stray click would wait out Playwright's timeout and blow up
  // the afterAll cleanup hook. The heading check stays as a
  // fallback for soft-404 rendering.
  if (
    response?.status() === 404 ||
    (await page.getByRole("heading", { name: "Edit artikel" }).count()) === 0
  ) {
    return;
  }
  // The edit page has two buttons named "Hapus": the BlocksEditor's
  // "delete section" button and the article delete button. Only the
  // article one carries the red text class, so scope to it to avoid
  // a strict-mode violation.
  await page.locator('button[class*="text-red-600"]', { hasText: "Hapus" }).click();
  await page
    .getByRole("button", { name: "Hapus permanen" })
    .click();
  await page.waitForURL("/admin/articles");
}

// Best-effort cleanup used from afterAll. It only ever deletes the
// article created by this run (by id, captured at creation time).
// It must never delete by a broad title search.
export async function cleanupArticle(page: Page, id: string | null): Promise<void> {
  if (!id) return;
  try {
    await loginAsAdmin(page);
  } catch {
    return;
  }
  try {
    await unpublishArticle(page, id);
  } catch {
    // Already a draft, already deleted, or page moved on; try delete anyway.
  }
  try {
    await deleteArticle(page, id);
  } catch {
    // Already deleted. Nothing left to clean.
  }
}
