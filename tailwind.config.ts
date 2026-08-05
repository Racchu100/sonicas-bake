import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#8B1E3F",
          burgundyDark: "#5E1129",
          burgundyLight: "#A82952",
          pink: "#F5D6E6",
          pinkSoft: "#FDF0F6",
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          goldDark: "#997A15",
          bg: "#FFF8F9",
          card: "#FFFFFF",
          midnight: "#1E0A12",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(139, 30, 63, 0.12), 0 4px 12px rgba(212, 175, 55, 0.08)",
        goldGlow: "0 0 25px rgba(212, 175, 55, 0.4)",
        glass: "0 8px 32px 0 rgba(139, 30, 63, 0.08)",
      },
      animation: {
        'gold-shine': 'goldShine 3s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        goldShine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
