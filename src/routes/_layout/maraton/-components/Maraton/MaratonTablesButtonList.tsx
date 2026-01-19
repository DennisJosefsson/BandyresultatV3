import { Button } from '@/components/ui/button'
import { getRouteApi, Link } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const route = getRouteApi('/_layout/maraton/table/$maratonTable')

const MaratonTablesButtonList = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  const women = route.useSearch({
    select: (search) => search.women,
  })

  return (
    <div>
      <h1 className="mb-2 text-center text-sm leading-4 font-bold sm:text-base md:mb-4 lg:text-xl">
        Maratontabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-2 grid grid-cols-3 gap-4">
          <Link
            from="/maraton/table/$maratonTable"
            to="."
            search={{ women }}
            params={{ maratonTable: 'all' }}
            activeOptions={{ includeSearch: false, exact: true }}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'xxs'}
                variant={isActive || isTransitioning ? 'default' : 'outline'}
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
            activeOptions={{ includeSearch: false, exact: true }}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'textxxs'}
                variant={isActive || isTransitioning ? 'default' : 'outline'}
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
            activeOptions={{ includeSearch: false, exact: true }}
          >
            {({ isActive, isTransitioning }) => (
              <Button
                size={matches ? 'sm' : 'textxxs'}
                variant={isActive || isTransitioning ? 'default' : 'outline'}
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
