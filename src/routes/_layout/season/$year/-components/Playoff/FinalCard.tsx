import Date from '@/components/Common/Date'
import { Game } from '@/lib/types/game'
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
          <div className="flex flex-row justify-between text-xs md:text-sm lg:text-base">
            <div>
              <PlayoffCard.Team teamId={game.home.teamId}>
                {game.home.name}
              </PlayoffCard.Team>
              <span> - </span>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                {game.away.name}
              </PlayoffCard.Team>
            </div>
            <div>
              <PlayoffCard.Result>{game.result}</PlayoffCard.Result>
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
