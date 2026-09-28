import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — produces a plain HTML/CSS/JS bundle in ./out that can be
   * uploaded to shared hosting such as GoDaddy cPanel, which cannot run a
   * Node server. Vercel serves the same export without any change.
   */
  output: "export",

  /** cPanel/Apache serves /path/ as /path/index.html, so emit that shape. */
  trailingSlash: true,

  /** The Next image optimiser needs a server; there is none on cPanel. */
  images: { unoptimized: true },
};

export default nextConfig;
