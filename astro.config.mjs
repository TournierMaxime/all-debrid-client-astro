// @ts-check
import { defineConfig, envField } from "astro/config"

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SECRET_API_ALLDEBRID_LOCAL: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_OFFICIAL_ALLDEBRID_API: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_ALLDEBRID_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_MOTRIX: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_DS: envField.string({
        context: "client",
        access: "public",
      }),
      PORT: envField.number({
        context: "server",
        access: "public",
      }),
    },
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
})