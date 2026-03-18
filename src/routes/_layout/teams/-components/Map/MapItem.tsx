import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'

import type { CheckedState } from '@/components/base/ui/checkbox'
import { Checkbox } from '@/components/base/ui/checkbox'
import { Label } from '@/components/base/ui/label'
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/base/ui/map'
import type { MapTeam } from '@/lib/types/team'

type MapItemProps = {
  team: MapTeam
  latitude: number
  longitude: number
  selectedTeams: Array<number>
  onCheckedChange: (
    checked: CheckedState,
    teamId: number,
  ) => void
}

function MapItem({
  team,
  latitude,
  longitude,
  selectedTeams,
  onCheckedChange,
}: MapItemProps) {
  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
    >
      <MarkerContent>
        <div
          data-state={
            selectedTeams.includes(team.teamId)
              ? 'checked'
              : 'unchecked'
          }
          className="size-4 rounded-full border-2 border-orange-500 data-[state=checked]:animate-bounce dark:data-[state=checked]:border-white data-[state=checked]:border-black dark:data-[state=checked]:bg-white data-[state=checked]:bg-black bg-orange-500 opacity-75 shadow-lg"
        />
      </MarkerContent>
      <MarkerTooltip>{team.name}</MarkerTooltip>
      <MarkerPopup
        className="w-50 sm:w-85 md:w-100 data-[state=checked]:bg-primary/10"
        data-state={
          selectedTeams.includes(team.teamId)
            ? 'checked'
            : 'unchecked'
        }
      >
        <div className="w-full flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col xs:flex-row xs:justify-between xsitems-center">
            <span className="text-[8px] sm:text-sm md:text-base lg:text-lg font-bold">
              {team.name}
            </span>
            <span className="text-[8px] sm:text-sm md:text-base lg:text-lg">
              {team.city}
            </span>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="text-foreground text-[8px] sm:text-sm md:text-base lg:text-lg font-medium">
              {team.county.name}
            </span>

            <Link
              from="/teams/map"
              to="/teams/$teamId"
              params={{ teamId: team.teamId }}
              search={(prev) => ({ women: prev.women })}
            >
              <span>
                <ExternalLinkIcon className="size-4" />
              </span>
            </Link>
          </div>
          <div className="flex flex-row justify-between items-center ">
            <Label
              htmlFor={`id-${team.teamId}`}
              className="text-foreground text-[8px] sm:text-sm md:text-base lg:text-lg font-medium"
            >
              Välj lag
            </Label>
            <Checkbox
              name="teamArray"
              id={`id-${team.teamId}`}
              checked={selectedTeams.includes(team.teamId)}
              onCheckedChange={(checked) =>
                team.teamId &&
                onCheckedChange(checked, team.teamId)
              }
              className="ring ring-accent-foreground dark:ring-0"
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
