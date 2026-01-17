import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { zaService, allDebridService } from "../services/za"

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

  // --- Actions AllDebrid Service ---

  getLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getLink(link)
    },
  }),

  unlockLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getUnlockLink(link)
    },
  }),

  redirectLink: defineAction({
    input: z.object({ link: z.string() }),
    handler: async ({ link }) => {
      return await allDebridService.getRedirectLink(link)
    },
  }),
}
