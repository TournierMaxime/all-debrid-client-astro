import { useEffect, useState } from "react"
import { actions } from "astro:actions"

import Alert from "../components/Alert"

export default function DeleteSaveLinkWrapper() {
  const [open, setOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const description = `Ce lien est sur le point d'être supprimé de l'historique.\nÊtes-vous sûr de vouloir continuer ?\nCette action est irréversible.`

  useEffect(() => {
    const handler = (e: unknown) => {
      setLinkToDelete((e as CustomEvent).detail.link)
      setOpen(true)
    }

    window.addEventListener("delete-link", handler)
    return () => window.removeEventListener("delete-link", handler)
  }, [])

  const handleConfirm = async () => {
    if (!linkToDelete) return

    try {
      await actions.deleteSaveLink({ link: linkToDelete })
      window.location.reload()
    } catch (err) {
      console.error("Erreur suppression lien", err)
      alert("Une erreur est survenue lors de la suppression.")
    } finally {
      setOpen(false)
      setLinkToDelete(null)
    }
  }

  return (
    <Alert
      title="Suppression de l'historique"
      description={description}
      isChoice={true}
      open={open}
      onCancel={() => {
        setOpen(false)
        setLinkToDelete(null)
      }}
      onConfirm={handleConfirm}
    />
  )
}
