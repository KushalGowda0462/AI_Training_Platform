import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AURILEARN.AI — AI-Powered Instructor Agent Platform",
  description:
    "AURILEARN.AI delivers AI instructor agents that transform legacy technical training into interactive, lab-driven mastery. Enterprise-grade, secure, and deeply integrated.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#FAFAF8]">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
