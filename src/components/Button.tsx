type Props = {
  children?: React.ReactNode
  onClick?: any
  title?: string
  clx?: string
}

const Button = ({ children, onClick, title, clx }: Props) => {
  return (
    <button
      className={`m-1 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer text-sm ${clx}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

export const DeleteButton = ({ children, onClick, title, clx }: Props) => {
  return (
    <button
      className={`m-1 px-2 py-1 bg-red-500 text-white rounded cursor-pointer text-sm ${clx}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

export default Button
