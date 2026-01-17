import Provider from "./Provider"
import Message from "./Message"
import Button from "../../../components/Button"
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
      <Button onClick={handleClick}>
        {getStatus(downloading, link?.link)}
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {getGeneratedLink()}
      <Message message={link?.message} />
    </div>
  )
}
