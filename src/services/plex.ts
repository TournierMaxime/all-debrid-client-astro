import {
  SECRET_API_PLEX_LOCAL,
  SECRET_PLEX_TOKEN,
  SECRET_PLEX_ENDPOINT,
} from "astro:env/server"

class Plex {
  public apiPlexLocal = SECRET_API_PLEX_LOCAL
  public plexEndpoint = SECRET_PLEX_ENDPOINT

  async getLibraries() {
    const response = await fetch(`${this.apiPlexLocal}/plex/library/sections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Plex-Token": SECRET_PLEX_TOKEN,
      },
    })
    return response.json()
  }

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
    sectionId: string,
    params?: { type?: string; offset?: string; limit?: string },
  ) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([_, v]) => v !== undefined),
        ).toString()}`
      : ""

    const response = await fetch(
      `${this.plexEndpoint}/library/sections/${sectionId}/all${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Plex-Token": SECRET_PLEX_TOKEN,
        },
      },
    )

    return response.json()
  }
}

export const plexService = new Plex()
