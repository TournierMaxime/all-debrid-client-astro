import { useCallback, useEffect, useState } from "react"
import { actions } from "astro:actions"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatBytes } from "@/lib/utils"
import type { Task } from "@/types/gopeed"

interface DownloadTaskProps {
  taskId: string
  title: string
}

export function DownloadTask({ taskId, title }: DownloadTaskProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<
    "ready" | "running" | "pause" | "done" | "error" | "wait"
  >("running")
  const [info, setInfo] = useState<Task>()

  // Fonction pour récupérer les infos de la tâche
  const fetchInfo = useCallback(async () => {
    try {
      const { data: task } = await actions.getTask({ id: taskId })
      setInfo(task.data)
      setProgress(
        (task.data.progress.downloaded / task.data.meta.res.size) * 100,
      )
      setStatus(task.data.status)
    } catch (e) {
      console.error(e)
      setStatus("error")
    }
  }, [taskId])

  // Polling toutes les 1s
  useEffect(() => {
    fetchInfo()
    const interval = setInterval(fetchInfo, 1000)
    return () => clearInterval(interval)
  }, [fetchInfo])

  const handlePause = async () => {
    await actions.pauseTask({ id: taskId })
    setStatus("pause")
    fetchInfo()
  }

  const handleResume = async () => {
    await actions.continueTask({ id: taskId })
    setStatus("running")
    fetchInfo()
  }

  const handleDelete = async () => {
    await actions.deleteTask({ id: taskId })
    setStatus("done")
    setProgress(0)
    window.location.href = "/downloads"
  }

  if (status === "done") {
    window.location.href = "/downloads"
  }

  return (
    <div className="p-4 bg-(--ads-bg-default) rounded-md">
      <h2 className="font-bold text-normal mb-2 truncate">
        {title ?? info?.name}
      </h2>

      <Progress value={progress} max={100} className="mb-2" />

      <p>Taille: {formatBytes(info?.meta.res.size || 0)}</p>
      <p>Progression: {progress.toFixed(1)}%</p>
      <p>Status: {status}</p>
      <p>Vitesse: {info && formatBytes(info.progress.speed)}</p>

      <div className="flex gap-2 mt-2">
        {status === "running" && (
          <Button className="cursor-pointer" onClick={handlePause}>
            Pause
          </Button>
        )}
        {status === "pause" && (
          <Button className="cursor-pointer" onClick={handleResume}>
            Reprendre
          </Button>
        )}
        <Button
          className="text-white cursor-pointer"
          variant="destructive"
          onClick={handleDelete}
        >
          Annuler
        </Button>
      </div>
    </div>
  )
}
