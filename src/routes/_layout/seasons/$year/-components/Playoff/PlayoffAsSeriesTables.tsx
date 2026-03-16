import { getRouteApi } from '@tanstack/react-router'

import MobileTableList from './SeriesTables/MobileTableList'
import TableList from './SeriesTables/TableList'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const PlayoffAsSeriesTables = () => {
  const playoffSeriesTables = route.useLoaderData({
    select: (s) => s.playoffSeriesTables,
  })
  if (!playoffSeriesTables) return null
  return (
    <div>
      <div className="hidden sm:block">
        {playoffSeriesTables.map((group) => {
          return (
            <TableList
              key={group.group}
              data={group}
            />
          )
        })}
      </div>
      <div className="sm:hidden">
        {playoffSeriesTables.map((group) => {
          return (
            <MobileTableList
              key={group.group}
              data={group}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PlayoffAsSeriesTables
