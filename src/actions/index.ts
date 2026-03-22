import { defineAction } from "astro:actions"
import { z } from "astro:schema"

import { gopeedService } from "@/services/gopeed"
import { nasService } from "@/services/nas"
import { plexService } from "@/services/plex"
import { allDebridService, zaService } from "@/services/za"

export const server = {
  // --- Actions ZA Service ---

  search: defineAction({
    input: z.object({
      query: z.string(),
      filter: z.enum(["films", "series"]),
    }),
    handler: async (input) => {
      return await zaService.search(input)
    },
  }),

  getFilms: defineAction({
    handler: async () => {
      return await zaService.getFilms()
    },
  }),

  getFilm: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await zaService.getFilm(link)
    },
  }),

  getSerie: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await zaService.getSerie(link)
    },
  }),

  checkDomainName: defineAction({
    handler: async () => {
      return await zaService.checkDomainName()
    },
  }),

  // --- Actions AllDebrid Service ---

  getLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getLink(link)
    },
  }),

  getUnlockLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getUnlockLink(link)
    },
  }),

  getRedirectLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getRedirectLink(link)
    },
  }),

  saveLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.saveLink(link)
    },
  }),

  getUserHistory: defineAction({
    handler: async () => {
      return await allDebridService.getUserHistory()
    },
  }),

  getUserLinks: defineAction({
    handler: async () => {
      return await allDebridService.getUserLinks()
    },
  }),

  deleteSaveLink: defineAction({
    input: z.object({
      link: z.string(),
    }),
    handler: async ({ link }) => {
      return allDebridService.deleteSaveLink(link)
    },
  }),

  deleteMetadataItem: defineAction({
    input: z.object({
      ids: z.string(),
    }),
    handler: async ({ ids }) => {
      return plexService.deleteMetadataItem(ids)
    },
  }),

  // --- Actions NAS Service ---

  getSid: defineAction({
    handler: async () => {
      return await nasService.getSid()
    },
  }),

  getCapacity: defineAction({
    handler: async () => {
      return await nasService.getCapacity()
    },
  }),

  renameFile: defineAction({
    input: z.object({
      path: z.string(),
      name: z.string(),
    }),
    handler: async ({ path, name }) => {
      return await nasService.renameFile(path, name)
    },
  }),

  moveFile: defineAction({
    input: z.object({
      path: z.string(),
      destFolderPath: z.string(),
    }),
    handler: async ({ path, destFolderPath }) => {
      return await nasService.moveFile(path, destFolderPath)
    },
  }),

  createDownloadTask: defineAction({
    input: z.object({
      url: z.string(),
      destination: z.string(),
    }),

    handler: async ({ url, destination }) => {
      return nasService.createDownloadTask(url, destination)
    },
  }),

  // --- Actions Plex Service ---

  getLibraryMetadata: defineAction({
    input: z.object({
      ratingKey: z.string(),
    }),
    handler: async ({ ratingKey }) => {
      return await plexService.getLibraryMetadata(ratingKey)
    },
  }),

  getLibrary: defineAction({
    input: z.object({
      sectionId: z.string(),
      params: z
        .object({
          type: z.string().optional(),
          offset: z.string().optional(),
          limit: z.string().optional(),
        })
        .optional(),
    }),

    handler: async ({ sectionId, params }) => {
      return await plexService.getLibrary(sectionId, params)
    },
  }),

  // --- Gopeed service ---

  createTask: defineAction({
    input: z.object({
      url: z.string(),
    }),
    handler: async ({ url }) => {
      const resolve = await gopeedService.resolve(url)
      const id = resolve.data.id
      return gopeedService.createTask(id)
    },
  }),

  getTask: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }) => {
      return gopeedService.getTask(id)
    },
  }),

  continueTask: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }) => {
      return gopeedService.continueTask(id)
    },
  }),

  pauseTask: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }) => {
      return gopeedService.pauseTask(id)
    },
  }),

  deleteTask: defineAction({
    input: z.object({
      id: z.array(z.string()).min(1),
    }),
    handler: async ({ id }) => {
      return gopeedService.deleteTask(id)
    },
  }),
}
