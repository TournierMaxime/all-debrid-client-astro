import { useMedia } from "../context/MediaProvider"
import GenericModal from "../../../components/Modal"
import Provider from "./Provider"
import Message from "./Message"

export default function DownloadAgain() {
  const { isVisible, resetModal } = useMedia()
  return (
    <GenericModal
      isOpen={isVisible}
      onClose={() => resetModal()}
      title={`Plateforme de téléchargement`}
    >
      <Provider />
      <Message message="Lien copié dans le presse-papier !" />
    </GenericModal>
  )
}
