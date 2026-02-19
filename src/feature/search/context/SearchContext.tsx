import React, { createContext, useContext, useReducer, useRef } from "react"
import { actions } from "astro:actions"
import { navigate } from "astro:transitions/client"

import type { Media, Medias } from "../../../feature/media/type/media"
import type {
  SearchAction,
  SearchContextType,
  SearchProps,
  SearchState,
} from "../type/search"

// Définition du contexte
const SearchContext = createContext<SearchContextType | null>(null)

const initialState: SearchState = {
  search: {
    query: "",
    filter: "films",
  },
  data: {
    media: undefined,
    medias: [],
  },
  error: undefined,
  loading: false,
}

const reducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload }
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
  }
}

// Provider pour envelopper l'application
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialDataRef = useRef<unknown>(undefined)

  const setSearch = (payload: SearchProps) => {
    dispatch({ type: "SET_SEARCH", payload })
  }

  const handleSearch = async () => {
    if (!state.search.query) return

    navigate(
      `/results?query=${encodeURIComponent(state.search.query)}&filter=${state.search.filter}`,
    )

    dispatch({
      type: "SET_SEARCH",
      payload: {
        query: "",
        filter: "films",
      },
    })
  }

  const fetchData = async (service: Promise<Medias[]>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response = await service
      dispatch({
        type: "SET_DATA",
        payload: { medias: response, media: undefined },
      })

      if (!initialDataRef.current) {
        initialDataRef.current = response
      }
    } catch (error: unknown) {
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : String(error) })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const fetchOneMedia = async (service: Promise<Media>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response = await service
      dispatch({
        type: "SET_DATA",
        payload: { media: response, medias: undefined },
      })
    } catch (error: unknown) {
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : String(error) })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const searchData = async (service: Promise<Medias[]>) => {
    try {
      const response: Medias[] = await service
      dispatch({ type: "SET_DATA", payload: { medias: response } })
      navigate(
        `/results?query=${state.search.query}&filter=${state.search.filter}`,
      )
    } catch (error: unknown) {
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : String(error) })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const resetSearch = () => {
    dispatch({ type: "SET_DATA", payload: (initialDataRef.current as { medias?: Medias[] | undefined; media?: Media | undefined; }) || { medias: [], media: undefined } })
    dispatch({ type: "SET_ERROR", payload: undefined })
    fetchData(actions.getFilms())
  }

  return (
    <SearchContext.Provider
      value={{
        ...state,
        setSearch,
        handleSearch,
        resetSearch,
        fetchData,
        searchData,
        fetchOneMedia,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider")
  }
  return context
}
