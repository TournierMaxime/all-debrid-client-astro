/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdoc,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: { min: "0px" },
        xsOnly: { min: "0px", max: "425px" },
        sm: { min: "640px" },
        smOnly: { min: "640px", max: "1023px" },
        md: { min: "1024px" },
        mdOnly: { min: "1024px", max: "1439px" },
        lg: { min: "1440px" },
        lgOnly: { min: "1440px", max: "9999px" },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
}
