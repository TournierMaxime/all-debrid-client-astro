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
  backgroundColor = "bg-(--ads-alert-bg-default)",
  borderColor = "border-(--ads-alert-border-default)",
  color = "text-(--ads-alert-text-default)",
  clx,
}: {
  title: string
  description?: string
  backgroundColor?: string
  borderColor?: string
  color?: string
  clx?: string
}) {
  return (
    <Alert
      className={`${backgroundColor} ${borderColor} ${color} p-4 rounded mb-2 ${clx ?? ""}`}
    >
      <AlertTitle className="mb-2 text-[16px]">{title}</AlertTitle>
      <AlertDescription className="text-[14px]">{description}</AlertDescription>
    </Alert>
  )
}
