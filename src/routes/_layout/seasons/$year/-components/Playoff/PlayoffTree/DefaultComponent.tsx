import TeamLogo from '@/components/Common/TeamLogo'
import type { GroupPlayoffTable } from '@/lib/types/table'
import { groupConstant } from '@/lib/utils/constants'
import PlayoffCard from './PlayoffCard'
type ColstartsType = {
  [key: string]: string
}

type DefaultComponentProps = {
  group: GroupPlayoffTable
  colStarts: ColstartsType
}

const DefaultComponent = ({
  group,
  colStarts,
}: DefaultComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]}`
    : 'lg:col-start-4 lg:odd:col-start-2'

  return (
    <PlayoffCard
      styleClass={styleClass}
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
        <PlayoffCard.Team teamId={group.homeTeam.teamId}>
          <TeamLogo
            size={32}
            teamId={group.homeTeam.teamId}
            className="object-scale-down w-3 sm:w-4 md:w-5"
            alt={group.homeTeam.casualName}
            title={group.homeTeam.casualName}
          />
          <span>{group.homeTeam.casualName}</span>
        </PlayoffCard.Team>

        <PlayoffCard.Team teamId={group.awayTeam.teamId}>
          <TeamLogo
            size={32}
            teamId={group.awayTeam.teamId}
            className="object-scale-down w-3 sm:w-4 md:w-5"
            alt={group.awayTeam.casualName}
            title={group.awayTeam.casualName}
          />
          <span>{group.awayTeam.casualName}</span>
        </PlayoffCard.Team>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
