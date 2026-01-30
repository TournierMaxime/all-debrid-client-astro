import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Props = {
  message?: string
  error?: string
}

export default function Message({ message, error }: Props) {
  return error ? (
    <p className="w-full my-4 text-(--ads-text-error)">{error}</p>
  ) : (
    <p className="w-full my-4 text-(--ads-text-success)">{message}</p>
  )
}

export function AlertMessage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Alert className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded mb-2">
      <AlertTitle className="mb-2 text-[16px]">{title}</AlertTitle>
      <AlertDescription className="text-[14px]">{description}</AlertDescription>
    </Alert>
  )
}
