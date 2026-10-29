import { test, expect } from "@playwright/test";

// Read-only public smoke checks. These need no credentials and are
// safe to run against any deploy, including production.
//
// Every check is wrapped in test.step() calls: those steps are what
// the owner report page shows per test, because the JSON reporter
// only records explicit steps (plain page.goto/expect calls do not
// appear in the JSON report).
test.describe("public smoke", () => {
  test("homepage renders", async ({ page }) => {
    await test.step("Buka beranda", async () => {
      await page.goto("/");
    });
    await test.step("Judul situs tampil", async () => {
      await expect(
        page.getByRole("heading", {
          name: "Perpustakaan Digital Shalawat & Maulid",
        }),
      ).toBeVisible();
    });
  });

  test("shalawat and maulid listings render", async ({ page }) => {
    await test.step("Buka daftar shalawat", async () => {
      await page.goto("/shalawat");
      await expect(
        page.getByRole("heading", { name: "Shalawat" }).first(),
      ).toBeVisible();
    });
    await test.step("Buka daftar maulid", async () => {
      await page.goto("/maulid");
      await expect(
        page.getByRole("heading", { name: "Maulid" }).first(),
      ).toBeVisible();
    });
  });

  // Published-article checks discover content instead of hardcoding a
  // title: the local/CI database starts empty, while production has
  // real articles. If an environment has no published articles at all,
  // these two tests skip honestly instead of failing on missing seed
  // data. The admin CRUD suite always exercises baca rendering with
  // its own published test article, so this path is never untested
  // when the full suite runs.
  test("a published article renders", async ({ page }) => {
    const firstCard = await test.step("Cari kartu artikel pertama", async () => {
      await page.goto("/shalawat");
      return page.locator('a[href^="/baca/"]').first();
    });
    if ((await firstCard.count()) === 0) {
      test.skip(true, "no published articles in this environment");
    }
    await test.step("Buka detail artikel", async () => {
      await firstCard.click();
      await expect(page).toHaveURL(/\/baca\//);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  });

  test("search finds a published article", async ({ page }) => {
    const found = await test.step("Cari artikel pertama", async () => {
      await page.goto("/shalawat");
      const firstCard = page.locator('a[href^="/baca/"]').first();
      const count = await firstCard.count();
      if (count === 0) return { count, title: "", href: null };
      const title = (await firstCard.locator("h3").textContent()) ?? "";
      const href = await firstCard.getAttribute("href");
      return { count, title, href };
    });
    // Skip stays outside the step: skipping from inside a step
    // callback is not a documented pattern.
    if (found.count === 0) {
      test.skip(true, "no published articles in this environment");
    }
    await test.step("Cari judulnya dan verifikasi hasilnya", async () => {
      await page.goto(`/search?q=${encodeURIComponent(found.title.trim())}`);
      await expect(
        page.locator(`a[href="${found.href}"]`).first(),
      ).toBeVisible();
    });
  });

  test("request pages render without submitting anything", async ({ page }) => {
    // Assert the request form's submit button, not just any form:
    // the site header also contains a search form.
    await test.step("Buka halaman request shalawat", async () => {
      await page.goto("/request-shalawat");
      await expect(
        page.getByRole("button", { name: "Kirim Request" }),
      ).toBeVisible();
    });
    await test.step("Buka halaman request maulid", async () => {
      await page.goto("/request-maulid");
      await expect(
        page.getByRole("button", { name: "Kirim Request" }),
      ).toBeVisible();
    });
  });

  test("sitemap and robots return 200", async ({ request }) => {
    await test.step("Minta sitemap dan robots", async () => {
      const sitemap = await request.get("/sitemap.xml");
      expect(sitemap.status()).toBe(200);
      const robots = await request.get("/robots.txt");
      expect(robots.status()).toBe(200);
    });
  });

  test("admin area redirects to login without a session", async ({ page }) => {
    await test.step("Buka area admin tanpa sesi", async () => {
      await page.goto("/admin");
      await expect(page).toHaveURL(/\/admin\/login/);
      await expect(
        page.getByRole("heading", { name: "Masuk Admin" }),
      ).toBeVisible();
    });
  });
});
