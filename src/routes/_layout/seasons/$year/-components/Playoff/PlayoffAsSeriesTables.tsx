import { getRouteApi } from '@tanstack/react-router'
import TableList from './SeriesTables/TableList'

const route = getRouteApi('/_layout/seasons/$year/playoff/table')

const PlayoffAsSeriesTables = () => {
  const playoffSeriesTables = route.useLoaderData({
    select: (s) => s.playoffSeriesTables,
  })
  if (!playoffSeriesTables) return null
  return (
    <>
      {playoffSeriesTables.map((group) => {
        return <TableList key={group.group} data={group} />
      })}
    </>
  )
}

export default PlayoffAsSeriesTables
