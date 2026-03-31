import type { Actor, Director, Download, Genre, Quality } from "@/types/za"

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
  directors?: Director[]
  duration?: string
  actors?: Actor[]
  genres?: Genre[]
  releaseDate?: string
  fileSize?: string
  links?: Download[]
  qualities?: Quality[]
  originalTitle?: string
  downloadEpisode?: DownloadEpisode[]
  availableSeasons?: AvailableSeasons[]
  availableLanguage?: AvailableLanguages[]
  season?: string
  episodes?: string
  isOnNAS?: boolean
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
  success?: string
  noLink?: boolean
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
  noLink: boolean
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
  episodeId: string
  name: string
  downloadLinkId: string
  mediaId: string
  links: {
    downloadLinkId: string
    host: string
    dlProtectLink: string
    mediaId: string
  }
}

type FilmDownloadsProps = {
  type: EnumFilmSerie.film
  downloads: Download[]
  downloadEpisode?: never
}

type SerieDownloadsProps = {
  type: EnumFilmSerie.serie
  downloads?: never
  downloadEpisode: DownloadEpisode[]
}

type PropsFilmSerie = FilmDownloadsProps | SerieDownloadsProps

enum EnumFilmSerie {
  film = "film",
  serie = "serie",
}

export type {
  AvailableLanguages,
  AvailableSeasons,
  DownloadEpisode,
  DownloadLink,
  DownLoads,
  DownLoadsEpisode,
  FilmDownloadsProps,
  LinkData,
  Media,
  MediaAction,
  Medias,
  MediaState,
  PropsFilmSerie,
  Qualities,
  SerieDownloadsProps,
}

export { EnumFilmSerie }
