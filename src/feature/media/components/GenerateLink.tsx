import Provider from "./Provider"
import Message from "./Message"
import { useMedia } from "../context/MediaProvider"

export default function GenerateLink() {
  const { link, isCopy, downloading, handleClick } = useMedia()

  const getStatus = (status: boolean, a?: string) => {
    if (status === true) {
      return "Chargement"
    }

    if (a !== "" || undefined) {
      return "Copier le lien"
    }

    return "Générer le lien"
  }

  const getGeneratedLink = () => {
    if (isCopy === true) return <Provider />
    if (link?.error) return <Message error={link?.error} />

    return (
      <button
        className={`m-1 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer text-sm`}
        onClick={handleClick}
      >
        {getStatus(downloading, link?.link)}
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {getGeneratedLink()}
      <Message message={link?.message} />
    </div>
  )
}
