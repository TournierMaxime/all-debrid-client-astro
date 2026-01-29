import { useMedia } from "../context/MediaProvider"
import Provider from "./Provider"
import Message from "./Message"
import { DialogContent, DialogTitle, Dialog } from "@/components/ui/dialog"

export default function DownloadAgain({ loading }: { loading: boolean }) {
  const { isVisible, resetModal } = useMedia()

  if (!isVisible) return null

  return (
    <>
      {/* Overlay CUSTOM */}
      <div
        className="fixed inset-0 bg-(--ads-bg-overlay) z-40"
        onClick={resetModal}
      />

      <Dialog
        modal={false}
        open={isVisible}
        onOpenChange={(open) => !open && resetModal()}
      >
        <DialogContent className="z-50">
          <DialogTitle>Plateforme de téléchargement</DialogTitle>

          {loading ? (
            <h3 className="font-semibold">Chargement du lien</h3>
          ) : (
            <>
              <Provider />
              <Message message="Lien copié dans le presse-papier !" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
