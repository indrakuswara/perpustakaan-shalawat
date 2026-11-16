// Brand lockup: the book-tile mark extracted from the mockup export
// (~/workspace/your_files/redesign-perpustakaan/index.html, header
// lockup), plus "Perpustakaan Shalawat" (Marcellus) and the sub
// "Shalawat & Maulid" (Public Sans). Same geometry and proportions in
// both variants; only the tile treatment changes:
// - "dark": transparent tile with a gold border, on the dark hero.
// - "light": solid emerald tile, on the light header.
export default function BrandMark({
  variant,
}: {
  variant: "dark" | "light";
}) {
  const isDark = variant === "dark";
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={
          isDark
            ? "grid h-11 w-11 flex-none place-items-center rounded-[12px_12px_12px_2px] border border-gold/65 bg-emerald-950/45 text-gold-soft"
            : "grid h-11 w-11 flex-none place-items-center rounded-[12px_12px_12px_2px] bg-emerald-900 text-gold-soft"
        }
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={
            isDark
              ? "block font-display text-[19px] text-on-dark"
              : "block font-display text-[19px] text-ink"
          }
        >
          Perpustakaan Shalawat
        </span>
        <span
          className={
            isDark
              ? "block text-[11px] tracking-[0.22em] text-gold-soft uppercase"
              : "block text-[11px] tracking-[0.22em] text-muted uppercase"
          }
        >
          Shalawat &amp; Maulid
        </span>
      </span>
    </span>
  );
}
