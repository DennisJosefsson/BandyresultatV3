import Date from '@/components/Common/Date'
import { Game, GameGroupBase } from '@/lib/types/game'
import { getRouteApi, Link } from '@tanstack/react-router'
import { LinkIcon } from 'lucide-react'
import GamesListItem from './GamesListItem'

type GameListProps = {
  gamesArray: GameGroupBase<Omit<Game, 'season'>[]>[]
}

const route = getRouteApi('/_layout/season/$year/playoff/games')

const GamesList = ({ gamesArray }: GameListProps) => {
  const year = route.useParams({
    select: (params) => params.year,
  })
  if (gamesArray.length === 0) return null
  return (
    <div className="font-inter mb-6 w-full">
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <div
                id={group.group}
                className="group mb-0.5 flex flex-row items-center gap-1"
              >
                <h3 className="text-primary text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
                <Link
                  from="/season/$year/playoff/games"
                  params={{ year: year }}
                  hash={group.group}
                  search={(prev) => ({ ...prev })}
                >
                  <LinkIcon className="text-muted-foreground hidden h-4 w-4 group-hover:block" />
                </Link>
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
                        <div className="group mb-0.5 flex flex-row items-center gap-1">
                          <h3
                            className="text-[0.75rem] tracking-wide md:text-sm xl:text-base 2xl:text-lg"
                            id={`${group.group}-${date.date}`}
                          >
                            <Date>{date.date}</Date>
                          </h3>
                          <Link
                            from="/season/$year/playoff/games"
                            params={{ year: year }}
                            hash={`${group.group}-${date.date}`}
                            search={(prev) => ({ ...prev })}
                          >
                            <LinkIcon className="text-muted-foreground hidden h-4 w-4 group-hover:block" />
                          </Link>
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
