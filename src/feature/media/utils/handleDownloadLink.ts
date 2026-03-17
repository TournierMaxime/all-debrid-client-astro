import { actions } from "astro:actions"

import type { LinkData } from "../type/media"

export interface FinalDownloadLink {
  dlProtectedLink: string
  unlockLink?: string
  title?: string
}

export const handleDownload = async (link: string | LinkData) => {
  if (!link) {
    return null
  }

  const process = async () => {
    const { data: create } = await actions.createDownloadTask({
      url: link,
      destination: "video/Films",
    })

    const createId = create?.data?.task_id[0]

    window.location.href = `/download/${createId}`
  }

  await process()
}

export const getFinalDownloadLink = async (
  link: string | LinkData,
  title: string,
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

  await actions.saveLink({ link: firstLink, title })

  const { data: resGetUnlockLink } = await actions.getUnlockLink({
    link: firstLink,
  })

  return {
    dlProtectedLink,
    unlockLink: resGetUnlockLink?.data?.link,
    title,
  }
}
