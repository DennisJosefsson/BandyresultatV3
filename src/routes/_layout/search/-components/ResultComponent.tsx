import Date from '@/components/Common/Date'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { SearchResult } from '@/lib/types/search'

type ResultComponentProps = { gameArray: SearchResult[] }

const ResultComponent = ({ gameArray }: ResultComponentProps) => {
  const { favTeams } = useFavTeam()

  return (
    <div className="m-2 grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-2 lg:grid-cols-3">
      {gameArray?.map((game, index) => {
        return (
          <div
            className="mb-1 flex flex-row items-center p-1 text-[10px] md:mb-2 md:p-2 md:text-sm xl:text-base 2xl:text-lg"
            key={`${game.date}-${index}`}
          >
            <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex w-full flex-row justify-between gap-2">
                <span className="w-32 md:w-48">
                  <span
                    className={
                      favTeams.includes(game.home.teamId) ? 'font-bold' : ''
                    }
                  >
                    {game.home.casualName}
                  </span>
                  -
                  <span
                    className={
                      favTeams.includes(game.away.teamId) ? 'font-bold' : ''
                    }
                  >
                    {game.away.casualName}
                  </span>
                </span>
                <span
                  className={
                    favTeams.includes(game.home.teamId) ||
                    favTeams.includes(game.away.teamId)
                      ? 'text-right font-bold'
                      : 'text-right'
                  }
                >
                  {game.result}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1 text-[10px] md:text-xs xl:text-sm">
                <span>
                  <Date>{game.date}</Date>
                </span>
                {game.qualificationGame && <span className="ml-1">(K)</span>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultComponent
