import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { Game } from '@/lib/types/game'
import { StarIcon } from 'lucide-react'
import PlayoffCard from './PlayoffCard'
type FinalCardProps = {
  game: Omit<Game, 'season'>
  title: string
}

const FinalCard = ({ game, title }: FinalCardProps) => {
  const { favTeams } = useCookies()
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center @2xl/playoff:mx-auto">
      <PlayoffCard group={game.group}>
        <PlayoffCard.Title>
          <PlayoffCard.Group>{title}</PlayoffCard.Group>
          <PlayoffCard.Result>
            <Datum>{game.date}</Datum>
          </PlayoffCard.Result>
        </PlayoffCard.Title>
        <PlayoffCard.Content>
          <div className="flex flex-row justify-between text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-base 4xl/playoff:p-1">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between items-center w-full">
                <PlayoffCard.Team>
                  <TeamLogo
                    size={32}
                    teamId={game.home.teamId}
                    className="size-[1lh] object-scale-down"
                    aria-label={game.home.casualName}
                    title={game.home.casualName}
                  />
                  <span className="font-semibold">
                    {game.home.name}
                  </span>
                  <StarIcon
                    data-favteam={
                      favTeams.includes(game.home.teamId)
                        ? true
                        : false
                    }
                    className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
                  />
                </PlayoffCard.Team>
                <div>
                  <span className="font-semibold">
                    {game.homeGoal}
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <PlayoffCard.Team>
                  <TeamLogo
                    size={32}
                    teamId={game.away.teamId}
                    className="size-[1lh] object-scale-down"
                    aria-label={game.away.casualName}
                    title={game.away.casualName}
                  />
                  <span className="font-semibold">
                    {game.away.name}
                  </span>
                  <StarIcon
                    data-favteam={
                      favTeams.includes(game.away.teamId)
                        ? true
                        : false
                    }
                    className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
                  />
                </PlayoffCard.Team>
                <div>
                  <span className="font-semibold">
                    {game.awayGoal}
                  </span>
                </div>
              </div>
              {game.otResult ? (
                <div>
                  <span className="text-[10px] @2xl:text-xs">
                    Matchen slutade {game.result} efter full
                    tid och avgjordes{' '}
                    {game.penalties
                      ? 'på straffar'
                      : 'under förlängningen'}
                    .
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
