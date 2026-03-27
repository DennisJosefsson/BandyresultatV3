import { getRouteApi } from '@tanstack/react-router'

import PlayoffAsSeriesTables from './PlayoffAsSeriesTables'
import EightFinal from './PlayoffTree/EightFinal'
import Final from './PlayoffTree/Final'
import QuarterFinal from './PlayoffTree/QuarterFinal'
import SemiFinal from './PlayoffTree/SemiFinal'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const SeasonPlayoffTables = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  return (
    <div className="m-0 mt-4 w-full lg:justify-self-center">
      <div className="grid gap-2">
        <Final />
        <SemiFinal />
        <QuarterFinal />
        <EightFinal />
        {data.playoffSeason.playoffAsSeries ? (
          <PlayoffAsSeriesTables />
        ) : null}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
