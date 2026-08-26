import { Button } from '@/components/base/ui/button'
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
import { ExternalLink } from 'lucide-react'

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
        className="data-[state=checked]:bg-primary/10 border w-40 xs:w-62 p-0"
        data-state={
          selectedTeams.includes(team.teamId)
            ? 'checked'
            : 'unchecked'
        }
      >
        <div className="relative h-20 xs:h-32 overflow-hidden">
          <TeamLogo
            teamId={team.teamId}
            size={256}
            aria-label={team.name}
            title={team.name}
            className="object-cover -translate-y-5 xs:-translate-y-3.5"
          />
        </div>
        <div className="space-y-2 p-3">
          <div>
            <h3 className="text-foreground pb-0.5 text-[8px] xs:text-xs tracking-wide uppercase  font-semibold">
              {team.name}
            </h3>
            <h4 className="text-[8px] xs:text-xs text-muted-foreground leading-tight font-medium">
              {`${team.city}, ${team.county.name}`}
            </h4>
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <CheckboxBadge
              name="teamArray"
              id={`id-${team.teamId}`}
              checked={selectedTeams.includes(team.teamId)}
              onCheckedChange={(checked) =>
                team.teamId &&
                onCheckedChange(checked, team.teamId)
              }
              orientation="horizontal"
              className="size-5"
            />
            <Button
              className="w-full"
              render={
                <Link
                  from="/teams/map"
                  to="/teams/$teamId/tables"
                  params={{ teamId: team.teamId }}
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
