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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-dark": "var(--accent-dark)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "orb-a":     "orb-drift-a 18s ease-in-out infinite",
        "orb-b":     "orb-drift-b 22s ease-in-out infinite",
        "orb-c":     "orb-drift-c 30s ease-in-out infinite",
        "float":     "float-gentle 6s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "shimmer":   "shimmer 2.5s linear infinite",
        "grain":     "grain 0.4s steps(1) infinite",
        "ping-soft": "ping-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
