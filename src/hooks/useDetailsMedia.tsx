import { Spinner } from "@/components/ui/spinner"

const useDetailsMedia = () => {
  const getStatus = (status: boolean, link: string) => {
    if (status === true) {
      return <Spinner />
    }

    if (link && link !== "") {
      return "Copier le lien"
    }

    return "Générer le lien"
  }

  return {
    getStatus,
  }
}

export default useDetailsMedia
