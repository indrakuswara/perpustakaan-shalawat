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
// Optional screenshot upload (production smoke only):
//   BLOB_READ_WRITE_TOKEN — when set, each test's screenshot is
//   uploaded to Vercel Blob under automation/<runKey>/ and its URL
//   is included in the payload, so the owner page can show evidence
//   for passed tests too. When unset (local gate runs), screenshots
//   are skipped and the report still posts with steps only.
// Exits non-zero when the report file is missing or the POST fails,
// so a missing report can never look like a clean run.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  collectTests,
  collectCleanupStatus,
} from "./report-lib.mjs";

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

const { tests: collected, failedTests: uniqueFailed } = collectTests(report);
const cleanupStatus = collectCleanupStatus(report);

const runId = process.env.GITHUB_RUN_ID ?? `local-${Date.now()}`;
const attempt = process.env.GITHUB_RUN_ATTEMPT ?? "1";
const runKey = `${runId}-${attempt}`;

// Upload screenshots to Vercel Blob, one per test, under a
// run-scoped prefix. Keys are sanitized: runKey comes from CI ids
// or a local timestamp, but never trust it blindly in a path.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? "";
const safeRunKey = runKey.replace(/[^A-Za-z0-9._-]/g, "_");
let uploadedCount = 0;
let screenshotByIndex = new Map();
let uploadedUrls = [];
// Imported lazily so runs without a Blob token never load the SDK.
// del is kept for the POST-failure cleanup below.
let blobDel = null;
if (blobToken) {
  const { put, list, del } = await import("@vercel/blob");
  blobDel = del;
  for (let i = 0; i < collected.length; i++) {
    const shot = collected[i].screenshotPath;
    if (!shot || !existsSync(shot)) continue;
    const pathname = `automation/${safeRunKey}/test-${i}.png`;
    try {
      const blob = await put(pathname, readFileSync(shot), {
        access: "public",
        contentType: "image/png",
        // Same runKey means the same run overwriting its own
        // evidence (e.g. a script re-run), so overwrites must be
        // allowed; the SDK default (allowOverwrite: false) would
        // turn every re-upload into a swallowed error.
        allowOverwrite: true,
        token: blobToken,
      });
      screenshotByIndex.set(i, blob.url);
      uploadedUrls.push(blob.url);
      uploadedCount++;
    } catch (err) {
      // A failed upload must not lose the whole report: the test
      // still posts with its steps, and this test simply has no
      // screenshot evidence for this run.
      console.error(
        `report-to-site: screenshot upload failed for test ${i}: ${err.message}`,
      );
    }
  }
  // Retention: keep screenshots for the 10 most recent runs only.
  // Only prune when this run actually uploaded something, so a
  // broken upload run never deletes older evidence while leaving
  // the new run without any.
  if (uploadedCount > 0) {
    try {
      // Follow pagination: list() caps at 1000 blobs per call,
      // and an unhandled cursor would silently leak old runs
      // once the store grows past that.
      let blobs = [];
      let cursor;
      do {
        const page = await list({
          prefix: "automation/",
          token: blobToken,
          cursor,
        });
        blobs.push(...page.blobs);
        cursor = page.cursor;
      } while (cursor);
      const runKeys = [...new Set(
        blobs
          .map((b) => {
            const m = b.pathname.match(/^automation\/([^/]+)\//);
            return m ? m[1] : null;
          })
          .filter(Boolean),
      )];
      // Blob list order is not a run order, so sort by newest
      // upload: the current run is newest by construction, and
      // older runs sort by their latest blob's uploadedAt.
      const latestByRun = new Map();
      for (const b of blobs) {
        const m = b.pathname.match(/^automation\/([^/]+)\//);
        if (!m) continue;
        const prev = latestByRun.get(m[1]);
        if (!prev || new Date(b.uploadedAt) > new Date(prev)) {
          latestByRun.set(m[1], b.uploadedAt);
        }
      }
      const sorted = [...latestByRun.entries()].sort(
        (a, b) => new Date(b[1]) - new Date(a[1]),
      );
      const keep = new Set(sorted.slice(0, 10).map(([k]) => k));
      const stale = blobs.filter((b) => {
        const m = b.pathname.match(/^automation\/([^/]+)\//);
        return m && !keep.has(m[1]);
      });
      if (stale.length > 0) {
        await del(stale.map((b) => b.url), { token: blobToken });
        console.log(
          `report-to-site: pruned ${stale.length} screenshots from ${runKeys.length - keep.size} old runs.`,
        );
      }
    } catch (err) {
      console.error(`report-to-site: screenshot pruning failed: ${err.message}`);
    }
  }
} else {
  console.log(
    "report-to-site: BLOB_READ_WRITE_TOKEN not set, skipping screenshot upload.",
  );
}

const tests = collected.map((t, i) => ({
  title: t.title,
  status: t.status,
  steps: t.steps,
  screenshot: screenshotByIndex.get(i) ?? null,
}));

// A zero-test run must never post as "passed": if Playwright
// produced a report with no specs at all (suite crash before any
// test ran, everything filtered out), nothing was validated, and
// the owner page must show GAGAL, not LULUS.
const total = passed + failed + skipped;
const payload = {
  runKey,
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
  tests,
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
  const body = await response.text();
  // Orphan cleanup: screenshots were uploaded before the POST, so
  // a failed POST would otherwise leave blobs under this runKey
  // with no DB row ever created (the proxy can never serve them),
  // and the next pruning run would count the orphan as one of the
  // 10 kept runs, evicting a real run's evidence one run early.
  if (uploadedUrls.length > 0 && blobDel) {
    try {
      await blobDel(uploadedUrls, { token: blobToken });
      console.log(
        `report-to-site: deleted ${uploadedUrls.length} orphaned screenshots after POST failure.`,
      );
    } catch (err) {
      console.error(
        `report-to-site: orphan cleanup failed: ${err.message}`,
      );
    }
  }
  fail(
    `POST ${baseUrl}/api/automation-report failed with ${response.status}: ${body}`,
  );
}
console.log(
  `report-to-site: posted ${payload.workflow} run ${payload.runKey} (${payload.status}, ${passed} passed, ${failed} failed, ${tests.length} tests listed, ${uploadedCount} screenshots uploaded, cleanup ${cleanupStatus}).`,
);
