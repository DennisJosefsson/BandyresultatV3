import { Link, getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'

const route = getRouteApi(
  '/_layout/maraton/table/$maratonTable',
)

const MaratonTablesButtonList = () => {
  const women = route.useSearch({
    select: (search) => search.women,
  })

  return (
    <div>
      <h1 className="mb-2 text-center text-sm leading-4 font-bold sm:text-base md:mb-4 lg:text-xl">
        Maratontabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-6 flex flex-row justify-center gap-4">
          <Link
            from="/maraton/table/$maratonTable"
            to="."
            search={{ women }}
            params={{ maratonTable: 'all' }}
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
            from="/maraton/table/$maratonTable"
            to="."
            search={{ women }}
            params={{ maratonTable: 'home' }}
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
                Hemma
              </Button>
            )}
          </Link>
          <Link
            from="/maraton/table/$maratonTable"
            to="."
            search={{ women }}
            params={{ maratonTable: 'away' }}
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
                Borta
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MaratonTablesButtonList
