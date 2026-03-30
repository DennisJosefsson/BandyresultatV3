import Date from '@/components/Common/Date'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import type { SearchResult } from '@/lib/types/search'
import { cn } from '@/lib/utils/utils'

type ResultComponentProps = {
  gameArray: Array<SearchResult>
}

const ResultComponent = ({
  gameArray,
}: ResultComponentProps) => {
  const { favTeams } = useFavTeam()

  return (
    <div className="m-2 grid grid-cols-1 gap-1 lg:grid-cols-2 md:gap-2">
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
                <span className="w-32 xs:w-48 md:w-64">
                  <span
                    className={cn(
                      '',
                      favTeams.includes(game.home.teamId)
                        ? 'font-bold'
                        : undefined,
                    )}
                  >
                    {game.home.casualName}
                  </span>
                  -
                  <span
                    className={cn(
                      '',
                      favTeams.includes(game.away.teamId)
                        ? 'font-bold'
                        : undefined,
                    )}
                  >
                    {game.away.casualName}
                  </span>
                </span>
                <span
                  className={cn(
                    'text-right w-12',
                    favTeams.includes(game.home.teamId) ||
                      favTeams.includes(game.away.teamId)
                      ? 'font-bold'
                      : undefined,
                  )}
                >
                  {game.otResult
                    ? game.otResult
                    : game.result}
                </span>
              </div>
              <div className="flex flex-row justify-between items-center gap-1 text-[10px] md:text-xs xl:text-sm">
                <div className="flex flex-row items-center gap-1">
                  <span>
                    <Date>{game.date}</Date>
                  </span>
                  <span>{game.women ? 'Dam' : 'Herr'}</span>
                </div>
                {game.qualificationGame ? (
                  <span className="ml-1">Kval</span>
                ) : null}
                {game.penalties ? (
                  <span className="ml-1">S</span>
                ) : null}
                {game.extraTime ? (
                  <span className="ml-1">ÖT</span>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultComponent
