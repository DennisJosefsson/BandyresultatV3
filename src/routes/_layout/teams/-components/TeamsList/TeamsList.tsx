import { Button } from '@/components/base/ui/button'
import type { CheckedState } from '@/components/base/ui/checkbox'
import { Link, getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import FilterComponent from './FilterComponent'
import TeamsListItem from './TeamsListItem'

const route = getRouteApi('/_layout/teams/list')

const TeamsList = () => {
  const [teamFilter, setTeamFilter] = useState<string>('')
  const { teamArray } = route.useSearch()

  const data = route.useLoaderData()

  const navigate = route.useNavigate()

  const teams = data.filter((team) =>
    team.teamname.name
      .toLowerCase()
      .includes(teamFilter.toLowerCase()),
  )

  const onCheckedChange = (
    checked: CheckedState,
    teamId: number,
  ) => {
    if (checked) {
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teamArray) {
            return {
              ...prev,
              teamArray: [...prev.teamArray, teamId],
            }
          } else {
            return {
              ...prev,
              teamArray: [teamId],
            }
          }
        },
      })
    } else {
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (
            prev.teamArray &&
            prev.teamArray.includes(teamId)
          ) {
            if (prev.teamArray.length === 1)
              return {
                ...prev,

                teamArray: undefined,
              }
            return {
              ...prev,

              teamArray: [
                ...prev.teamArray.filter(
                  (team) => team !== teamId,
                ),
              ],
            }
          } else {
            return {
              ...prev,

              teamArray: undefined,
            }
          }
        },
      })
    }
  }

  const emptyArray = () => {
    navigate({
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        teamArray: undefined,
      }),
    })
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-evenly">
        <div className="grow">
          <FilterComponent
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
          />
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Button
            onClick={emptyArray}
            className="h-8 w-full sm:w-40 px-2.5 py-1"
            disabled={
              teamArray === undefined ||
              teamArray.length === 0
            }
          >
            Ta bort valda lag
          </Button>

          <Button
            render={
              <Link
                from="/teams"
                to="/teams/compare"
                search={(prev) => ({
                  ...prev,
                })}
                disabled={
                  teamArray?.length !== 2 ? true : false
                }
                className="data-disabled:pointer-events-none data-disabled:opacity-50"
              >
                Jämför lag
              </Link>
            }
            className="h-8 w-full sm:w-40 px-2.5 py-1"
            disabled={
              teamArray?.length !== 2 ? true : false
            }
            nativeButton={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 pt-2 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          return (
            <TeamsListItem
              key={team.teamId}
              team={team}
              selectedTeams={teamArray}
              onCheckedChange={onCheckedChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TeamsList
