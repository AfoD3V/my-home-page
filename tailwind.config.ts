import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/pages/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require("tailwindcss-animate")], 
} satisfies Config;