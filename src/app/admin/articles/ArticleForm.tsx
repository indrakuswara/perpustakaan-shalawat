import type { ContentRow, ContentType } from "@/lib/db";
import BlocksEditor from "./BlocksEditor";

export const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

export default function ArticleForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: ContentRow;
  submitLabel: string;
}) {
  const type: ContentType = initial?.type ?? "SHALAWAT";
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-stone-700"
        >
          Judul
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initial?.title ?? ""}
          placeholder="cth: Shalawat Badar"
          className={inputCls}
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="mb-1 block text-sm font-medium text-stone-700"
        >
          Tipe
        </label>
        <select id="type" name="type" defaultValue={type} className={inputCls}>
          <option value="SHALAWAT">Shalawat</option>
          <option value="MAULID">Maulid</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-stone-700"
        >
          Deskripsi singkat{" "}
          <span className="font-normal text-stone-400">(opsional)</span>
        </label>
        <input
          id="description"
          name="description"
          type="text"
          defaultValue={initial?.description ?? ""}
          placeholder="Satu kalimat pengantar…"
          className={inputCls}
        />
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-stone-700">
          Isi artikel
        </span>
        <BlocksEditor
          initial={initial?.blocks ?? null}
          legacyBody={initial?.body ?? ""}
        />
        <p className="mt-1 text-xs text-stone-400">
          Susun bacaan per bagian. Tersimpan sebagai draft sampai kamu publish.
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-emerald-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
      >
        {submitLabel}
      </button>
    </form>
  );
}
