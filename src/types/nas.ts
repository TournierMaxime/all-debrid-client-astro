export interface Task {
  additional: {
    detail: {
      completed_time: number
      connected_leechers: number
      connected_peers: number
      connected_seeders: number
      create_time: number
      destination: string
      seedelapsed: number
      started_time: number
      total_peers: number
      total_pieces: number
      unzip_password: string
      uri: string
      waiting_seconds: number
    }
  }
  id: string
  size: number
  status: string
  title: string
  type: string
  username: string
}

export interface Tasks {
  data: {
    offset: number
    tasks: Task[]
    total: number
  }
  success: true
}

export interface TaskInfo {
  additional: {
    detail: {
      completed_time: number
      connected_leechers: number
      connected_peers: number
      connected_seeders: number
      create_time: number
      destination: string
      seedelapsed: number
      started_time: number
      total_peers: number
      total_pieces: number
      unzip_password: string
      uri: string
      waiting_seconds: number
    }
    transfer: {
      downloaded_pieces: number
      size_downloaded: number
      size_uploaded: number
      speed_download: number
      speed_upload: number
    }
  }
  id: string
  size: number
  status: string
  title: string
  type: string
  username: string
}

export interface Info {
  data: {
    tasks: TaskInfo[]
  }
  success: true
}
