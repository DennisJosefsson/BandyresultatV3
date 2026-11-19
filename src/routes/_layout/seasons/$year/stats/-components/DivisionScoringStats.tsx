import { getRouteApi } from '@tanstack/react-router'
import AllGoals from './AllGoals'
import AllResults from './AllResults'
import DivisionGoals from './DivisionGoals'
import DivisionResults from './DivisionResults'
import Games from './Games'
const route = getRouteApi('/_layout/seasons/$year/stats/')

const DivisionScoringStats = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  const divisionStats = data.stats.divisionStats.filter(
    (s) =>
      s.awayWinCount !== null &&
      s.homeWinCount !== null &&
      s.drawCount !== null,
  )

  const isMoreThanOneDivision = divisionStats.length > 1

  return (
    <div className="@container flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xs sm:text-sm">
          Säsongsstatistik
        </h1>
      </div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2 sm:gap-8">
        <AllResults data={data.stats.allStats} />
        <AllGoals data={data.stats.allStats} />
        {isMoreThanOneDivision ? (
          <>
            <DivisionResults data={divisionStats} />
            <DivisionGoals data={divisionStats} />
          </>
        ) : null}
      </div>
      <Games games={data.stats.maxMinGames} />
    </div>
  )
}

export default DivisionScoringStats
