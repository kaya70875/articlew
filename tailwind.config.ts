import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#F3F4F6",
        primaryText: "#1F2937",
        primaryBlue: "#2563EB",
        primaryPurple: "#6c63ff",
        whitef: "#F5F5F5",
        lightBlue: "#EEF3FF",
      },
      spacing: {
        "navbar-height": "80px",
        "sidebar-width": "200px",
        "default-padding": "200px",
      },
      screens: {
        xxs: "320px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;
