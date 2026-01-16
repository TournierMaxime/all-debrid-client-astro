import { Media } from "@/feature/media/type/media"
import { Fragment } from "react"
import Modal from "@/components/Modal"
import Title from "@/feature/media/components/Title"
import Quality from "@/feature/media/components/Quality"
import Plot from "@/feature/media/components/Plot"
import Actor from "@/feature/media/components/Actor"
import Director from "@/feature/media/components/Director"
import Origin from "@/feature/media/components/Origin"
import Duration from "@/feature/media/components/Duration"
import Genre from "@/feature/media/components/Genre"
import FileName from "@/feature/media/components/FileName"
import ReleaseDate from "@/feature/media/components/ReleaseDate"
import Poster from "@/feature/media/components/Poster"
import GenerateLink from "@/feature/media/components/GenerateLink"
import { useMedia } from "@/feature/media/context/MediaProvider"
import Qualities from "@/feature/media/components/Qualities"
import Downloads from "@/feature/media/components/Downloads"
import { EnumFilmSerie } from "@/feature/media/type/media"

const OneFilm = ({ data }: { data: Media | undefined }) => {
  const { isVisible, resetModal, provider } = useMedia()

  if (!data) return null

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-lg p-4 w-full h-full mx-auto">
        <div className="flex items-center md:items-start md:flex-row md:justify-between flex-col w-full">
          <Poster title={data.title} src={data.image} />

          <div className="flex flex-col w-full p-4 mb-4">
            <Title originalTitle={data.originalTitle} />
            <Quality quality={data.quality} />
            <Plot description={data.description} />
            <Director directors={data.directors} />
            <Origin origin={data.origin} />
            <ReleaseDate releaseDate={data.releaseDate} />
            <Duration duration={data.duration} />
            <Actor actors={data.actors} />
            <Genre genres={data.genres} />
            <FileName fileName={data.fileSize} />
          </div>
        </div>

        <div className="flex md:flex-row md:justify-between flex-col w-full">
          {/* Dropdown pour les Qualités */}
          <Qualities qualities={data.qualities} />

          {/* Dropdown pour les liens de téléchargement */}
          <Downloads
            downloads={data.downloads ?? []}
            type={EnumFilmSerie.film}
          />
        </div>

        <Fragment>
          {isVisible && (
            <div className="my-2">
              <Modal
                isOpen={isVisible}
                onClose={() => resetModal()}
                title={`Génération du lien ${provider}`}
              >
                <GenerateLink />
              </Modal>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  )
}

export default OneFilm
