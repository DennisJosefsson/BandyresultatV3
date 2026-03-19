import Date from '@/components/Common/Date'
import type { GroupGames } from '@/lib/types/game'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { Fragment } from 'react/jsx-runtime'
import GamesListItem from './GamesListItem'

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
              <Table className="w-full xl:w-4/5 2xl:w-2/3 table-fixed">
                {group.comment && (
                  <TableCaption>
                    {group.comment}
                  </TableCaption>
                )}
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-12 xs:w-18">
                      Hemma
                    </TableHead>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-4"></TableHead>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-12 xs:w-18">
                      Borta
                    </TableHead>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-12 xs:w-18">
                      Resultat
                    </TableHead>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-12">
                      Halvtid
                    </TableHead>
                    <TableHead className="text-[8px] sm:text-sm lg:text-base px-0 h-8 w-12 text-center">
                      Avgörande
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.dates.map((date) => {
                    return (
                      <Fragment key={date.date}>
                        {date.date !== 'null' && (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="p-0 py-1 text-[8px] sm:text-sm lg:text-base w-24"
                            >
                              <Date>{date.date}</Date>
                            </TableCell>
                          </TableRow>
                        )}
                        {date.games.map((game) => {
                          return (
                            <GamesListItem
                              key={game.gameId}
                              game={game}
                            />
                          )
                        })}
                      </Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
