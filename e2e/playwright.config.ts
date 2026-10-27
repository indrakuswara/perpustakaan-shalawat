import { defineConfig } from "@playwright/test";

// Deploy-validation config. The target is chosen by PLAYWRIGHT_BASE_URL
// so the same suite runs against local `next start` (pre-deploy gate)
// and against production (post-deploy smoke) without code changes.
// No webServer here on purpose: CI starts the built app itself, and
// production obviously must not be started locally.
export default defineConfig({
  testDir: ".",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  // Configure the HTML reporter explicitly so the report artifact
  // uploaded by CI never depends on Playwright defaults. The JSON
  // reporter feeds e2e/report-to-site.mjs, which posts the owner
  // summary to the site's automation report page.
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "playwright-report.json" }],
  ],
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    // Local sandbox fallback only: the sandbox proxy intermittently
    // drops the Playwright browser download near completion. When
    // PLAYWRIGHT_CHROMIUM_PATH is set (e.g. to the VM Chromium),
    // use it instead of the downloaded build. CI never sets this
    // and always uses the exact Playwright browser.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
