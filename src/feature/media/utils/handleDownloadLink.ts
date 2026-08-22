import { actions } from "astro:actions"

import type { LinkData } from "../type/media"

export interface FinalDownloadLink {
  dlProtectedLink: string
  unlockLink?: string
  originalTitle: string
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
  dlProtectLink: string,
  title: string,
  isMagnet?: boolean,
): Promise<FinalDownloadLink | null> => {
  if (isMagnet) {
    const { data: resUploadMagnet } = await actions.uploadMagnet({
      dlProtectLink,
    })

    const id = resUploadMagnet.data.magnets[0].id.toString()

    const { data: resMagnetLink } = await actions.magnetLink({
      id,
    })

    const magnetLink = resMagnetLink.data.magnets[0].files[0].l
    console.log("magnetLink", magnetLink)

    const { data: resGetUnlockLink } = await actions.getUnlockLink({
      link: magnetLink,
    })

    const { link } = resGetUnlockLink.data

    return {
      dlProtectedLink: dlProtectLink,
      unlockLink: link,
      originalTitle: `${title}`,
    }
  }

  const { data: resGetUnlockLink } = await actions.unlockLink({
    dlProtectLink,
  })

  const { link, extension } = resGetUnlockLink.data

  return {
    dlProtectedLink: dlProtectLink,
    unlockLink: link,
    originalTitle: `${title}.${extension}`,
  }
}
