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
import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'

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
          className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg data-[state=checked]:animate-bounce data-[state=checked]:border-black data-[state=checked]:bg-black dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white"
        />
      </MarkerContent>
      <MarkerTooltip>{team.name}</MarkerTooltip>
      <MarkerPopup
        className="data-[state=checked]:bg-primary/10 w-40 sm:w-85 md:w-100 lg:w-120"
        data-state={
          selectedTeams.includes(team.teamId)
            ? 'checked'
            : 'unchecked'
        }
      >
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg">
                {team.name}
              </span>
              <span className="text-[8px] sm:text-sm">
                {team.city}, {team.county.name}
              </span>
            </div>
            <div>
              <img
                className="object-scale-down w-4 xs:w-6"
                src={`/logos/teams/128/${team.teamId}_128x128.png`}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <Label
                htmlFor={`id-${team.teamId}`}
                className="text-foreground text-[8px] font-medium sm:text-sm md:text-base lg:text-lg"
              >
                Välj lag
              </Label>
              <Checkbox
                name="teamArray"
                id={`id-${team.teamId}`}
                checked={selectedTeams.includes(
                  team.teamId,
                )}
                onCheckedChange={(checked) =>
                  team.teamId &&
                  onCheckedChange(checked, team.teamId)
                }
                className="ring-accent-foreground ring dark:ring-0"
              />
            </div>
            <Link
              from="/teams/map"
              to="/teams/$teamId"
              params={{ teamId: team.teamId }}
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
                  {team.name}
                </span>
                <Link
                  from="/teams/map"
                  to="/teams/$teamId"
                  params={{ teamId: team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  <span>
                    <ExternalLinkIcon className="size-2 xs:size-2.5 sm:size-3 md:size-4" />
                  </span>
                </Link>
              </div>
              <span className="text-[8px] sm:text-sm truncate">
                {team.city}, {team.county.name}
              </span>
            </div>

            <div className="flex flex-row items-center">
              <Label
                htmlFor={`id-${team.teamId}`}
                className="text-foreground text-[8px] font-medium sm:text-sm md:text-base lg:text-lg w-54 md:w-64"
              >
                Välj lag
              </Label>
              <Checkbox
                name="teamArray"
                id={`id-${team.teamId}`}
                checked={selectedTeams.includes(
                  team.teamId,
                )}
                onCheckedChange={(checked) =>
                  team.teamId &&
                  onCheckedChange(checked, team.teamId)
                }
                className="ring-accent-foreground ring dark:ring-0"
              />
            </div>
          </div>
          <div className="hidden xs:inline">
            <img
              className="object-scale-down w-4 xs:w-12 sm:w-24 lg:w-32"
              src={`/logos/teams/128/${team.teamId}_128x128.png`}
            />
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
