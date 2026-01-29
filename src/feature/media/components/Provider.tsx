import { PUBLIC_DS, PUBLIC_MOTRIX } from "astro:env/client"
import { Button } from "@/components/ui/button"

export default function Provider() {
  return (
    <ul className="flex flex-row justify-around mt-4">
      <li>
        <Button className="bg-[var(--ads-motrix)] rounded p-2 mr-4">
          <a target="_blank" className="text-white" href={PUBLIC_MOTRIX}>
            Motrix
          </a>
        </Button>
      </li>
      <li>
        <Button className="bg-[var(--ads-ds-get)] rounded p-2">
          <a target="_blank" className="text-white" href={PUBLIC_DS}>
            Download Station
          </a>
        </Button>
      </li>
    </ul>
  )
}
