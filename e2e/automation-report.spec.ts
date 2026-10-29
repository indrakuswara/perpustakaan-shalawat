import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

// The owner report page is deliberately hidden: no button or link
// anywhere on the site or in the admin area points to it. Only an
// admin who knows the URL can open it. These tests prove the two
// properties that matter: it redirects to login without a session,
// and it renders for an admin.
test.describe("hidden admin automation report", () => {
  test("redirects to login without a session", async ({ page }) => {
    await page.goto("/admin/automationreport");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("renders for an admin", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/automationreport");
    await expect(
      page.getByRole("heading", { name: "Laporan Automation" }),
    ).toBeVisible();
  });

  test("is not linked from the admin dashboard", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin");
    await expect(
      page.locator('a[href="/admin/automationreport"]'),
    ).toHaveCount(0);
  });

  test("renders a posted summary", async ({ page, request }) => {
    // This test writes a summary row, so it only ever runs against
    // a local test server. Running it against production would
    // pollute the real owner page with a synthetic row.
    const base = process.env.PLAYWRIGHT_BASE_URL ?? "";
    test.skip(
      !base.includes("localhost") && !base.includes("127.0.0.1"),
      "POST test only runs against a local test server",
    );
    const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
    test.skip(!token, "AUTOMATION_REPORT_TOKEN is not set");
    const runKey = `e2e-report-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    // Unique workflow name so this card is found by content, not by
    // newest-first ordering, even if older synthetic rows remain.
    const workflow = `Test Laporan Automation ${runKey}`;
    const response = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        runKey,
        workflow,
        trigger: "test",
        status: "failed",
        commitSha: "abc1234",
        actor: "test-owner",
        actionsUrl:
          "https://github.com/indrakuswara/perpustakaan-shalawat/actions/runs/1",
        passed: 2,
        failed: 1,
        skipped: 0,
        failedTests: ["Contoh tes gagal"],
        tests: [
          {
            title: "Contoh tes lolos",
            status: "passed",
            steps: [
              { title: "Buka halaman", status: "passed", durationMs: 120 },
            ],
            // example.com has no such path, so the screenshot
            // proxy answers 404 and the page shows its fallback
            // note instead of a broken image. That fallback path
            // is what this assertion proves; a real Blob image is
            // proven by the production smoke run.
            screenshot: "https://example.com/evidence.png",
          },
          {
            title: "Contoh tes gagal",
            status: "failed",
            steps: [],
            screenshot: null,
          },
        ],
        cleanupStatus: "clean",
      },
    });
    expect(response.ok()).toBeTruthy();
    // The row is intentionally left in the local test database
    // (ephemeral in CI); it proves the read path, which is the
    // feature's whole point.
    await loginAsAdmin(page);
    await page.goto("/admin/automationreport");
    const card = page.locator("article", { hasText: workflow }).first();
    await expect(card.getByText(workflow)).toBeVisible();
    await expect(card.getByText("2 lolos · 1 gagal · 0 dilewati")).toBeVisible();
    // "Contoh tes gagal" appears twice inside the card (failed list
    // and per-test list), so assert the first (visible failed-list) one.
    await expect(card.getByText("Contoh tes gagal").first()).toBeVisible();
    await expect(card.getByText("Bersih, tidak ada sisa")).toBeVisible();
    // The per-test list starts collapsed: its items are hidden
    // until the summary is opened.
    await expect(card.getByText("Contoh tes lolos")).toBeHidden();
    await card.getByText("Lihat 2 tes").click();
    await expect(card.getByText("Contoh tes lolos")).toBeVisible();
    await expect(card.getByText("Buka halaman")).toBeVisible();
    // The dummy screenshot URL 404s in the proxy, so the page
    // shows the fallback note, not a broken image.
    await expect(
      card.getByText("Bukti screenshot tidak tersedia", { exact: false }),
    ).toBeVisible();
    await expect(
      card.getByText("Tidak ada bukti screenshot untuk tes ini", {
        exact: false,
      }),
    ).toBeVisible();
  });

  test("renders a fallback note when a summary has no per-test detail", async ({
    page,
    request,
  }) => {
    // Older runs were stored before the per-test list existed, so a
    // payload without `tests` must render the fallback note, not an
    // empty list or an error.
    const base = process.env.PLAYWRIGHT_BASE_URL ?? "";
    test.skip(
      !base.includes("localhost") && !base.includes("127.0.0.1"),
      "POST test only runs against a local test server",
    );
    const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
    test.skip(!token, "AUTOMATION_REPORT_TOKEN is not set");
    const runKey = `e2e-report-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const workflow = `Test Laporan Lama ${runKey}`;
    const response = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        runKey,
        workflow,
        trigger: "test",
        status: "passed",
        commitSha: "abc1234",
        actor: "test-owner",
        actionsUrl:
          "https://github.com/indrakuswara/perpustakaan-shalawat/actions/runs/1",
        passed: 1,
        failed: 0,
        skipped: 0,
        failedTests: [],
        cleanupStatus: "unknown",
      },
    });
    expect(response.ok()).toBeTruthy();
    await loginAsAdmin(page);
    await page.goto("/admin/automationreport");
    const card = page.locator("article", { hasText: workflow }).first();
    await expect(card.getByText(workflow)).toBeVisible();
    await expect(
      card.getByText("Run ini tidak punya detail per-tes"),
    ).toBeVisible();
    await expect(card.locator("details")).toHaveCount(0);
  });

  test("rejects an invalid tests payload even with a token", async ({
    request,
  }) => {
    const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
    test.skip(!token, "AUTOMATION_REPORT_TOKEN is not set");
    const baseData = {
      trigger: "test",
      status: "passed",
      commitSha: "abc1234",
      actor: "test-owner",
      actionsUrl:
        "https://github.com/indrakuswara/perpustakaan-shalawat/actions/runs/1",
      passed: 1,
      failed: 0,
      skipped: 0,
      failedTests: [],
      cleanupStatus: "unknown",
    };
    const badStatus = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        ...baseData,
        runKey: "e2e-report-bad-tests-status",
        workflow: "Test Laporan Automation",
        tests: [{ title: "Contoh tes", status: "bogus" }],
      },
    });
    expect(badStatus.status()).toBe(400);
    const notArray = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        ...baseData,
        runKey: "e2e-report-bad-tests-type",
        workflow: "Test Laporan Automation",
        tests: "bukan-array",
      },
    });
    expect(notArray.status()).toBe(400);
  });

  test("rejects invalid steps or screenshot in a test entry", async ({
    request,
  }) => {
    const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
    test.skip(!token, "AUTOMATION_REPORT_TOKEN is not set");
    const baseData = {
      trigger: "test",
      status: "passed",
      commitSha: "abc1234",
      actor: "test-owner",
      actionsUrl:
        "https://github.com/indrakuswara/perpustakaan-shalawat/actions/runs/1",
      passed: 1,
      failed: 0,
      skipped: 0,
      failedTests: [],
      cleanupStatus: "unknown",
    };
    const badStep = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        ...baseData,
        runKey: "e2e-report-bad-step",
        workflow: "Test Laporan Automation",
        tests: [
          {
            title: "Contoh tes",
            status: "passed",
            steps: [{ title: "Langkah", status: "bogus", durationMs: 1 }],
            screenshot: null,
          },
        ],
      },
    });
    expect(badStep.status()).toBe(400);
    const badScreenshot = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        ...baseData,
        runKey: "e2e-report-bad-screenshot",
        workflow: "Test Laporan Automation",
        tests: [
          {
            title: "Contoh tes",
            status: "passed",
            steps: [],
            screenshot: "http://bukan-https.example/x.png",
          },
        ],
      },
    });
    expect(badScreenshot.status()).toBe(400);
  });

  // Screenshot proxy auth boundary: read-only, but it gates
  // evidence images behind the admin session, so both the 401
  // and the 404 paths are asserted directly. Localhost only:
  // these need a real admin login, which the production smoke
  // must not depend on for a read check.
  test("screenshot proxy requires an admin session", async ({ request }) => {
    const base = process.env.PLAYWRIGHT_BASE_URL ?? "";
    test.skip(
      !base.includes("localhost") && !base.includes("127.0.0.1"),
      "Proxy test only runs against a local test server",
    );
    const response = await request.get(
      "/api/automation-screenshot?runKey=tidak-ada&index=0",
    );
    expect(response.status()).toBe(401);
  });

  test("screenshot proxy rejects bogus runs and missing index for an admin", async ({
    page,
  }) => {
    const base = process.env.PLAYWRIGHT_BASE_URL ?? "";
    test.skip(
      !base.includes("localhost") && !base.includes("127.0.0.1"),
      "Proxy test only runs against a local test server",
    );
    await loginAsAdmin(page);
    const bogus = await page.request.get(
      "/api/automation-screenshot?runKey=tidak-ada&index=0",
    );
    expect(bogus.status()).toBe(404);
    const noIndex = await page.request.get(
      "/api/automation-screenshot?runKey=tidak-ada",
    );
    expect(noIndex.status()).toBe(400);
  });

  test("rejects a summary without a token", async ({ request }) => {
    const response = await request.post("/api/automation-report", {
      data: {
        runKey: "e2e-report-no-token",
        workflow: "Test Laporan Automation",
        trigger: "test",
        status: "passed",
        commitSha: "abc1234",
        actor: "test-owner",
        actionsUrl: "https://github.com/x",
        passed: 1,
        failed: 0,
        skipped: 0,
        failedTests: [],
        cleanupStatus: "unknown",
      },
    });
    expect(response.status()).toBe(401);
  });

  test("rejects a bad payload even with a token", async ({ request }) => {
    const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
    test.skip(!token, "AUTOMATION_REPORT_TOKEN is not set");
    const response = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: { runKey: "e2e-report-bad-payload", status: "bogus" },
    });
    expect(response.status()).toBe(400);
  });
});
