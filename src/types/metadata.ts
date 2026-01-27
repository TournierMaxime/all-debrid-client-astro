export interface LibraryMetadata {
  librarySectionID: number
  librarySectionTitle: string
  librarySectionUUID: string
  Metadata: Metadata
  Media: Media
  Part: Part
  Image: Image[]
  Genre: Genre[]
  Country: Country[]
  Guid: Guid[]
  Rating: Rating[]
  Director: Director[]
  Writer: Writer[]
  Role: Role[]
  Producer: Producer[]
}

export interface Metadata {
  ratingKey: string
  slug: string
  studio: string
  type: string
  title: string
  summary: string
  lastViewedAt: number
  year: number
  tagline: string
  duration: number
  originallyAvailableAt: string
  addedAt: number
}

export interface Image {
  alt: string
  type: string
  url: string
}

export interface Genre {
  id: number
  filter: string
  tag: string
}

export interface Country {
  id: number
  filter: string
  tag: string
}

export interface Guid {
  id: string
}

export interface Director {
  id?: number
  filter?: string
  tag?: string
  tagKey?: string
  thumb?: string
}

export interface Writer {
  id?: number
  filter?: string
  tag?: string
  tagKey?: string
  thumb?: string
}

export interface Producer {
  id?: number
  filter?: string
  tag?: string
  tagKey?: string
  thumb?: string
}

export interface Role {
  id: number
  filter: string
  tag: string
  tagKey: string
  role: string
  thumb: string
}

export interface Rating {
  image: string
  value: number
  type: string
}

export interface Media {
  id: number
  duration: number
  bitrate: number
  width: number
  height: number
  audioCodec: string
  videoCodec: string
  videoResolution: string
  container: string
  videoFrameRate: string
}

export interface Part {
  id: number
  file: string
  size: number
}

export type UnifiedMetadata = Metadata & {
  sectionId: string
  source: string
}
