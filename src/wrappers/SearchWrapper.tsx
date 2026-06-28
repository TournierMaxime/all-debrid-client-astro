import { Drawer } from "@/components/shared/Drawer"
import SearchForm from "@/feature/search/components/Search"
import { SearchProvider } from "@/feature/search/context/SearchContext"
import useWindowDimensions from "@/hooks/useWindowDimensions"

export default function SearchWrapper() {
  const { width } = useWindowDimensions()

  return (
    <SearchProvider>{width > 768 ? <SearchForm /> : <Drawer />}</SearchProvider>
  )
}
