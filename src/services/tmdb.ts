import { PUBLIC_TMDB } from "astro:env/client"
import { SECRET_TMDB_API_KEY } from "astro:env/server"

import type { Credits, Movie } from "@/types/tmdb"

class TMDB {
  public apiTmdb = PUBLIC_TMDB
  public tmdbApiKey = SECRET_TMDB_API_KEY

  getQueryParams() {
    return `?api_key=${this.tmdbApiKey}&language=fr-FR`
  }

  async movie(id: string): Promise<Movie> {
    const response = await fetch(
      `${this.apiTmdb}/movie/${id}${this.getQueryParams()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )

    return response.json()
  }

  async credits(id: string): Promise<Credits> {
    const response = await fetch(
      `${this.apiTmdb}/movie/${id}/credits${this.getQueryParams()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )

    return response.json()
  }
}

export const tmdbService = new TMDB()
