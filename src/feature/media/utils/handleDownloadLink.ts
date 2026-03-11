import { actions } from "astro:actions"

export const getFinalDownloadLink = async (link: string) => {
  const { data: resGetLink } = await actions.getLink({
    link,
  })

  if (!resGetLink || !resGetLink?.link) {
    return
  }

  const { uri, id } = resGetLink

  const { data: resGetRedirectLink } = await actions.getRedirectLink({
    link: uri + id,
  })

  const links = resGetRedirectLink?.data?.links

  if (!Array.isArray(links) || links.length === 0) {
    return
  }

  await actions.saveLink({ link: links[0] })

  const { data: resGetUnlockLink } = await actions.getUnlockLink({
    link: links[0],
  })

  if (resGetUnlockLink?.error?.message) return resGetUnlockLink?.error?.message

  return resGetUnlockLink?.data?.link
}
