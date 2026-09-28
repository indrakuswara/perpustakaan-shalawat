import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { listContents, type ContentStatus } from "@/lib/db";
import {
  publishArticleAction,
  unpublishArticleAction,
  deleteArticleAction,
} from "./actions";

const STATUS_LABEL: Record<ContentStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Arsip",
};

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

function statusBadge(status: ContentStatus) {
  return status === "PUBLISHED"
    ? "bg-emerald-100 text-emerald-800"
    : "bg-amber-100 text-amber-800";
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login?next=%2Fadmin%2Farticles");

  const params = await searchParams;
  const filter: ContentStatus | undefined =
    params.status === "DRAFT" || params.status === "PUBLISHED"
      ? params.status
      : undefined;
  const articles = await listContents(filter ? { status: filter } : {});

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              ← Dashboard
            </Link>
            <h1 className="mt-1 text-2xl font-semibold text-stone-900">
              Artikel
            </h1>
          </div>
          <Link
            href="/admin/articles/new"
            className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            + Tulis artikel
          </Link>
        </div>

        <div className="mt-6 flex gap-2">
          {[
            { label: "Semua", href: "/admin/articles", active: !filter },
            {
              label: "Draft",
              href: "/admin/articles?status=DRAFT",
              active: filter === "DRAFT",
            },
            {
              label: "Published",
              href: "/admin/articles?status=PUBLISHED",
              active: filter === "PUBLISHED",
            },
          ].map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                t.active
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-600 hover:bg-stone-200"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {articles.length === 0 && (
            <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-sm text-stone-500">
              {filter
                ? `Belum ada artikel ${STATUS_LABEL[filter].toLowerCase()}.`
                : "Belum ada artikel. Klik “Tulis artikel” untuk mulai."}
            </p>
          )}
          {articles.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-stone-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-stone-900">
                    {a.title}
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    {TYPE_LABEL[a.type]} · diubah{" "}
                    {new Date(a.updatedAt + "Z").toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(a.status)}`}
                >
                  {STATUS_LABEL[a.status]}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/admin/articles/${a.id}`}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/articles/${a.id}/preview`}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Preview
                </Link>
                {a.status === "DRAFT" ? (
                  <form
                    action={publishArticleAction.bind(null, a.id)}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-900"
                    >
                      Publish
                    </button>
                  </form>
                ) : (
                  <form
                    action={unpublishArticleAction.bind(null, a.id)}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                    >
                      Unpublish
                    </button>
                  </form>
                )}
                <form
                  action={deleteArticleAction.bind(null, a.id)}
                  className="inline"
                >
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
