import Date from '@/components/Common/Date'
//import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { getRouteApi } from '@tanstack/react-router'
import GamesDataTable from './GamesDataTable'
import { columns } from './gamesColumn'

const route = getRouteApi('/_layout/seasons/$year/$group/development')
const DevelopmentGamesList = () => {
  // const { favTeams } = useFavTeam()
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData({ select: (s) => s.games })

  const teamObject = data[index]?.games.reduce(
    (o, key) => ({
      ...o,
      [key.home.casualName]: key.homeTeamId,
      [key.away.casualName]: key.awayTeamId,
    }),
    {},
  )
  return (
    <div className="mt-2">
      <div className="text-[10px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
        <Date>{data[index]?.date}</Date>
      </div>
      <GamesDataTable
        teamObject={teamObject}
        columns={columns}
        data={data[index]?.games}
      />
    </div>
  )
}

export default DevelopmentGamesList

// {data[index]?.games.map((game) => {
//         return (
//           <div key={game.gameId}>

{
  /* <div>
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
            </div> */
}
{
  /* </div>
        )
      })} */
}
