import DropDown from "@/components/shared/DropDown"
import { useMedia } from "@/feature/media/context/MediaProvider"

import type { PropsFilmSerie } from "../type/media"
import { EnumFilmSerie } from "../type/media"

export default function Downloads({
  downloads,
  type,
  downloadsEpisode,
}: {
  downloads: PropsFilmSerie["downloads"]
  type: PropsFilmSerie["type"]
  downloadsEpisode: PropsFilmSerie["downloadsEpisode"]
}) {
  const { getDownLoads, getDownLoadsSeries } = useMedia()

  return (
    <DropDown title="Liens de téléchargement" label="Sélectionnez un lien">
      <ul className="mt-2 bg-(--ads-bg-default) border border-(--ads-border) rounded-md shadow-md">
        {type === EnumFilmSerie.film &&
          downloads?.map((download, index) => getDownLoads(download, index))}

        {type === EnumFilmSerie.serie &&
          downloadsEpisode?.map((episode, index) =>
            getDownLoadsSeries(episode, index),
          )}
      </ul>
    </DropDown>
  )
}
