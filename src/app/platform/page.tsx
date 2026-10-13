import type { Metadata } from "next";
import PlatformSection from "@/components/PlatformSection";
import NaturalLearning from "@/components/sections/NaturalLearning";
import Mentorship from "@/components/sections/Mentorship";

export const metadata: Metadata = { title: "Platform | AURILEARN.AI" };

export default function PlatformPage() {
  return (
    <>
      <PlatformSection />
      <NaturalLearning />
      <Mentorship />
    </>
  );
}
