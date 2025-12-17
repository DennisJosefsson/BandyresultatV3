import Date from '@/components/Common/Date'

import { GroupGames } from '@/lib/types/game'
import GamesListItem from './GamesListItem'

type GameListProps = {
  gamesArray: GroupGames[]
  tab: string
  hasGames: boolean
}

const GamesList = ({ gamesArray, tab, hasGames }: GameListProps) => {
  if (!hasGames) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga inlagda matcher denna säsong, men tabell ska finnas.
      </div>
    )
  }
  if (gamesArray.length === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        {tab === 'upcoming'
          ? 'Inga ospelade matcher.'
          : 'Inga spelade matcher än.'}
      </div>
    )
  }
  return (
    <div className="font-inter mt-2 mb-6 w-full lg:mt-3 2xl:mt-4">
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <div
                id={group.group}
                className="group mb-0.5 flex flex-row items-center gap-1 lg:mb-1 2xl:mb-2"
              >
                <h3 className="text-primary text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
              </div>
              {group.comment && (
                <p className="bg-background my-2 max-w-xl p-1 text-[10px] font-bold md:text-xs xl:text-sm 2xl:text-base">
                  {group.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.date !== 'null' && (
                        <div className="group mb-0.5 flex flex-row items-center gap-1 lg:mb-1 2xl:mb-2">
                          <h3
                            className="text-[0.75rem] tracking-wide md:text-sm xl:text-base 2xl:text-lg"
                            id={`${group.group}-${date.date}`}
                          >
                            <Date>{date.date}</Date>
                          </h3>
                        </div>
                      )}
                      {date.games.map((game) => {
                        return <GamesListItem key={game.gameId} game={game} />
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
