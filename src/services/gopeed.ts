import { PUBLIC_GOPEED } from "astro:env/client"
import { SECRET_GOPEED_TOKEN } from "astro:env/server"

import {
  type ContinueTaskResponse,
  type CreateTaskResponse,
  type DeleteTaskResponse,
  type GetTaskResponse,
  type GetTasksResponse,
  type GetTaskStatsResponse,
  Method,
  type PauseTaskResponse,
  type ResolveResponse,
} from "@/types/gopeed"

class Gopeed {
  public apiGopeed = PUBLIC_GOPEED
  public path = "/app/Downloads"
  public apiVersion = "api/v1"

  private token = SECRET_GOPEED_TOKEN
  private gopeedHeaders = {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Token": this.token,
    },
  }

  async resolve(
    url: string,
    name: string,
    type: string,
  ): Promise<ResolveResponse> {
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/resolve`,
      {
        method: Method.post,
        headers: this.gopeedHeaders.headers,
        body: JSON.stringify({
          req: {
            url,
          },
          opts: {
            name,
            path:
              type === "film" ? `${this.path}/Films` : `${this.path}/Séries`,
            selectFiles: [],
            extra: null,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorDetails = await response.text()
      console.error("Erreur API Gopeed:", errorDetails)
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  async createTask(rid: string): Promise<CreateTaskResponse> {
    const response = await fetch(`${this.apiGopeed}/${this.apiVersion}/tasks`, {
      method: Method.post,
      headers: this.gopeedHeaders.headers,
      body: JSON.stringify({
        rid,
      }),
    })

    if (!response.ok) {
      const errorDetails = await response.text()
      console.error("Erreur API Gopeed:", errorDetails)
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  async continueTask(id: string): Promise<ContinueTaskResponse> {
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/tasks/${id}/continue`,
      {
        method: Method.put,
        headers: this.gopeedHeaders.headers,
      },
    )

    return response.json()
  }

  async pauseTask(id: string): Promise<PauseTaskResponse> {
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/tasks/${id}/pause`,
      {
        method: Method.put,
        headers: this.gopeedHeaders.headers,
      },
    )

    return response.json()
  }

  async deleteTask(id: string[]): Promise<DeleteTaskResponse> {
    const params = new URLSearchParams()

    id.forEach((id) => params.append("id", id))
    // &force=true supprime les fichiers sur le NAS
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/tasks?${params.toString()}`,
      {
        method: Method.delete,
        headers: this.gopeedHeaders.headers,
      },
    )

    return response.json()
  }

  async getTask(id: string): Promise<GetTaskResponse> {
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/tasks/${id}`,
      {
        method: Method.get,
        headers: this.gopeedHeaders.headers,
      },
    )

    return response.json()
  }

  async getTasks(): Promise<GetTasksResponse> {
    const response = await fetch(`${this.apiGopeed}/${this.apiVersion}/tasks`, {
      method: Method.get,
      headers: this.gopeedHeaders.headers,
    })

    return response.json()
  }

  async getTaskStats(id: string): Promise<GetTaskStatsResponse> {
    const response = await fetch(
      `${this.apiGopeed}/${this.apiVersion}/tasks/${id}/stats`,
      {
        method: Method.get,
        headers: this.gopeedHeaders.headers,
      },
    )

    return response.json()
  }
}

export const gopeedService = new Gopeed()
