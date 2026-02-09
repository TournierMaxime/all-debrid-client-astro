import { Fragment, useEffect, useState } from "react"
import { actions } from "astro:actions"
import Alert from "@/feature/media/components/Alert"

export default function DeleteMetadataItemWrapper() {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<{ ids: string }>({
    ids: "",
  })

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
    if (!mediaToDelete.ids) return

    try {
      await actions.deleteMetadataItem({ ids: mediaToDelete.ids })
      setSuccess(true)

      setTimeout(() => {
        window.location.href = "/libraries"
      }, 3000)
    } catch (err) {
      console.error("Erreur suppression du fichier", err)
      alert("Une erreur est survenue lors de la suppression.")
    } finally {
      setOpen(false)
      setMediaToDelete({ ids: "" })
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
          setMediaToDelete({ ids: "" })
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
