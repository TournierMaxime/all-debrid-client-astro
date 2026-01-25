export interface Metadata {
  title: string
  addedAt: number
  ratingKey: string
  summary: string
  thumb: string
  year: number
  duration: number
  Media: Media[]
  Image: Image[]
  Genre: Genre[]
  Country: Country[]
  Collection: Collection[]
  Director: Director[]
  Writer: Writer[]
  Role: Role[]
  Producer: Producer[]
  UltraBlurColors: UltraBlurColors[]
  Rating: Rating[]
}

export interface Image {
  tag: string
}

export interface Genre {
  tag: string
}

export interface Country {
  tag: string
}

export interface Collection {
  tag: string
}

export interface Director {
  id: number
  filter: string
  tag: string
  tagKey: string
  thumb: string
}

export interface Writer {
  id: number
  filter: string
  tag: string
  tagKey: string
  thumb: string
}

export interface Producer {
  id: number
  filter: string
  tag: string
  tagKey: string
  thumb: string
}

export interface Role {
  id: number
  filter: string
  tag: string
  tagKey: string
  role: string
  thumb: string
}

export interface UltraBlurColors {
  tag: string
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
  aspectRatio: number
  audioChannels: number
  audioCodec: string
  videoCodec: string
  videoResolution: string
  container: string
  videoFrameRate: string
  videoProfile: string
  hasVoiceActivity: boolean
  Part: Part[]
}

export interface Part {
  id: number
  key: string
  duration: number
  file: string
  size: number
  container: string
  videoProfile: string
}

export type UnifiedMetadata = Metadata & {
  sectionId: string
  source: string
}
