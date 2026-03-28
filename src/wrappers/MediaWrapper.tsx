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
  return (
    <MediaProvider>
      <Downloads
        downloads={data.links}
        type={type}
        downloadsEpisode={data.downloadsEpisode}
      />
      <Modal title={`${data.originalTitle} (${data.releaseDate})`} />
    </MediaProvider>
  )
}
