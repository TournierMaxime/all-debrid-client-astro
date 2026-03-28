import { Message } from "@/components/shared/Alert"
import { Button } from "@/components/ui/button"
import useDetailsMedia from "@/hooks/useDetailsMedia"

import { useMedia } from "../context/MediaProvider"

export default function GenerateLink({ title }: { title: string }) {
  const { link, handleClick, downloading, noLink } = useMedia()
  const { getStatus } = useDetailsMedia()

  const getGeneratedLink = () => {
    return (
      <Button
        className={`m-1 px-2 py-1 bg-(--ads-btn-default) text-(--ads-text-default) rounded cursor-pointer text-sm`}
        onClick={() => handleClick(title)}
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
