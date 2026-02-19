import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils/utils'
import { Link } from '@tanstack/react-router'

type Team = {
  teamId: number
  casualName: string
}

type TeamsListItemProps = {
  team: Team
  selectedTeams: number[]
  onCheckedChange: (checked: CheckedState, teamId: number) => void
}

const TeamsListItem = ({
  team,
  selectedTeams,
  onCheckedChange,
}: TeamsListItemProps) => {
  //const { favTeams } = useTeampreferenceContext()
  //   const pathName = useLocation().pathname
  //   const women = useSearch({
  //     from: '/_layout',
  //     select: (search) => search.women,
  //   })

  return (
    <div className="bg-muted dark:bg-muted/50 flex flex-row items-center justify-between space-y-0 space-x-3 rounded p-2 text-sm has-data-[state=checked]:font-bold md:text-base 2xl:text-lg">
      <span className={cn('w-32 peer-data-[state=checked]:underline')}>
        <Link
          from="/teams"
          to="/teams/$teamId"
          params={{ teamId: team.teamId }}
          search={(prev) => ({ ...prev })}
        >
          {team.casualName}
        </Link>
      </span>
      <Checkbox
        name="teamArray"
        checked={selectedTeams.includes(team.teamId)}
        onCheckedChange={(checked) =>
          team.teamId && onCheckedChange(checked, team.teamId)
        }
        className="peer bg-muted data-[state=checked]:border-primary data-[state=checked]:bg-background data-[state=checked]:text-primary dark:bg-muted/50 dark:data-[state=checked]:bg-background dark:data-[state=checked]:text-primary dark:data-[state=checked]:border-white"
      />
    </div>
  )
}

export default TeamsListItem
