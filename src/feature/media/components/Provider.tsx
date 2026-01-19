import { PUBLIC_DS, PUBLIC_MOTRIX } from "astro:env/client"

export default function Provider() {
  return (
    <ul className="flex flex-row justify-around mt-4">
      <li className="bg-violet-500 rounded p-2 mr-4">
        <a target="_blank" className="text-white" href={PUBLIC_MOTRIX}>
          Motrix
        </a>
      </li>
      <li className="bg-green-500 rounded p-2">
        <a target="_blank" className="text-white" href={PUBLIC_DS}>
          Download Station
        </a>
      </li>
    </ul>
  )
}
