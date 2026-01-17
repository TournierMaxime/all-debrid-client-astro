import { MediaProvider } from "../context/MediaProvider"
import Downloads from "./Downloads"
import Modal from "./Modal"
import type { PropsFilmSerie } from "../type/media"

interface MediaIslandProps {
  props: PropsFilmSerie
}

export default function MediaIsland({ props }: MediaIslandProps) {
  return (
    <MediaProvider>
      <div className="flex md:flex-row md:justify-between flex-col w-full">
        <Downloads
          downloads={props.downloads}
          type={props.type}
          downloadsEpisode={props.downloadsEpisode}
        />
        <Modal />
      </div>
    </MediaProvider>
  )
}
