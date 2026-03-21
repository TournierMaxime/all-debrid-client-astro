import { useEffect } from "react"
import { actions } from "astro:actions"

import { MediaProvider } from "@/feature/media/context/MediaProvider"
import { useMedia } from "@/feature/media/context/MediaProvider"

function Inner() {
  const { createDownloadTask } = useMedia()

  useEffect(() => {
    const handler = async (e: Event) => {
      const { link } = (e as CustomEvent).detail
      const btn = document.getElementById(`btn-${link}`)

      try {
        const { data: unlock } = await actions.getUnlockLink({ link })
        const finalLink = unlock.data.link
        await createDownloadTask(finalLink)
      } catch (e: unknown) {
        console.error(e)
      } finally {
        if (btn) {
          btn.classList.remove("pointer-events-none", "opacity-50")
          btn.innerHTML = "Télécharger"
        }
      }
    }

    window.addEventListener("download-again", handler)
    return () => {
      window.removeEventListener("download-again", handler)
    }
  }, [])

  return null
}

export default function DownloadAgainWrapper() {
  return (
    <MediaProvider>
      <Inner />
    </MediaProvider>
  )
}
