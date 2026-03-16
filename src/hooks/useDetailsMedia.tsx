import { Spinner } from "@/components/ui/spinner"

const useDetailsMedia = () => {
  const getStatus = (status: boolean, link: string, noLink?: boolean) => {
    if (status === true) {
      return <Spinner />
    }

    if (link && link !== "") {
      return "Copier le lien"
    }

    if (noLink) return "Ouverture de la page de téléchargement"

    return "Télécharger"
  }

  return {
    getStatus,
  }
}

export default useDetailsMedia
