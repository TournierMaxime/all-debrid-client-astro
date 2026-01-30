import { useEffect, useState } from "react"
import { actions } from "astro:actions"
import Alert from "@/feature/media/components/Alert"

export default function DeleteMetadataItemWrapper() {
  const [open, setOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<string | null>(null)
  const description = `Ce contenu est sur le point d'être supprimé du NAS.\nÊtes vous sur de vouloir continuer ?\nCette action est irréversible.`

  useEffect(() => {
    const handler = (e: any) => {
      setMediaToDelete(e.detail)
      setOpen(true)
    }

    window.addEventListener("delete-metadata-item", handler)
    return () => window.removeEventListener("delete-metadata-item", handler)
  }, [])

  const handleConfirm = async () => {
    if (!mediaToDelete) return

    try {
      actions.deleteMetadataItem({ ids: mediaToDelete })
      window.location.reload()
    } catch (err) {
      console.error("Erreur suppression lien", err)
      alert("Une erreur est survenue lors de la suppression.")
    } finally {
      setOpen(false)
      setMediaToDelete(null)
    }
  }

  return (
    <Alert
      title="Suppression du média"
      description={description}
      isChoice={true}
      open={open}
      onCancel={() => {
        setOpen(false)
        setMediaToDelete(null)
      }}
      onConfirm={handleConfirm}
    />
  )
}
