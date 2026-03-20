import {
  Alert as AlertShadcn,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type AlertProps = {
  open?: boolean
  onCancel?: (param?: unknown) => void
  onConfirm?: () => void
  title: string
  description?: string
  isChoice?: boolean
  children?: React.ReactNode
}

type MessageProps = {
  message?: string
  error?: string
}

export default function Alert({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  isChoice,
  children,
}: AlertProps) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 bg-(--ads-bg-overlay) z-40" />
      <Dialog
        modal={false}
        open={open}
        onOpenChange={(v) => (onCancel ? !v && onCancel() : !v)}
      >
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {isChoice ? (
            <DialogFooter>
              <DialogClose asChild>
                <Button className="cursor-pointer" onClick={onCancel}>
                  Annuler
                </Button>
              </DialogClose>
              <Button
                className="bg-(--ads-btn-delete) cursor-pointer mb-4 md:mb-0"
                onClick={onConfirm}
              >
                Confirmer
              </Button>
            </DialogFooter>
          ) : null}
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}

export function Message({ message, error }: MessageProps) {
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
  children,
}: {
  title: string
  description?: string
  backgroundColor?: string
  borderColor?: string
  color?: string
  clx?: string
  children?: React.ReactNode
}) {
  return (
    <AlertShadcn
      className={`${backgroundColor} ${borderColor} ${color} p-4 rounded mb-2 ${clx ?? ""}`}
    >
      <AlertTitle className="mb-2 text-[18px]">{title}</AlertTitle>
      <AlertDescription className="text-[16px] mb-2">
        {description}
      </AlertDescription>
      {children}
    </AlertShadcn>
  )
}
