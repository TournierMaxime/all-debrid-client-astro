import { FaSearch } from "react-icons/fa"
import Modal from "../../../components/Modal"
import React, { useState } from "react"
import Form from "./Form"
import { useSearch } from "../context/SearchContext"

const SearchForm = () => {
  const { handleSearch } = useSearch()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleSearch()
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-center w-2/12">
      <div className="flex items-center" onClick={handleOpen}>
        <FaSearch className="md:w-10 md:h-10 w-7.5 h-7.5 max-w-10 cursor-pointer mr-4" />
      </div>
      <Modal isOpen={isOpen} onClose={handleOpen} title="Moteur de recherche">
        <Form handleSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default SearchForm
