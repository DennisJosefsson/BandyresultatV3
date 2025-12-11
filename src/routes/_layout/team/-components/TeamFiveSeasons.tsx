import { getRouteApi } from '@tanstack/react-router'
import FiveSeasonTeamTable from './FiveSeasonTeamTable'

const route = getRouteApi('/_layout/team/$teamId')

const TeamFiveSeasonsTables = () => {
  const fiveSeasonArray = route.useLoaderData({
    select: (data) => data.fiveSeasons,
  })
  if (fiveSeasonArray.length === 0) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas tabelldata för detta lag.
        </h2>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {fiveSeasonArray.map((season) => {
        return (
          <div key={season.season}>
            <FiveSeasonTeamTable
              tables={season.tables}
              season={season.season}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
