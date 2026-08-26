import TeamLogo from '@/components/Common/TeamLogo'
import type { PlayoffGroups } from '@/lib/types/table'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import PlayoffCard from './PlayoffCard'

interface DefaultComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  group: PlayoffGroups
}

const DefaultComponent = ({
  group,
  className,
}: DefaultComponentProps) => {
  if (group.table === undefined) return null
  return (
    <PlayoffCard
      className={className}
      group={group.group}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>{group.name}</PlayoffCard.Group>
        <PlayoffCard.Result>
          {group.table.result}
        </PlayoffCard.Result>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        <PlayoffCard.Team
          teamId={group.table.homeTeam.teamId}
        >
          <TeamLogo
            size={32}
            teamId={group.table.homeTeam.teamId}
            className="size-[1lh] object-scale-down"
            alt={group.table.homeTeam.name}
            title={group.table.homeTeam.name}
          />
          <span>{group.table.homeTeam.casualName}</span>
        </PlayoffCard.Team>

        <PlayoffCard.Team
          teamId={group.table.awayTeam.teamId}
        >
          <TeamLogo
            size={32}
            teamId={group.table.awayTeam.teamId}
            className="size-[1lh] object-scale-down"
            alt={group.table.awayTeam.name}
            title={group.table.awayTeam.name}
          />
          <span>{group.table.awayTeam.casualName}</span>
        </PlayoffCard.Team>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
