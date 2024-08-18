import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
      slideIn: {
        "0%": { right: "-100%" },
        "100%": { right: "20px" }
      },
    },
    animation: {
      slideIn: "slideIn 0.5s forwards"
    }
  },
  // nocompatible allows the plugin to style scrollbars using newer browser specifications, which may be more flexible
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")({ nocompatible: true })],
}

export default config
