import GenericModal from "@/components/shared/Modal"

import { useMedia } from "../context/MediaProvider"

import GenerateLink from "./GenerateLink"

export default function Modal({
  title,
  type,
  isMagnet,
}: {
  title: string
  type: string
  isMagnet?: boolean
}) {
  const { isVisible, resetModal, provider } = useMedia()
  return (
    isVisible && (
      <div className="my-2">
        <GenericModal
          isOpen={isVisible}
          onClose={() => resetModal()}
          title={`Génération du lien ${provider}`}
        >
          <GenerateLink title={title} type={type} isMagnet={isMagnet} />
        </GenericModal>
      </div>
    )
  )
}
