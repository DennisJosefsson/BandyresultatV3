import { getRouteApi } from '@tanstack/react-router'

import FiveSeasonTeamTable from './FiveSeasonTeamTable'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamFiveSeasonsTables = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  if (data.fiveSeasons.length === 0) {
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
      {data.fiveSeasons.map((season) => {
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
