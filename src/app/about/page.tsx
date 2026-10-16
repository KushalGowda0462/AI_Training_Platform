import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = { title: "About | AURILEARN.AI" };

export default function AboutPage() {
  return <About />;
}
