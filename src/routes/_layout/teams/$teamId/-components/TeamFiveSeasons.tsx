import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import type { VisibilityState } from '@tanstack/react-table'
import { useState } from 'react'
import FiveSeasonTeamTable from './FiveSeasonTeamTable'
import {
  gameColumns,
  goalsColumns,
} from './TableComponents/columns'

const route = getRouteApi('/_layout/teams/$teamId/latest/')

const TeamFiveSeasonsTables = () => {
  const data = route.useLoaderData()
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(goalsColumns)
  const [visibleColumns, setVisibleColumns] = useState<
    'goals' | 'games'
  >('goals')

  const onClickHandler = () => {
    if (visibleColumns === 'goals') {
      setColumnVisibility(gameColumns)
      setVisibleColumns('games')
    } else if (visibleColumns === 'games') {
      setColumnVisibility(goalsColumns)
      setVisibleColumns('goals')
    }
  }
  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <h2 className="text-xs font-bold md:text-sm">
          {data.message}
        </h2>
      </div>
    )
  }
  return (
    <div className="mt-2 sm:mt-4 flex flex-col gap-2">
      <div className="sm:hidden">
        <Button
          className="w-full"
          variant="outline"
          size="xs"
          onClick={onClickHandler}
        >
          {visibleColumns === 'games'
            ? 'Visa målkolumner'
            : 'Visa matchkolumner'}
        </Button>
      </div>
      {data.fiveSeasons.map(({ season, competitions }) => {
        return (
          <div
            key={season}
            className="flex flex-col"
          >
            <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
              {season}
            </span>
            <div>
              {competitions.map(
                ({ tables, competitionName }) => {
                  return (
                    <FiveSeasonTeamTable
                      key={competitionName}
                      tables={tables}
                      competitionName={competitionName}
                      columnVisibility={columnVisibility}
                      setColumnVisibility={
                        setColumnVisibility
                      }
                    />
                  )
                },
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
