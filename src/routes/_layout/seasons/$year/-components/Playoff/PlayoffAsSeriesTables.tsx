import type { PlayoffSeries } from '@/lib/types/table'
import MobileTableList from './SeriesTables/MobileTableList'
import TableList from './SeriesTables/TableList'

type PlayoffAsSeriesTablesProps = {
  playoffSeriesTables: Array<PlayoffSeries>
}

const PlayoffAsSeriesTables = ({
  playoffSeriesTables,
}: PlayoffAsSeriesTablesProps) => {
  if (!playoffSeriesTables) return null
  return (
    <div className="@container/playoffseries">
      <div className="hidden @md:block">
        <TableList data={playoffSeriesTables} />
      </div>
      <div className="@md:hidden">
        <MobileTableList data={playoffSeriesTables} />
      </div>
    </div>
  )
}

export default PlayoffAsSeriesTables
