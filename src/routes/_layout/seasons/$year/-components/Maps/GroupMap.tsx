import { Card } from '@/components/base/ui/card'
import { Map, MapControls } from '@/components/base/ui/map'
import type { County } from '@/lib/types/county'
import type { Municipality } from '@/lib/types/municipality'
import type { Team } from '@/lib/types/team'
import MapItem from './MapItem'

type GroupMapProps = {
  teams: Array<{
    team: Team
    county: County
    municipality: Municipality
  }>
}

const GroupMap = ({ teams }: GroupMapProps) => {
  return (
    <div>
      <Card className="@container/map mx-auto h-[70vh] p-2 sm:w-125 xl:w-150">
        <Map
          center={[15, 62]}
          zoom={4}
          fadeDuration={0}
        >
          {teams.map((team) => {
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
