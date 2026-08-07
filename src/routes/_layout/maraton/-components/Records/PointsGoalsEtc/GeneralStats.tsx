import { getRouteApi } from '@tanstack/react-router'
import { H1, H2, H3 } from '../Headers'
import RenderGeneralStatsCard from './RenderGeneralStatsCard'

const route = getRouteApi('/_layout/maraton/records/stats')

const GeneralStats = () => {
  const stats = route.useLoaderData({
    select: (s) => s.generalStats,
  })
  const women = route.useSearch({ select: (s) => s.women })

  if (!women) {
    return (
      <div className="flex w-full flex-col @5xl:w-4/5 @7xl:w-2/3">
        <H1>Statistik</H1>
        <div>
          <H2>Säsonger</H2>
          <div className="mb-4 grid grid-cols-1 gap-2 @lg:grid-cols-2 @3xl:gap-4 @5xl:gap-6">
            <div>
              <H3>Säsonger sedan 1931</H3>
              <div>
                <RenderGeneralStatsCard
                  stat="1931seasons"
                  array={stats.seasons}
                />
              </div>
            </div>

            <div>
              <H3>{women ? null : 'Säsonger totalt'}</H3>
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
          <H2>Slutspel</H2>
          <div className="mb-4 grid grid-cols-1 gap-2 @lg:grid-cols-2 @3xl:gap-4 @5xl:gap-6">
            <div>
              <H3>Slutspel sedan 1931</H3>
              <div>
                <RenderGeneralStatsCard
                  stat="1931playoffs"
                  array={stats.playoffs}
                />
              </div>
            </div>

            <div>
              <H3>{women ? null : 'Slutspel totalt'}</H3>
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
            <H2>SM-Finaler</H2>
            <div className="grid grid-cols-1 gap-2 @lg:grid-cols-2 @3xl:gap-4 @5xl:gap-6">
              <div>
                <H3>Guld</H3>
                <div>
                  <RenderGeneralStatsCard
                    stat="golds"
                    array={stats.golds}
                  />
                </div>
              </div>
              <div>
                <H3>Spelade</H3>
                <div>
                  <RenderGeneralStatsCard
                    stat="finals"
                    array={stats.finals}
                  />
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
      <div className="grid grid-cols-1 gap-2 @lg:grid-cols-2">
        <div>
          <H3>Säsonger</H3>

          <div>
            <RenderGeneralStatsCard
              stat="allSeasons"
              array={stats.allSeasons}
            />
          </div>
        </div>

        <div>
          <H3>Slutspel</H3>

          <div>
            <RenderGeneralStatsCard
              stat="allPlayoffs"
              array={stats.allPlayoffs}
            />
          </div>
        </div>
        <div>
          <H3>SM-Guld</H3>
          <div>
            <RenderGeneralStatsCard
              stat="golds"
              array={stats.golds}
            />
          </div>
        </div>
        <div>
          <H3>Spelade</H3>
          <div>
            <RenderGeneralStatsCard
              stat="finals"
              array={stats.finals}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralStats
