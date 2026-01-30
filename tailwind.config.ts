/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdoc,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "425px",
      md: "767px",
      lg: "1023px",
      xl: "1439px",
      "2xl": "2559px",
    },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
  plugins: [],
}
