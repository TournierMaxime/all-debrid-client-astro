import React from "react"

type Props = {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
