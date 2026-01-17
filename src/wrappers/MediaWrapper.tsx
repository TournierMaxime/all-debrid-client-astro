import { MediaProvider } from "../feature/media/context/MediaProvider"
import Downloads from "../feature/media/components/Downloads"
import Modal from "../feature/media/components/Modal"
import type { PropsFilmSerie } from "../feature/media/type/media"

export default function MediaWrapper({ props }: { props: PropsFilmSerie }) {
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
