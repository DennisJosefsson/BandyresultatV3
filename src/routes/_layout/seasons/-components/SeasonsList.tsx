import { Link, useLoaderData, useSearch } from '@tanstack/react-router'

const SeasonsList = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const seasons = useLoaderData({
    from: '/_layout/seasons/',
    select: (s) => s.seasons,
  })
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {seasons.map((season) => {
          const year =
            parseInt(season.year.split('/')[1]) >= 1964
              ? parseInt(season.year.split('/')[1])
              : parseInt(season.year)
          if (women) {
            if (season.womensGroup === undefined) return null
            return (
              <div
                key={season.seasonId}
                className="bg-muted dark:bg-muted/50 flex flex-row items-center justify-between px-2 py-1 text-sm lg:text-base 2xl:text-lg"
              >
                <div className="w-28 font-semibold">{season.year}</div>
                <div className="rounded-md px-2 py-1 text-center xl:p-0">
                  <Link
                    to="/season/$year/$group/tables/$table"
                    params={{
                      year: year,
                      group: season.womensGroup,
                      table: 'all',
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium tabular-nums hover:font-bold lg:font-normal"
                  >
                    Tabeller
                  </Link>
                </div>
                <div className="rounded-md px-2 py-1 text-center xl:p-0">
                  <Link
                    to="/season/$year/$group/games"
                    params={{
                      year: year,
                      group: season.womensGroup,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    Matcher
                  </Link>
                </div>
                <div className="rounded-md px-2 py-1 text-center xl:p-0">
                  <Link
                    to="/season/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    Slutspel
                  </Link>
                </div>
              </div>
            )
          }
          if (season.mensGroup === undefined) {
            return (
              <div
                key={season.seasonId}
                className="bg-muted dark:bg-muted/50 flex flex-row items-center justify-between px-2 py-1 text-sm lg:text-base 2xl:text-lg"
              >
                <div className="w-28 font-semibold">{season.year}</div>
                <div className="text-foreground/20 rounded-md px-2 py-1 text-center xl:p-0">
                  Tabeller
                </div>
                <div className="text-foreground/20 rounded-md px-2 py-1 text-center xl:p-0">
                  Matcher
                </div>
                <div className="rounded-md px-2 py-1 text-center xl:p-0">
                  <Link
                    to="/season/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    Slutspel
                  </Link>
                </div>
              </div>
            )
          }

          return (
            <div
              key={season.seasonId}
              className="bg-muted dark:bg-muted/50 flex flex-row items-center justify-between px-2 py-1 text-sm lg:text-base 2xl:text-lg"
            >
              <div className="w-28 font-semibold">{season.year}</div>
              <div className="rounded-md px-2 py-1 text-center xl:p-0">
                <Link
                  to="/season/$year/$group/tables/$table"
                  params={{
                    year: year,
                    group: season.mensGroup,
                    table: 'all',
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium tabular-nums hover:font-bold lg:font-normal"
                >
                  Tabeller
                </Link>
              </div>
              <div className="rounded-md px-2 py-1 text-center xl:p-0">
                <Link
                  to="/season/$year/$group/games"
                  params={{
                    year: year,
                    group: season.mensGroup,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                >
                  Matcher
                </Link>
              </div>
              <div className="rounded-md px-2 py-1 text-center xl:p-0">
                <Link
                  to="/season/$year/playoff/table"
                  params={{
                    year: year,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                >
                  Slutspel
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      {women && (
        <div className="mt-4 flex justify-center">
          <p>Damernas första säsong är 1972/1973.</p>
        </div>
      )}
    </div>
  )
}

export default SeasonsList
