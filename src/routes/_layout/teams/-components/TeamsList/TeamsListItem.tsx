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
  selectedTeams: Array<number>
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
        selectedTeams.includes(team.teamId)
          ? 'checked'
          : 'unchecked'
      }
      className="bg-muted data-[state=checked]:shadow-accent dark:bg-muted/50 data-[state=checked]:outline-primary/30 data-[state=checked]:bg-primary/10 dark:data-[state=checked]:outline-primary/20 dark:data-[state=checked]:bg-primary/10 flex flex-row items-center justify-between space-y-0 space-x-3 rounded p-2 text-sm data-[state=checked]:shadow-md data-[state=checked]:outline md:text-base 2xl:text-lg"
    >
      <div className="flex flex-row gap-2 items-center">
        <img
          className="rounded-full w-4 object-scale-down bg-accent"
          src={`/logos/teams/32/${team.teamId}_32x32.png`}
        />
        <span
          className={cn(
            'w-32 xs:w-44 xl:w-60 data-[state=checked]:underline truncate',
          )}
        >
          <Link
            from="/teams"
            to="/teams/$teamId"
            params={{ teamId: team.teamId }}
            search={(prev) => ({ ...prev })}
          >
            {team.name}
          </Link>
        </span>
      </div>
      <Checkbox
        name="teamArray"
        checked={selectedTeams.includes(team.teamId)}
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
