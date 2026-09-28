import type { Metadata } from "next";
import KoleksiPage from "@/components/site/KoleksiPage";

export const metadata: Metadata = {
  title: "Maulid",
  description: "Kumpulan bacaan maulid yang bisa dibaca gratis.",
};

export default function MaulidPage() {
  return (
    <KoleksiPage
      type="MAULID"
      title="Maulid"
      description="Kumpulan maulid untuk dibaca dalam peringatan dan majelis."
    />
  );
}
