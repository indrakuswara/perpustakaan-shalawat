import { test, expect } from "@playwright/test";
import {
  runId,
  testTitle,
  slugify,
  loginAsAdmin,
  createDraftArticle,
  publishArticle,
  cleanupArticle,
} from "./helpers";

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
      await expect(
        page.getByRole("link", { name: /\d+ Shalawat/ }),
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

// Reviewer Task 7, Fix 1 (Important): jalur render pita Daily
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
const isProductionTarget = (process.env.PLAYWRIGHT_BASE_URL ?? "").includes(
  "perpustakaan-shalawat.vercel.app",
);

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
