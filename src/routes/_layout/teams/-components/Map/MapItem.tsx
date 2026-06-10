import { ExternalLinkIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { MapTeam } from '@/lib/types/team'
import type { CheckedState } from '@/components/base/ui/checkbox'
import { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from '@/components/base/ui/map'
import { Label } from '@/components/base/ui/label'
import { Checkbox } from '@/components/base/ui/checkbox'

type MapItemProps = {
  team: MapTeam
  latitude: number
  longitude: number
  selectedTeams: Array<number>
  onCheckedChange: (checked: CheckedState, teamId: number) => void
}

function MapItem({ team, latitude, longitude, selectedTeams, onCheckedChange }: MapItemProps) {
  return (
    <MapMarker latitude={latitude} longitude={longitude}>
      <MarkerContent>
        <div
          data-state={selectedTeams.includes(team.teamId) ? 'checked' : 'unchecked'}
          className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg data-[state=checked]:animate-bounce data-[state=checked]:border-black data-[state=checked]:bg-black dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white"
        />
      </MarkerContent>
      <MarkerTooltip>{team.name}</MarkerTooltip>
      <MarkerPopup
        className="data-[state=checked]:bg-primary/10 w-50 sm:w-85 md:w-100"
        data-state={selectedTeams.includes(team.teamId) ? 'checked' : 'unchecked'}
      >
        <div className="flex w-full flex-col gap-2 sm:gap-4">
          <div className="xs:flex-row xs:justify-between xsitems-center flex flex-col">
            <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg">
              {team.name}
            </span>
            <span className="text-[8px] sm:text-sm md:text-base lg:text-lg">{team.city}</span>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="text-foreground text-[8px] font-medium sm:text-sm md:text-base lg:text-lg">
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
          <div className="flex flex-row items-center justify-between">
            <Label
              htmlFor={`id-${team.teamId}`}
              className="text-foreground text-[8px] font-medium sm:text-sm md:text-base lg:text-lg"
            >
              Välj lag
            </Label>
            <Checkbox
              name="teamArray"
              id={`id-${team.teamId}`}
              checked={selectedTeams.includes(team.teamId)}
              onCheckedChange={(checked) => team.teamId && onCheckedChange(checked, team.teamId)}
              className="ring-accent-foreground ring dark:ring-0"
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
