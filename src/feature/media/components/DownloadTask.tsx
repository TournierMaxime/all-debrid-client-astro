import { useCallback, useEffect, useState } from "react"
import { actions } from "astro:actions"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatBytes } from "@/lib/utils"
import type { TaskInfo } from "@/types/nas"

interface DownloadTaskProps {
  taskId: string
}

export function DownloadTask({ taskId }: DownloadTaskProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<
    "downloading" | "paused" | "finished" | "error"
  >("downloading")
  const [info, setInfo] = useState<TaskInfo>()

  // Fonction pour récupérer les infos de la tâche
  const fetchInfo = useCallback(async () => {
    try {
      const { data: infoTask } = await actions.infoTask({ id: taskId })
      setInfo(infoTask.data.tasks[0])
      setProgress(
        (infoTask.data.tasks[0]?.additional?.transfer?.size_downloaded /
          infoTask.data.tasks[0]?.size) *
          100,
      )
      setStatus(infoTask.data.tasks[0].status)
    } catch (e) {
      console.error(e)
      setStatus("error")
    }
  }, [taskId])

  // Polling toutes les 5s
  useEffect(() => {
    fetchInfo()
    const interval = setInterval(fetchInfo, 5000)
    return () => clearInterval(interval)
  }, [fetchInfo])

  const handlePause = async () => {
    await actions.pauseTask({ id: taskId })
    fetchInfo()
  }

  const handleResume = async () => {
    await actions.resumeTask({ id: taskId })
    fetchInfo()
  }

  const handleDelete = async () => {
    await actions.deleteTask({ id: taskId })
    setStatus("finished")
    setProgress(0)
    window.location.href = "/downloads"
  }

  if (status === "finished") {
    handleDelete()
  }

  return (
    <div className="p-4 bg-(--ads-bg-default) rounded-md">
      <h2 className="font-bold text-normal mb-2">{info?.title}</h2>

      <Progress value={progress} max={100} className="mb-2" />

      <p>Taille: {formatBytes(info?.size || 0)}</p>
      <p>Progression: {progress.toFixed(1)}%</p>
      <p>Status: {status}</p>

      <div className="flex gap-2 mt-2">
        {status === "downloading" && (
          <Button className="cursor-pointer" onClick={handlePause}>
            Pause
          </Button>
        )}
        {status === "paused" && (
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
