import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

const META_PIXEL_ID = "327793394379737";
const GA_MEASUREMENT_ID = "G-WXT567CCDN";

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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="bg-[#FAFAF8]">
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* End Google tag */}
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <Navbar />
        <main className="pt-16">{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
