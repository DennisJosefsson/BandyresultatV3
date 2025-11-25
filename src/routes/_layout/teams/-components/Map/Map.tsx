import { CheckedState } from '@/components/ui/checkbox'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { LatLngBounds, LatLngTuple, Map as MapType } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'
import { getMapTeams } from '../../-functions/getMapTeams'
import CountyListContainer from './CountyListContainer'
import MapItem from './MapItem'

type County = {
  county: string
}

const Map = () => {
  const [map, setMap] = useState<MapType | null>(null)
  const { women, teamArray } = useSearch({ from: '/_layout/teams' })
  const [counties, setCounties] = useState<County[]>([])
  const [selectedTeams, setSelectedTeams] = useState<number[]>(teamArray ?? [])
  const { data: teams } = useSuspenseQuery({
    queryKey: ['mapTeams'],
    queryFn: () => getMapTeams({ data: women }),
  })

  const navigate = useNavigate({ from: '/teams' })

  const countyArray = teams.map((team) => {
    const bounds = new LatLngBounds(
      team.teams.map((team) => [team.lat, team.long] as LatLngTuple),
    )
    return {
      county: team.county,
      center: bounds.pad(1).getCenter(),
    }
  })

  useEffect(() => {
    setCounties(
      teams.map((team) => {
        return { county: team.county }
      }),
    )
  }, [teams])

  const onCheckedChange = (checked: CheckedState, teamId: number) => {
    if (checked) {
      setSelectedTeams((prev) => [...prev, teamId])
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teamArray) {
            return { ...prev, teamArray: [...prev.teamArray, teamId] }
          } else {
            return { ...prev, teamArray: [teamId] }
          }
        },
      })
    } else {
      setSelectedTeams((prev) => prev.filter((team) => team !== teamId))
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teamArray && prev.teamArray.includes(teamId)) {
            return {
              ...prev,
              teamArray: [...prev.teamArray.filter((team) => team !== teamId)],
            }
          } else {
            return { ...prev, teamArray: [] }
          }
        },
      })
    }
  }

  return (
    <div>
      <div>
        <div className="flex flex-col min-h-screen gap-2 px-1 mx-auto mb-2 font-inter text-foreground lg:px-0 md:flex-row-reverse md:justify-end md:gap-8">
          <div className="md:p-2">
            <CountyListContainer
              countyArray={countyArray}
              setCounties={setCounties}
              counties={counties}
              map={map}
            />
          </div>
          <div
            id="map"
            className="h-[400px] w-screen max-w-[280px] p-2 xs:max-w-[360px] sm:max-w-xl xl:max-w-4xl"
          >
            <MapContainer
              center={[62, 15]}
              zoom={4}
              scrollWheelZoom={true}
              className="h-[400px] sm:h-[600px]"
              key={women ? 'women' : 'men'}
              ref={setMap}
              zoomSnap={0.5}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {teams
                .filter((team) =>
                  counties.map((county) => county.county).includes(team.county),
                )
                .map((team) => {
                  return (
                    <MarkerClusterGroup chunkedLoading key={team.county}>
                      {team.teams.map((team) => {
                        const position = [team.lat, team.long] as [
                          number,
                          number,
                        ]
                        return (
                          <MapItem
                            key={team.teamId}
                            team={team}
                            position={position}
                            selectedTeams={selectedTeams}
                            onCheckedChange={onCheckedChange}
                          />
                        )
                      })}
                    </MarkerClusterGroup>
                  )
                })}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
