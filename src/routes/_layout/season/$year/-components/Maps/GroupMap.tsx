import { Card } from '@/components/ui/card'
import { Map, MapControls } from '@/components/ui/map'
import { getRouteApi } from '@tanstack/react-router'
import MapItem from './MapItem'

const route = getRouteApi('/_layout/season/$year/$group/map')

const GroupMap = () => {
  const data = route.useLoaderData()

  return (
    <div>
      <Card className="xs:max-w-[360px] h-[400px] w-screen max-w-[280px] p-2 sm:h-160 sm:max-w-xl xl:max-w-4xl">
        <Map center={[15, 62]} zoom={4} fadeDuration={0}>
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
