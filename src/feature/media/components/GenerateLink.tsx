import { Message } from "@/components/Alert"
import { Button } from "@/components/ui/button"
import useDetailsMedia from "@/hooks/useDetailsMedia"

import { useMedia } from "../context/MediaProvider"

import Provider from "./Provider"

export default function GenerateLink() {
  const { link, isCopy, downloading, handleClick, noLink } = useMedia()
  const { getStatus } = useDetailsMedia()

  const getGeneratedLink = () => {
    if (isCopy === true) return <Provider link={link?.link} />
    if (link && link.error) {
      return <Message error={link.error} />
    }
    if (link && link.link === undefined) {
      return (
        <Message
          error={link.message ?? "Erreur lors de la génération du lien"}
        />
      )
    }

    return (
      <Button
        className={`m-1 px-2 py-1 bg-(--ads-btn-default) text-(--ads-text-default) rounded cursor-pointer text-sm`}
        onClick={handleClick}
        disabled={noLink}
      >
        {getStatus(downloading, link?.link, noLink)}
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
