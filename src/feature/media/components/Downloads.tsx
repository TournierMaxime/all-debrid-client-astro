import DropDown from "../../../components/DropDown"
import { useMedia } from "../../../feature/media/context/MediaProvider"
import { EnumFilmSerie } from "../type/media"
import type { PropsFilmSerie } from "../type/media"

export default function Downloads(props: PropsFilmSerie) {
  const { getDownLoads, getDownLoadsSeries } = useMedia()

  return (
    <DropDown title="Liens de téléchargement" label="Sélectionnez un lien">
      <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md">
        {props.type === EnumFilmSerie.film &&
          props.downloads.map((download, index) =>
            getDownLoads(download, index),
          )}

        {props.type === EnumFilmSerie.serie &&
          props.downloadsEpisode.map((episode, index) =>
            getDownLoadsSeries(episode, index),
          )}
      </ul>
    </DropDown>
  )
}
