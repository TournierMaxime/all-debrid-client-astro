import { SearchProvider } from "../feature/search/context/SearchContext"
import SearchForm from "../feature/search/components/Search"

export default function SearchWrapper() {
  return (
    <SearchProvider>
      <SearchForm />
    </SearchProvider>
  )
}
