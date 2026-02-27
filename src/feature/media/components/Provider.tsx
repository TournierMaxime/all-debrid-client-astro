import { PUBLIC_MOTRIX } from "astro:env/client"

import { Button } from "@/components/ui/button"

export default function Provider({ link }: { link?: string }) {
  return (
    <ul className="flex flex-row justify-around mt-4">
      <li>
        <Button className="bg-(--ads-motrix) rounded p-2 mr-4">
          <a
            target="_blank"
            className="text-(--ads-text-default)"
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
              className="text-(--ads-text-default)"
              href={`/download?id=${encodeURIComponent(link)}`}
            >
              Download Station
            </a>
          </Button>
        </li>
      )}
    </ul>
  )
}
