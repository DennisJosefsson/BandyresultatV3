import type { CheckedState } from '@/components/base/ui/checkbox'
import { Checkbox } from '@/components/base/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from '@/components/base/ui/field'
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/base/ui/map'
import TeamLogo from '@/components/Common/TeamLogo'
import type { MapTeam } from '@/lib/types/team'
import type { CheckboxRootProps } from '@base-ui/react'

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

interface CheckboxBadgeProps extends CheckboxRootProps {
  orientation?:
    | 'vertical'
    | 'horizontal'
    | 'responsive'
    | null
    | undefined
}

function CheckboxBadge({
  id,
  checked,
  onCheckedChange,
  orientation,
  ...props
}: CheckboxBadgeProps) {
  return (
    <FieldLabel
      htmlFor={id}
      key={id}
    >
      <Field orientation={orientation}>
        <FieldContent>
          <FieldTitle className="text-[8px] font-bold sm:text-sm">
            Välj lag
          </FieldTitle>
        </FieldContent>
        <Checkbox
          name="teamArray"
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
        />
      </Field>
    </FieldLabel>
  )
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
        className="data-[state=checked]:bg-primary/10 w-fit sm:w-85 md:w-100 lg:w-120 border shadow-md"
        data-state={
          selectedTeams.includes(team.teamId)
            ? 'checked'
            : 'unchecked'
        }
      >
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <Link
                  from="/teams/map"
                  to="/teams/$teamId/tables"
                  params={{ teamId: team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                  className="mr-1.5"
                >
                  <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg">
                    {team.name}
                  </span>
                </Link>

                <ExternalLinkIcon className="size-2 xs:size-2.5 sm:size-3 md:size-4" />
              </div>
              <span className="text-[8px] sm:text-sm">
                {team.city}, {team.county.name}
              </span>
            </div>
            <div>
              <TeamLogo
                size={128}
                teamId={team.teamId}
                className="object-scale-down w-4 xs:w-6"
                alt={team.casualName}
                title={team.name}
              />
            </div>
          </div>

          <div className="w-full">
            <CheckboxBadge
              name="teamArray"
              id={`id-${team.teamId}`}
              checked={selectedTeams.includes(team.teamId)}
              onCheckedChange={(checked) =>
                team.teamId &&
                onCheckedChange(checked, team.teamId)
              }
              orientation="horizontal"
            />
          </div>
        </div>
        <div className="hidden sm:flex flex-row items-center justify-between gap-8">
          <div className="hidden xs:inline">
            <TeamLogo
              size={128}
              teamId={team.teamId}
              className="object-scale-down w-4 xs:w-12 sm:w-24 lg:w-32"
              alt={team.casualName}
              title={team.name}
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:gap-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <Link
                  from="/teams/map"
                  to="/teams/$teamId/tables"
                  params={{ teamId: team.teamId }}
                  search={(prev) => ({ women: prev.women })}
                  className="peer"
                >
                  <span className="text-[8px] font-bold sm:text-sm md:text-base lg:text-lg w-54 md:w-64 truncate">
                    {team.name}
                  </span>
                </Link>

                <ExternalLinkIcon className="invisible peer-hover:visible size-2 xs:size-2.5 sm:size-3 md:size-4 mr-2" />
              </div>
              <span className="text-[8px] sm:text-sm truncate">
                {team.city}, {team.county.name}
              </span>
            </div>

            <div className="flex flex-row items-center">
              <CheckboxBadge
                name="teamArray"
                id={`id-${team.teamId}`}
                checked={selectedTeams.includes(
                  team.teamId,
                )}
                onCheckedChange={(checked) =>
                  team.teamId &&
                  onCheckedChange(checked, team.teamId)
                }
                orientation="horizontal"
              />
            </div>
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  )
}

export default MapItem
