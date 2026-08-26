import TeamLogo from '@/components/Common/TeamLogo'
import type { CheckedState } from '@/components/base/ui/checkbox'
import { Checkbox } from '@/components/base/ui/checkbox'
import { cn } from '@/lib/utils/utils'
import { Link } from '@tanstack/react-router'

type Team = {
  teamId: number
  casualName: string
  name: string
}

type TeamsListItemProps = {
  team: Team
  selectedTeams: Array<number> | undefined
  onCheckedChange: (
    checked: CheckedState,
    teamId: number,
  ) => void
}

const TeamsListItem = ({
  team,
  selectedTeams,
  onCheckedChange,
}: TeamsListItemProps) => {
  return (
    <div
      data-state={
        selectedTeams?.includes(team.teamId)
          ? 'checked'
          : 'unchecked'
      }
      className="bg-muted data-[state=checked]:shadow-accent dark:bg-muted/50 data-[state=checked]:outline-primary/30 data-[state=checked]:bg-primary/10 dark:data-[state=checked]:outline-primary/20 dark:data-[state=checked]:bg-primary/10 flex flex-row items-center justify-between space-y-0 space-x-3 p-2 text-xs sm:text-sm data-[state=checked]:shadow-sm data-[state=checked]:outline"
    >
      <div className="flex flex-row items-center gap-2">
        <TeamLogo
          className="size-[1lh] object-scale-down"
          size={32}
          alt={team.casualName}
          title={team.name}
          teamId={team.teamId}
        />
        <span
          className={cn(
            'w-32 xs:w-44 xl:w-60 data-[state=checked]:underline truncate',
          )}
        >
          <Link
            from="/teams"
            to="/teams/$teamId/tables"
            params={{ teamId: team.teamId }}
            search={(prev) => ({ ...prev })}
          >
            {team.name}
          </Link>
        </span>
      </div>
      <Checkbox
        name="teamArray"
        checked={
          selectedTeams?.includes(team.teamId)
            ? true
            : false
        }
        onCheckedChange={(checked) =>
          team.teamId &&
          onCheckedChange(checked, team.teamId)
        }
        className="ring-accent-foreground ring dark:ring-0"
      />
    </div>
  )
}

export default TeamsListItem
