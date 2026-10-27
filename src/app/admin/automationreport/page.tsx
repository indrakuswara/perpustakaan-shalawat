import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { listAutomationRuns, parseDbDateTime } from "@/lib/db";

// Halaman laporan automation untuk owner. SENGAJA TERSEMBUNYI:
// tidak ada tombol atau link di situs mana pun (publik maupun admin)
// yang mengarah ke halaman ini. Hanya admin yang tahu URL-nya yang
// bisa membukanya, dan proxy /admin/* plus guard di bawah ini
// memastikan halaman ini selalu butuh login admin.
export const dynamic = "force-dynamic";

function formatWib(iso: string): string {
  return parseDbDateTime(iso).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AutomationReportPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login?next=%2Fadmin%2Fautomationreport");

  const runs = await listAutomationRuns(50);

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-stone-900">
          Laporan Automation
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Hasil run Playwright dari GitHub Actions, terbaru di atas.
          Maksimal 50 run terakhir disimpan.
        </p>

        {runs.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-sm text-stone-600">
            Belum ada laporan automation. Laporan pertama muncul setelah
            satu workflow selesai dan berhasil mengirim ringkasannya ke
            situs ini.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {runs.map((run) => (
              <article
                key={run.runKey}
                className="rounded-2xl border border-stone-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        run.status === "passed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {run.status === "passed" ? "LULUS" : "GAGAL"}
                    </span>
                    <span className="ml-2 text-sm font-medium text-stone-900">
                      {run.workflow}
                    </span>
                    <p className="mt-2 text-xs text-stone-500">
                      {formatWib(run.createdAt)} WIB · pemicu {run.trigger} ·{" "}
                      {run.actor} · commit {run.commitSha.slice(0, 7)}
                    </p>
                  </div>
                  <a
                    href={run.actionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    Detail di GitHub Actions
                  </a>
                </div>
                <p className="mt-3 text-sm text-stone-700">
                  {run.passed} lolos · {run.failed} gagal · {run.skipped}{" "}
                  dilewati
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-stone-500">Data tes: </span>
                  <span
                    className={
                      run.cleanupStatus === "clean"
                        ? "font-medium text-emerald-800"
                        : run.cleanupStatus === "leftover"
                          ? "font-medium text-red-700"
                          : "text-stone-600"
                    }
                  >
                    {run.cleanupStatus === "clean"
                      ? "Bersih, tidak ada sisa"
                      : run.cleanupStatus === "leftover"
                        ? "Ada sisa, perlu dicek"
                        : "Tidak diketahui"}
                  </span>
                </p>
                {run.failedTests.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-700">
                    {run.failedTests.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
