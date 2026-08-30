import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import Metadata from './Metadata'
import PlayoffSeason from './PlayoffSeason'
import Series from './Series'
import TeamSeason from './TeamSeason'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/',
)

const Season = () => {
  const season = route.useLoaderData({
    select: (data) => data.season,
  })
  const nextCurrentSeason = route.useLoaderData({
    select: (data) => data.nextCurrentSeason,
  })
  const prevCurrentSeason = route.useLoaderData({
    select: (data) => data.prevCurrentSeason,
  })
  const currentOtherGenderSeason = route.useLoaderData({
    select: (data) => data.currentOtherGenderSeason,
  })
  if (!season) return null
  return (
    <div className="mt-4">
      <div className="mb-2 flex flex-row w-full items-center">
        <div className="w-80">
          <h2 className="text-lg font-semibold">{`${season.year} - ${season.women ? 'Damer' : 'Herrar'}`}</h2>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div>
            {prevCurrentSeason ? (
              <Button
                render={
                  <route.Link
                    to="."
                    params={{
                      seasonId: prevCurrentSeason.seasonId,
                    }}
                    search={{
                      women: Boolean(
                        prevCurrentSeason.women,
                      ),
                    }}
                  >
                    Föregående säsong
                  </route.Link>
                }
                nativeButton={false}
              />
            ) : (
              <span>Ingen föregående säsong.</span>
            )}
          </div>
          <div>
            {currentOtherGenderSeason ? (
              <Button
                render={
                  <route.Link
                    to="."
                    params={{
                      seasonId:
                        currentOtherGenderSeason.seasonId,
                    }}
                    search={{
                      women: Boolean(
                        currentOtherGenderSeason.women,
                      ),
                    }}
                  >
                    {currentOtherGenderSeason.women
                      ? `Damer ${currentOtherGenderSeason.year}`
                      : `Herrar ${currentOtherGenderSeason.year}`}
                  </route.Link>
                }
                nativeButton={false}
              />
            ) : (
              <span>
                Motsvarande säsong för damer saknas.
              </span>
            )}
          </div>
          <div>
            {nextCurrentSeason ? (
              <Button
                render={
                  <route.Link
                    to="."
                    params={{
                      seasonId: nextCurrentSeason.seasonId,
                    }}
                    search={{
                      women: Boolean(
                        nextCurrentSeason.women,
                      ),
                    }}
                  >
                    Nästa säsong
                  </route.Link>
                }
                nativeButton={false}
              />
            ) : (
              <span>Ingen kommande säsong.</span>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <TeamSeason />
        <Series />
        <div className="flex flex-col gap-2">
          <Metadata />
          <PlayoffSeason />
        </div>
      </div>
    </div>
  )
}

export default Season
