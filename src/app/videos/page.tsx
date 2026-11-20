import type { Metadata } from "next";
import Videos from "@/components/sections/Videos";

export const metadata: Metadata = { title: "Videos | AURILEARN.AI" };

export default function VideosPage() {
  return <Videos />;
}
