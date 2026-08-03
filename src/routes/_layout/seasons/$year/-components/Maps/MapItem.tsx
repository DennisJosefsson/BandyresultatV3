import TeamLogo from '@/components/Common/TeamLogo'
import { Button } from '@/components/base/ui/button'
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/base/ui/map'
import type { County } from '@/lib/types/county'
import type { Municipality } from '@/lib/types/municipality'
import type { Team } from '@/lib/types/team'
import { Link } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'

type MapItemProps = {
  team: {
    team: Team
    county: County
    municipality: Municipality
  }
  latitude: number
  longitude: number
}

function MapItem({
  team,
  latitude,
  longitude,
}: MapItemProps) {
  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      anchor="center"
    >
      <MarkerContent>
        <div className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg" />
      </MarkerContent>
      <MarkerTooltip>{team.team.name}</MarkerTooltip>
      <MarkerPopup className="data-[state=checked]:bg-primary/10 border w-40 xs:w-62 p-0">
        <div className="relative h-20 xs:h-32 overflow-hidden">
          <TeamLogo
            teamId={team.team.teamId}
            size={256}
            alt={team.team.name}
            className="object-cover -translate-y-5 xs:-translate-y-3.5"
          />
        </div>
        <div className="space-y-2 p-3">
          <div>
            <h3 className="text-foreground pb-0.5 text-[8px] xs:text-xs tracking-wide uppercase  font-semibold">
              {team.team.name}
            </h3>
            <h4 className="text-[8px] xs:text-xs text-muted-foreground leading-tight font-medium">
              {`${team.team.city}, ${team.county.name}`}
            </h4>
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <Button
              className="w-full"
              render={
                <Link
                  from="/teams/map"
                  to="/teams/$teamId/tables"
                  params={{ teamId: team.team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  <ExternalLink />
                </Link>
              }
              nativeButton={false}
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
