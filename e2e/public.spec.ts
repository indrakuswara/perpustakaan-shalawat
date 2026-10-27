import { test, expect } from "@playwright/test";

// Read-only public smoke checks. These need no credentials and are
// safe to run against any deploy, including production.
test.describe("public smoke", () => {
  test("homepage renders", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Perpustakaan Digital Shalawat & Maulid",
      }),
    ).toBeVisible();
  });

  test("shalawat and maulid listings render", async ({ page }) => {
    await page.goto("/shalawat");
    await expect(
      page.getByRole("heading", { name: "Shalawat" }).first(),
    ).toBeVisible();
    await page.goto("/maulid");
    await expect(
      page.getByRole("heading", { name: "Maulid" }).first(),
    ).toBeVisible();
  });

  // Published-article checks discover content instead of hardcoding a
  // title: the local/CI database starts empty, while production has
  // real articles. If an environment has no published articles at all,
  // these two tests skip honestly instead of failing on missing seed
  // data. The admin CRUD suite always exercises baca rendering with
  // its own published test article, so this path is never untested
  // when the full suite runs.
  test("a published article renders", async ({ page }) => {
    await page.goto("/shalawat");
    const firstCard = page.locator('a[href^="/baca/"]').first();
    if ((await firstCard.count()) === 0) {
      test.skip(true, "no published articles in this environment");
    }
    await firstCard.click();
    await expect(page).toHaveURL(/\/baca\//);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("search finds a published article", async ({ page }) => {
    await page.goto("/shalawat");
    const firstCard = page.locator('a[href^="/baca/"]').first();
    if ((await firstCard.count()) === 0) {
      test.skip(true, "no published articles in this environment");
    }
    const title = (await firstCard.locator("h3").textContent()) ?? "";
    const href = await firstCard.getAttribute("href");
    await page.goto(`/search?q=${encodeURIComponent(title.trim())}`);
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  });

  test("request pages render without submitting anything", async ({ page }) => {
    // Assert the request form's submit button, not just any form:
    // the site header also contains a search form.
    await page.goto("/request-shalawat");
    await expect(
      page.getByRole("button", { name: "Kirim Request" }),
    ).toBeVisible();
    await page.goto("/request-maulid");
    await expect(
      page.getByRole("button", { name: "Kirim Request" }),
    ).toBeVisible();
  });

  test("sitemap and robots return 200", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
  });

  test("admin area redirects to login without a session", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(
      page.getByRole("heading", { name: "Masuk Admin" }),
    ).toBeVisible();
  });
});
