import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { Message } from "../../../components/Alert"
import { useMedia } from "../context/MediaProvider"

import Provider from "./Provider"

export default function GenerateLink() {
  const { link, isCopy, downloading, handleClick } = useMedia()

  const getStatus = (status: boolean, a?: string) => {
    if (status === true) {
      return <Spinner />
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
      <Message message={link?.message} />
    </div>
  )
}
