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
      <div className="flex overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/15">
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Cari shalawat atau maulid…"
          aria-label="Cari artikel"
          className={`w-full bg-white text-ink outline-none placeholder:text-placeholder ${pad}`}
        />
        <button
          type="submit"
          aria-label="Cari"
          className="flex shrink-0 items-center justify-center bg-emerald-900 px-5 text-white transition hover:bg-emerald-950"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
