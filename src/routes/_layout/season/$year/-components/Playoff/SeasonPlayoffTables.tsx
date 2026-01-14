import { getRouteApi } from '@tanstack/react-router'
import EightFinal from './EightFinal'
import Final from './Final'
import PlayoffAsSeriesTables from './PlayoffAsSeriesTables'
import QuarterFinal from './QuarterFinal'
import SemiFinal from './SemiFinal'

const route = getRouteApi('/_layout/season/$year/playoff/table')

const SeasonPlayoffTables = () => {
  const playoffAsSeries = route.useLoaderData({
    select: (s) => s.playoffSeason.playoffAsSeries,
  })

  return (
    <div className="m-0 mt-4 w-full lg:justify-self-center">
      <div className="grid gap-2">
        <Final />
        <SemiFinal />
        <QuarterFinal />
        <EightFinal />
        {playoffAsSeries && <PlayoffAsSeriesTables />}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
