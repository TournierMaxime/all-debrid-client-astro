const useDetailsMedia = () => {
  const getStatus = (status: boolean, a?: string) => {
    if (status === true) {
      return "Chargement"
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
