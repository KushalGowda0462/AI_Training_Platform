import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "AURILEARN.AI",
  description:
    "AURILEARN.AI delivers AI instructor agents that transform legacy technical training into interactive, lab-driven mastery. Enterprise-grade, secure, and deeply integrated.",
  icons: {
    icon: [
      { url: '/aurilearn-logo.svg', type: 'image/svg+xml' },
      { url: '/aurilearn-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/aurilearn-logo.png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/aurilearn-logo.svg" />
        <link rel="icon" type="image/png" href="/aurilearn-logo.png" />
        <link rel="apple-touch-icon" href="/aurilearn-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#FAFAF8]">
        <Navbar />
        <main className="pt-16">{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
