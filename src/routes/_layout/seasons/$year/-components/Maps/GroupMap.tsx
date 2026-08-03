import { Card } from '@/components/base/ui/card'
import { Map, MapControls } from '@/components/base/ui/map'
import { getRouteApi } from '@tanstack/react-router'
import MapItem from './MapItem'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/map',
)

const GroupMap = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div>
      <Card className="mx-auto h-[80vh] p-2 sm:w-125 xl:w-150">
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

export default GroupMap
