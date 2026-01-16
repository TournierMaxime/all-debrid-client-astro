"use client"
import React from "react"
import { useSearch } from "../../../feature/search/context/SearchContext"

const Form = ({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}) => {
  const { search, setSearch } = useSearch()

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4 md:mt-0">
      <div className="flex flex-col mob-l:flex-row mob-l:justify-evenly">
        {/* Input de recherche */}
        <input
          type="text"
          name="q"
          value={search.query || ""}
          onChange={(e) =>
            setSearch({ query: e.target.value, filter: search.filter })
          }
          placeholder={`Rechercher`}
          className="px-4 py-2 sm:w-8/12 w-full rounded-md border border-gray-600 text-black focus:outline-none"
        />
        {/* Radio Buttons */}
        <div className="flex flex-row items-center space-x-4 mt-4 md:mt-0 ml-2 w-4/12">
          <label className="flex items-center">
            <input
              type="radio"
              value="film"
              checked={search.filter === "films"}
              onChange={() =>
                setSearch({
                  ...search,
                  filter: "films",
                })
              }
              className="mr-2"
            />
            Films
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              value="serie"
              checked={search.filter === "series"}
              onChange={() =>
                setSearch({
                  ...search,
                  filter: "series",
                })
              }
              className="mr-2"
            />
            Séries
          </label>
        </div>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="flex justify-center bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-white mt-4 transition"
      >
        Valider
      </button>
    </form>
  )
}

export default Form
