import {
  SECRET_NAS_ENDPOINT,
  SECRET_NAS_ACCOUNT,
  SECRET_NAS_PWD,
} from "astro:env/server"

class NAS {
  public apiNas = SECRET_NAS_ENDPOINT
  public account = SECRET_NAS_ACCOUNT
  public pwd = SECRET_NAS_PWD

  private sid: string | null = null
  private sidExpiresAt = 0

  private SID_TTL = 55 * 60 * 1000 // 55 minutes

  private async login() {
    const response = await fetch(
      `${this.apiNas}/webapi/auth.cgi?api=SYNO.API.Auth&account=${this.account}&passwd=${this.pwd}&version=6&method=login`,
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
    )

    return response.json()
  }
}

export const nasService = new NAS()
