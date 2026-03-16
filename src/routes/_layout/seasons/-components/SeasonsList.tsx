import {
  getRouteApi,
  useLoaderData,
  useSearch,
} from '@tanstack/react-router'

const route = getRouteApi('/_layout/seasons/')

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
      <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 px-2 mx-auto sm:grid-cols-2 xl:grid-cols-3">
        {seasons.map((season) => {
          const year =
            parseInt(season.year.split('/')[1]) >= 1964
              ? parseInt(season.year.split('/')[1])
              : parseInt(season.year)
          if (women) {
            if (season.womensGroup === undefined)
              return null
            return (
              <div
                key={season.seasonId}
                className="flex flex-row gap-2 items-center"
              >
                <div className="w-20">
                  <route.Link
                    to="/seasons/$year"
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    params={{ year }}
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      {season.year}
                    </span>
                  </route.Link>
                </div>
                <div className="grid grid-cols-3 px-2 py-1 gap-3 items-center">
                  <route.Link
                    to="/seasons/$year/$group/tables/$table"
                    params={{
                      year: year,
                      group: season.womensGroup,
                      table: 'all',
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium tabular-nums hover:font-bold lg:font-normal"
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      Tabeller
                    </span>
                  </route.Link>

                  <route.Link
                    to="/seasons/$year/$group/games"
                    params={{
                      year: year,
                      group: season.womensGroup,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      Matcher
                    </span>
                  </route.Link>

                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      Slutspel
                    </span>
                  </route.Link>
                </div>
              </div>
            )
          }
          if (season.mensGroup === undefined) {
            return (
              <div
                key={season.seasonId}
                className="flex flex-row gap-2 items-center"
              >
                <div className="w-20">
                  <route.Link
                    to="/seasons/$year"
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    params={{ year }}
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      {season.year}
                    </span>
                  </route.Link>
                </div>
                <div className="grid grid-cols-2 px-2 py-1 gap-3 items-center">
                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    <span className="font-semibold text-xs xl:text-base">
                      Slutspelsträd
                    </span>
                  </route.Link>
                  <route.Link
                    to="/seasons/$year/playoff/games"
                    params={{
                      year: year,
                    }}
                    search={{ women }}
                    className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                  >
                    <span className="font-semibold text-xs xl:text-base">
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
              className="flex flex-row items-center"
            >
              <div className="w-20">
                <route.Link
                  to="/seasons/$year"
                  search={(prev) => ({ women: prev.women })}
                  params={{ year }}
                >
                  <span className="font-semibold text-xs xl:text-base">
                    {season.year}
                  </span>
                </route.Link>
              </div>
              <div className="grid grid-cols-3 px-2 py-1 gap-3">
                <route.Link
                  to="/seasons/$year/$group/tables/$table"
                  params={{
                    year: year,
                    group: season.mensGroup,
                    table: 'all',
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium tabular-nums hover:font-bold lg:font-normal"
                >
                  <span className="font-semibold text-xs xl:text-base">
                    Tabeller
                  </span>
                </route.Link>

                <route.Link
                  to="/seasons/$year/$group/games"
                  params={{
                    year: year,
                    group: season.mensGroup,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                >
                  <span className="font-semibold text-xs xl:text-base">
                    Matcher
                  </span>
                </route.Link>

                <route.Link
                  to="/seasons/$year/playoff/table"
                  params={{
                    year: year,
                  }}
                  search={{ women }}
                  className="hover:text-primary font-medium hover:font-bold lg:font-normal"
                >
                  <span className="font-semibold text-xs xl:text-base">
                    Slutspel
                  </span>
                </route.Link>
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
