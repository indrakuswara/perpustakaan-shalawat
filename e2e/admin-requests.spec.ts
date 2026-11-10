import { test, expect } from "@playwright/test";
import { runId, loginAsAdmin } from "./helpers";

// Siklus request: kirim lewat form publik, lalu ubah status + hapus
// di admin. Banner sukses harus muncul di tiap langkah (temuan UX
// 2026-11-10: tombol admin diam tanpa umpan balik, padahal aksinya
// sudah terjadi di belakang).
//
// Data isolation: satu request berjudul `E2E TEST REQ <runId>`.
// Test hapus adalah cleanup-nya; afterAll hanya jalan bila test
// hapus tidak sampai (mis. langkah status gagal).
test.describe.serial("admin requests feedback", () => {
  const id = runId();
  const title = `E2E TEST REQ ${id}`;
  let done = false;

  test.afterAll(async ({ browser }) => {
    if (done) return;
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await loginAsAdmin(page);
      await page.goto("/admin/requests");
      const row = page.locator("tr", { hasText: title });
      if (await row.count()) {
        await row
          .getByRole("button", { name: "Hapus", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Hapus permanen" })
          .click();
      }
    } catch {
      // Best effort saja; suite sudah gagal di titik lain.
    } finally {
      await context.close();
    }
  });

  test("kirim request lewat form publik", async ({ page }) => {
    await page.goto("/request-shalawat");
    await page.locator("#req-name").fill("E2E");
    await page.locator("#req-title").fill(title);
    await page.getByRole("button", { name: "Kirim Request" }).click();
    await expect(page.getByText("Terima kasih")).toBeVisible();
  });

  test("ubah status menampilkan banner sukses", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/requests?status=baru");
    const row = page.locator("tr", { hasText: title });
    await row.getByRole("button", { name: "Selesai", exact: true }).click();
    // Redirect mempertahankan filter (temuan reviewer I3).
    await expect(page).toHaveURL(/status=baru&updated=1/);
    await expect(page.getByText("Status request diperbarui.")).toBeVisible();
  });

  test("hapus request menampilkan banner sukses", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/requests");
    const row = page.locator("tr", { hasText: title });
    await row.getByRole("button", { name: "Hapus", exact: true }).click();
    await page.getByRole("button", { name: "Hapus permanen" }).click();
    await expect(page.getByText("Request dihapus.")).toBeVisible();
    done = true;
  });
});
