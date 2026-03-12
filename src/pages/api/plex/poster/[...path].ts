import type { APIRoute } from "astro"

import { plexEndpoint, plexToken } from "@/constants/utils"

const cache = new Map()

export const GET: APIRoute = async ({ params }) => {
  const path = params.path

  if (cache.has(path)) {
    return new Response(cache.get(path), {
      headers: { "Content-Type": "image/jpeg" },
    })
  }

  const plexUrl = `${plexEndpoint}/${path}?X-Plex-Token=${plexToken}`
  const response = await fetch(plexUrl)
  const buffer = await response.arrayBuffer()

  cache.set(path, buffer)

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000",
    },
  })
}
