import type { PlayoffSeriesTable } from '@/lib/types/table'
import MobileTableList from './SeriesTables/MobileTableList'
import TableList from './SeriesTables/TableList'

type PlayoffAsSeriesTablesProps = {
  playoffSeriesTables: Array<PlayoffSeriesTable> | undefined
}

const PlayoffAsSeriesTables = ({
  playoffSeriesTables,
}: PlayoffAsSeriesTablesProps) => {
  if (!playoffSeriesTables) return null
  return (
    <div className="@container/playoffseries">
      <div className="hidden @md:block">
        {playoffSeriesTables.map((group) => {
          return (
            <TableList
              key={group.group}
              data={group}
            />
          )
        })}
      </div>
      <div className="@md:hidden">
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
