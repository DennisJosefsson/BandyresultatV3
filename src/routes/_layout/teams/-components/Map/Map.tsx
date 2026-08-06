import { Card } from '@/components/base/ui/card'
import type { CheckedState } from '@/components/base/ui/checkbox'
import type { MapRef } from '@/components/base/ui/map'
import {
  Map as MapCn,
  MapControls,
} from '@/components/base/ui/map'
import { calcBoundsFromCoordinates } from '@/routes/_layout/teams/$teamId/-functions/calcLongLatBounds'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import CountyList from './CountyList'
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
            if (prev.teamArray.length === 1)
              return {
                ...prev,
                error: undefined,
                teamArray: undefined,
              }
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
    <div className="flex min-h-screen flex-col xl:flex-row gap-6 p-1">
      <div>
        <Card className="mx-auto h-[80vh] xl:h-[85vh] p-2 sm:w-125 xl:w-150 ">
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
      <div className="mx-auto w-full sm:w-125 xl:mx-2">
        <CountyList
          countyArray={countyArray}
          setCounties={setCounties}
          counties={counties}
          mapRef={mapRef}
        />
      </div>
    </div>
  )
}

export default Map
