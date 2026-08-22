import {
  SECRET_PROWLARR_API_KEY,
  SECRET_PROWLARR_ENDPOINT,
} from "astro:env/server"

import type { Search } from "@/types/prowlarr"

class Prowlarr {
  public apiProwlarrLocal = SECRET_PROWLARR_ENDPOINT
  public prowlarrApiKey = SECRET_PROWLARR_API_KEY

  async search(params?: {
    type?: string
    categories?: string
    indexerIds?: string
    limit?: string
    offset?: string
    sortDir?: string
    query?: string
  }): Promise<Search[]> {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([_, v]) => v !== undefined),
        ).toString()}`
      : ""

    const response = await fetch(`${this.apiProwlarrLocal}/search${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Key": this.prowlarrApiKey,
      },
    })

    return response.json()
  }
}

export const prowlarrService = new Prowlarr()
