import { useMedia } from "../context/MediaProvider"
import GenerateLink from "./GenerateLink"
import GenericModal from "../../../components/Modal"
import Provider from "./Provider"

export const DownloadAgain = () => {
  const { isVisible, resetModal } = useMedia()
  return (
    <GenericModal
      isOpen={isVisible}
      onClose={() => resetModal()}
      title={`Télécharger à nouveau`}
    >
      <Provider />
    </GenericModal>
  )
}

export default function Modal() {
  const { isVisible, resetModal, provider } = useMedia()
  return (
    isVisible && (
      <div className="my-2">
        <GenericModal
          isOpen={isVisible}
          onClose={() => resetModal()}
          title={`Génération du lien ${provider}`}
        >
          <GenerateLink />
        </GenericModal>
      </div>
    )
  )
}
