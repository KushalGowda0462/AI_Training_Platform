import type { Metadata } from "next";
import Security from "@/components/sections/Security";
import Analytics from "@/components/sections/Analytics";

export const metadata: Metadata = { title: "Security | AURILEARN.AI" };

export default function SecurityPage() {
  return (
    <>
      <Security />
      <Analytics />
    </>
  );
}
