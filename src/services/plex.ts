 
import {
  SECRET_API_PLEX_LOCAL,
  SECRET_PLEX_ENDPOINT,
  SECRET_PLEX_TOKEN,
} from "astro:env/server"

class Plex {
  public apiPlexLocal = SECRET_API_PLEX_LOCAL
  public plexEndpoint = SECRET_PLEX_ENDPOINT

  async deleteMetadataItem(ids: string) {
    const response = await fetch(
      `${this.plexEndpoint}/library/metadata/${ids}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Plex-Token": SECRET_PLEX_TOKEN,
        },
      },
    )
    return response.json()
  }

  async getLibrary(
    sectionKey: string,
    params?: { type?: string; offset?: string; limit?: string },
  ) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([_, v]) => v !== undefined),
        ).toString()}`
      : ""

    const response = await fetch(
      `${this.apiPlexLocal}/plex/library/sections/${sectionKey}/all${query}`,
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

  async getLibraryMetadata(ratingKey: string) {
    const response = await fetch(
      `${this.apiPlexLocal}/plex/library/metadata/${ratingKey}`,
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

export const plexService = new Plex()
