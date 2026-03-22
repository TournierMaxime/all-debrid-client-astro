interface MockTasks {
  data: {
    id: string
    meta: {
      req: {
        url: string
      }
      res: {
        size: number
      }
    }
    status: string
    progress: {
      speed: number
      downloaded: number
    }
    createdAt: string
    name: string
  }[]
}

export const tasks: MockTasks = {
  data: [
    {
      id: "kjOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "done",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
    {
      id: "mjOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "pause",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
    {
      id: "njOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "running",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
    {
      id: "ojOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "ready",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
    {
      id: "pjOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "wait",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
    {
      id: "qjOAdvOjRb0hLKZP_qN-g",
      meta: {
        req: {
          url: "https://c5d6e7.debrid.it/dl/4ix0tlma293/Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf.mkv",
        },
        res: {
          size: 12531935233,
        },
      },
      status: "error",
      progress: {
        speed: 10207499,
        downloaded: 164390966,
      },
      createdAt: "2026-03-21T01:34:59.589696797Z",
      name: "Dossier.137.2025.FRENCH.2160p.WEB.H265-FW-Wawacity.golf (2).mkv",
    },
  ],
}
