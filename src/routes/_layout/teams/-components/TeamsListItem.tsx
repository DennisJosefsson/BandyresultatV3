import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

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

  if (team.teamId === null) return null

  return (
    <div className="has-data-[state=checked]:font-bold flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-muted p-2 text-sm dark:bg-muted/50 md:text-base 2xl:text-lg">
      <span className={cn('w-32 peer-data-[state=checked]:underline')}>
        {team.casualName}
      </span>
      <Checkbox
        name="teamArray"
        checked={selectedTeams.includes(team.teamId)}
        onCheckedChange={(checked) =>
          team.teamId && onCheckedChange(checked, team.teamId)
        }
        className="peer bg-muted data-[state=checked]:border-primary data-[state=checked]:bg-background data-[state=checked]:text-primary dark:bg-muted/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-background dark:data-[state=checked]:text-primary"
      />
    </div>
  )
}

export default TeamsListItem
