import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/base/ui/map'
import TeamLogo from '@/components/Common/TeamLogo'
import type { County } from '@/lib/types/county'
import type { Municipality } from '@/lib/types/municipality'
import type { Team } from '@/lib/types/team'
import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'

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
      <MarkerPopup className="w-35 sm:w-85 md:w-100">
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg">
                {team.team.name}
              </span>
              <span className="text-[8px] sm:text-sm">
                {team.team.city}, {team.county.name}
              </span>
            </div>
            <div>
              <TeamLogo
                size={128}
                teamId={team.team.teamId}
                className="object-scale-down w-4 xs:w-6"
                alt={team.team.casualName}
                title={team.team.name}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <Link
              from="/teams/map"
              to="/teams/$teamId"
              params={{ teamId: team.team.teamId }}
              search={(prev) => ({ women: prev.women })}
              className="mr-1.5"
            >
              <span>
                <ExternalLinkIcon className="size-2 xs:size-2.5 sm:size-3 md:size-4" />
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden sm:flex flex-row items-center justify-between gap-8">
          <div className="flex w-full flex-col gap-2 sm:gap-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg w-54 md:w-64 truncate">
                  {team.team.name}
                </span>
                <Link
                  from="/teams/map"
                  to="/teams/$teamId"
                  params={{ teamId: team.team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  <span>
                    <ExternalLinkIcon className="size-2 xs:size-2.5 sm:size-3 md:size-4" />
                  </span>
                </Link>
              </div>
              <span className="text-[8px] sm:text-sm truncate">
                {team.team.city}, {team.county.name}
              </span>
            </div>
          </div>
          <div className="hidden xs:inline">
            <TeamLogo
              size={128}
              teamId={team.team.teamId}
              className="object-scale-down w-4 xs:w-12 sm:w-24 lg:w-32"
              alt={team.team.casualName}
              title={team.team.name}
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
