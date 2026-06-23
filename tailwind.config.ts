import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        skybolt: "#0ea5e9",
        lemon: "#facc15",
        melon: "#a78bfa",
        minty: "#22c55e",
        ink: "#111827",
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554"
        },
        lavender: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9"
        }
      },
      boxShadow: {
        soft: "0 20px 50px rgba(24, 32, 51, 0.12)",
        course: "0 24px 70px rgba(37, 99, 235, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
