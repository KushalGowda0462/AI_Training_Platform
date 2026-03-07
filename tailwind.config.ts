import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A017",
          hover: "#B8870A",
          light: "#F5E6B8",
          muted: "#E8C96B",
        },
        cream: {
          DEFAULT: "#FAFAF8",
          dark: "#F3F0E8",
        },
        navy: {
          DEFAULT: "#0B1220",
          light: "#162035",
        },
        border: "#E7E2D8",
        ink: "#0F172A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(15,23,42,0.06)",
        "card-hover": "0 8px 32px 0 rgba(15,23,42,0.12)",
        gold: "0 4px 20px 0 rgba(212,160,23,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
