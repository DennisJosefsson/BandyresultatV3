import { useLoaderData } from '@tanstack/react-router'

const SeasonsList = () => {
  //   const women = useSearch({
  //     from: '/_layout',
  //     select: (search) => search.women,
  //   })
  const seasons = useLoaderData({
    from: '/_layout/seasons/',
    select: (s) => s.seasons,
  })
  return (
    <div className="grid justify-between grid-cols-1 pt-2 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {seasons.map((season) => {
        // const seasonYear =
        //   parseInt(season.year.split('/')[1]) >= 1964
        //     ? parseInt(season.year.split('/')[1])
        //     : parseInt(season.year)

        return (
          <div
            key={season.seasonId}
            className="flex flex-row items-center justify-between px-2 py-1 text-sm bg-muted dark:bg-muted/50 lg:text-base 2xl:text-lg"
          >
            <div className="font-semibold w-28">{season.year}</div>
            <div className="px-2 py-1 text-center rounded-md xl:p-0">
              {/* <Link
                to="/season/$seasonId/tables/$table"
                params={{ seasonId: seasonYear, table: 'all' }}
                search={{ women }}
                className="font-medium tabular-nums hover:font-bold hover:text-primary lg:font-normal"
              > */}
              Tabeller
              {/* </Link> */}
            </div>
            <div className="px-2 py-1 text-center rounded-md xl:p-0">
              {/* <Link
                to="/season/$seasonId/games"
                params={{ seasonId: seasonYear }}
                search={{ women }}
                className="font-medium hover:font-bold hover:text-primary lg:font-normal"
              > */}
              Matcher
              {/* </Link> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SeasonsList
