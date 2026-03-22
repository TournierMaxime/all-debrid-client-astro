import { Fragment, useEffect, useState } from "react"
import { actions } from "astro:actions"

import Alert from "@/components/shared/Alert"

export default function DeleteTaskWrapper() {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<string[]>([])

  const description = `Cette tâche est sur le point d'être supprimée du NAS.\nÊtes vous sur de vouloir continuer ?\nCette action est irréversible.`

  useEffect(() => {
    const handler = (e: CustomEvent<{ id: string[] }>) => {
      const data = e.detail.id
      setMediaToDelete(data)
      setOpen(true)
    }

    window.addEventListener("delete-task", handler as EventListener)
    return () =>
      window.removeEventListener("delete-task", handler as EventListener)
  }, [])

  const handleConfirm = async () => {
    if (!mediaToDelete) return

    try {
      await actions.deleteTask({ id: mediaToDelete })
      setSuccess(true)

      setTimeout(() => {
        window.location.href = "/downloads"
      }, 500)
    } catch (err) {
      console.error("Erreur suppression du fichier", err)
      alert("Une erreur est survenue lors de la suppression.")
    } finally {
      setOpen(false)
      setMediaToDelete([])
    }
  }

  return (
    <Fragment>
      <Alert
        title="Suppression du média"
        description={description}
        isChoice={true}
        open={open}
        onCancel={() => {
          setOpen(false)
          setMediaToDelete([])
        }}
        onConfirm={handleConfirm}
      />
      <Alert
        title="Suppression réussie"
        description="Le fichier a été supprimé avec succès. Redirection en cours…"
        open={success}
      />
    </Fragment>
  )
}
