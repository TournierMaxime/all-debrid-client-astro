import { useEffect } from "react"
import { actions } from "astro:actions"

export default function DeleteMetadataItemWrapper() {
  useEffect(() => {
    const handler = async (e: any) => {
      const { ids } = e.detail

      const confirmed = window.confirm(
        "Ce contenu est sur le point d'être supprimé du NAS.\n\nÊtes vous sur de vouloir continuer ?\n\nCette action est irréversible.",
      )

      if (!confirmed) return

      try {
        await actions.deleteMetadataItem({ ids })
        window.location.href = "/libraries"
      } catch (err) {
        console.error("Erreur suppression", err)
        alert("Une erreur est survenue lors de la suppression.")
      }
    }

    window.addEventListener("delete-metadata-item", handler)
    return () => window.removeEventListener("delete-metadata-item", handler)
  }, [])

  return null
}
