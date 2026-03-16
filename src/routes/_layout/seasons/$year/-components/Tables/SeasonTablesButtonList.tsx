import { Link, getRouteApi } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '@/components/base/ui/button'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/tables/$table',
)

const SeasonTablesButtonList = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const year = route.useParams({
    select: (param) => param.year,
  })

  const hasStatic = Boolean(
    route.useLoaderData({
      select: (s) => s.serie.hasStatic,
    }),
  )

  if (year < 1930) return null
  return (
    <div>
      <h1 className="mb-2 text-center text-xs xs:text-sm leading-4 font-bold sm:text-base md:mb-4 lg:text-xl">
        Serietabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-6 flex flex-row justify-center gap-4">
          <Link
            from="/seasons/$year/$group/tables/$table"
            to="."
            search={{ women }}
            params={(prev) => ({ ...prev, table: 'all' })}
            activeOptions={{
              includeSearch: false,
              exact: true,
            }}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'xxs'}
                variant={
                  isActive || isTransitioning
                    ? 'default'
                    : 'outline'
                }
                disabled={isTransitioning}
              >
                Alla
              </Button>
            )}
          </Link>
          <Link
            from="/seasons/$year/$group/tables/$table"
            to="."
            search={{ women }}
            params={(prev) => ({ ...prev, table: 'home' })}
            activeOptions={{
              includeSearch: false,
              exact: true,
            }}
            disabled={hasStatic}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'textxxs'}
                variant={
                  isActive || isTransitioning
                    ? 'default'
                    : 'outline'
                }
                disabled={isTransitioning || hasStatic}
              >
                Hemma
              </Button>
            )}
          </Link>
          <Link
            from="/seasons/$year/$group/tables/$table"
            to="."
            search={{ women }}
            params={(prev) => ({ ...prev, table: 'away' })}
            activeOptions={{
              includeSearch: false,
              exact: true,
            }}
            disabled={hasStatic}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'textxxs'}
                variant={
                  isActive || isTransitioning
                    ? 'default'
                    : 'outline'
                }
                disabled={isTransitioning || hasStatic}
              >
                Borta
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SeasonTablesButtonList
