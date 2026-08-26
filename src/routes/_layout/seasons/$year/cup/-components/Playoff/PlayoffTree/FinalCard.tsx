import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import type { Game } from '@/lib/types/game'
import PlayoffCard from './PlayoffCard'
type FinalCardProps = {
  game: Omit<Game, 'season'>
  title: string
}

const FinalCard = ({ game, title }: FinalCardProps) => {
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
          <div className="flex flex-row justify-between text-xs @2xs/playoff:text-sm @2xl/playoff:text-xs @4xl/playoff:text-base">
            <div className="flex flex-col gap-2">
              <PlayoffCard.Team teamId={game.home.teamId}>
                <TeamLogo
                  size={32}
                  teamId={game.home.teamId}
                  className="size-[1lh] object-scale-down"
                  aria-label={game.home.casualName}
                  title={game.home.casualName}
                />
                <span>{game.home.name}</span>
              </PlayoffCard.Team>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                <TeamLogo
                  size={32}
                  teamId={game.away.teamId}
                  className="size-[1lh] object-scale-down"
                  aria-label={game.away.casualName}
                  title={game.away.casualName}
                />
                <span>{game.away.name}</span>
              </PlayoffCard.Team>
            </div>
            <div>
              <PlayoffCard.Result>
                <span className="mr-2">{game.result}</span>
              </PlayoffCard.Result>
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
