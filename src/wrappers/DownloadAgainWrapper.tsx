import { useEffect, useState } from "react"
import { actions } from "astro:actions"

import DownloadAgain from "../feature/media/components/DownloadAgain"
import { MediaProvider } from "../feature/media/context/MediaProvider"
import { useMedia } from "../feature/media/context/MediaProvider"

function Inner() {
  const [link, setLink] = useState<string | null>(null)
  const [loading, setIsLoading] = useState<boolean>(false)
  const { openModal, copyToClipboard } = useMedia()

  useEffect(() => {
    const handler = async (e: Event) => {
      const { link } = (e as CustomEvent).detail

      openModal("", "")

      try {
        setIsLoading(true)
        const { data: unlock } = await actions.getUnlockLink({ link })

        setLink(unlock.data.link)
        openModal(unlock.data.host, unlock.data.link)
        copyToClipboard(unlock.data.link)
      } catch (e: unknown) {
        console.error(e)
        openModal("Erreur", "")
      } finally {
        setIsLoading(false)
      }
    }

    window.addEventListener("download-again", handler)
    return () => {
      window.removeEventListener("download-again", handler)
    }
  }, [openModal, link])

  return <DownloadAgain loading={loading} />
}

export default function DownloadAgainWrapper() {
  return (
    <MediaProvider>
      <Inner />
    </MediaProvider>
  )
}
