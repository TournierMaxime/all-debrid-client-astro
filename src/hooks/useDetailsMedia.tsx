import { Spinner } from "@/components/ui/spinner"

const useDetailsMedia = () => {
  const getStatus = (status: boolean, a?: string) => {
    if (status === true) {
      return <Spinner />
    }

    if (a !== "" || undefined) {
      return "Copier le lien"
    }

    return "Générer le lien"
  }

  return {
    getStatus,
  }
}

export default useDetailsMedia
