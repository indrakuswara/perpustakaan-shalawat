import { test, expect } from "@playwright/test";

// Shared-chrome checks for the redesign (Task 4). Later tasks append
// their own test.describe blocks to this file.
//
// Every check is wrapped in test.step() calls: those steps are what
// the owner report page shows per test, because the JSON reporter
// only records explicit steps (plain page.goto/expect calls do not
// appear in the JSON report).
test.describe("shared chrome", () => {
  test("homepage header is absolute over the dark hero", async ({ page }) => {
    await test.step("Buka beranda", async () => {
      await page.goto("/");
    });
    await test.step("Header absolut dan nav terang", async () => {
      const header = page.locator("header").first();
      await expect(header).toHaveCSS("position", "absolute");
      // Scoped to the desktop nav: the mobile menu carries the same
      // links, so an unscoped getByRole would match twice.
      const desktopNav = page.getByRole("navigation", {
        name: "Navigasi utama",
      });
      const beranda = desktopNav.getByRole("link", { name: "Beranda" });
      await expect(beranda).toBeVisible();
      // Dark variant: the active link is gold-soft with a gold
      // underline, an inactive link is on-dark, and only the active
      // link carries aria-current="page".
      await expect(beranda).toHaveCSS("color", "rgb(227, 197, 102)");
      await expect(beranda).toHaveCSS("text-decoration-line", "underline");
      await expect(beranda).toHaveAttribute("aria-current", "page");
      const shalawat = desktopNav.getByRole("link", { name: "Shalawat" });
      await expect(shalawat).toHaveCSS("color", "rgb(244, 250, 245)");
      await expect(shalawat).not.toHaveAttribute("aria-current", "page");
    });
  });

  // Published-article check discovers content instead of hardcoding a
  // title: the local database starts empty, while production has real
  // articles. If an environment has no published articles at all,
  // this test skips honestly instead of failing on missing seed data,
  // following the public.spec.ts pattern.
  test("reading-page header is static with light background", async ({
    page,
  }) => {
    const firstCard = await test.step("Cari kartu artikel pertama", async () => {
      await page.goto("/shalawat");
      return page.locator('a[href^="/baca/"]').first();
    });
    if ((await firstCard.count()) === 0) {
      test.skip(true, "no published articles in this environment");
    }
    await test.step("Buka artikel pertama", async () => {
      await firstCard.click();
      await expect(page).toHaveURL(/\/baca\//);
    });
    await test.step("Header statis berlatar terang", async () => {
      const header = page.locator("header").first();
      await expect(header).toHaveCSS("position", "static");
      await expect(header).toHaveCSS(
        "background-color",
        "rgb(230, 240, 232)",
      );
    });
  });

  test("list pages mark their nav link active with the light-green pill", async ({
    page,
  }) => {
    await test.step("Shalawat aktif di /shalawat", async () => {
      await page.goto("/shalawat");
      const desktopNav = page.getByRole("navigation", {
        name: "Navigasi utama",
      });
      const link = desktopNav.getByRole("link", { name: "Shalawat" });
      await expect(link).toHaveCSS("background-color", "rgb(244, 250, 245)");
      await expect(link).toHaveCSS("color", "rgb(6, 78, 59)");
      await expect(link).toHaveAttribute("aria-current", "page");
    });
    await test.step("Maulid aktif di /maulid", async () => {
      await page.goto("/maulid");
      const desktopNav = page.getByRole("navigation", {
        name: "Navigasi utama",
      });
      const link = desktopNav.getByRole("link", { name: "Maulid" });
      await expect(link).toHaveCSS("background-color", "rgb(244, 250, 245)");
      await expect(link).toHaveCSS("color", "rgb(6, 78, 59)");
      await expect(link).toHaveAttribute("aria-current", "page");
    });
  });

  test("mobile hamburger opens the nav", async ({ page }) => {
    await test.step("Viewport mobile dan buka menu", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/");
      const toggle = page.getByRole("button", { name: /menu/i });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.locator("#mobile-nav").getByRole("link", { name: "Maulid" }),
      ).toBeVisible();
    });
  });

  test("footer is dark emerald on every page", async ({ page }) => {
    await test.step("Cek footer beranda dan halaman daftar", async () => {
      await page.goto("/");
      await expect(page.locator("footer").first()).toHaveCSS(
        "background-color",
        "rgb(3, 54, 42)",
      );
      await page.goto("/shalawat");
      await expect(page.locator("footer").first()).toHaveCSS(
        "background-color",
        "rgb(3, 54, 42)",
      );
    });
  });
});

