import { Card } from '@/components/base/ui/card'
import { Map, MapControls } from '@/components/base/ui/map'
import { getRouteApi } from '@tanstack/react-router'
import MapItem from './MapItem'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/map',
)

const PlayoffMap = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div>
      <Card className="h-100 w-screen max-w-70 xxs:max-w-80 xs:max-w-100 msm:max-w-120 p-2 sm:h-160 sm:max-w-xl xl:max-w-4xl">
        <Map
          center={[15, 62]}
          zoom={4}
          fadeDuration={0}
        >
          {data.teams.map((team) => {
            return (
              <MapItem
                key={team.team.teamId}
                latitude={team.team.lat}
                longitude={team.team.long}
                team={team}
              />
            )
          })}
          <MapControls />
        </Map>
      </Card>
    </div>
  )
}

export default PlayoffMap
