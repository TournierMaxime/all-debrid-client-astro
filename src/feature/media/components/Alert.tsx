import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

type AlertProps = {
  open: boolean
  onCancel: (param?: any) => void
  onConfirm?: () => void
  title: string
  description?: string
  isChoice?: boolean
  children?: React.ReactNode
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
      <Dialog modal={false} open={open} onOpenChange={(v) => !v && onCancel()}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {isChoice ? (
            <DialogFooter>
              <DialogClose>
                <Button className="cursor-pointer" onClick={onCancel}>
                  Annuler
                </Button>
              </DialogClose>
              <Button
                className="bg-(--ads-btn-delete) cursor-pointer"
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
