export interface Films {
  filmId: string
  title: string
  link: string
  image: string
  createdAt: string
  description: string | null
  duration: string | null
  fileSize: string | null
  origin: string | null
  originalTitle: string | null
  releaseDate: string | null
}

export interface Director {
  directorId: string
  name: string
  filmId: string
}

export interface Actor {
  actorId: string
  name: string
  filmId: string
}

export interface Genre {
  genreId: string
  name: string
  filmId: string
}

export interface Quality {
  qualityId: string
  quality: string
  url: string
  filmId: string
}

export interface Download {
  downloadLinkId: string
  host: string
  dlProtectLink: string
  fileProvider: string | null
  debribLink: string | null
  filmId: string
}

export interface Film {
  filmId: string
  title: string
  link: string
  image: string
  createdAt: string
  description: string
  duration: string
  fileSize: string
  origin: string
  originalTitle: string
  releaseDate: string
  directors: Director[]
  actors: Actor[]
  genres: Genre[]
  qualities: Quality[]
  links: Download[]
}

export interface Serie {
  mediaId: string
  title: string
  link: string
  image: string
  createdAt: string
  isOnNAS: boolean
  isSearch: boolean
  description: string
  duration: string
  fileSize: string | null
  origin: string
  originalTitle: string
  releaseDate: string
  season: string
  episode: string
  type: string
  directors: {
    directorId: string
    name: string
    mediaId: string
  }[]
  actors: {
    actorId: string
    name: string
    mediaId: string
  }[]
  genres: {
    genreId: string
    name: string
    mediaId: string
  }[]
  qualities: {
    qualityId: string
    quality: string
    url: string
    mediaId: string
  }[]
  downloadEpisode: {
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
  }[]
  availableLanguage: {
    languageId: string
    name: string
    url: string
    mediaId: string
  }[]
  availableSeason: {
    seasonId: string
    url: string
    season: string
    mediaId: string
  }[]
}
