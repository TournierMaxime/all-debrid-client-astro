import { Button } from "@/components/ui/button"

import { Message } from "../../../components/Alert"
import useDetailsMedia from "../../../hooks/useDetailsMedia"
import { useMedia } from "../context/MediaProvider"

import Provider from "./Provider"

export default function GenerateLink() {
  const { link, isCopy, downloading, handleClick } = useMedia()
  const { getStatus } = useDetailsMedia()

  const getGeneratedLink = () => {
    if (isCopy === true) return <Provider />
    if (link && link.error) {
      return <Message error={link.error} />
    }
    if (link && link.link === undefined) {
      return <Message error={"Erreur lors de la génération du lien"} />
    }

    return (
      <Button
        className={`m-1 px-2 py-1 bg-(--ads-btn-default) text-(--ads-text-default) rounded cursor-pointer text-sm`}
        onClick={handleClick}
      >
        {getStatus(downloading, link?.link)}
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {getGeneratedLink()}
      {link && link.link !== undefined ? (
        <Message message={link?.message} />
      ) : null}
    </div>
  )
}
