import useWindowDimensions from "@/hooks/useWindowDimensions"

export const NavImage = () => {
  const { width } = useWindowDimensions()

  return (
    <div className="w-2/12 flex flex-row items-center">
      <a href={"/"}>
        <img
          src={"../../../public/logo.png"}
          alt="All Debrid Scraper"
          width={500}
          height={500}
          className="md:w-20 md:h-20 w-15 h-15 max-w-20"
        />
      </a>

      {width > 768 && (
        <ul className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap">
          <li className="mr-4 my-0.5 sm:my-0">
            <a href="/history" className="font-semibold text-normal">
              Historique
            </a>
          </li>
          <li className="mr-4 my-0.5 sm:my-0">
            <a href="/libraries" className="font-semibold text-normal">
              Plex
            </a>
          </li>
          <li>
            <a href="/downloads" className="font-semibold text-normal">
              Téléchargements
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}
