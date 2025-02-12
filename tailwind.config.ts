
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          hover: "#262626",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FB923C",
          hover: "#F97316",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#262626",
          foreground: "#A3A3A3",
        },
        popover: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(249, 115, 22, 0.8)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-down": "fade-down 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(249, 115, 22, 0.1))',
        'card-gradient': 'linear-gradient(to bottom right, #1A1A1A, #262626)',
        'button-gradient': 'linear-gradient(to right, #F97316, #FB923C)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
