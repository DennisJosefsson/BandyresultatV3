import Date from '@/components/Common/Date'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/season/$year/$group/development')
const DevelopmentGamesList = () => {
  const { favTeams } = useFavTeam()
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData({ select: (s) => s.games })
  return (
    <div className="mt-2">
      <div className="text-[10px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
        <Date>{data[index]?.date}</Date>
      </div>
      {data[index]?.games.map((game) => {
        return (
          <div
            key={game.gameId}
            className="hover:bg-muted/50 flex flex-row justify-between border-b px-2 py-1 text-[10px] transition-colors lg:text-sm xl:py-2 xl:text-base 2xl:text-lg dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
          >
            <div>
              <span
                className={
                  favTeams.includes(game.homeTeamId) ? 'font-bold' : ''
                }
              >
                {game.home.casualName}
              </span>
              <span className="w-1 xl:w-4"> - </span>
              <span
                className={
                  favTeams.includes(game.awayTeamId) ? 'font-bold' : ''
                }
              >
                {game.away.casualName}
              </span>
            </div>
            <div>
              <span className="w-12 pr-2 text-right tabular-nums">
                {game.result}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DevelopmentGamesList
