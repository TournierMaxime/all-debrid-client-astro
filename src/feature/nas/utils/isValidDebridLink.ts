export const isValidDebridLink = (url: string) => {
  const regex =
    /^https:\/\/(redirect\.alldebrid\.com\/[A-Za-z0-9\-]+|[A-Za-z0-9]+\.debrid\.it\/dl\/[^\s]+)$/

  return regex.test(url.trim())
}
