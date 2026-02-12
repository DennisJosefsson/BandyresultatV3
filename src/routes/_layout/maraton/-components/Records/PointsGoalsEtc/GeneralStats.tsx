import { getRouteApi } from '@tanstack/react-router'
import RenderGeneralStatsCard from './RenderGeneralStatsCard'

const route = getRouteApi('/_layout/maraton/records/stats')

const GeneralStats = () => {
  const stats = route.useLoaderData({ select: (s) => s.generalStats })
  const women = route.useSearch({ select: (s) => s.women })

  if (!women) {
    return (
      <div className="flex flex-col">
        <div>
          <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Säsonger
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
            <div>
              <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                Säsonger sedan 1931
              </h3>
              <div>
                <RenderGeneralStatsCard
                  stat="1931seasons"
                  array={stats.seasons}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                {women ? null : 'Säsonger totalt'}
              </h3>
              <div>
                <RenderGeneralStatsCard
                  stat="allSeasons"
                  array={stats.allSeasons}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Slutspel
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
            <div>
              <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                Slutspel sedan 1931
              </h3>
              <div>
                <RenderGeneralStatsCard
                  stat="1931playoffs"
                  array={stats.playoffs}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                {women ? null : 'Slutspel totalt'}
              </h3>
              <div>
                <RenderGeneralStatsCard
                  stat="allPlayoffs"
                  array={stats.allPlayoffs}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
              SM-Finaler
            </h2>
            <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
              <div>
                <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                  Guld
                </h3>
                <div>
                  <RenderGeneralStatsCard stat="golds" array={stats.golds} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
                  Spelade
                </h3>
                <div>
                  <RenderGeneralStatsCard stat="finals" array={stats.finals} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Säsonger
          </h3>

          <div>
            <RenderGeneralStatsCard
              stat="allSeasons"
              array={stats.allSeasons}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Slutspel
          </h3>

          <div>
            <RenderGeneralStatsCard
              stat="allPlayoffs"
              array={stats.allPlayoffs}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            SM-Guld
          </h3>
          <div>
            <RenderGeneralStatsCard stat="golds" array={stats.golds} />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
            Spelade
          </h3>
          <div>
            <RenderGeneralStatsCard stat="finals" array={stats.finals} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralStats
