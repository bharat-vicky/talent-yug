import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#005070",
          dark: "#003f57",
          light: "#2080a8",
        },
        accent: {
          DEFAULT: "#49ccdd",
          light: "#e0f2fe",
        },
        success: "#1f8f5f",
        danger: "#b42318",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 10px 28px rgba(0,0,0,0.04)",
        "card-hover": "0 20px 40px rgba(0,0,0,0.08)",
        auth: "0 20px 45px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease",
        "fade-in": "fadeIn 0.3s ease",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
