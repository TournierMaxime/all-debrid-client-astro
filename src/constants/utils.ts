import { SECRET_PLEX_TOKEN, SECRET_PLEX_ENDPOINT } from "astro:env/server"

export const za = "www.wawacity.irish"
export const maxWidth = "max-w-[1024px]"
export const zaFullUrl = "https://www.wawacity.irish"

export const plexEndpoint = SECRET_PLEX_ENDPOINT
export const plexToken = SECRET_PLEX_TOKEN

export const tableClass = "border border-slate-400 border-collapse"
export const tdClass = "border p-2 text-sm"
export const thClass = "border p-2 font-semibold text-normal"

export const formatDuration = (durationMs: number): string => {
  const totalMinutes = Math.floor(durationMs / 1000 / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h ${minutes}min`
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B"

  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}
