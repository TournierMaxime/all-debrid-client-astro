export interface ResolveResponse {
  code: number
  msg: string
  data: {
    id: string
    res: {
      name: string
      size: number
      range: boolean
      files: [
        {
          name: string
          path: string
          size: number
          ctime: string
          req: unknown
        },
      ]
      hash: string
    }
  }
}

export interface CreateTaskResponse {
  code: number
  msg: string
  data: string
}

export interface ContinueTaskResponse {
  code: number
  msg: string
  data: string
}

export interface DeleteTaskResponse {
  code: number
  msg: string
  data: string
}

export interface GetTasksResponse {
  code: number
  msg: string
  data: {
    id: string
    protocol: string
    meta: {
      req: {
        url: string
        extra: unknown
        labels: unknown
        proxy: unknown
        skipVerifyCert: boolean
      }
      res: {
        name: string
        size: number
        range: boolean
        files: [
          {
            name: string
            path: string
            size: number
            ctime: string
            req: unknown
          },
        ]
        hash: string
      }
      opts: {
        name: string
        path: string
        selectFiles: number[]
        extra: {
          connections: number
          autoTorrent: unknown
          deleteTorrentAfterDownload: unknown
          autoExtract: unknown
          archivePassword: string
          deleteAfterExtract: boolean
        }
      }
    }
    status: string
    uploading: boolean
    progress: {
      used: number
      speed: number
      downloaded: number
      uploadSpeed: number
      uploaded: number
      extractStatus: string
      extractProgress: number
    }
    isCreated: boolean
    createdAt: string
    updatedAt: string
    name: string
  }[]
}

export interface Task {
  id: string
  protocol: string
  meta: {
    req: {
      url: string
      extra: unknown
      labels: unknown
      proxy: unknown
      skipVerifyCert: boolean
    }
    res: {
      name: string
      size: number
      range: boolean
      files: [
        {
          name: string
          path: string
          size: number
          ctime: string
          req: unknown
        },
      ]
      hash: string
    }
    opts: {
      name: string
      path: string
      selectFiles: number[]
      extra: {
        connections: number
        autoTorrent: unknown
        deleteTorrentAfterDownload: unknown
        autoExtract: unknown
        archivePassword: string
        deleteAfterExtract: boolean
      }
    }
  }
  status: string
  uploading: boolean
  progress: {
    used: number
    speed: number
    downloaded: number
    uploadSpeed: number
    uploaded: number
    extractStatus: string
    extractProgress: number
  }
  isCreated: boolean
  createdAt: string
  updatedAt: string
  name: string
}

export interface GetTaskResponse {
  code: number
  msg: string
  data: {
    id: string
    protocol: string
    meta: {
      req: {
        url: string
        extra: unknown
        labels: unknown
        proxy: unknown
        skipVerifyCert: boolean
      }
      res: {
        name: string
        size: number
        range: boolean
        files: [
          {
            name: string
            path: string
            size: number
            ctime: string
            req: unknown
          },
        ]
        hash: string
      }
      opts: {
        name: string
        path: string
        selectFiles: number[]
        extra: {
          connections: number
          autoTorrent: unknown
          deleteTorrentAfterDownload: unknown
          autoExtract: unknown
          archivePassword: string
          deleteAfterExtract: boolean
        }
      }
    }
    status: string
    uploading: boolean
    progress: {
      used: number
      speed: number
      downloaded: number
      uploadSpeed: number
      uploaded: number
      extractStatus: string
      extractProgress: number
    }
    isCreated: boolean
    createdAt: string
    updatedAt: string
    name: string
  }
}

export interface PauseTaskResponse {
  code: number
  msg: string
  data: string
}

export interface GetTaskStatsResponse {
  code: number
  msg: string
  data: {
    connections: {
      downloaded: number
      completed: boolean
      failed: boolean
      retryTimes: number
    }[]
  }
}

export enum Method {
  post = "POST",
  get = "GET",
  put = "PUT",
  delete = "DELETE",
}
