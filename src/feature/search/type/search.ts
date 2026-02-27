import type { Media, Medias } from "../../../feature/media/type/media"

type SearchProps = {
  query: string
  filter: "films" | "series"
}

type SearchState = {
  search: SearchProps
  data: {
    medias?: Medias[] | undefined
    media?: Media | undefined
  }
  error: string | undefined
  loading: boolean
}

interface Search {
  q?: string
  filter?: "films" | "series"
  error?: string
}

type SearchContextType = SearchState & {
  setSearch: (payload: SearchProps) => void
  handleSearch: () => Promise<void>
  resetSearch: () => void
  fetchData: (service: Promise<Medias[]>) => Promise<void>
  searchData: (service: Promise<Medias[]>) => Promise<void>
  fetchOneMedia: (service: Promise<Media>) => Promise<void>
}

type SearchAction =
  | { type: "SET_SEARCH"; payload: SearchProps }
  | { type: "SET_DATA"; payload: { medias?: Medias[]; media?: Media } }
  | { type: "SET_ERROR"; payload: string | undefined }
  | { type: "SET_LOADING"; payload: boolean }

export type {
  Search,
  SearchAction,
  SearchContextType,
  SearchProps,
  SearchState,
}
