import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /about/ and friends export as about/index.html, which Apache (GoDaddy
  // cPanel) serves without any rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
