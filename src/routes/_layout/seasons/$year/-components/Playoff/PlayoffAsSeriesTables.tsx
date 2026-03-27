import { getRouteApi } from '@tanstack/react-router'

import MobileTableList from './SeriesTables/MobileTableList'
import TableList from './SeriesTables/TableList'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const PlayoffAsSeriesTables = () => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.playoffSeriesTables)
    return null
  return (
    <div>
      <div className="hidden sm:block">
        {data.playoffSeriesTables.map((group) => {
          return (
            <TableList
              key={group.group}
              data={group}
            />
          )
        })}
      </div>
      <div className="sm:hidden">
        {data.playoffSeriesTables.map((group) => {
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
