// Unit tests for e2e/report-lib.mjs (pure Playwright JSON parsing).
// Run: node --test e2e/report-lib.test.mjs
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  specStatus,
  collectSteps,
  screenshotPath,
  collectTests,
  collectCleanupStatus,
} from "./report-lib.mjs";

const resultWith = (overrides) => ({
  status: "passed",
  steps: [],
  attachments: [],
  ...overrides,
});

describe("specStatus", () => {
  it("fails closed when a spec has no results", () => {
    assert.equal(specStatus({ ok: true, tests: [] }), "failed");
    assert.equal(specStatus({ ok: true, tests: [{ results: [] }] }), "failed");
  });
  it("reports skipped only when every result skipped", () => {
    const skipped = { tests: [{ results: [resultWith({ status: "skipped" })] }] };
    assert.equal(specStatus(skipped), "skipped");
    const mixed = {
      tests: [
        {
          results: [
            resultWith({ status: "skipped" }),
            resultWith({ status: "passed" }),
          ],
        },
      ],
    };
    assert.equal(specStatus({ ...mixed, ok: true }), "passed");
  });
  it("follows spec.ok otherwise", () => {
    const base = { tests: [{ results: [resultWith({})] }] };
    assert.equal(specStatus({ ...base, ok: true }), "passed");
    assert.equal(specStatus({ ...base, ok: false }), "failed");
  });
});

describe("collectSteps", () => {
  it("maps error presence to failed, duration preserved, titles capped", () => {
    const steps = collectSteps(
      resultWith({
        steps: [
          { title: "Buka halaman", duration: 120 },
          { title: "Klik simpan", duration: 45, error: { message: "boom" } },
          { title: "x".repeat(400), duration: 1 },
        ],
      }),
    );
    assert.equal(steps.length, 3);
    assert.deepEqual(steps[0], {
      title: "Buka halaman",
      status: "passed",
      durationMs: 120,
    });
    assert.equal(steps[1].status, "failed");
    assert.equal(steps[2].title.length, 300);
  });
  it("flattens nested steps and caps at 50", () => {
    const nested = { title: "Luar", duration: 10, steps: [
      { title: "Dalam", duration: 5 },
    ] };
    const many = Array.from({ length: 60 }, (_, i) => ({
      title: `Langkah ${i}`,
      duration: 1,
    }));
    const steps = collectSteps(resultWith({ steps: [nested, ...many] }));
    assert.equal(steps[0].title, "Luar");
    assert.equal(steps[1].title, "Dalam");
    assert.equal(steps.length, 50);
  });
  it("returns [] when there are no steps", () => {
    assert.deepEqual(collectSteps(resultWith({})), []);
    assert.deepEqual(collectSteps(resultWith({ steps: null })), []);
  });
});

describe("screenshotPath", () => {
  it("picks the png screenshot attachment, last wins", () => {
    const res = resultWith({
      attachments: [
        { name: "trace", contentType: "application/zip", path: "/tmp/t.zip" },
        { name: "screenshot", contentType: "image/png", path: "/tmp/a.png" },
        { name: "screenshot", contentType: "image/png", path: "/tmp/b.png" },
      ],
    });
    assert.equal(screenshotPath(res), "/tmp/b.png");
  });
  it("returns null when no png screenshot exists", () => {
    assert.equal(screenshotPath(resultWith({})), null);
    assert.equal(
      screenshotPath(
        resultWith({
          attachments: [{ name: "screenshot", contentType: "image/jpeg", path: "/tmp/a.jpg" }],
        }),
      ),
      null,
    );
  });
});

describe("collectTests retries", () => {
  it("uses the last result, not the first", () => {
    const report = {
      suites: [
        {
          title: "suite",
          specs: [
            {
              title: "retry spec",
              ok: true,
              tests: [
                {
                  results: [
                    resultWith({
                      steps: [{ title: "Percobaan gagal", duration: 1, error: { message: "x" } }],
                      attachments: [
                        { name: "screenshot", contentType: "image/png", path: "/tmp/fail.png" },
                      ],
                    }),
                    resultWith({
                      steps: [{ title: "Percobaan lolos", duration: 2 }],
                      attachments: [
                        { name: "screenshot", contentType: "image/png", path: "/tmp/pass.png" },
                      ],
                    }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const { tests } = collectTests(report);
    assert.equal(tests[0].status, "passed");
    assert.deepEqual(tests[0].steps, [
      { title: "Percobaan lolos", status: "passed", durationMs: 2 },
    ]);
    assert.equal(tests[0].screenshotPath, "/tmp/pass.png");
  });
});

describe("collectTests", () => {
  it("walks nested suites and joins suite and spec titles", () => {
    const report = {
      suites: [
        {
          title: "public smoke",
          suites: [
            {
              title: "bagian dalam",
              specs: [
                {
                  title: "homepage renders",
                  ok: true,
                  tests: [
                    {
                      results: [
                        resultWith({
                          steps: [{ title: "Buka beranda", duration: 3 }],
                          attachments: [
                            { name: "screenshot", contentType: "image/png", path: "/tmp/s.png" },
                          ],
                        }),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          specs: [
            {
              title: "gagal contoh",
              ok: false,
              tests: [{ results: [resultWith({})] }],
            },
          ],
        },
      ],
    };
    const { tests, failedTests } = collectTests(report);
    assert.equal(tests.length, 2);
    // A suite's own specs come before its child suites.
    assert.equal(tests[0].title, "public smoke > gagal contoh");
    assert.equal(tests[1].title, "bagian dalam > homepage renders");
    assert.deepEqual(tests[1].steps, [
      { title: "Buka beranda", status: "passed", durationMs: 3 },
    ]);
    assert.equal(tests[1].screenshotPath, "/tmp/s.png");
    assert.deepEqual(failedTests, ["public smoke > gagal contoh"]);
  });
});

describe("collectCleanupStatus", () => {
  it("finds the cleanup spec and maps ok to clean/leftover", () => {
    const mk = (ok) => ({
      suites: [
        {
          specs: [
            { title: "cleanup: no test article remains", ok },
          ],
        },
      ],
    });
    assert.equal(collectCleanupStatus(mk(true)), "clean");
    assert.equal(collectCleanupStatus(mk(false)), "leftover");
    assert.equal(collectCleanupStatus({ suites: [] }), "unknown");
  });
});
