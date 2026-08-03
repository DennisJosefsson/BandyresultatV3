import { Button } from '@/components/base/ui/button'
import type { CheckedState } from '@/components/base/ui/checkbox'
import {
  Link,
  getRouteApi,
  useSearch,
} from '@tanstack/react-router'
import { useState } from 'react'
import FilterComponent from './FilterComponent'
import TeamsListItem from './TeamsListItem'

const route = getRouteApi('/_layout/teams')

const TeamsList = () => {
  const [teamFilter, setTeamFilter] = useState<string>('')
  const { teamArray } = useSearch({
    from: '/_layout/teams/',
  })

  const error = route.useSearch({ select: (s) => s.error })

  const data = route.useLoaderData()

  const navigate = route.useNavigate()

  const teams = data.filter((team) =>
    team.name
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
              error: undefined,
            }
          } else {
            return {
              ...prev,
              teamArray: [teamId],
              error: undefined,
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
            return {
              ...prev,
              error: undefined,
              teamArray: [
                ...prev.teamArray.filter(
                  (team) => team !== teamId,
                ),
              ],
            }
          } else {
            return {
              ...prev,
              error: undefined,
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
        error: undefined,
      }),
    })
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      {error ? (
        <div className="flex flex-row justify-center">
          <span className="w-full bg-accent-foreground text-red-600 sm:text-sm lg:text-base py-1 px-2 text-center font-semibold">
            {error}
          </span>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-evenly">
        <div className="grow">
          <FilterComponent
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
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
                  error: undefined,
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
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
