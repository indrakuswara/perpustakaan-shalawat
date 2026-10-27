import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAutomationRun } from "@/lib/db";
import type {
  AutomationCleanupStatus,
  AutomationRunStatus,
  AutomationTestResult,
} from "@/lib/db-types";

export const dynamic = "force-dynamic";

// Endpoint penerima laporan run Playwright dari GitHub Actions.
// BUKAN endpoint admin session: proxy hanya melindungi /admin/*,
// sedangkan /api/* tidak dilindungi proxy, jadi endpoint ini memakai
// token rahasianya sendiri (AUTOMATION_REPORT_TOKEN, disetel sama
// di GitHub Secrets dan di env Vercel). Tanpa token yang cocok,
// tidak ada data yang ditulis dan tidak ada data yang dibocorkan.
//
// Payload divalidasi ketat sebelum insert: hanya field yang dikenal,
// tipe dan batas panjang yang diizinkan. Payload apa pun di luar
// itu ditolak dengan 400 tanpa menyentuh database.

function tokenMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= max;
}

function isNonNegativeInt(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 0;
}

export async function POST(req: Request): Promise<NextResponse> {
  const expected = process.env.AUTOMATION_REPORT_TOKEN ?? "";
  if (!expected) {
    return NextResponse.json(
      { error: "Automation report token belum dikonfigurasi di server." },
      { status: 503 },
    );
  }
  if (!tokenMatches(req.headers.get("x-automation-token"), expected)) {
    return NextResponse.json({ error: "Token tidak valid." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Body harus berupa objek." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const status = b.status;
  if (status !== "passed" && status !== "failed") {
    return NextResponse.json({ error: "status tidak valid." }, { status: 400 });
  }
  const cleanupStatus = b.cleanupStatus;
  if (
    cleanupStatus !== "clean" &&
    cleanupStatus !== "leftover" &&
    cleanupStatus !== "unknown"
  ) {
    return NextResponse.json({ error: "cleanupStatus tidak valid." }, { status: 400 });
  }
  // Daftar per-tes opsional (script lama tidak mengirimnya) dan
  // default-nya kosong; kalau dikirim, setiap entrinya divalidasi.
  let tests: AutomationTestResult[] = [];
  if (b.tests !== undefined) {
    if (
      !Array.isArray(b.tests) ||
      b.tests.length > 100 ||
      !b.tests.every(
        (t): t is Record<string, unknown> =>
          typeof t === "object" &&
          t !== null &&
          typeof t.title === "string" &&
          t.title.length > 0 &&
          t.title.length <= 300 &&
          (t.status === "passed" ||
            t.status === "failed" ||
            t.status === "skipped"),
      )
    ) {
      return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
    }
    tests = (b.tests as Array<Record<string, unknown>>).map((t) => ({
      title: t.title as string,
      status: t.status as AutomationTestResult["status"],
    }));
  }
  if (
    !isNonEmptyString(b.runKey, 100) ||
    !isNonEmptyString(b.workflow, 100) ||
    !isNonEmptyString(b.trigger, 50) ||
    !isNonEmptyString(b.commitSha, 100) ||
    !isNonEmptyString(b.actor, 100) ||
    !isNonEmptyString(b.actionsUrl, 500) ||
    !b.actionsUrl.startsWith("https://") ||
    !isNonNegativeInt(b.passed) ||
    !isNonNegativeInt(b.failed) ||
    !isNonNegativeInt(b.skipped) ||
    !Array.isArray(b.failedTests) ||
    b.failedTests.length > 50 ||
    !b.failedTests.every(
      (t): t is string => typeof t === "string" && t.length <= 300,
    )
  ) {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  try {
    await createAutomationRun({
      runKey: b.runKey,
      workflow: b.workflow,
      trigger: b.trigger,
      status: status as AutomationRunStatus,
      commitSha: b.commitSha,
      actor: b.actor,
      actionsUrl: b.actionsUrl,
      passed: b.passed,
      failed: b.failed,
      skipped: b.skipped,
      failedTests: b.failedTests as string[],
      tests,
      cleanupStatus: cleanupStatus as AutomationCleanupStatus,
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan laporan automation." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
