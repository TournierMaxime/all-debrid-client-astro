import { useEffect } from "react"
import { MediaProvider } from "../feature/media/context/MediaProvider"
import DownloadAgain from "../feature/media/components/DownloadAgain"
import { useMedia } from "../feature/media/context/MediaProvider"

function Inner() {
  const { openModal, copyToClipboard } = useMedia()

  useEffect(() => {
    const handler = (e: Event) => {
      const { link } = (e as CustomEvent).detail
      openModal(link)
      copyToClipboard(link)
    }

    window.addEventListener("download-again", handler)
    return () => window.removeEventListener("download-again", handler)
  }, [openModal])

  return <DownloadAgain />
}

export default function DownloadAgainWrapper() {
  return (
    <MediaProvider>
      <Inner />
    </MediaProvider>
  )
}
