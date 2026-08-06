import {
  getRouteApi,
  useSearch,
} from '@tanstack/react-router'

const route = getRouteApi('/_layout/seasons/')

const SeasonsList = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const data = route.useLoaderData()

  if (data.status === 404) {
    return (
      <div className="mt-2 flex flex-row justify-center">
        {data.message}
      </div>
    )
  }

  return (
    <div className="my-2 flex flex-col">
      <div className="mx-auto grid grid-cols-1 gap-y-2 border px-2 py-2 shadow-xs sm:grid-cols-2 sm:gap-x-8 md:shadow-md xl:grid-cols-3 xl:px-4 2xl:gap-x-24">
        {data.seasons.map((season) => {
          const year =
            parseInt(season.year.split('/')[1]) >= 1964
              ? parseInt(season.year.split('/')[1])
              : parseInt(season.year)
          if (women) {
            if (season.group === null) return null
            return (
              <div
                key={season.seasonId}
                className="flex flex-row items-center gap-2"
              >
                <div className="w-20">
                  <route.Link
                    to="/seasons/$year"
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    params={{ year }}
                  >
                    <span className="hover:underline hover:underline-offset-auto text-[10px] font-semibold sm:text-xs xl:text-sm">
                      {season.year}
                    </span>
                  </route.Link>
                </div>
                <div className="grid grid-cols-3 items-center gap-2 px-2 py-1 sm:gap-3">
                  <route.Link
                    to="/seasons/$year/$group/tables/$table"
                    params={{
                      year: year,
                      group: season.group,
                      table: 'all',
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium tabular-nums hover:underline hover:underline-offset-auto lg:font-normal"
                  >
                    <span className="text-[10px] sm:text-xs xl:text-sm">
                      Tabeller
                    </span>
                  </route.Link>

                  <route.Link
                    to="/seasons/$year/$group/games"
                    params={{
                      year: year,
                      group: season.group,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                  >
                    <span className="text-[10px] sm:text-xs xl:text-sm">
                      Matcher
                    </span>
                  </route.Link>

                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                  >
                    <span className="text-[10px] sm:text-xs xl:text-sm">
                      Slutspel
                    </span>
                  </route.Link>
                </div>
              </div>
            )
          }
          if (season.group === null) {
            return (
              <div
                key={season.seasonId}
                className="flex flex-row items-center gap-2"
              >
                <div className="w-20">
                  <route.Link
                    to="/seasons/$year"
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    params={{ year }}
                  >
                    <span className="hover:underline hover:underline-offset-auto text-[10px] font-semibold sm:text-xs xl:text-sm">
                      {season.year}
                    </span>
                  </route.Link>
                </div>
                <div className="grid grid-cols-2 items-center gap-2 px-2 py-1 sm:gap-3">
                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                  >
                    <span className="text-[10px] sm:text-xs xl:text-sm">
                      Slutspelsträd
                    </span>
                  </route.Link>
                  <route.Link
                    to="/seasons/$year/playoff/games"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                  >
                    <span className="text-[10px] sm:text-xs xl:text-sm">
                      Matcher
                    </span>
                  </route.Link>
                </div>
              </div>
            )
          }

          return (
            <div
              key={season.seasonId}
              className="flex flex-row items-center gap-2"
            >
              <div className="w-20">
                <route.Link
                  to="/seasons/$year"
                  search={(prev) => ({ women: prev.women })}
                  params={{ year }}
                >
                  <span className="hover:underline hover:underline-offset-auto text-[10px] font-semibold sm:text-xs xl:text-sm">
                    {season.year}
                  </span>
                </route.Link>
              </div>
              <div className="grid grid-cols-3 gap-2 px-2 py-1 sm:gap-3">
                <route.Link
                  to="/seasons/$year/$group/tables/$table"
                  params={{
                    year: year,
                    group: season.group,
                    table: 'all',
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium tabular-nums hover:underline hover:underline-offset-auto lg:font-normal"
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm">
                    Tabeller
                  </span>
                </route.Link>

                <route.Link
                  to="/seasons/$year/$group/games"
                  params={{
                    year: year,
                    group: season.group,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm">
                    Matcher
                  </span>
                </route.Link>

                <route.Link
                  to="/seasons/$year/playoff/table"
                  params={{
                    year: year,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:underline hover:underline-offset-auto lg:font-normal"
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm">
                    Slutspel
                  </span>
                </route.Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeasonsList
