import TeamLogo from '@/components/Common/TeamLogo'
import type { GroupPlayoffTable } from '@/lib/types/table'
import { groupConstant } from '@/lib/utils/constants'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import PlayoffCard from './PlayoffCard'

interface DefaultComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  group: GroupPlayoffTable | undefined
  
}

const DefaultComponent = ({
  group,
  className,
  
}: DefaultComponentProps) => {
  if (group === undefined) return null
  return (
    <PlayoffCard
      className={className}
      group={group.group}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>
          {groupConstant[group.group]}
        </PlayoffCard.Group>
        <PlayoffCard.Result>
          {group.result}
        </PlayoffCard.Result>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        <PlayoffCard.Team
          teamId={group.homeTeam.teamId}
          
        >
          <TeamLogo
            size={32}
            teamId={group.homeTeam.teamId}
            className="size-[1lh] object-scale-down"
            alt={group.homeTeam.name}
            title={group.homeTeam.name}
          />
          <span>{group.homeTeam.casualName}</span>
        </PlayoffCard.Team>

        <PlayoffCard.Team
          teamId={group.awayTeam.teamId}
          
        >
          <TeamLogo
            size={32}
            teamId={group.awayTeam.teamId}
            className="size-[1lh] object-scale-down"
            alt={group.awayTeam.name}
            title={group.awayTeam.name}
          />
          <span>{group.awayTeam.casualName}</span>
        </PlayoffCard.Team>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
