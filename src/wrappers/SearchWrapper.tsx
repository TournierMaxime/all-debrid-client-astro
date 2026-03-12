import SearchForm from "@/feature/search/components/Search"
import { SearchProvider } from "@/feature/search/context/SearchContext"

export default function SearchWrapper() {
  return (
    <SearchProvider>
      <SearchForm />
    </SearchProvider>
  )
}
