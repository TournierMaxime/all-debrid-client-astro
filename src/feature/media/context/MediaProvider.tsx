import React, { createContext, useContext, useReducer } from "react"
import copy from "copy-to-clipboard"
import type {
  DownloadEpisode,
  DownloadLink,
  MediaAction,
  MediaState,
} from "../type/media"
import { actions } from "astro:actions"

const MediaContext = createContext<any>(null)

const initialState: MediaState = {
  downloading: false,
  link: { link: "" },
  provider: "",
  isCopy: false,
  isVisible: false,
  dlProtectedLink: "",
}

const mediaReducer = (state: MediaState, action: MediaAction): MediaState => {
  switch (action.type) {
    case "SET_DOWNLOADING":
      return { ...state, downloading: action.payload }
    case "SET_LINK":
      return { ...state, link: action.payload }
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
      }
    default:
      return state
  }
}

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState)

  const handleDownloadLink = async (link: string) => {
    try {
      dispatch({ type: "SET_DOWNLOADING", payload: true })
      console.log("Récupération du lien avec AllDebrid:", link)

      const { data: resGetLink, error: errGetLink } = await actions.getLink({
        link,
      })

      if (errGetLink) {
        throw new Error(errGetLink.message)
      }

      if (resGetLink && resGetLink?.link) {
        const { link } = resGetLink

        const { data: resGetRedirectLink, error: errGetRedirectLink } =
          await actions.getRedirectLink({ link })

        if (errGetRedirectLink) {
          throw new Error(errGetRedirectLink.message)
        }

        const links = resGetRedirectLink?.data?.links

        const { data: resSaveLink } = await actions.saveLink({ link: links[0] })

        if (!Array.isArray(links) || links.length === 0) {
          throw new Error("Aucun lien de redirection retourné par AllDebrid")
        }

        const { data: resGetUnlockLink, error: errGetUnlockLink } =
          await actions.getUnlockLink({ link: links[0] })

        if (errGetUnlockLink) {
          dispatch({
            type: "SET_LINK",
            payload: { link: "", error: errGetUnlockLink.message },
          })
        } else {
          dispatch({
            type: "SET_LINK",
            payload: {
              link: resGetUnlockLink?.data?.link,
              message: "Lien récupéré avec succès",
            },
          })
        }
      } else {
        console.error("Erreur: Lien non récupéré correctement.")
        dispatch({
          type: "SET_LINK",
          payload: {
            link: "",
            error: "Erreur: Lien non récupéré correctement.",
          },
        })
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération du lien:", error)
      dispatch({
        type: "SET_LINK",
        payload: { link: "", error: error.message },
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
      download.host !== "Anonyme"
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
