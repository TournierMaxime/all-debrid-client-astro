import { MediaProvider } from "../context/MediaProvider"
import Downloads from "./Downloads"
import Modal from "./Modal"
import { EnumFilmSerie, DownloadLink } from "../type/media"

interface MediaIslandProps {
  downloads: DownloadLink[]
  type: EnumFilmSerie
}

export default function MediaIsland({ downloads, type }: MediaIslandProps) {
  return (
    <MediaProvider>
      <div className="flex md:flex-row md:justify-between flex-col w-full">
        <Downloads downloads={downloads} type={type} />
        <Modal />
      </div>
    </MediaProvider>
  )
}
