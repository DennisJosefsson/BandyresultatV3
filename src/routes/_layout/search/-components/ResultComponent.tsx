import { Datum } from '@/components/Common/Date'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { SearchResult } from '@/lib/types/search'
import { cn } from '@/lib/utils/utils'

type ResultComponentProps = {
  gameArray: Array<SearchResult>
}

const ResultComponent = ({
  gameArray,
}: ResultComponentProps) => {
  const { favTeams } = useCookies()

  return (
    <div className="m-2 grid grid-cols-1 gap-1 md:gap-2 lg:grid-cols-2">
      {gameArray?.map((game, index) => {
        return (
          <div
            className="mb-1 flex w-fit flex-row items-center border p-2 text-[10px] shadow-xs md:mb-2 md:text-sm md:shadow-sm xl:text-base 2xl:text-lg"
            key={`${game.date}-${index}`}
          >
            <span className="mr-4 w-4 text-right text-base font-bold tabular-nums sm:w-8 md:text-2xl">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex w-full flex-row justify-between gap-2">
                <span className="xs:w-48 w-32 md:w-60">
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
              <div className="flex flex-row items-center justify-between gap-1 text-[10px] md:text-xs xl:text-sm">
                <div className="flex flex-row items-center gap-1">
                  <span>
                    <Datum>{game.date}</Datum>
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
