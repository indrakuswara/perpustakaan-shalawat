import { test, expect } from "@playwright/test";
import {
  runId,
  testTitle,
  slugify,
  loginAsAdmin,
  createDraftArticle,
  publishArticle,
  unpublishArticle,
  deleteArticle,
  cleanupArticle,
} from "./helpers";

// Full admin CRUD lifecycle against the deployed target, including
// production. This is the suite Juple approved on 2026-10-27 to
// replace read-only-only production checks.
//
// Data isolation: exactly one article, titled `E2E TEST <runId>`,
// is created by this file. Cleanup only ever touches that article,
// by the id captured at creation time. If any step fails, the final
// cleanup test and the afterAll safety net still attempt to remove it,
// and the suite fails if test data is left behind.
test.describe.serial("admin CRUD lifecycle", () => {
  const id = runId();
  const title = testTitle(id);
  // The slug the app actually assigns is discovered after publish
  // (see the publish test). This computed value is only used for
  // the draft-phase checks, where the article is not public yet.
  let slug = slugify(title);
  const editedDescription = `Deskripsi dummy yang sudah diedit untuk ${title}.`;
  let articleId: string | null = null;
  let deleted = false;

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test.afterAll(async ({ browser }) => {
    if (deleted || !articleId) return;
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await cleanupArticle(page, articleId);
    } finally {
      await context.close();
    }
  });

  test("creates a draft article", async ({ page }) => {
    await test.step("Buat artikel draft", async () => {
      const created = await createDraftArticle(page, title);
      articleId = created.id;
    });
    await test.step("Verifikasi halaman edit dan status Draft", async () => {
      // Assert the captured id is a real article id, not the "new"
      // form segment. Do NOT assert created.slug here: that value is
      // computed by the same helper, so the assertion would be
      // tautological. The real slug is discovered after publish.
      expect(articleId).toMatch(/^[0-9a-f-]{36}$/);
      await expect(page.getByRole("heading", { name: "Edit artikel" })).toBeVisible();
      await expect(page.getByText("Draft", { exact: true }).first()).toBeVisible();
    });
  });

  test("draft is not visible publicly", async ({ page, request }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Detail draft mengembalikan 404", async () => {
      const detail = await request.get(`/baca/${slug}`);
      expect(detail.status()).toBe(404);
    });
    await test.step("Draft tidak ada di daftar, pencarian, dan sitemap", async () => {
      await page.goto("/shalawat");
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
      await page.goto(`/search?q=${encodeURIComponent(id)}`);
      await expect(page.getByText(/Tidak ada hasil untuk/)).toBeVisible();
      const sitemap = await request.get("/sitemap.xml");
      expect(await sitemap.text()).not.toContain(`/baca/${slug}`);
    });
  });

  test("admin preview renders the draft", async ({ page }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Buka pratinjau draft", async () => {
      await page.goto(`/admin/articles/${articleId}/preview`);
      await expect(
        page.getByText("Pratinjau draft", { exact: false }),
      ).toBeVisible();
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    });
  });

  test("edits the draft description", async ({ page }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Simpan deskripsi yang diedit", async () => {
      await page.goto(`/admin/articles/${articleId}`);
      await page.locator("#description").fill(editedDescription);
      // Do NOT waitForURL here: the update action redirects to this
      // same URL, so that wait returns immediately and preview could
      // still show the pre-save description on a slow run. Wait for
      // the server-action POST to complete instead, which only happens
      // after the save has landed.
      await Promise.all([
        page.waitForResponse(
          (r) =>
            r.request().method() === "POST" &&
            r.url().includes(`/admin/articles/${articleId}`),
        ),
        page.getByRole("button", { name: "Simpan perubahan" }).click(),
      ]);
    });
    await test.step("Verifikasi deskripsi baru di pratinjau", async () => {
      await page.goto(`/admin/articles/${articleId}/preview`);
      await expect(page.getByText(editedDescription)).toBeVisible();
    });
  });

  test("publishes the article and it appears publicly", async ({ page }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Publish artikel", async () => {
      await publishArticle(page, articleId!);
    });
    await test.step("Verifikasi kartu di daftar shalawat", async () => {
      await page.goto("/shalawat");
      const card = page
        .locator('a[href^="/baca/"]')
        .filter({ has: page.locator("h3", { hasText: title }) })
        .first();
      await expect(card).toBeVisible();
      // Discover the slug the app actually assigned, instead of
      // trusting the helper's computed slug. This stays correct even
      // if the app appended a "-2" suffix on a slug collision.
      const href = await card.getAttribute("href");
      if (href) slug = href.replace("/baca/", "");
    });
    await test.step("Verifikasi detail dan pencarian publik", async () => {
      await page.goto(`/baca/${slug}`);
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(page.getByText(editedDescription)).toBeVisible();
      await page.goto(`/search?q=${encodeURIComponent(id)}`);
      await expect(page.getByRole("link", { name: new RegExp(title) }).first()).toBeVisible();
    });
  });

  test("unpublishes the article and it disappears publicly", async ({ page, request }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Jadikan draft lagi", async () => {
      await unpublishArticle(page, articleId!);
    });
    await test.step("Verifikasi artikel hilang dari publik", async () => {
      const detail = await request.get(`/baca/${slug}`);
      expect(detail.status()).toBe(404);
      await page.goto("/shalawat");
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
    });
  });

  test("deletes the article", async ({ page }) => {
    test.skip(articleId === null, "create step did not produce an article id");
    await test.step("Hapus artikel permanen", async () => {
      await deleteArticle(page, articleId!);
      deleted = true;
    });
    await test.step("Verifikasi artikel hilang dari daftar admin", async () => {
      await page.goto("/admin/articles");
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
    });
  });

  test("cleanup: no test article remains", async ({ page }) => {
    await test.step("Hapus sisa artikel tes bila ada", async () => {
      if (!deleted && articleId) {
        await cleanupArticle(page, articleId);
        deleted = true;
      }
    });
    await test.step("Verifikasi tidak ada sisa artikel tes", async () => {
      await page.goto("/admin/articles");
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
    });
  });
});
