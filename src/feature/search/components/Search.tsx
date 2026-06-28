import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

import Modal from "@/components/shared/Modal"
import useWindowDimensions from "@/hooks/useWindowDimensions"

import { useSearch } from "../context/SearchContext"

import Form from "./Form"

const SearchForm = ({ className }: { className?: string }) => {
  const { handleSearch } = useSearch()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { width } = useWindowDimensions()

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await handleSearch()
      setIsLoading(false)
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex flex-col justify-center items-center md:flex-row md:justify-center w-full md:w-2/12 ${className}`}
    >
      <div className="flex items-center" onClick={handleOpen}>
        {width > 768 ? (
          <FaSearch className="md:w-10 md:h-10 w-7.5 h-7.5 max-w-10 cursor-pointer mr-4" />
        ) : (
          <a href="#" className="font-semibold text-normal">
            Rechercher
          </a>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={handleOpen} title="Moteur de recherche">
        <Form handleSubmit={handleSubmit} isLoading={isLoading} />
      </Modal>
    </div>
  )
}

export default SearchForm
