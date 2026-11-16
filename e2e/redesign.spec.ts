import { test, expect } from "@playwright/test";
import {
  runId,
  testTitle,
  slugify,
  loginAsAdmin,
  createDraftArticle,
  fillUnitLayers,
  publishArticle,
  cleanupArticle,
  cleanupArticles,
} from "./helpers";

// Production memakai discovery ambient (artikel asli sudah ada);
// non-production memakai artikel sementara credential-gated.
const isProductionTarget = (process.env.PLAYWRIGHT_BASE_URL ?? "").includes(
  "perpustakaan-shalawat.vercel.app",
);

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
        page.getByRole("heading", {
          name: "Jaga Warisan, Bagikan Keindahan.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Request Judul" }),
      ).toBeVisible();
    });
    await test.step("Urutan bagian sesuai spek", async () => {
      const expected = [
        "Keindahan Sholawat, Dalam Satu Ruang.",
        "Koleksi Pilihan",
        "Terbaru",
        ...(hasRibbon ? ["Satu Hari, Satu Lantunan"] : []),
        "Lebih dari Sekadar Lantunan. Kenali Maknanya.",
        "Jaga Warisan, Bagikan Keindahan.",
      ];
      const order = await page.evaluate((names) => {
        const headings = [...document.querySelectorAll("h1, h2")].map((h) =>
          h.textContent?.trim(),
        );
        return names.map((n) => headings.indexOf(n));
      }, expected);
      for (let i = 0; i < order.length; i++) {
        expect(order[i]).not.toBe(-1);
        if (i > 0) expect(order[i]).toBeGreaterThan(order[i - 1]);
      }
    });
    await test.step("Koleksi menaut ke empat slug, chip Shalawat ke /shalawat", async () => {
      // Scoped to the Koleksi section: an unscoped locator could be
      // satisfied by a Terbaru link to the same slug instead of the
      // Koleksi card.
      const koleksi = page.locator("section", {
        has: page.getByRole("heading", { name: "Koleksi Pilihan" }),
      });
      for (const slug of [
        "maulid-dibai",
        "maulid-simtudduror",
        "qad-kafani",
        "lakum-busyro",
      ]) {
        await expect(
          koleksi.locator(`a[href="/baca/${slug}"]`).first(),
        ).toBeVisible();
      }
      // Scoped to the hero section: an unscoped locator could be
      // satisfied by an article-card link whose title contains a
      // number + "Shalawat" (e.g. "7 Shalawat Mustajab") instead of
      // the chip. Same section-scoping pattern as Koleksi/Terbaru.
      const hero = page.locator("section", {
        has: page.getByRole("heading", {
          name: "Keindahan Sholawat, Dalam Satu Ruang.",
        }),
      });
      await expect(
        hero.getByRole("link", { name: /\d+ Shalawat/ }),
      ).toHaveAttribute("href", "/shalawat");
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

test.describe("reading page", () => {
  // Carry requirement (b) dari review Task 3: artikel dengan blocks
  // tapi NOL unit Arab harus menyembunyikan panel TOC sepenuhnya
  // (buildTocItems mengembalikan kind "bait" dengan items kosong).
  // Deterministik di lokal/CI karena seed e2e-seed-bacaan-deploy ada
  // di sana; seed itu TIDAK ada di production (script seed menolak
  // Postgres), jadi test ini skip di production.
  test("article without Arab units shows no TOC", async ({ page }) => {
    test.skip(
      isProductionTarget,
      "seed article e2e-seed-bacaan-deploy does not exist in production",
    );
    const resp = await test.step("Buka artikel seed tanpa unit Arab", async () => {
      return page.goto("/baca/e2e-seed-bacaan-deploy");
    });
    if (resp?.status() === 404) {
      test.skip(true, "seed article e2e-seed-bacaan-deploy not found (404)");
    }
    await test.step("Tidak ada panel TOC maupun dropdown", async () => {
      await expect(
        page.getByRole("link", { name: "Bait 1" }),
      ).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Daftar isi" }),
      ).toHaveCount(0);
      await expect(page.locator('[id^="bait-"]')).toHaveCount(0);
    });
    await test.step("Panel info mencatat Jumlah bait 1", async () => {
      // Saran reviewer Task 8: seed ini punya tepat 1 unit teks di
      // 1 section, dan "Jumlah bait" menghitung TOTAL unit (spec
      // 8.5, InfoPanel) — unit teks-pengantar ikut dihitung di baris
      // ini walau bukan bait dan tak masuk TOC. Pin angkanya supaya
      // regresi penghitungan ketahuan.
      const info = page.locator('section[aria-label="Tentang bacaan ini"]');
      await expect(info.getByText("Jumlah bait")).toBeVisible();
      await expect(
        info.locator("div", { hasText: "Jumlah bait" }).locator("dd"),
      ).toHaveText("1");
    });
    await test.step("Unit teks tampil sebagai prosa tanpa lingkaran bernomor", async () => {
      await expect(
        page.locator("main").getByText("Isi dummy untuk tes deploy."),
      ).toBeVisible();
    });
  });
});

// Test 1 dulunya bergantung pada artikel shalawat ambient ber-unit
// Arab; di CI/lokal seed tidak punya satu pun unit Arab sehingga
// test ini gagal/skip. Blok serial ini membuatnya mandiri di
// non-production mengikuti pola test pita: satu artikel sementara
// SHALAWAT dengan DUA unit Arab lewat UI admin, dipublish, lalu
// semua assertion Test 1 yang lama dijalankan terhadapnya.
//
// Dua unit Arab itu syarat mutlak, bukan pilihan: TOC disembunyikan
// bila hasilnya tepat 1 item (spec 8.8, buildTocItems), jadi satu
// unit Arab saja membuat tautan "Bait 1" tidak pernah tampil.
//
// Di production cabang temp-article TIDAK dipakai: data ambient asli
// sudah ada, jadi discovery kartu pertama /shalawat seperti semula.
test.describe.serial("reading page temp shalawat", () => {
  const id = runId();
  const title = testTitle(id);
  let slug = slugify(title);
  let articleId: string | null = null;
  const unit1 = {
    arab: "صَلَّى اللهُ عَلَى مُحَمَّدٍ",
    latin: `Shallallahu 'ala Muhammad E2E ${id}`,
    translation: `Semoga shalawat tercurah kepada Muhammad E2E ${id}`,
    english: `May blessings be upon Muhammad E2E ${id}`,
  };
  const unit2 = {
    arab: "وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    latin: `Walhamdulillahi rabbil 'alamin E2E ${id}`,
    translation: `Segala puji bagi Allah, Tuhan semesta alam E2E ${id}`,
    english: `All praise belongs to Allah, Lord of the worlds E2E ${id}`,
  };

  // Cleanup + verifikasi tinggal di afterAll, BUKAN di test backstop
  // terpisah: dalam describe serial, satu test gagal membuat test
  // sisanya "did not run", jadi test backstop tidak pernah jalan
  // tepat pada jalur yang membutuhkannya (serial abort). afterAll
  // selalu jalan walau test gagal. Cleanup-nya sendiri tetap
  // best-effort (cleanupArticle menelan kegagalan), tapi verifikasi
  // di bawah TIDAK dibungkus try/catch: bila judul masih terdaftar,
  // afterAll ini gagal keras dan kebocoran tidak lolos diam-diam.
  // Verifikasi memakai sesi yang sama dengan cleanup di atas (tidak
  // login ulang: /admin/login me-redirect ke dashboard bila sesi
  // sudah login sehingga #email tidak ada). Bila login cleanup gagal
  // diam-diam, goto /admin/articles me-redirect ke /admin/login dan
  // assert di bawah gagal keras — itu yang diinginkan.
  // Flag `deleted` dihapus: afterAll hanya jalan sekali dan
  // deleteArticle sudah guard 404, jadi cleanup ini idempotent dan
  // tidak butuh early-return berbasis flag (flag lama justru
  // menghalangi bersih-bersih kedua bila verifikasi gagal).
  test.afterAll(async ({ browser }) => {
    if (!articleId) return;
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await cleanupArticle(page, articleId);
      await page.goto("/admin/articles");
      await expect(page).not.toHaveURL(/\/admin\/login/);
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
    } finally {
      await context.close();
    }
  });

  test("reading page has 3 columns and bait TOC", async ({ page }) => {
    if (isProductionTarget) {
      const firstCard = await test.step("Cari kartu shalawat pertama", async () => {
        await page.goto("/shalawat");
        return page.locator('a[href^="/baca/"]').first();
      });
      if ((await firstCard.count()) === 0) {
        test.skip(true, "no published articles in this environment");
      }
      await test.step("Buka artikel shalawat pertama", async () => {
        await firstCard.click();
        await expect(page).toHaveURL(/\/baca\//);
      });
    } else {
      test.skip(
        !process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD,
        "needs admin credentials",
      );
      await test.step("Buat artikel shalawat sementara dengan 2 unit Arab", async () => {
        await loginAsAdmin(page);
        const created = await createDraftArticle(page, title);
        articleId = created.id;
        // Unit 1 sudah berisi teks biasa dari createDraftArticle;
        // lengkapi keempat lapisnya, lalu tambah unit 2 dan isi
        // keempat lapisnya (nth(1) = unit kedua).
        await fillUnitLayers(page, 0, unit1);
        await page
          .getByRole("button", { name: "+ Tambah unit" })
          .click();
        await fillUnitLayers(page, 1, unit2);
        // Pola yang sama dengan test pita: tunggu POST server action
        // selesai, baru cek banner sukses.
        await Promise.all([
          page.waitForResponse(
            (r) =>
              r.request().method() === "POST" &&
              r.url().includes(`/admin/articles/${articleId}`),
          ),
          page.getByRole("button", { name: "Simpan perubahan" }).click(),
        ]);
        await expect(page.getByText("Perubahan tersimpan.")).toBeVisible();
      });
      await test.step("Publish dan temukan slug asli", async () => {
        await publishArticle(page, articleId!);
        await expect(
          page.getByText("Artikel berhasil dipublish."),
        ).toBeVisible();
        await page.goto("/shalawat");
        const card = page
          .locator('a[href^="/baca/"]')
          .filter({ has: page.locator("h3", { hasText: title }) })
          .first();
        await expect(card).toBeVisible();
        // Temukan slug yang benar-benar ditetapkan aplikasi, bukan
        // percaya hitungan helper (tabrakan slug bisa menambah "-2").
        const href = await card.getAttribute("href");
        if (href) slug = href.replace("/baca/", "");
      });
      await test.step("Buka halaman baca artikel sementara", async () => {
        await page.goto(`/baca/${slug}`);
        await expect(page).toHaveURL(`/baca/${slug}`);
      });
    }
    await test.step("TOC bait dan kartu bernomor cocok", async () => {
      await expect(page.getByRole("link", { name: "Bait 1" }).first()).toBeVisible();
      const href = await page.getByRole("link", { name: "Bait 1" }).first().getAttribute("href");
      expect(href).toBe("#bait-1");
      await expect(page.locator("#bait-1")).toBeVisible();
    });
    await test.step("Tidak ada teks BAIT n, legenda, atau ornamen berlian", async () => {
      await expect(
        page.locator("article[id^='bait-'] p", {
          hasText: /^Bait \d+$/i,
        }),
      ).toHaveCount(0);
      await expect(page.locator("main")).not.toContainText("Arab • Latin");
      await expect(page.locator("main")).not.toContainText("✦");
      await expect(page.locator("main")).not.toContainText("◆");
    });
    await test.step("Share dan Unduh tampil sekali per viewport", async () => {
      await expect(page.getByRole("button", { name: "Bagikan" })).toHaveCount(1);
    });
    await test.step("Nav Shalawat aktif di halaman baca shalawat", async () => {
      const desktopNav = page.getByRole("navigation", {
        name: "Navigasi utama",
      });
      await expect(
        desktopNav.getByRole("link", { name: "Shalawat" }),
      ).toHaveAttribute("aria-current", "page");
    });
    await test.step("Geometri 3 kolom di 1280px", async () => {
      const cols = await page.evaluate(() => {
        const grid = document.querySelector(
          '[data-testid="reading-grid"]',
        ) as HTMLElement | null;
        if (!grid) return null;
        const cs = getComputedStyle(grid);
        return {
          template: cs.gridTemplateColumns,
          gap: cs.columnGap,
        };
      });
      expect(cols).not.toBeNull();
      const widths = (cols!.template as string)
        .trim()
        .split(/\s+/)
        .map((v) => parseFloat(v));
      expect(widths).toHaveLength(3);
      expect(widths[0]).toBe(224);
      expect(widths[2]).toBe(304);
      // Kolom tengah: 1280 - 224 - 304 - 2*26 gap - 2*20 padding = 660
      // (angka 668 di spek adalah pembulatan "±668").
      expect(Math.abs(widths[1] - 660)).toBeLessThanOrEqual(2);
      expect(parseFloat(cols!.gap as string)).toBe(26);
    });
    await test.step("Tidak ada overflow horizontal", async () => {
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
      expect(r.sw).toBe(r.iw);
    });
  });

  // (Tidak ada test backstop terpisah: cleanup + verifikasi tinggal
  // di afterAll di atas — lihat komentarnya.)
});

// Test Maulid Baca Juga dulunya mengassert tepat 2 link pada artikel
// maulid ambient pertama; di CI/lokal tidak ada satu pun maulid
// sehingga test ini skip selamanya. Blok serial ini membuatnya
// mandiri di non-production: TIGA artikel sementara MAULID lewat UI
// admin (yang sedang dibaca dikecualikan, sisanya 2 — persis aturan
// terkunci spec 8.6: kategori sama dulu, maks 4, tampilkan 2 saja
// kalau di kategori itu cuma ada 2).
//
// Di production TIDAK dibuat artikel temp: ekspektasi dihitung dari
// data yang ada (jumlah kartu /maulid - 1, dibatasi 4).
test.describe.serial("maulid related temp articles", () => {
  const id = runId();
  const titles = ["A", "B", "C"].map((s) => `${testTitle(id)} ${s}`);
  const slugs = ["", "", ""];
  const articleIds: (string | null)[] = [null, null, null];

  // Cleanup + verifikasi tinggal di afterAll, BUKAN di test backstop
  // terpisah: dalam describe serial, satu test gagal membuat test
  // sisanya "did not run", jadi test backstop tidak pernah jalan
  // tepat pada jalur yang membutuhkannya (serial abort). afterAll
  // selalu jalan walau test gagal. Cleanup-nya sendiri tetap
  // best-effort (cleanupArticles menelan kegagalan), tapi verifikasi
  // di bawah TIDAK dibungkus try/catch: bila satu judul masih
  // terdaftar, afterAll ini gagal keras dan kebocoran tidak lolos
  // diam-diam. Verifikasi memakai sesi yang sama dengan cleanup di
  // atas (tidak login ulang: /admin/login me-redirect ke dashboard
  // bila sesi sudah login sehingga #email tidak ada). Bila login
  // cleanup gagal diam-diam, goto /admin/articles me-redirect ke
  // /admin/login dan assert di bawah gagal keras — itu yang
  // diinginkan. Flag `deleted` dihapus: afterAll hanya jalan sekali
  // dan deleteArticle sudah guard 404, jadi cleanup ini idempotent
  // dan tidak butuh early-return berbasis flag.
  test.afterAll(async ({ browser }) => {
    if (articleIds.every((a) => a === null)) return;
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await cleanupArticles(page, articleIds);
      await page.goto("/admin/articles");
      await expect(page).not.toHaveURL(/\/admin\/login/);
      for (const t of titles) {
        await expect(page.getByText(t, { exact: true })).toHaveCount(0);
      }
    } finally {
      await context.close();
    }
  });

  test("create three temp maulid articles and publish them", async ({
    page,
  }) => {
    test.skip(
      isProductionTarget,
      "production uses the ambient count check; no temp articles in production",
    );
    test.skip(
      !process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD,
      "needs admin credentials",
    );
    await test.step("Buat dan publish tiga artikel maulid sementara", async () => {
      await loginAsAdmin(page);
      for (let i = 0; i < 3; i++) {
        const created = await createDraftArticle(page, titles[i], "MAULID");
        articleIds[i] = created.id;
        await publishArticle(page, created.id);
        await expect(
          page.getByText("Artikel berhasil dipublish."),
        ).toBeVisible();
      }
    });
    await test.step("Temukan slug asli ketiganya", async () => {
      await page.goto("/maulid");
      for (let i = 0; i < 3; i++) {
        const card = page
          .locator('a[href^="/baca/"]')
          .filter({ has: page.locator("h3", { hasText: titles[i] }) })
          .first();
        await expect(card).toBeVisible();
        const href = await card.getAttribute("href");
        if (href) slugs[i] = href.replace("/baca/", "");
      }
    });
  });

  test("Maulid Baca Juga shows 2 same-category items", async ({ page }) => {
    if (isProductionTarget) {
      const count = await test.step("Hitung kartu maulid di /maulid", async () => {
        await page.goto("/maulid");
        return page.locator('a[href^="/baca/"]').count();
      });
      if (count === 0) {
        test.skip(true, "no published maulid in production");
      }
      // Yang sedang dibaca dikecualikan, maks 4 (spec 8.6).
      const expected = Math.min(count - 1, 4);
      await test.step("Buka artikel maulid pertama", async () => {
        await page.locator('a[href^="/baca/"]').first().click();
        await expect(page).toHaveURL(/\/baca\//);
      });
      await test.step("Baca Juga berisi ekspektasi dari data yang ada", async () => {
        const panel = page.locator("aside", { hasText: "Baca juga" });
        if (expected === 0) {
          await expect(panel).toHaveCount(0);
        } else {
          await expect(panel.locator('a[href^="/baca/"]')).toHaveCount(
            expected,
          );
        }
      });
    } else {
      test.skip(
        articleIds[0] === null,
        "temp maulid articles were not created (setup skipped)",
      );
      await test.step("Buka satu artikel maulid sementara", async () => {
        await page.goto(`/baca/${slugs[0]}`);
        await expect(page).toHaveURL(`/baca/${slugs[0]}`);
      });
      await test.step("Baca Juga berisi 2 item Maulid", async () => {
        const panel = page.locator("aside", { hasText: "Baca juga" });
        await expect(panel.locator('a[href^="/baca/"]')).toHaveCount(2);
      });
    }
    await test.step("Nav Maulid aktif di halaman baca maulid", async () => {
      const desktopNav = page.getByRole("navigation", {
        name: "Navigasi utama",
      });
      await expect(
        desktopNav.getByRole("link", { name: "Maulid" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });

  // (Tidak ada test backstop terpisah: cleanup + verifikasi tinggal
  // di afterAll di atas — lihat komentarnya.)
});

// Inspiration sebelumnya tidak diassert di mana pun secara
// tanpa-syarat — test homepage hanya mengecek pita bila kebetulan
// tampil, sementara artikel seed lokal/CI tidak punya satu pun unit
// Arab sehingga pool selalu kosong dan test lolos walau pitanya
// rusak. Blok serial ini membuat satu artikel sementara DENGAN unit
// Arab lewat UI admin, mempublishnya, lalu mengassert pita tampil
// dengan keempat lapis dan tombol yang menaut ke artikel itu.
//
// Credential-gated: test ini skip secara jujur (dengan alasan) bila
// kredensial admin tidak dikonfigurasi, bukan gagal keras — aturan
// gagal-keras di helpers.ts berlaku untuk suite CRUD admin itu
// sendiri, bukan untuk test homepage ini. Jalur UI admin berarti
// berjalan sungguhan di CI, yang punya kredensial; lokal tanpa
// kredensial hanya membuktikan skip-nya, dan selector assert pita
// diverifikasi terpisah terhadap artikel Arab-unit yang di-seed
// langsung ke SQLite lokal.
//
// Target branch (re-review Task 7, Critical): test artikel
// sementara di atas HANYA deterministik bila pool berisi tepat satu
// item, seperti di CI/lokal. Di production pool berisi ~21 artikel
// asli, dan picker (dayOfYearWIB % pool.length) hampir selalu
// memilih artikel lain, jadi assert run-id di sana adalah lotre
// yang memerahkan smoke hampir di setiap deploy. Karena itu test
// artikel sementara skip di production, dan production memakai test
// picker-independent di bawah: tanpa tulis apa pun, ia mengassert
// pita untuk pilihan hari itu apa adanya (Arab tak kosong, lapis
// lain yang tampil tak kosong, tombol ke /baca/<slug>, dan teks Arab
// yang sama tampil di halaman baca).
test.describe.serial("homepage daily inspiration ribbon", () => {
  const id = runId();
  const title = testTitle(id);
  let slug = slugify(title);
  let articleId: string | null = null;
  let deleted = false;
  const arab = "صَلَّى اللهُ عَلَى مُحَمَّدٍ";
  const latin = `Shallallahu 'ala Muhammad E2E ${id}`;
  const translation = `Semoga shalawat tercurah kepada Muhammad E2E ${id}`;
  const english = `May blessings be upon Muhammad E2E ${id}`;

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

  test("ribbon renders all four layers and links to the article", async ({
    page,
  }) => {
    test.skip(
      isProductionTarget,
      "production uses the picker-independent ribbon check",
    );
    test.skip(
      !process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD,
      "needs admin credentials",
    );
    await test.step("Buat artikel draft dengan unit Arab", async () => {
      await loginAsAdmin(page);
      const created = await createDraftArticle(page, title);
      articleId = created.id;
      // createDraftArticle hanya mengisi judul/deskripsi/judul
      // bagian/teks biasa. Keempat textarea lapis unit pertama
      // (placeholder BlocksEditor) diisi di sini supaya pita bisa
      // menampilkan keempat lapis.
      await page.getByPlaceholder("التَّهْجِي…").fill(arab);
      await page
        .getByPlaceholder("Teks latin / transliterasi…")
        .fill(latin);
      await page
        .getByPlaceholder("Terjemahan bahasa Indonesia…")
        .fill(translation);
      await page
        .getByPlaceholder("Terjemahan bahasa Inggris…")
        .fill(english);
      // Pola yang sama dengan test edit di admin-crud.spec.ts:
      // tunggu POST server action selesai, baru cek banner sukses.
      await Promise.all([
        page.waitForResponse(
          (r) =>
            r.request().method() === "POST" &&
            r.url().includes(`/admin/articles/${articleId}`),
        ),
        page.getByRole("button", { name: "Simpan perubahan" }).click(),
      ]);
      await expect(page.getByText("Perubahan tersimpan.")).toBeVisible();
    });
    await test.step("Publish dan temukan slug asli", async () => {
      await publishArticle(page, articleId!);
      await expect(
        page.getByText("Artikel berhasil dipublish."),
      ).toBeVisible();
      await page.goto("/shalawat");
      const card = page
        .locator('a[href^="/baca/"]')
        .filter({ has: page.locator("h3", { hasText: title }) })
        .first();
      await expect(card).toBeVisible();
      // Temukan slug yang benar-benar ditetapkan aplikasi, bukan
      // percaya hitungan helper (tabrakan slug bisa menambah "-2").
      const href = await card.getAttribute("href");
      if (href) slug = href.replace("/baca/", "");
    });
    await test.step("Pita tampil dengan empat lapis dan tombol", async () => {
      await page.goto("/");
      const ribbon = page.locator("section", {
        has: page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      });
      await expect(
        page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      ).toBeVisible();
      await expect(ribbon).toContainText(arab);
      await expect(ribbon).toContainText(latin);
      await expect(ribbon).toContainText(translation);
      await expect(ribbon).toContainText(english);
      await expect(ribbon.locator('p[dir="rtl"]')).toHaveAttribute(
        "lang",
        "ar",
      );
      await expect(
        ribbon.getByRole("link", { name: "Baca Selengkapnya" }),
      ).toHaveAttribute("href", `/baca/${slug}`);
    });
    await test.step("Urutan bagian: pita di antara Terbaru dan Makna", async () => {
      // Test homepage di atas berjalan sebelum artikel sementara ini
      // ada, jadi pita absen di sana dan urutannya tidak pernah
      // diassert dengan pita tampil. Cek ulang di sini, saat pita
      // pasti tampil.
      const expected = [
        "Keindahan Sholawat, Dalam Satu Ruang.",
        "Koleksi Pilihan",
        "Terbaru",
        "Satu Hari, Satu Lantunan",
        "Lebih dari Sekadar Lantunan. Kenali Maknanya.",
        "Jaga Warisan, Bagikan Keindahan.",
      ];
      const order = await page.evaluate((names) => {
        const headings = [...document.querySelectorAll("h1, h2")].map((h) =>
          h.textContent?.trim(),
        );
        return names.map((n) => headings.indexOf(n));
      }, expected);
      for (let i = 0; i < order.length; i++) {
        expect(order[i]).not.toBe(-1);
        if (i > 0) expect(order[i]).toBeGreaterThan(order[i - 1]);
      }
    });
  });

  // Production-only, picker-independent: tidak membuat atau
  // mempublish apa pun, tidak login, hanya membaca "/" lalu
  // "/baca/<slug>" untuk pilihan hari itu. Di production pool tidak
  // pernah kosong, jadi pita WAJIB tampil; bila absen, test ini
  // gagal dan itu bug sungguhan. Hanya Arab yang dijamin ada oleh
  // definisi pool, jadi lapis lain diassert tak-kosong hanya bila
  // tampil, bukan diwajibkan ketiganya.
  test("ribbon renders the day's pick with non-empty layers and a working link", async ({
    page,
  }) => {
    test.skip(
      !isProductionTarget,
      "production-only ribbon check; non-production uses the temp-article test",
    );
    let arabText = "";
    let href = "";
    await test.step("Pita tampil dengan teks Arab tak kosong", async () => {
      await page.goto("/");
      const ribbon = page.locator("section", {
        has: page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      });
      await expect(
        page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      ).toBeVisible();
      const arabP = ribbon.locator('p[dir="rtl"][lang="ar"]');
      await expect(arabP).toBeVisible();
      arabText = ((await arabP.textContent()) ?? "").trim();
      expect(arabText.length).toBeGreaterThan(0);
    });
    await test.step("Lapis lain yang tampil tak kosong", async () => {
      const ribbon = page.locator("section", {
        has: page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      });
      // Semua <p> pita selain Arab adalah lapis Latin/Terjemahan/
      // English yang dirender; yang absen boleh absen, yang tampil
      // wajib berisi teks.
      const layers = ribbon.locator("p:not([dir='rtl'])");
      const count = await layers.count();
      for (let i = 0; i < count; i++) {
        const text = ((await layers.nth(i).textContent()) ?? "").trim();
        expect(text.length).toBeGreaterThan(0);
      }
    });
    await test.step("Tombol menaut ke /baca/<slug>", async () => {
      const ribbon = page.locator("section", {
        has: page.getByRole("heading", { name: "Satu Hari, Satu Lantunan" }),
      });
      const link = ribbon.getByRole("link", { name: "Baca Selengkapnya" });
      href = (await link.getAttribute("href")) ?? "";
      expect(href).toMatch(/^\/baca\/[^/]+$/);
    });
    await test.step("Halaman baca memuat teks Arab yang sama", async () => {
      await page.goto(href);
      await expect(
        page
          .locator('p[dir="rtl"][lang="ar"]')
          .filter({ hasText: arabText })
          .first(),
      ).toBeVisible();
    });
  });

  // Backstop cleanup, pola yang sama dengan test "cleanup: no test
  // article remains" di admin-crud.spec.ts: afterAll saja tidak
  // cukup karena cleanupArticle menelan kegagalan login secara diam.
  // Test terakhir ini menghapus sisa artikel sementara bila ada,
  // lalu memverifikasi judulnya hilang dari daftar admin.
  test("cleanup: no test article remains", async ({ page }) => {
    test.skip(articleId === null, "no test article was created");
    await test.step("Hapus sisa artikel tes bila ada", async () => {
      if (!deleted && articleId) {
        await cleanupArticle(page, articleId);
        deleted = true;
      }
    });
    await test.step("Verifikasi tidak ada sisa artikel tes", async () => {
      await page.goto("/admin/articles");
      await expect(page).not.toHaveURL(/\/admin\/login/);
      await expect(page.getByText(title, { exact: true })).toHaveCount(0);
    });
  });
});

test.describe("list, search, request", () => {
  test("empty search shows all published articles", async ({ page }) => {
    // Honest skip like the other published-article checks: the
    // skip decision must come from the LIST pages, not from /search
    // itself — before the fix, /search without a query renders no
    // cards at all, which would mask the failure as a skip.
    // (Fix 4) Cek /shalawat ATAU /maulid: lingkungan yang hanya
    // punya maulid akan ter-skip dan menyembunyikan kegagalan nyata
    // bila hanya /shalawat yang dicek.
    const collectHrefs = async (path: string) => {
      await page.goto(path);
      return page
        .locator('a[href^="/baca/"]')
        .evaluateAll((els) =>
          els.map((el) => el.getAttribute("href") ?? "").filter(Boolean),
        );
    };
    let shalawatHrefs: string[] = [];
    let maulidHrefs: string[] = [];
    await test.step("Cek ada artikel terbit lewat /shalawat atau /maulid", async () => {
      shalawatHrefs = await collectHrefs("/shalawat");
      maulidHrefs = await collectHrefs("/maulid");
    });
    if (shalawatHrefs.length + maulidHrefs.length === 0) {
      test.skip(true, "no published articles in this environment");
    }
    let searchHrefs: string[] = [];
    await test.step("Buka /search tanpa query", async () => {
      searchHrefs = await collectHrefs("/search");
    });
    await test.step("Judul Semua bacaan dan kartu tampil", async () => {
      await expect(
        page.getByRole("heading", { name: "Semua bacaan" }),
      ).toBeVisible();
      await expect(page.locator('a[href^="/baca/"]').first()).toBeVisible();
    });
    await test.step("Kartu /search sama dengan gabungan /shalawat + /maulid", async () => {
      // (a) spec §11.3: SEMUA bacaan terbit tampil, bukan sebagian —
      // himpunan href harus sama persis (urutan dibuktikan langkah b).
      const expected = new Set([...shalawatHrefs, ...maulidHrefs]);
      expect([...new Set(searchHrefs)].sort()).toEqual(
        [...expected].sort(),
      );
    });
    await test.step("Baris hitungan sesuai jumlah bacaan terbit", async () => {
      // (c) "{n} bacaan" dengan n = total terbit.
      const total = new Set([...shalawatHrefs, ...maulidHrefs]).size;
      await expect(page.locator("main")).toContainText(`${total} bacaan`);
    });
    await test.step("Kartu pertama /search adalah yang terbaru", async () => {
      // (b) /search dan daftar "Terbaru" beranda sama-sama memakai
      // listPublishedContents(undefined, "published"), terbaru dulu;
      // Terbaru hanya menampilkan 6 pertama, jadi bandingkan href
      // pertama saja.
      await page.goto("/");
      const terbaru = page.locator("section", {
        has: page.getByRole("heading", { name: "Terbaru" }),
      });
      const firstLatest = await terbaru
        .locator("h3 a[href^='/baca/']")
        .first()
        .getAttribute("href");
      expect(searchHrefs[0]).toBe(firstLatest);
    });
  });

  test("no kickers on list and request pages", async ({ page }) => {
    await test.step("Daftar shalawat tanpa kicker Koleksi", async () => {
      await page.goto("/shalawat");
      // Kicker lama: <p class="... uppercase">Koleksi</p> — teks
      // DOM-nya "Koleksi", bukan "KOLEKSI". toContainText("KOLEKSI")
      // pada <main> lolos di DOM pra-perbaikan: pencocokan
      // case-sensitive terhadap textContent, yang tak tersentuh CSS
      // uppercase. Cek ke <p> dengan teks persis "Koleksi", seperti
      // cek kicker Request di bawah.
      const kicker = page.locator("main > p", { hasText: /^Koleksi$/ });
      await expect(kicker).toHaveCount(0);
    });
    await test.step("Request shalawat tanpa kicker Request", async () => {
      await page.goto("/request-shalawat");
      const kicker = page.locator("main p", { hasText: /^Request$/ });
      await expect(kicker).toHaveCount(0);
    });
    await test.step("Request maulid tanpa kicker Request", async () => {
      await page.goto("/request-maulid");
      const kicker = page.locator("main p", { hasText: /^Request$/ });
      await expect(kicker).toHaveCount(0);
    });
  });
});

// Fix reviewer whole-branch C1: latar halaman publik WAJIB token --bg
// (#e6f0e8), bukan stone-50. Assertion menarget wrapper layout (site),
// BUKAN <main> yang transparent — main tidak membawa background
// sendiri, jadi assert terhadap main akan lolos walau wrapper masih
// stone-50 (itulah yang terjadi pada run Playwright reviewer).
// Locator memakai kelas wrapper (flex min-h-screen): <body> juga
// punya <div hidden=""> internal React sebagai anak pertama, jadi
// "body > div" mentah menunjuk div yang salah.
test.describe("page background token", () => {
  test("public pages use the soft-green background token", async ({
    page,
  }) => {
    await test.step("Beranda berlatar hijau lembut #e6f0e8", async () => {
      await page.goto("/");
      const wrapper = page.locator("body > div.flex.min-h-screen").first();
      await expect(wrapper).toHaveCSS(
        "background-color",
        "rgb(230, 240, 232)",
      );
    });
    await test.step("Halaman baca berlatar hijau lembut yang sama", async () => {
      if (isProductionTarget) {
        const firstCard = await test.step("Cari kartu shalawat pertama", async () => {
          await page.goto("/shalawat");
          return page.locator('a[href^="/baca/"]').first();
        });
        if ((await firstCard.count()) === 0) {
          test.skip(true, "no published articles in this environment");
        }
        await firstCard.click();
        await expect(page).toHaveURL(/\/baca\//);
      } else {
        const resp = await page.goto("/baca/e2e-seed-bacaan-deploy");
        if (resp?.status() === 404) {
          test.skip(
            true,
            "seed article e2e-seed-bacaan-deploy not found (404)",
          );
        }
      }
      const wrapper = page.locator("body > div.flex.min-h-screen").first();
      await expect(wrapper).toHaveCSS(
        "background-color",
        "rgb(230, 240, 232)",
      );
    });
  });
});

// Fix reviewer whole-branch I2a: tipografi admin TIDAK BOLEH berubah
// oleh redesign (font baru hanya untuk halaman publik). Halaman admin
// tidak memakai layout (site), jadi heading-nya harus tetap memakai
// font sistem (Arial), bukan Marcellus / Public Sans / Source Serif /
// Amiri. Sengaja memakai /admin/articles (bukan preview): preview
// SENGAJA me-render ReaderView, jadi font baru tampil di sana.
test.describe("admin typography guard", () => {
  test("admin pages do not use the new site fonts", async ({ page }) => {
    test.skip(
      !process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD,
      "needs admin credentials",
    );
    await test.step("Login dan buka daftar artikel admin", async () => {
      await loginAsAdmin(page);
      await page.goto("/admin/articles");
      await expect(
        page.getByRole("heading", { name: "Artikel" }),
      ).toBeVisible();
    });
    await test.step("Heading admin bukan font baru situs", async () => {
      const font = await page
        .getByRole("heading", { name: "Artikel" })
        .evaluate((el) => getComputedStyle(el).fontFamily);
      for (const banned of [
        "Marcellus",
        "Public Sans",
        "Source Serif",
        "Amiri",
      ]) {
        expect(font.toLowerCase()).not.toContain(banned.toLowerCase());
      }
    });
  });
});

// Fix reviewer whole-branch I2b: halaman cetak belum pernah
// di-render e2e. Pin warna token pada kartu cetak dan heading
// section-nya (globals.css: .print-card memakai var(--line) dan
// var(--emerald-900); PrintView h2 memakai text-emerald-900).
test.describe("print page", () => {
  test("print page renders token borders and emerald headings", async ({
    page,
  }) => {
    let slug = "";
    if (isProductionTarget) {
      const firstCard = await test.step("Cari kartu shalawat pertama", async () => {
        await page.goto("/shalawat");
        return page.locator('a[href^="/baca/"]').first();
      });
      if ((await firstCard.count()) === 0) {
        test.skip(true, "no published articles in this environment");
      }
      const href = await firstCard.getAttribute("href");
      slug = (href ?? "").replace("/baca/", "");
    } else {
      slug = "e2e-seed-bacaan-deploy";
    }
    const resp = await test.step("Buka halaman cetak", async () => {
      return page.goto(`/baca/${slug}/cetak`);
    });
    if (resp?.status() === 404) {
      test.skip(true, `print page for ${slug} not found (404)`);
    }
    await test.step("Kartu cetak memakai border token", async () => {
      const card = page.locator(".print-card").first();
      await expect(card).toBeVisible();
      await expect(card).toHaveCSS("border-left-color", "rgb(6, 78, 59)");
      await expect(card).toHaveCSS("border-top-color", "rgb(207, 227, 211)");
    });
    // H2 section hanya dirender bila judul section berbeda dari
    // judul artikel (atau ada >1 section) — artikel satu section
    // yang judulnya sama dengan artikel tidak punya h2, dan itu
    // sah, bukan kegagalan. Seed lokal selalu punya h2 ("Bagian
    // dummy" vs "E2E Seed Bacaan Deploy"), jadi assertion ini
    // berjalan penuh di lokal/CI.
    const h2Count = await page.locator(".print-section-head h2").count();
    if (h2Count === 0) {
      test.skip(
        true,
        "no section heading on this print page (single section titled like the article)",
      );
    }
    await test.step("Heading section cetak berwarna emerald-900", async () => {
      await expect(
        page.locator(".print-section-head h2").first(),
      ).toHaveCSS("color", "rgb(6, 78, 59)");
    });
  });
});
