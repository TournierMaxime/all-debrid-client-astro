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
  link: string,
): Promise<FinalDownloadLink | null> => {
  const { data: resGetUnlockLink } = await actions.unlockLink({
    dlProtectLink: link,
  })

  const unlockedLink = resGetUnlockLink.data.link

  return {
    dlProtectedLink: link,
    unlockLink: unlockedLink,
  }
}
