import React, { createContext, useContext, useReducer, useRef } from "react"
import type {
  SearchAction,
  SearchState,
  SearchContextType,
  SearchProps,
} from "../type/search"
import type { Medias, Media } from "../../../feature/media/type/media"
import { actions } from "astro:actions"
import { navigate } from "astro:transitions/client"

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

  const initialDataRef = useRef<any>(undefined)

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

  const fetchData = async (service: Promise<any>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response: Medias[] = await service
      dispatch({
        type: "SET_DATA",
        payload: { medias: response, media: undefined },
      })

      if (!initialDataRef.current) {
        initialDataRef.current = response
      }
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const fetchOneMedia = async (service: Promise<any>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response: Media = await service
      dispatch({
        type: "SET_DATA",
        payload: { media: response, medias: undefined },
      })
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const searchData = async (service: Promise<any>) => {
    try {
      const response: Medias[] = await service
      dispatch({ type: "SET_DATA", payload: { medias: response } })
      navigate(
        `/results?query=${state.search.query}&filter=${state.search.filter}`,
      )
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const resetSearch = () => {
    dispatch({ type: "SET_DATA", payload: initialDataRef.current })
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
