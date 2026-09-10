import { Button } from '@/components/base/ui/button'
import { Link, getRouteApi } from '@tanstack/react-router'

const route = getRouteApi(
  '/_layout/maraton/table/$maratonTable',
)

const MaratonTablesButtonList = () => {
  const women = route.useSearch({
    select: (search) => search.women,
  })

  return (
    <div>
      <h1 className="xs:text-sm mb-1 text-center text-xs leading-6 font-bold sm:mb-2 sm:text-base md:mb-4">
        Maratontabell {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="mb-1 flex flex-row justify-center gap-4 sm:mb-2 md:mb-4 lg:mb-6">
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
            {({ isActive }) => (
              <Button
                size="responsive"
                variant={isActive ? 'default' : 'outline'}
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
            {({ isActive }) => (
              <Button
                size="responsive"
                variant={isActive ? 'default' : 'outline'}
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
            {({ isActive }) => (
              <Button
                size="responsive"
                variant={isActive ? 'default' : 'outline'}
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
