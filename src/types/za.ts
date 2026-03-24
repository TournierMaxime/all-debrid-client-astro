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
