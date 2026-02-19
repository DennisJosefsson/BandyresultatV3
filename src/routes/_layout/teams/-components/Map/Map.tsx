import { Card } from '@/components/ui/card'
import { Map as MapCn, MapControls, MapRef } from '@/components/ui/map'

import { calcBoundsFromCoordinates } from '@/routes/_layout/teams/$teamId/-functions/calcLongLatBounds'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import CountyListContainer from './CountyListContainer'
import MapItem from './MapItem'

type County = {
  county: string
}

const route = getRouteApi('/_layout/teams/map')

const Map = () => {
  const mapRef = useRef<MapRef>(null)
  const [counties, setCounties] = useState<County[]>([])

  const teams = route.useLoaderData()

  const countyArray = teams.map((team) => {
    const bounds = calcBoundsFromCoordinates(
      team.teams.map((team) => [team.long, team.lat]),
    )
    return {
      county: team.county,
      center: bounds.getCenter(),
    }
  })

  useEffect(() => {
    setCounties(
      teams.map((team) => {
        return { county: team.county }
      }),
    )
  }, [teams])

  return (
    <div>
      <div>
        <div className="font-inter text-foreground mx-auto mb-2 flex min-h-screen flex-col gap-2 px-1 md:flex-row-reverse md:justify-end md:gap-8 lg:px-0">
          <div className="md:p-2">
            <CountyListContainer
              countyArray={countyArray}
              setCounties={setCounties}
              counties={counties}
              mapRef={mapRef}
            />
          </div>

          <div>
            <Card className="xs:max-w-[360px] h-[400px] w-screen max-w-[280px] p-2 sm:h-160 sm:max-w-xl xl:max-w-4xl">
              <MapCn ref={mapRef} center={[15, 62]} zoom={4} fadeDuration={0}>
                {teams
                  .filter((team) =>
                    counties
                      .map((county) => county.county)
                      .includes(team.county),
                  )
                  .map((county) => {
                    return (
                      <div key={county.county}>
                        {county.teams.map((team) => {
                          return (
                            <MapItem
                              latitude={team.lat}
                              longitude={team.long}
                              team={team}
                              key={team.teamId.toString()}
                            />
                          )
                        })}
                      </div>
                    )
                  })}

                <MapControls />
              </MapCn>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
