import React from "react"
import { IoMdClose } from "react-icons/io"

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function Modal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-(--ads-bg-modal) bg-opacity-50 flex justify-center items-center">
      <div className="bg-(--ads-bg-default) p-6 rounded-lg shadow-lg md:w-10/12 lg:w-6/12 w-full h-full md:h-[40vh] lg:h-[40vh] xl:h-[30vh] 2xl:h-[20vh]">
        <div className="flex flex-row justify-between items-baseline">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <IoMdClose className="cursor-pointer" onClick={onClose} size={24} />
        </div>
        {children}
      </div>
    </div>
  )
}
