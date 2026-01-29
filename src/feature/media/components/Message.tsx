type Props = {
  message?: string
  error?: string
}

export default function Message({ message, error }: Props) {
  return error ? (
    <p className="w-full my-4 text-[var(--ads-text-error)]">{error}</p>
  ) : (
    <p className="w-full my-4 text-[var(--ads-text-success)]">{message}</p>
  )
}
