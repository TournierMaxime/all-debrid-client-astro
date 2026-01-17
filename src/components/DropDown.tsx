import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type Dropdown = {
  title: string
  label: string
  children: React.ReactNode
}

export default function DropDown({ title, label, children }: Dropdown) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col md:w-5/12 mb-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <button
        className="w-full text-left bg-white border border-slate-400 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer"
        onClick={handleOpen}
      >
        {label}
        <span className="ml-2">
          {isOpen ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
        </span>
      </button>
      {isOpen && children}
    </div>
  )
}
