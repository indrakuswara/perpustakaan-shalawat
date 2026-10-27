// Post a Playwright run summary to the site's hidden owner report
// page (/admin/automationreport) via its token-protected endpoint.
// Reads the JSON report written by the config's json reporter.
// Usage (from CI, after the test step, with if: always()):
//   BASE_URL=https://perpustakaan-shalawat.vercel.app \
//   AUTOMATION_REPORT_TOKEN=<secret> \
//   WORKFLOW_NAME="Post-deploy smoke (production)" \
//   node e2e/report-to-site.mjs
// Required env: BASE_URL, AUTOMATION_REPORT_TOKEN.
// Optional GitHub env (fall back to local values when absent):
//   GITHUB_RUN_ID, GITHUB_RUN_ATTEMPT, GITHUB_EVENT_NAME,
//   GITHUB_SHA, GITHUB_ACTOR, GITHUB_SERVER_URL, GITHUB_REPOSITORY,
//   WORKFLOW_NAME.
// Exits non-zero when the report file is missing or the POST fails,
// so a missing report can never look like a clean run.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function fail(message) {
  console.error(`report-to-site: ${message}`);
  process.exit(1);
}

const baseUrl = (process.env.BASE_URL ?? "").replace(/\/+$/, "");
const token = process.env.AUTOMATION_REPORT_TOKEN ?? "";
if (!baseUrl) fail("BASE_URL is not set.");
if (!token) fail("AUTOMATION_REPORT_TOKEN is not set.");

// The json reporter's outputFile resolves relative to the config
// file (e2e/), but older runs also landed at the repo root, so
// check both locations instead of guessing one.
const candidates = [
  join("e2e", "playwright-report.json"),
  "playwright-report.json",
];
const reportPath = candidates.find((p) => existsSync(p));
if (!reportPath) fail(`JSON report not found in: ${candidates.join(", ")}`);

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch {
  fail(`Could not parse JSON report at ${reportPath}.`);
}

const stats = report.stats ?? {};
const passed = Number(stats.expected ?? 0);
const failed = Number(stats.unexpected ?? 0);
const skipped = Number(stats.skipped ?? 0);

// Walk nested suites/specs collecting failed spec titles.
const failedTests = [];
function walkSuites(suites) {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) {
      if (spec.ok === false) {
        const title = [suite.title, spec.title].filter(Boolean).join(" > ");
        if (title) failedTests.push(title.slice(0, 300));
      }
    }
    walkSuites(suite.suites);
  }
}
walkSuites(report.suites);
const uniqueFailed = [...new Set(failedTests)].slice(0, 50);

// Cleanup status comes from the suite's own final cleanup test:
// it passes only when no test article remains.
let cleanupStatus = "unknown";
function walkCleanup(suites) {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) {
      if (
        typeof spec.title === "string" &&
        spec.title.includes("cleanup: no test article remains")
      ) {
        cleanupStatus = spec.ok ? "clean" : "leftover";
      }
    }
    walkCleanup(suite.suites);
  }
}
walkCleanup(report.suites);

const runId = process.env.GITHUB_RUN_ID ?? `local-${Date.now()}`;
const attempt = process.env.GITHUB_RUN_ATTEMPT ?? "1";
// A zero-test run must never post as "passed": if Playwright
// produced a report with no specs at all (suite crash before any
// test ran, everything filtered out), nothing was validated, and
// the owner page must show GAGAL, not LULUS.
const total = passed + failed + skipped;
const payload = {
  runKey: `${runId}-${attempt}`,
  workflow: process.env.WORKFLOW_NAME ?? "Playwright",
  trigger: process.env.GITHUB_EVENT_NAME ?? "manual",
  status: failed > 0 || total === 0 ? "failed" : "passed",
  commitSha: process.env.GITHUB_SHA ?? "unknown",
  actor: process.env.GITHUB_ACTOR ?? "unknown",
  actionsUrl:
    process.env.GITHUB_RUN_ID && process.env.GITHUB_REPOSITORY
      ? `${process.env.GITHUB_SERVER_URL ?? "https://github.com"}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : baseUrl,
  passed,
  failed,
  skipped,
  failedTests: uniqueFailed,
  cleanupStatus,
};

const response = await fetch(`${baseUrl}/api/automation-report`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-automation-token": token,
  },
  body: JSON.stringify(payload),
});
if (!response.ok) {
  fail(
    `POST ${baseUrl}/api/automation-report failed with ${response.status}: ${await response.text()}`,
  );
}
console.log(
  `report-to-site: posted ${payload.workflow} run ${payload.runKey} (${payload.status}, ${passed} passed, ${failed} failed, cleanup ${cleanupStatus}).`,
);
