import {
  SECRET_NAS_ACCOUNT,
  SECRET_NAS_ENDPOINT,
  SECRET_NAS_PWD,
} from "astro:env/server"

import type { Info, Tasks } from "@/types/nas"

class NAS {
  public apiNas = SECRET_NAS_ENDPOINT
  public account = SECRET_NAS_ACCOUNT
  public pwd = SECRET_NAS_PWD

  private sid: string | null = null
  private sidExpiresAt = 0

  private SID_TTL = 6 * 24 * 60 * 60 * 1000 // 6 jours en millisecondes

  private async login() {
    const response = await fetch(
      `${this.apiNas}/webapi/auth.cgi?api=SYNO.API.Auth&account=${this.account}&passwd=${this.pwd}&version=6&method=login&format=cookie`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const json = await response.json()
    this.sid = json.data.sid
    this.sidExpiresAt = Date.now() + this.SID_TTL

    return this.sid
  }

  async getSid() {
    if (this.sid && Date.now() < this.sidExpiresAt) {
      return this.sid
    }

    return this.login()
  }

  async getCapacity() {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/entry.cgi?version=2&method=list_share&api=SYNO.FileStation.List&additional=volume_status&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async renameFile(path: string, name: string) {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/entry.cgi?version=2&method=rename&api=SYNO.FileStation.Rename&path=["${path}"]&name=["${name}"]&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async moveFile(path?: string, destFolderPath?: string) {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/entry.cgi?version=3&method=start&api=SYNO.FileStation.CopyMove&path=["${path}"]&dest_folder_path=${destFolderPath}&remove_src=true&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async createDownloadTask(url: string, destination: string) {
    const sid = await this.getSid()

    const params = new URLSearchParams()
    params.append("api", "SYNO.DownloadStation2.Task")
    params.append("version", "2")
    params.append("method", "create")
    params.append("type", "url")
    params.append("url", url)
    params.append("destination", destination)
    params.append("create_list", "false")

    const response = await fetch(
      `${nasService.apiNas}/webapi/DownloadStation/entry.cgi?_sid=${sid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    )

    return response.json()
  }

  async resumeTask(id: string) {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=resume&id=${id}&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async pauseTask(id: string) {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=pause&id=${id}&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async deleteTask(id: string) {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=delete&id=${id}&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async task(): Promise<Tasks> {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=list&additional=detail,file&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }

  async infoTask(id: string): Promise<Info> {
    const sid = await this.getSid()

    const response = await fetch(
      `${this.apiNas}/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=getinfo&id=${id}&additional=detail,transfer&_sid=${sid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.json()
  }
}

export const nasService = new NAS()
