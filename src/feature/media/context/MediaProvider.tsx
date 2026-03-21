import React, { createContext, useContext, useReducer } from "react"
import { actions } from "astro:actions"
import copy from "copy-to-clipboard"

import type {
  DownloadEpisode,
  DownloadLink,
  LinkData,
  MediaAction,
  MediaState,
} from "../type/media"
import { getFinalDownloadLink } from "../utils/handleDownloadLink"

type MediaContextValue = MediaState & {
  handleDownloadLink: (link: string | LinkData, title: string) => Promise<void>
  openModal: (currentHost: string, currentUrl: string) => void
  resetModal: () => void
  copyToClipboard: (text: string) => Promise<void>
  getDownLoads: (download: DownloadLink, index: number) => React.ReactNode
  getDownLoadsSeries: (
    download: DownloadEpisode,
    index: number,
  ) => React.ReactNode
  handleClick: () => Promise<void>
  createDownloadTask: (
    unlockLink: string,
  ) => Promise<{ id: string; title: string; path: string }>
}

const MediaContext = createContext<MediaContextValue | null>(null)

const initialState: MediaState = {
  downloading: false,
  link: { link: "" },
  provider: "",
  isCopy: false,
  isVisible: false,
  dlProtectedLink: "",
  noLink: false,
}

const mediaReducer = (state: MediaState, action: MediaAction): MediaState => {
  switch (action.type) {
    case "SET_DOWNLOADING":
      return { ...state, downloading: action.payload }
    case "SET_LINK":
      return {
        ...state,
        link: action.payload,
        noLink: action.payload?.noLink ?? false,
      }
    case "SET_PROVIDER":
      return { ...state, provider: action.payload }
    case "SET_IS_COPY":
      return { ...state, isCopy: action.payload }
    case "SET_IS_VISIBLE":
      return { ...state, isVisible: action.payload }
    case "SET_DL_PROTECTED_LINK":
      return { ...state, dlProtectedLink: action.payload }
    case "RESET_MODAL":
      return {
        ...state,
        isVisible: false,
        link: { link: "", message: "" },
        isCopy: false,
        dlProtectedLink: "",
        provider: "",
        noLink: false,
      }
    default:
      return state
  }
}

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState)

  const createDownloadTask = async (
    unlockLink: string,
  ): Promise<{ id: string; title: string; path: string }> => {
    const { data: create } = await actions.createTask({
      url: unlockLink,
    })

    const createId = create.data
    const path = `/download/${createId}`

    const url = new URL(path, window.location.origin)
    window.location.href = url.toString()

    return {
      id: createId,
      path,
      title: unlockLink,
    }
  }

  const handleDownloadLink = async (link: string | LinkData) => {
    try {
      dispatch({ type: "SET_DOWNLOADING", payload: true })

      const finalLink = await getFinalDownloadLink(link)

      if (!finalLink) {
        dispatch({
          type: "SET_LINK",
          payload: {
            link: "",
            error: "Impossible de récupérer le lien",
          },
        })
        return
      }

      // fallback vers dl-protect
      if (!finalLink.unlockLink) {
        dispatch({
          type: "SET_LINK",
          payload: {
            link: "",
            message: "Redirection vers la page de téléchargement",
            noLink: true,
          },
        })
        setTimeout(() => {
          window.location.href = finalLink.dlProtectedLink
        }, 3000)
        return
      }

      dispatch({
        type: "SET_LINK",
        payload: {
          link: finalLink.unlockLink,
          message: "Lien récupéré avec succès",
        },
      })

      const { unlockLink } = finalLink

      if (unlockLink) {
        await createDownloadTask(unlockLink)
      }
    } catch (error) {
      dispatch({
        type: "SET_LINK",
        payload: {
          link: "",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
      })
    } finally {
      dispatch({ type: "SET_DOWNLOADING", payload: false })
    }
  }

  const openModal = (currentHost: string, currentUrl: string) => {
    dispatch({ type: "SET_PROVIDER", payload: currentHost })
    dispatch({ type: "SET_IS_VISIBLE", payload: true })
    dispatch({ type: "SET_DL_PROTECTED_LINK", payload: currentUrl })
  }

  const resetModal = () => dispatch({ type: "RESET_MODAL" })

  const copyToClipboard = async (text: string) => {
    if (!text) {
      console.error("Aucun texte à copier.")
      return
    }

    try {
      copy(text, {
        debug: true,
        message: "Press #{key} to copy",
      })

      dispatch({ type: "SET_IS_COPY", payload: true })
      dispatch({
        type: "SET_LINK",
        payload: { link: text, message: "Lien copié dans le presse-papier !" },
      })
    } catch (error) {
      console.error("Erreur lors de la copie du lien :", error)
    }
  }

  const getDownLoads = (download: DownloadLink, index: number) => {
    if (
      download.host !== "Premium" &&
      download.host !== "Netu" &&
      download.host !== "Vidoza" &&
      download.host !== "Anonyme" &&
      download.host !== "Uploady" &&
      download.host !== "Vidlox" &&
      download.host !== "MyStream"
    ) {
      return (
        <li
          key={index}
          className="px-4 py-2 hover:bg-(--ads-hover-dl) cursor-pointer"
          onClick={() => openModal(download.host, download.url)}
        >
          <b className="p-2 font-normal text-sm">{download.host}</b>
        </li>
      )
    }
  }

  const getDownLoadsSeries = (download: DownloadEpisode, index: number) => {
    return (
      <li key={index} className="px-4 py-2">
        <b>{download.title}</b>
        <ul>
          {download.links.map((link: DownloadLink, index: number) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-(--ads-hover-dl) cursor-pointer block"
              onClick={() => openModal(link.host, link.url)}
            >
              <b>{link.host}</b>
            </li>
          ))}
        </ul>
      </li>
    )
  }

  const handleClick = async () => {
    if (state.link?.link) {
      await copyToClipboard(state.link.link)
    } else {
      await handleDownloadLink(state.dlProtectedLink)
    }
  }

  return (
    <MediaContext.Provider
      value={{
        ...state,
        handleDownloadLink,
        openModal,
        resetModal,
        copyToClipboard,
        getDownLoads,
        getDownLoadsSeries,
        handleClick,
        createDownloadTask,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (!context) {
    throw new Error("useMedia must be used within MediaProvider")
  }
  return context
}
