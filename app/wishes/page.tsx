import type { Metadata } from "next";
import { WishesBoard } from "@/components/WishesBoard";

export const metadata: Metadata = {
  title: "سجل التهاني | عمر وجنى",
  description: "كلمات التهنئة لعمر وجنى بمناسبة الخطوبة.",
};

export default function WishesPage() {
  return <WishesBoard />;
}
