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
        main : "#F3F4F6",
        primaryText : "#1F2937",
        primaryBlue : "#2563EB",
        whitef : '#F5F5F5',
      },
      spacing : {
        'navbar-height' : '80px',
        'sidebar-width' : '22%',
        'default-padding' : '200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
