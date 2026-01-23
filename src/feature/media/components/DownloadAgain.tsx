import { useMedia } from "../context/MediaProvider"
import GenericModal from "../../../components/Modal"
import Provider from "./Provider"
import Message from "./Message"
import { Fragment } from "react"

export default function DownloadAgain({ loading }: { loading: boolean }) {
  const { isVisible, resetModal } = useMedia()

  return (
    <GenericModal
      isOpen={isVisible}
      onClose={() => resetModal()}
      title={`Plateforme de téléchargement`}
    >
      {loading ? (
        <h3 className="text-normal font-semibold">Chargement du lien</h3>
      ) : (
        <Fragment>
          {" "}
          <Provider />
          <Message message="Lien copié dans le presse-papier !" />
        </Fragment>
      )}
    </GenericModal>
  )
}
