import { useMedia } from "../context/MediaProvider"
import Provider from "./Provider"
import Message from "./Message"
import Alert from "./Alert"

export default function DownloadAgain({ loading }: { loading: boolean }) {
  const { isVisible, resetModal } = useMedia()

  if (!isVisible) return null

  return (
    <Alert
      open={isVisible}
      onCancel={(open) => !open && resetModal()}
      title="Plateforme de téléchargement"
      isChoice={false}
    >
      {loading ? (
        <h3 className="font-semibold">Chargement du lien</h3>
      ) : (
        <>
          <Provider />
          <Message message="Lien copié dans le presse-papier !" />
        </>
      )}
    </Alert>
  )
}
