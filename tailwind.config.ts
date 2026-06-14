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
        emerald: {
          50: "#f0faf5",
          100: "#d9f2e4",
          200: "#b3e4ca",
          300: "#7fcfa8",
          400: "#46b07f",
          500: "#1f9460",
          600: "#0f7a4e",
          700: "#0a6140",
          800: "#0a4d34",
          900: "#08402d",
          950: "#04261b",
        },
        gold: {
          50: "#fdf9ed",
          100: "#f9eecb",
          200: "#f2db93",
          300: "#ecc862",
          400: "#e3b13b",
          500: "#d4af37",
          600: "#b8881f",
          700: "#94661c",
          800: "#7a521e",
          900: "#68441e",
          950: "#3c240d",
        },
        cream: "#fbf8f0",
        ink: "#0a2a1f",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        luxe: "0 20px 60px -15px rgba(8, 64, 45, 0.35)",
        gold: "0 10px 40px -10px rgba(212, 175, 55, 0.45)",
      },
      backgroundImage: {
        "gold-foil":
          "linear-gradient(135deg, #f9eecb 0%, #d4af37 35%, #b8881f 55%, #ecc862 75%, #d4af37 100%)",
        "emerald-radial":
          "radial-gradient(120% 120% at 50% 0%, #0a6140 0%, #08402d 45%, #04261b 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.2s ease forwards",
        shimmer: "shimmer 6s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
