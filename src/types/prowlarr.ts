export interface Search {
  guid: string
  age: number
  ageHours: number
  ageMinutes: number
  size: number
  files: number
  grabs: number
  indexerId: number
  indexer: string
  title: string
  sortTitle: string
  imdbId: number
  tmdbId: number
  tvdbId: number
  tvMazeId: number
  publishDate: string
  commentUrl: string
  downloadUrl: string
  infoUrl: string
  indexerFlags: []
  categories: SearchCategories[]
  infoHash: string
  seeders: number
  leechers: number
  protocol: string
  fileName: string
}

interface SearchCategories {
  id: number
  name: string
  subCategories: []
}
