interface Medias {
  title: string
  link: string
  image: string
}

interface Media {
  title: string
  image: string
  quality: string
  description?: string
  origin?: string
  directors?: string[]
  duration?: string
  actors?: string[]
  genres?: string[]
  releaseDate?: string
  fileSize?: string
  downloads?: DownloadLink[]
  qualities?: Qualities[]
  originalTitle?: string
  downloadsEpisode?: DownloadEpisode[]
  availableSeasons?: AvailableSeasons[]
  availableLanguages?: AvailableLanguages[]
  season?: string
  episodes?: string
  fileName?: string
}

interface Qualities {
  url: string
  quality: string
  language: string
}

interface DownLoads {
  host: string
  url: string
}

interface LinkData {
  message?: string
  link: string
  error?: string
}

interface DownLoadsEpisode {
  title?: string
  links: {
    host?: string
    url?: string
    fileSize?: string
  }[]
}

interface AvailableSeasons {
  url: string
  season: string
}

interface AvailableLanguages {
  url: string
  name: string
}

type MediaState = {
  downloading: boolean
  link: LinkData
  provider: string
  isCopy: boolean
  isVisible: boolean
  dlProtectedLink: string
}

type MediaAction =
  | { type: "SET_DOWNLOADING"; payload: boolean }
  | { type: "SET_LINK"; payload: LinkData }
  | { type: "SET_PROVIDER"; payload: string }
  | { type: "SET_IS_COPY"; payload: boolean }
  | { type: "SET_IS_VISIBLE"; payload: boolean }
  | { type: "SET_DL_PROTECTED_LINK"; payload: string }
  | { type: "RESET_MODAL" }

type DownloadLink = {
  host: string
  url: string
}

type DownloadEpisode = {
  title: string
  links: DownloadLink[]
}

type FilmDownloadsProps = {
  type: EnumFilmSerie.film
  downloads: DownloadLink[]
  downloadsEpisode?: never
}

type SerieDownloadsProps = {
  type: EnumFilmSerie.serie
  downloads?: never
  downloadsEpisode: DownloadEpisode[]
}

type PropsFilmSerie = FilmDownloadsProps | SerieDownloadsProps

enum EnumFilmSerie {
  film = "film",
  serie = "serie",
}

export type {
  MediaAction,
  MediaState,
  Media,
  Medias,
  DownLoadsEpisode,
  AvailableSeasons,
  AvailableLanguages,
  Qualities,
  DownLoads,
  LinkData,
  DownloadLink,
  DownloadEpisode,
  FilmDownloadsProps,
  SerieDownloadsProps,
  PropsFilmSerie,
}

export { EnumFilmSerie }
