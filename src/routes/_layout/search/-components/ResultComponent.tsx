import { GameCard } from '@/components/Common/Games/GameCard'
import type { SearchResult } from '@/lib/types/search'

type ResultComponentProps = {
  gameArray: Array<SearchResult>
}

const ResultComponent = ({
  gameArray,
}: ResultComponentProps) => {
  return (
    <div className="@container mt-2">
      <div className="grid grid-cols-1 gap-y-4 @5xl:grid-cols-2 @5xl:gap-x-20">
        {gameArray?.map((game, index) => {
          return (
            <div
              className="flex flex-row w-full"
              key={`${game.date}-${index}`}
            >
              {/* <div className="flex flex-col justify-center">
                <span className="mr-4 w-4 text-right text-base font-bold tabular-nums sm:w-8 md:text-3xl">
                  {index + 1}
                </span>
              </div> */}

              <div className="w-full">
                <GameCard
                  serieName={game.serie.serieName}
                  game={game}
                  routePath="/search"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResultComponent
