import type { Metadata } from "next";
import KoleksiPage from "@/components/site/KoleksiPage";

export const metadata: Metadata = {
  title: "Shalawat",
  description: "Kumpulan bacaan shalawat yang bisa dibaca gratis.",
};

export default function ShalawatPage() {
  return (
    <KoleksiPage
      type="SHALAWAT"
      title="Shalawat"
      description="Kumpulan shalawat untuk dibaca dan diamalkan sehari-hari."
    />
  );
}