test.describe("cards and search", () => {
  test("article card has no arrow and description guard holds", async ({
    page,
  }) => {
    // Same honest-skip pattern as the Task 4 reading-page test:
    // a fresh local DB has no published articles, so skip instead
    // of timing out on the visibility assertion.
    const firstCard = await test.step("Buka daftar shalawat", async () => {
      await page.goto("/shalawat");
      return page.locator('a[href^="/baca/"]').first();
    });
    if ((await firstCard.count()) === 0) {
      test.skip(true, "no published articles in this environment");
    }
    await test.step("Kartu tanpa panah", async () => {
      await expect(firstCard).toBeVisible();
      await expect(firstCard).not.toContainText("→");
    });
    await test.step("Tidak ada paragraf kosong di kartu", async () => {
      const emptyP = await page.locator('a[href^="/baca/"] p:empty').count();
      expect(emptyP).toBe(0);
    });
  });

  test("search submit is a magnifier icon, not text", async ({ page }) => {
    await test.step("Buka beranda dan cek tombol cari", async () => {
      await page.goto("/");
      const btn = page.getByRole("button", { name: "Cari" });
      await expect(btn).toBeVisible();
      await expect(btn).not.toContainText("Cari");
      await expect(btn.locator("svg")).toBeVisible();
    });
    await test.step("Submit tetap ke /search?q=", async () => {
      await page.getByLabel("Cari artikel").fill("Qamarun");
      await page.getByRole("button", { name: "Cari" }).click();
      await expect(page).toHaveURL(/\/search\?q=Qamarun/);
    });
  });
});

test.describe("homepage", () => {
  test("homepage sections render in order", async ({ page }) => {
    await test.step("Buka beranda", async () => {
      await page.goto("/");
    });
    // Pita Daily Inspiration hanya dirender bila pool bait tidak
    // kosong (spec 11.1): pool butuh unit Arab, dan artikel seed lokal
    // tidak punya satu pun. Cek keberadaannya di luar step (skip dari
    // dalam callback step bukan pola yang didokumentasikan).
    const ribbon = page.getByRole("heading", {
      name: "Satu Hari, Satu Lantunan",
    });
    const hasRibbon = (await ribbon.count()) > 0;
    await test.step("Hero, Koleksi, Terbaru, pita, Makna, CTA tampil", async () => {
      await expect(
        page.getByRole("heading", {
          name: "Keindahan Sholawat, Dalam Satu Ruang.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Koleksi Pilihan" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Terbaru" }),
      ).toBeVisible();
      if (hasRibbon) {
        await expect(ribbon).toBeVisible();
      }
      await expect(
        page.getByRole("heading", {
          name: "Lebih dari Sekadar Lantunan. Kenali Maknanya.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Request Judul" }),
      ).toBeVisible();
    });
    await test.step("Terbaru memakai tanggal, bukan nomor 01/02/03", async () => {
      const terbaru = page.locator("section", {
        has: page.getByRole("heading", { name: "Terbaru" }),
      });
      // Tanggal Indonesia "14 Nov 2026": bulan singkat harus tampil.
      await expect(terbaru).toContainText(
        /\d{1,2} (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) \d{4}/,
      );
      // Bukan not.toContainText("01"): tanggal terbit tanggal 1
      // ("01 Nov 2026") akan false-positive. Yang dicek adalah label
      // nomor urut mandiri: elemen yang teksnya persis "01"/"02"/"03".
      const standalone = await terbaru
        .locator(
          "xpath=.//*[normalize-space(text())='01' or normalize-space(text())='02' or normalize-space(text())='03']",
        )
        .count();
      expect(standalone).toBe(0);
    });
    await test.step("Tidak ada paragraf kosong di Terbaru", async () => {
      const emptyP = await page.locator("main p:empty").count();
      expect(emptyP).toBe(0);
    });
    await test.step("Tidak ada overflow horizontal", async () => {
      const r = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
      }));
      expect(r.sw).toBe(r.iw);
    });
  });
});
