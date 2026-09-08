import TeamLogo from '@/components/Common/TeamLogo'
import type { PlayoffGroupsV2 } from '@/lib/types/table'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import PlayoffCard from './PlayoffCard'

interface DefaultComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  group: PlayoffGroupsV2
}

const DefaultComponent = ({
  group,
  className,
}: DefaultComponentProps) => {
  if (group.teamArray.length === 0) return null
  return (
    <PlayoffCard
      className={className}
      group={group.group}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>
          {group.serieName}
        </PlayoffCard.Group>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        {group.teamArray.map((team) => {
          return (
            <div
              key={`${team.teamId.toString()}-${group.serieName}`}
              className="flex flex-row justify-between items-center"
            >
              <PlayoffCard.Team teamId={team.teamId}>
                <TeamLogo
                  size={32}
                  teamId={team.teamId}
                  className="size-[1lh] object-scale-down"
                  aria-label={team.name}
                  title={team.name}
                />
                <span>{team.shortName}</span>
              </PlayoffCard.Team>
              <div className="flex flex-row gap-1 items-center justify-between">
                <div>
                  <span className="font-bold">
                    {team.gameCount > 1
                      ? team.winCount
                      : null}
                  </span>
                </div>
                <div
                  data-gamecount={team.gameCount === 1}
                  className="grid grid-cols-5 data-[gamecount=true]:grid-cols-1 data-[gamecount=true]:font-bold gap-1 w-25"
                >
                  {team.goalsArray.map((g, index) => (
                    <div
                      className="text-right lining-nums tabular-nums text-[10px] @2xs/playoff:text-xs @2xl/playoff:text-[10px] @4xl/playoff:text-xs"
                      key={`goalsArray-${team.teamId}-${group.serieName}-${index}`}
                    >
                      <span>{g.goals}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
