import { Button } from '@/components/base/ui/button'
import { Link, useSearch } from '@tanstack/react-router'

const SeasonTablesButtonListSkeleton = () => {
  const women = useSearch({
    from: '/_layout',
    select: (s) => s.women,
  })
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

export default SeasonTablesButtonListSkeleton
