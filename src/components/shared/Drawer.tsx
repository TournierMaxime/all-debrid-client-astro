import { HiOutlineMenu } from "react-icons/hi"

import {
  Drawer as DrawerWrapper,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Search from "@/feature/search/components/Search"

export const Drawer = () => {
  return (
    <DrawerWrapper direction="bottom">
      <DrawerTrigger asChild>
        <HiOutlineMenu className="md:w-10 md:h-10 w-7.5 h-7.5 max-w-10 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="text-xl h-auto flex justify-center">
        <ul className="flex flex-col items-center gap-4">
          <li className="mt-2">
            <Search className="font-semibold text-normal border-2 border-gray-300 rounded-lg px-2 py-1" />
          </li>
          <li>
            <a
              href="/history"
              className="font-semibold text-normal border-2 border-gray-300 rounded-lg px-2 py-1"
            >
              Historique
            </a>
          </li>
          <li>
            <a
              href="/libraries"
              className="font-semibold text-normal border-2 border-gray-300 rounded-lg px-2 py-1"
            >
              Plex
            </a>
          </li>
          <li>
            <a
              href="/downloads"
              className="font-semibold text-normal border-2 border-gray-300 rounded-lg px-2 py-1"
            >
              Téléchargements
            </a>
          </li>
        </ul>
      </DrawerContent>
    </DrawerWrapper>
  )
}
