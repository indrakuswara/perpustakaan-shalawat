// Pure parsing of a Playwright JSON report, shared by
// e2e/report-to-site.mjs (and unit-tested in report-lib.test.mjs).
// No I/O, no network, no process exit here, so the logic can be
// tested without running a browser.

export function specStatus(spec) {
  const results = (spec.tests ?? []).flatMap((t) => t.results ?? []);
  // Fail closed: a spec with no results (interrupted run) must
  // never display as passed.
  if (results.length === 0) return "failed";
  if (results.every((r) => r.status === "skipped")) {
    return "skipped";
  }
  return spec.ok ? "passed" : "failed";
}

function walkSteps(steps, out) {
  for (const step of steps ?? []) {
    if (typeof step.title !== "string") continue;
    out.push({
      title: step.title.slice(0, 300),
      status: step.error ? "failed" : "passed",
      durationMs: Number(step.duration ?? 0),
    });
    // Explicit test.step() calls nest their own steps; flatten so
    // the report shows one readable step list per test.
    if (Array.isArray(step.steps)) walkSteps(step.steps, out);
  }
  return out;
}

// Steps recorded in the JSON report are exactly the explicit
// test.step() calls: plain Playwright API calls (page.goto, expect)
// do not appear here, so this list stays short and meaningful.
export function collectSteps(result) {
  return walkSteps(result?.steps, []).slice(0, 50);
}

// The screenshot attachment Playwright writes when screenshot is
// "on" (one per test, at test end). Returns the absolute path, or
// null when the test produced no png screenshot (e.g. a
// request-only test with no page).
export function screenshotPath(result) {
  const shots = (result?.attachments ?? []).filter(
    (a) => a.name === "screenshot" && a.contentType === "image/png",
  );
  if (shots.length === 0) return null;
  return shots[shots.length - 1].path ?? null;
}

// A spec can hold several test entries (retries); the LAST
// result is decisive (a fail-then-pass spec must show the passing
// attempt's steps and screenshot under its passed status, not the
// failed attempt's). Retried specs still report their overall
// spec.ok outcome via specStatus.
export function collectTests(report) {
  const failedTests = [];
  const tests = [];
  function walkSuites(suites) {
    for (const suite of suites ?? []) {
      for (const spec of suite.specs ?? []) {
        const title = [suite.title, spec.title].filter(Boolean).join(" > ");
        if (!title) continue;
        const results = spec.tests?.[0]?.results ?? [];
        const lastResult = results[results.length - 1];
        tests.push({
          title: title.slice(0, 300),
          status: specStatus(spec),
          steps: lastResult ? collectSteps(lastResult) : [],
          screenshotPath: lastResult ? screenshotPath(lastResult) : null,
        });
        if (spec.ok === false) failedTests.push(title.slice(0, 300));
      }
      walkSuites(suite.suites);
    }
  }
  walkSuites(report.suites);
  return {
    tests: tests.slice(0, 100),
    failedTests: [...new Set(failedTests)].slice(0, 50),
  };
}

// Cleanup status comes from the suite's own final cleanup test:
// it passes only when no test article remains.
export function collectCleanupStatus(report) {
  let status = "unknown";
  function walkSuites(suites) {
    for (const suite of suites ?? []) {
      for (const spec of suite.specs ?? []) {
        if (
          typeof spec.title === "string" &&
          spec.title.includes("cleanup: no test article remains")
        ) {
          status = spec.ok ? "clean" : "leftover";
        }
      }
      walkSuites(suite.suites);
    }
  }
  walkSuites(report.suites);
  return status;
}
