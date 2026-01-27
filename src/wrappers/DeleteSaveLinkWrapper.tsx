import { useEffect } from "react"
import { actions } from "astro:actions"

export default function DeleteSaveLinkWrapper() {
  useEffect(() => {
    const handler = async (e: any) => {
      const { link } = e.detail

      const confirmed = window.confirm(
        "Ce lien est sur le point d'être supprimé de l'historique.\n\nÊtes vous sur de vouloir continuer ?\n\nCette action est irréversible.",
      )

      if (!confirmed) return

      try {
        await actions.deleteSaveLink({ link })
        window.location.reload()
      } catch (err) {
        console.error("Erreur suppression lien", err)
        alert("Une erreur est survenue lors de la suppression.")
      }
    }

    window.addEventListener("delete-link", handler)
    return () => window.removeEventListener("delete-link", handler)
  }, [])

  return null
}
