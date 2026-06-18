import Date from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import type { Game } from '@/lib/types/game'
import PlayoffCard from './PlayoffCard'
type FinalCardProps = {
  game: Omit<Game, 'season'>
}

const FinalCard = ({ game }: FinalCardProps) => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center bg-red-50 lg:mx-auto">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>Final</PlayoffCard.Group>
          <PlayoffCard.Result>
            <Date>{game.date}</Date>
          </PlayoffCard.Result>
        </PlayoffCard.Title>
        <PlayoffCard.Content>
          <div className="flex flex-row justify-between text-sm xl:text-base">
            <div className="flex flex-col gap-2">
              <PlayoffCard.Team teamId={game.home.teamId}>
                <TeamLogo
                  size={32}
                  teamId={game.home.teamId}
                  className="object-scale-down w-3 sm:w-4 md:w-5"
                  alt={game.home.casualName}
                  title={game.home.casualName}
                />
                <span>{game.home.name}</span>
              </PlayoffCard.Team>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                <TeamLogo
                  size={32}
                  teamId={game.away.teamId}
                  className="object-scale-down w-3 sm:w-4 md:w-5"
                  alt={game.away.casualName}
                  title={game.away.casualName}
                />
                <span>{game.away.name}</span>
              </PlayoffCard.Team>
            </div>
            <div>
              <PlayoffCard.Result>
                {game.result}
              </PlayoffCard.Result>
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
