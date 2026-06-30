import Date from '@/components/Common/Date'
import type { GroupGames } from '@/lib/types/game'
import { Fragment } from 'react/jsx-runtime'
import DataTable from './DataTable'
import { columns } from './columns'

type GameListProps = {
  gamesArray: Array<GroupGames>
  tab: string
  hasGames: boolean
}

const GamesList = ({
  gamesArray,
  tab,
  hasGames,
}: GameListProps) => {
  if (!hasGames) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga inlagda matcher denna säsong, men tabell ska
        finnas.
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
            <div
              key={group.group}
              className="mb-6 w-full"
            >
              <div
                id={group.group}
                className="group mb-0.5 flex flex-row items-center gap-1 lg:mb-1 2xl:mb-2"
              >
                <h3 className="text-primary text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
              </div>
              <div className="w-full table-fixed xl:w-4/5 2xl:w-2/3 ml-2 md:ml-4">
                {group.comment && (
                  <span>{group.comment}</span>
                )}

                {group.dates.map((date) => {
                  const teamObject = date.games.reduce(
                    (o, key) => ({
                      ...o,
                      [key.home.casualName]: key.homeTeamId,
                      [key.away.casualName]: key.awayTeamId,
                    }),
                    {},
                  )
                  return (
                    <Fragment key={date.date}>
                      {date.date !== 'null' && (
                        <span className="w-24 p-0 py-1 text-[8px] sm:text-sm lg:text-base">
                          <Date>{date.date}</Date>
                        </span>
                      )}
                      <DataTable
                        teamObject={teamObject}
                        columns={columns}
                        data={date.games}
                      />
                    </Fragment>
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
