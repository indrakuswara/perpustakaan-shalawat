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
    const response = await request.post("/api/automation-report", {
      headers: { "x-automation-token": token },
      data: {
        runKey,
        workflow: "Test Laporan Automation",
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
        cleanupStatus: "clean",
      },
    });
    expect(response.ok()).toBeTruthy();
    // The row is intentionally left in the local test database
    // (ephemeral in CI); it proves the read path, which is the
    // feature's whole point.
    await loginAsAdmin(page);
    await page.goto("/admin/automationreport");
    await expect(
      page.getByText("Test Laporan Automation"),
    ).toBeVisible();
    await expect(page.getByText("2 lolos · 1 gagal · 0 dilewati")).toBeVisible();
    await expect(page.getByText("Contoh tes gagal")).toBeVisible();
    await expect(page.getByText("Bersih, tidak ada sisa")).toBeVisible();
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
