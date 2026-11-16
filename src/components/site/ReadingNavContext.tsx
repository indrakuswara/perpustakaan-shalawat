"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ContentType } from "@/lib/db-types";

// State aktif nav untuk halaman baca (spec 6.2, deferral Task 4).
// SiteHeader hanya tahu pathname, jadi /baca/<slug> tidak punya tautan
// aktif. Halaman baca merender <SetReadingNavSection type={...} /> yang
// mengisi context ini; header memakai nilainya sebagai override.
// Route lain tidak pernah merender setter, jadi perilakunya tidak berubah.
type ReadingNavValue = {
  activeType: ContentType | null;
  setActiveType: (t: ContentType | null) => void;
};

const ReadingNavContext = createContext<ReadingNavValue>({
  activeType: null,
  setActiveType: () => {},
});

export function ReadingNavProvider({ children }: { children: ReactNode }) {
  const [activeType, setActiveTypeState] = useState<ContentType | null>(null);
  const setActiveType = useCallback(
    (t: ContentType | null) => setActiveTypeState(t),
    [],
  );
  const value = useMemo(
    () => ({ activeType, setActiveType }),
    [activeType, setActiveType],
  );
  return (
    <ReadingNavContext.Provider value={value}>
      {children}
    </ReadingNavContext.Provider>
  );
}

export function useReadingNav(): ReadingNavValue {
  return useContext(ReadingNavContext);
}

// Dipasang halaman baca saja: menandai kategori artikel aktif di header,
// dibersihkan saat halaman ditinggalkan (navigasi klien ke route lain).
export function SetReadingNavSection({ type }: { type: ContentType }) {
  const { setActiveType } = useReadingNav();
  useEffect(() => {
    setActiveType(type);
    return () => setActiveType(null);
  }, [type, setActiveType]);
  return null;
}
