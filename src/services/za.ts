import {
  SECRET_ALLDEBRID_TOKEN,
  SECRET_API_ALLDEBRID_LOCAL,
  SECRET_OFFICIAL_ALLDEBRID_API,
} from "astro:env/server"

import type { SearchProps } from "../feature/search/type/search"

class ZA {
  public apiAllDebridLocal = SECRET_API_ALLDEBRID_LOCAL

  async getFilms() {
    const response = await fetch(`${this.apiAllDebridLocal}/films/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json()
  }

  async getFilm(link: string) {
    const response = await fetch(`${this.apiAllDebridLocal}/film/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    })
    return response.json()
  }

  async getSerie(link: string) {
    const response = await fetch(`${this.apiAllDebridLocal}/serie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    })
    return response.json()
  }

  async search(data: SearchProps) {
    const response = await fetch(`${this.apiAllDebridLocal}/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: data.query, filter: data.filter }),
    })
    return response.json()
  }

  async check(title?: string) {
    const response = await fetch(`${this.apiAllDebridLocal}/check/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
    return response.json()
  }
}

class AllDebrid extends ZA {
  private officialAllDebridApi = SECRET_OFFICIAL_ALLDEBRID_API

  async getLink(link: string) {
    const response = await fetch(
      `${this.apiAllDebridLocal}/all-debrid/?link=${decodeURIComponent(link)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    return response.json()
  }

  async getUnlockLink(link: string) {
    const response = await fetch(
      `${this.officialAllDebridApi}/link/unlock?link=${decodeURIComponent(
        link,
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
        },
      },
    )
    return response.json()
  }

  async getRedirectLink(link: string) {
    const response = await fetch(
      `${this.officialAllDebridApi}/link/redirector?link=${decodeURIComponent(
        link,
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
        },
      },
    )
    return response.json()
  }

  async saveLink(link: string) {
    const body = new URLSearchParams()
    body.append("links[]", link)

    const response = await fetch(
      `${this.officialAllDebridApi}/user/links/save`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
        },
        body,
      },
    )
    return response.json()
  }

  async getUserHistory() {
    const response = await fetch(`${this.officialAllDebridApi}/user/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
      },
    })
    return response.json()
  }

  async getUserLinks() {
    const response = await fetch(`${this.officialAllDebridApi}/user/links`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
      },
    })
    return response.json()
  }

  async deleteSaveLink(link: string) {
    const body = new URLSearchParams()
    body.append("links[]", link)

    const response = await fetch(
      `${this.officialAllDebridApi}/user/links/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${SECRET_ALLDEBRID_TOKEN}`,
        },
        body,
      },
    )
    return response.json()
  }
}

export const zaService = new ZA()
export const allDebridService = new AllDebrid()
