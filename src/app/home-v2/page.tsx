import type { Metadata } from "next";
import Hero from "@/components/home-v2/Hero";
import Instructor from "@/components/home-v2/Instructor";
import AnalyticsBand from "@/components/home-v2/AnalyticsBand";
import Steps from "@/components/home-v2/Steps";
import SecurityCard from "@/components/home-v2/SecurityCard";
import FinalCta from "@/components/home-v2/FinalCta";

// Preview of the new landing page; kept out of search until it replaces "/".
export const metadata: Metadata = {
  title: "AURILEARN.AI",
  robots: { index: false, follow: false },
};

export default function HomeV2Page() {
  return (
    <>
      <Hero />
      <Instructor />
      <AnalyticsBand />
      <Steps />
      <SecurityCard />
      <FinalCta />
    </>
  );
}
