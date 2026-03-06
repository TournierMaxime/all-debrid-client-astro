import { actions } from "astro:actions"
import { PUBLIC_MOTRIX } from "astro:env/client"

import { Button } from "@/components/ui/button"

export default function Provider({ link }: { link?: string }) {
  const handleDownload = async () => {
    if (!link) {
      return null
    }

    const process = async () => {
      const { data: create } = await actions.createDownloadTask({
        url: link,
        destination: "video/Films",
      })

      const createId = create?.data?.task_id[0]

      const { data: pause } = await actions.pauseTask({ id: createId })

      window.location.href = `/downloads`
    }

    await process()
  }
  return (
    <ul className="flex flex-row justify-around mt-4">
      <li>
        <Button className="bg-(--ads-motrix) rounded p-2 mr-4">
          <a
            target="_blank"
            className="text-(--ads-text-default) cursor-pointer"
            href={PUBLIC_MOTRIX}
          >
            Motrix
          </a>
        </Button>
      </li>
      {link && (
        <li>
          <Button className="bg-(--ads-ds-get) rounded p-2">
            <a
              target="_blank"
              className="text-(--ads-text-default) cursor-pointer"
              onClick={handleDownload}
            >
              Download Station
            </a>
          </Button>
        </li>
      )}
    </ul>
  )
}
