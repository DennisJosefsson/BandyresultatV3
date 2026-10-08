import TeamLogo from '@/components/Common/TeamLogo'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { PlayoffGroup } from '@/lib/types/table'
import { EyeIcon, EyeOffIcon, StarIcon } from 'lucide-react'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import PlayoffCard from './PlayoffCard'

interface DefaultComponentProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  group: PlayoffGroup
}

const DefaultComponent = ({
  group,
  className,
}: DefaultComponentProps) => {
  const { favTeams } = useCookies()
  if (group.groupArray.length === 0) return null
  return (
    <PlayoffCard
      className={className}
      group={group.group}
    >
      <details
        className="group"
        name="results"
      >
        <summary className="cursor-pointer list-none">
          <PlayoffCard.Title>
            <PlayoffCard.Group>
              {group.serieName}
            </PlayoffCard.Group>
            <div>
              <EyeIcon
                className="size-3.5 group-open:hidden"
                aria-label="Visa matcher"
              >
                {' '}
                <title>Visa matcher</title>
              </EyeIcon>
              <EyeOffIcon
                className="size-3.5 group-open:block hidden"
                aria-label="Dölj matcher"
              >
                <title>Dölj matcher</title>
              </EyeOffIcon>
            </div>
          </PlayoffCard.Title>
          <PlayoffCard.Content>
            {group.groupArray.map((team) => {
              return (
                <div
                  key={`${team.team.teamId.toString()}-${group.serieName}`}
                  className="flex flex-row justify-between items-center"
                >
                  <PlayoffCard.Team>
                    <TeamLogo
                      size={32}
                      logoId={team.team.logo.logoId}
                      hasDark={team.team.logo.hasDark}
                      className="size-[1lh] object-scale-down"
                      aria-label={team.team.name}
                      title={team.team.name}
                    />
                    <span className="font-semibold">
                      {team.team.shortName}
                    </span>
                    <StarIcon
                      data-favteam={
                        favTeams.includes(team.team.teamId)
                          ? true
                          : false
                      }
                      className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
                    />
                  </PlayoffCard.Team>
                  <div className="flex flex-row gap-1 items-center justify-between mr-2.5">
                    <div>
                      <span className="font-semibold">
                        {team.winCount}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </PlayoffCard.Content>
        </summary>
        <div className="mt-1 flex flex-col gap-0.5 text-xs font-semibold px-2.5">
          {group.games.map((game) => {
            return (
              <div
                className="flex flex-row gap-4 justify-between mr-1"
                key={game.gameId}
              >
                <div className="flex flex-row gap-2">
                  <div className="w-16">
                    <span>{game.date}</span>
                  </div>
                  <div className="flex flex-row justify-evenly w-30">
                    <span className="w-12">
                      {game.home.shortName}
                    </span>
                    <span className="w-2">-</span>
                    <span className="w-12">
                      {game.away.shortName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <span>
                    {game.penalties
                      ? 's'
                      : game.extraTime
                        ? 'öt'
                        : ''}
                  </span>
                  <span className="w-8 text-right">
                    {game.otResult
                      ? game.otResult
                      : game.result}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </details>
    </PlayoffCard>
  )
}

export default DefaultComponent
