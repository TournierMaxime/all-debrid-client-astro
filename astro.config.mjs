// @ts-check
import node from "@astrojs/node"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"

// https://astro.build/config
export default defineConfig({
  output: "server",
  trailingSlash: "never",
  security: {
    checkOrigin: false,
  },
  env: {
    schema: {
      SECRET_NAS_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_NAS_ACCOUNT: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_NAS_PWD: envField.string({
        context: "server",
        access: "secret",
      }),
      NODE_ENV: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_PLEX_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_PLEX_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_API_PLEX_LOCAL: envField.string({
        context: "server",
        access: "secret",
      }),
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),
})
