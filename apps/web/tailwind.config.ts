import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        lexend: ["var(--font-lexend)", ...fontFamily.sans],
        spaceGrotesk: ["var(--font-spaceGrotesk)", ...fontFamily.sans],
        manrope: ["var(--font-manrope)", ...fontFamily.sans],
      },
      colors: {
        primary: "#111827",
        secondary: "#f2f8ff",
        main: "#2d70ff",
        dark: "#151517",
        chart: {
          "1": "hsl(var(--chart-1, 210 90% 40%))",
          "2": "hsl(var(--chart-2, 210 70% 50%))",
          "3": "hsl(var(--chart-3, 210 50% 60%))",
          "4": "hsl(var(--chart-4, 210 30% 70%))",
          "5": "hsl(var(--chart-5, 210 10% 80%))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
