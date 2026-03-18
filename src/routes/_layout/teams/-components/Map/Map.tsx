import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { Card } from '@/components/base/ui/card'
import type { MapRef } from '@/components/base/ui/map'
import {
  Map as MapCn,
  MapControls,
} from '@/components/base/ui/map'
import { calcBoundsFromCoordinates } from '@/routes/_layout/teams/$teamId/-functions/calcLongLatBounds'

import type { CheckedState } from '@/components/base/ui/checkbox'
import CountyListContainer from './CountyListContainer'
import MapItem from './MapItem'

type County = {
  county: string
}

const route = getRouteApi('/_layout/teams/map')

const Map = () => {
  const mapRef = useRef<MapRef>(null)
  const [counties, setCounties] = useState<Array<County>>(
    [],
  )
  const { teamArray } = route.useSearch()
  const [selectedTeams, setSelectedTeams] = useState<
    Array<number>
  >(teamArray ?? [])

  const teams = route.useLoaderData()

  const navigate = route.useNavigate()

  const countyArray = teams.map((team) => {
    const bounds = calcBoundsFromCoordinates(
      team.teams.map((t) => [t.long, t.lat]),
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

  const onCheckedChange = (
    checked: CheckedState,
    teamId: number,
  ) => {
    if (checked) {
      setSelectedTeams((prev) => [...prev, teamId])
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teamArray) {
            return {
              ...prev,
              teamArray: [...prev.teamArray, teamId],
            }
          } else {
            return { ...prev, teamArray: [teamId] }
          }
        },
      })
    } else {
      setSelectedTeams((prev) =>
        prev.filter((team) => team !== teamId),
      )
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (
            prev.teamArray &&
            prev.teamArray.includes(teamId)
          ) {
            return {
              ...prev,
              teamArray: [
                ...prev.teamArray.filter(
                  (team) => team !== teamId,
                ),
              ],
            }
          } else {
            return { ...prev, teamArray: [] }
          }
        },
      })
    }
  }

  return (
    <div className="font-inter text-foreground mx-auto my-6 flex min-h-screen flex-col gap-2 px-1 xl:flex-row-reverse xl:justify-end xl:gap-8 xl:px-0">
      <div className="md:p-2">
        <CountyListContainer
          countyArray={countyArray}
          setCounties={setCounties}
          counties={counties}
          mapRef={mapRef}
        />
      </div>

      <div>
        <Card className="xs:max-w-[360px] h-[400px] w-screen max-w-[280px] p-2 sm:h-160 sm:max-w-xl 2xl:max-w-4xl">
          <MapCn
            ref={mapRef}
            center={[15, 62]}
            zoom={4}
            fadeDuration={0}
          >
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
                          selectedTeams={selectedTeams}
                          onCheckedChange={onCheckedChange}
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
  )
}

export default Map
