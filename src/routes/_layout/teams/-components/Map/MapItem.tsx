import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/ui/map'
import { MapTeam } from '@/lib/types/team'
import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'

type MapItemProps = {
  team: MapTeam
  latitude: number
  longitude: number
}

function MapItem({ team, latitude, longitude }: MapItemProps) {
  return (
    <MapMarker latitude={latitude} longitude={longitude}>
      <MarkerContent>
        <div className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg" />
      </MarkerContent>
      <MarkerTooltip>{team.name}</MarkerTooltip>
      <MarkerPopup className="w-100">
        <Card className="w-full">
          <CardHeader className="text-lg font-bold">{team.name}</CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-foreground text-base font-medium">
                {team.city}
              </p>
              <p className="text-foreground text-base font-medium">
                {team.municipality ? `Kommun: ${team.municipality.name}` : null}
              </p>
              <p className="text-foreground text-base font-medium">
                Län: {team.county.name}
              </p>
            </div>

            <Link
              from="/teams/map"
              to="/teams/$teamId"
              params={{ teamId: team.teamId }}
              search={(prev) => ({ women: prev.women })}
              className="flex flex-row items-center justify-start gap-2"
            >
              <span>
                <ExternalLinkIcon className="size-4" />
              </span>
              <span>Lagsidan</span>
            </Link>
          </CardContent>
        </Card>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
