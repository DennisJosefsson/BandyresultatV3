import Date from '@/components/Components/Common/Date'
import { groupArray } from '@/lib/types/games/gameObject'

import { z } from 'zod'
import GamesListItem from './GamesListItem'

type GameListProps = {
  gamesArray: z.infer<typeof groupArray>
  tab: string
  hasGames: boolean
}

const GamesList = ({ gamesArray, tab, hasGames }: GameListProps) => {
  if (!hasGames) {
    return (
      <div className="flex flex-row justify-center mt-2 font-semibold">
        Inga inlagda matcher denna säsong, men tabell ska finnas.
      </div>
    )
  }
  if (gamesArray.length === 0) {
    return (
      <div className="flex flex-row justify-center mt-2 font-semibold">
        {tab === 'upcoming'
          ? 'Inga ospelade matcher.'
          : 'Inga spelade matcher än.'}
      </div>
    )
  }
  return (
    <div className="w-full mt-2 mb-6 lg:mt-3 2xl:mt-4 font-inter">
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <div
                id={group.group}
                className="flex flex-row gap-1 items-center mb-0.5 lg:mb-1 2xl:mb-2 group"
              >
                <h3 className="text-[10px] font-semibold text-primary md:text-xs tracking-wide xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
              </div>
              {group.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs xl:text-sm 2xl:text-base font-bold">
                  {group.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.date !== 'null' && (
                        <div className="flex flex-row gap-1 items-center mb-0.5 lg:mb-1 2xl:mb-2 group">
                          <h3
                            className="text-[0.75rem] md:text-sm tracking-wide xl:text-base 2xl:text-lg"
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
