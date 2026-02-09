import React from "react"
import { useSearch } from "../../../feature/search/context/SearchContext"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

const Form = ({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isLoading: boolean
}) => {
  const { search, setSearch } = useSearch()

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4 md:mt-0">
      <div className="flex flex-col mob-l:flex-row mob-l:justify-evenly">
        {/* Input de recherche */}
        <Input
          type="text"
          name="q"
          value={search.query || ""}
          onChange={(e) =>
            setSearch({ query: e.target.value, filter: search.filter })
          }
          placeholder={`Rechercher`}
          className="px-4 py-2 sm:w-8/12 w-full rounded-md border border-(--ads-form-border) text-(--ads-text-black) focus:outline-none"
        />

        <div className="flex flex-row items-center space-x-4 mt-4 md:mt-0 ml-2 w-4/12">
          <RadioGroup
            value={search.filter}
            onValueChange={(value) =>
              setSearch({
                ...search,
                filter: value as "films" | "series",
              })
            }
            className="flex flex-row mt-2"
          >
            <Label htmlFor="r1" className="flex items-center">
              <RadioGroupItem value="films" id="r1" className="mr-2" />
              Films
            </Label>

            <Label htmlFor="r2" className="flex items-center">
              <RadioGroupItem value="series" id="r2" className="mr-2" />
              Séries
            </Label>
          </RadioGroup>
        </div>
      </div>
      {isLoading ? (
        <Button className="flex justify-center bg-(--ads-btn-default) px-4 py-2 rounded-md text-(--ads-text-default) mt-4">
          <Spinner />
        </Button>
      ) : (
        <Button
          type="submit"
          className="flex justify-center bg-(--ads-btn-default) px-4 py-2 rounded-md text-(--ads-text-default) mt-4 transition cursor-pointer"
        >
          Valider
        </Button>
      )}
    </form>
  )
}

export default Form
