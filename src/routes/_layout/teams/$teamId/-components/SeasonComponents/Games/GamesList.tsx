import { Datum } from '@/components/Common/Date'
import type { GroupGames } from '@/lib/types/game'
import DataTable from './DataTable'
import { columns } from './columns'

type GameListProps = {
  gamesArray: Array<GroupGames>

  hasGames: boolean
}

const GamesList = ({
  gamesArray,

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
    return null
  }
  return (
    <div className="font-inter mt-2 mb-6 max-w-3xl lg:mt-3 2xl:mt-4">
      <div>
        {gamesArray.map((group) => {
          return (
            <div
              key={group.group}
              className="mb-6 w-full @container/teamseasongames"
            >
              <div
                id={group.group}
                className="group mb-0.5 flex flex-row items-center gap-1 lg:mb-1 2xl:mb-2"
              >
                <h3 className="text-primary text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
              </div>
              <div className="ml-2 w-full table-fixed md:ml-4">
                {group.comment && (
                  <span>{group.comment}</span>
                )}

                {group.dates.map((date) => {
                  return (
                    <div
                      key={date.date}
                      className="mb-2 @lg:mb-4"
                    >
                      {date.date !== 'null' && (
                        <span className="text-primary w-24 p-0 py-1 text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                          <Datum>{date.date}</Datum>
                        </span>
                      )}
                      <DataTable
                        columns={columns}
                        data={date.games}
                      />
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
