import { actions } from "astro:actions"

interface FinalDownloadLink {
  dlProtectedLink: string
  unlockLink?: string
}

export const getFinalDownloadLink = async (
  link: string,
): Promise<FinalDownloadLink | null> => {
  const { data: resGetLink } = await actions.getLink({ link })

  if (!resGetLink?.link) return null

  const { uri, id } = resGetLink
  const dlProtectedLink = uri + id

  const { data: resGetRedirectLink } = await actions.getRedirectLink({
    link: dlProtectedLink,
  })

  const links = resGetRedirectLink?.data?.links

  if (!Array.isArray(links) || links.length === 0) {
    return { dlProtectedLink }
  }

  const firstLink = links[0]

  await actions.saveLink({ link: firstLink })

  const { data: resGetUnlockLink } = await actions.getUnlockLink({
    link: firstLink,
  })

  return {
    dlProtectedLink,
    unlockLink: resGetUnlockLink?.data?.link,
  }
}
