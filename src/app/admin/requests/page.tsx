import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { listRequests, parseDbDateTime, type RequestRow } from "@/lib/db";
import type { RequestKind, RequestStatus } from "@/lib/requests";
import { deleteRequestAction, setRequestStatusAction } from "./actions";
import DeleteRequestButton from "./DeleteRequestButton";

const STATUS_LABEL: Record<RequestStatus, string> = {
  baru: "Baru",
  selesai: "Selesai",
  ditolak: "Ditolak",
};

const STATUS_CLS: Record<RequestStatus, string> = {
  baru: "bg-amber-100 text-amber-800",
  selesai: "bg-emerald-100 text-emerald-800",
  ditolak: "bg-stone-200 text-stone-600",
};

function formatWaktu(iso: string): string {
  return parseDbDateTime(iso).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function chipCls(active: boolean): string {
  return active
    ? "rounded-full bg-emerald-800 px-3 py-1.5 text-sm font-medium text-white"
    : "rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50";
}

function StatusButton({
  id,
  status,
  label,
}: {
  id: string;
  status: RequestStatus;
  label: string;
}) {
  return (
    <form action={setRequestStatusAction.bind(null, id, status)} className="inline">
      <button
        type="submit"
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
      >
        {label}
      </button>
    </form>
  );
}

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; status?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login?next=%2Fadmin%2Frequests");
  }

  const sp = await searchParams;
  const kind: RequestKind | undefined =
    sp.kind === "shalawat" || sp.kind === "maulid" ? sp.kind : undefined;
  const status: RequestStatus | undefined =
    sp.status === "baru" || sp.status === "selesai" || sp.status === "ditolak"
      ? sp.status
      : undefined;

  const requests: RequestRow[] = await listRequests({ kind, status });

  const hrefFor = (patch: { kind?: string; status?: string }) => {
    const params = new URLSearchParams();
    const k = patch.kind !== undefined ? patch.kind : kind;
    const s = patch.status !== undefined ? patch.status : status;
    if (k) params.set("kind", k);
    if (s) params.set("status", s);
    const qs = params.toString();
    return qs ? `/admin/requests?${qs}` : "/admin/requests";
  };

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="text-sm font-medium text-emerald-800 hover:underline"
        >
          ← Dashboard
        </Link>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Request Masuk
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Usulan judul dari pengunjung (tanpa login).{" "}
              {requests.length} request pada tampilan ini.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-stone-500">Jenis:</span>
          <Link href={hrefFor({ kind: "" })} className={chipCls(!kind)}>
            Semua
          </Link>
          <Link
            href={hrefFor({ kind: "shalawat" })}
            className={chipCls(kind === "shalawat")}
          >
            Shalawat
          </Link>
          <Link
            href={hrefFor({ kind: "maulid" })}
            className={chipCls(kind === "maulid")}
          >
            Maulid
          </Link>
          <span className="ml-4 text-sm font-medium text-stone-500">
            Status:
          </span>
          <Link href={hrefFor({ status: "" })} className={chipCls(!status)}>
            Semua
          </Link>
          {(Object.keys(STATUS_LABEL) as RequestStatus[]).map((s) => (
            <Link
              key={s}
              href={hrefFor({ status: s })}
              className={chipCls(status === s)}
            >
              {STATUS_LABEL[s]}
            </Link>
          ))}
        </div>

        {requests.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-600">
            Belum ada request pada filter ini.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs tracking-wide text-stone-500 uppercase">
                  <th className="px-4 py-3 font-medium">Waktu</th>
                  <th className="px-4 py-3 font-medium">Jenis</th>
                  <th className="px-4 py-3 font-medium">Dari</th>
                  <th className="px-4 py-3 font-medium">Judul & keterangan</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-stone-100 align-top last:border-0"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                      {formatWaktu(r.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                        {r.kind === "shalawat" ? "Shalawat" : "Maulid"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-800">
                      {r.name}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900">{r.title}</p>
                      {r.note ? (
                        <p className="mt-1 whitespace-pre-wrap text-stone-600">
                          {r.note}
                        </p>
                      ) : (
                        <p className="mt-1 text-stone-400">—</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLS[r.status]}`}
                      >
                        {STATUS_LABEL[r.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.status !== "selesai" && (
                        <StatusButton id={r.id} status="selesai" label="Selesai" />
                      )}
                      {r.status !== "ditolak" && (
                        <StatusButton id={r.id} status="ditolak" label="Tolak" />
                      )}
                      {r.status !== "baru" && (
                        <StatusButton id={r.id} status="baru" label="Baru-kan" />
                      )}
                      <DeleteRequestButton
                        id={r.id}
                        title={r.title}
                        name={r.name}
                        deleteAction={deleteRequestAction.bind(null, r.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
