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
  UltraBlurColors: UltraBlurColors[]
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
  tag: string
}

export interface Writer {
  tag: string
}

export interface Role {
  tag: string
}

export interface UltraBlurColors {
  tag: string
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
