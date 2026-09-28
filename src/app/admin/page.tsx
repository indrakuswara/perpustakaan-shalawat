import Link from "next/link";
import { redirect } from "next/navigation";
import { countContents } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { logoutAction } from "./login/actions";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { total, published, drafts } = countContents();

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Dashboard Admin
            </h1>
            <p className="mt-1 text-sm text-stone-500">{admin.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Keluar
            </button>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Total artikel", value: total },
            { label: "Published", value: published },
            { label: "Draft", value: drafts },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-stone-200 bg-white p-5"
            >
              <p className="text-3xl font-semibold text-stone-900">{s.value}</p>
              <p className="mt-1 text-sm text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/admin/articles"
            className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            Kelola artikel
          </Link>
          <Link
            href="/admin/articles/new"
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            + Tulis artikel
          </Link>
        </div>
      </div>
    </main>
  );
}
