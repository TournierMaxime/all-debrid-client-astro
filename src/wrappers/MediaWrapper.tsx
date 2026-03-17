import Downloads from "@/feature/media/components/Downloads"
import Modal from "@/feature/media/components/Modal"
import { MediaProvider } from "@/feature/media/context/MediaProvider"
import type { Media, PropsFilmSerie } from "@/feature/media/type/media"

export default function MediaWrapper({
  data,
  type,
}: {
  data: Media
  type: PropsFilmSerie["type"]
}) {
  const { title } = data
  return (
    <MediaProvider>
      <Downloads
        downloads={data.downloads}
        type={type}
        downloadsEpisode={data.downloadsEpisode}
      />
      <Modal title={title} />
    </MediaProvider>
  )
}
