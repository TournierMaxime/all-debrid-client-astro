import { useEffect } from "react"
import { actions } from "astro:actions"

export default function DeleteSaveLinkWrapper() {
  useEffect(() => {
    const handler = async (e: any) => {
      const { link } = e.detail

      const confirmed = window.confirm(
        "Es-tu sûr de vouloir supprimer ce lien ? Cette action est irréversible.",
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
