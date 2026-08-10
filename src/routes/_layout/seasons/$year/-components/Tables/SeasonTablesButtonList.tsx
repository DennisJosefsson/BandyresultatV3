import { Button } from '@/components/base/ui/button'
import SeasonTablesButtonListSkeleton from '@/components/Loading/Skeletons/SeasonTableButtonSkeleton'
import {
  Await,
  Link,
  getRouteApi,
} from '@tanstack/react-router'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/tables/$table',
)

const SeasonTablesButtonList = () => {
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const year = route.useParams({
    select: (param) => param.year,
  })
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })
  return (
    <Await
      promise={promiseData}
      fallback={<SeasonTablesButtonListSkeleton />}
    >
      {(data) => {
        if (!data) return null
        if (data.status === 404) return null

        const hasStatic = Boolean(data.serie.hasStatic)

        if (year < 1930) return null
        return (
          <div className="xs:mb-3 mb-2 sm:mb-4 lg:mb-6">
            <h1 className="xs:text-sm xs:mb-2 mb-1 text-center text-xs leading-4 font-bold sm:text-base md:mb-4 lg:text-xl">
              Serietabell {women ? 'Damer' : 'Herrar'}
            </h1>
            <div className="flex flex-row justify-center">
              <div className="flex flex-row justify-center gap-4">
                <Link
                  from="/seasons/$year/$group/tables/$table"
                  to="."
                  search={{ women }}
                  params={(prev) => ({
                    ...prev,
                    table: 'all',
                  })}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  {({ isActive, isTransitioning }) => (
                    <Button
                      size="responsive"
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
                  params={(prev) => ({
                    ...prev,
                    table: 'home',
                  })}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                  disabled={hasStatic}
                >
                  {({ isActive, isTransitioning }) => (
                    <Button
                      size="responsive"
                      variant={
                        isActive || isTransitioning
                          ? 'default'
                          : 'outline'
                      }
                      disabled={
                        isTransitioning || hasStatic
                      }
                    >
                      Hemma
                    </Button>
                  )}
                </Link>
                <Link
                  from="/seasons/$year/$group/tables/$table"
                  to="."
                  search={{ women }}
                  params={(prev) => ({
                    ...prev,
                    table: 'away',
                  })}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                  disabled={hasStatic}
                >
                  {({ isActive, isTransitioning }) => (
                    <Button
                      size="responsive"
                      variant={
                        isActive || isTransitioning
                          ? 'default'
                          : 'outline'
                      }
                      disabled={
                        isTransitioning || hasStatic
                      }
                    >
                      Borta
                    </Button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default SeasonTablesButtonList
