import { getRouteApi } from '@tanstack/react-router'
// import { useCookies } from '@/lib/contexts/favTeamsContext'
import { Datum } from '@/components/Common/Date'
import GamesDataTable from './GamesDataTable'
import { columns } from './gamesColumn'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)
const DevelopmentGamesList = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData()

  if (data.status === 404) return null

  return (
    <div>
      <div className="xs:text-[10px] mt-2 ml-1.5 text-[8px] sm:ml-2 sm:text-xs lg:text-sm xl:text-base">
        <Datum>{data.games[index]?.date}</Datum>
      </div>
      <GamesDataTable
        columns={columns}
        data={data.games[index]?.games}
      />
    </div>
  )
}

export default DevelopmentGamesList
