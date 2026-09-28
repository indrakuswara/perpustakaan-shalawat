export default function SearchForm({
  defaultValue = "",
  size = "md",
}: {
  defaultValue?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-5 py-3.5 text-base" : "px-4 py-2.5 text-sm";
  return (
    <form action="/search" method="GET" role="search" className="w-full">
      <div className="flex overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm transition focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/15">
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Cari shalawat atau maulid…"
          aria-label="Cari artikel"
          className={`w-full bg-white text-stone-900 outline-none placeholder:text-stone-400 ${pad}`}
        />
        <button
          type="submit"
          className="shrink-0 bg-emerald-900 px-5 font-medium text-white transition hover:bg-emerald-950"
        >
          Cari
        </button>
      </div>
    </form>
  );
}
