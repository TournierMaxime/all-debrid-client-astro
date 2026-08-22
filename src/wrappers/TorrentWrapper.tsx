import Downloads from "@/feature/media/components/Downloads"
import Modal from "@/feature/media/components/Modal"
import { MediaProvider } from "@/feature/media/context/MediaProvider"
import type {
  FilmDownloadsProps,
  PropsFilmSerie,
} from "@/feature/media/type/media"

export default function TorrentWrapper({
  data,
  type,
  title,
  isMagnet,
}: {
  data: FilmDownloadsProps
  type: PropsFilmSerie["type"]
  title: string
  isMagnet?: boolean
}) {
  return (
    <MediaProvider>
      <Downloads
        downloads={data.downloads}
        type={type}
        downloadEpisode={data.downloadEpisode}
      />
      <Modal type={type} title={title} isMagnet={isMagnet} />
    </MediaProvider>
  )
}
