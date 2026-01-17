type Props = {
  message?: string
  error?: string
}

export default function Message({ message, error }: Props) {
  return error ? (
    <p className="w-full my-4 text-red-500">{error}</p>
  ) : (
    <p className="w-full my-4 text-green-500">{message}</p>
  )
}
