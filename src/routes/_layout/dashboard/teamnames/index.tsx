import { Button } from '@/components/base/ui/button'
import { Input } from '@/components/base/ui/input'
import { Label } from '@/components/base/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getNewTeamLogoId } from '../-functions/TeamFunctions/getLastTeamLogoId'
import { getAllTeamNames } from '../-functions/TeamFunctions/getTeamNames'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/',
)({
  loader: async () => {
    const teamNames = await getAllTeamNames()
    const logoId = await getNewTeamLogoId()
    if (!teamNames) {
      throw new Error('Missing teamNames data')
    }
    return { teamNames, logoId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [filter, setFilter] = useState<string>('')
  const data = Route.useLoaderData()

  const teamsNamesList = data.teamNames.teamName.filter(
    (t) =>
      t.casualName
        .toLowerCase()
        .includes(filter.toLowerCase()),
  )

  return (
    <div className="flex flex-col mt-2 gap-2">
      <div className="flex flex-row gap-2">
        <Button
          size="sm"
          render={
            <Route.Link
              to="/dashboard/teamnames/add"
              search={(prev) => ({ ...prev })}
            >
              Lägg till lagnamn
            </Route.Link>
          }
          nativeButton={false}
        />
        <Button
          size="sm"
          render={
            <Route.Link
              to="/dashboard/teamnames/logos/add"
              search={(prev) => ({ ...prev })}
            >
              Lägg till TeamLogo
            </Route.Link>
          }
          nativeButton={false}
        />
        <span>Högsta logoId: {data.logoId}</span>
      </div>
      <div className="flex flex-col">
        <div>
          <Label
            htmlFor="filterinput"
            className="text-sm"
          >
            Filter
          </Label>
        </div>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          name="filterinput"
          id="filterinput"
        />
      </div>
      <div className="grid grid-cols-5 gap-x-12 gap-y-4">
        {teamsNamesList.map((tn) => {
          return (
            <ul
              key={tn.teamnameId}
              className="flex flex-col gap-1.25 text-sm border p-4 shadow-sm"
            >
              <li className="flex flex-row justify-between">
                <span>teamnameId:</span>{' '}
                <span>{tn.teamnameId}</span>
              </li>
              <li className="flex flex-row justify-between">
                <span>name:</span> <span>{tn.name}</span>
              </li>
              <li className="flex flex-row justify-between">
                <span>casualName:</span>{' '}
                <span>{tn.casualName}</span>
              </li>
              <li className="flex flex-row justify-between">
                <span>shortName:</span>{' '}
                <span>{tn.shortName}</span>
              </li>
              <li className="flex flex-row justify-between">
                <span>logoId:</span>{' '}
                <Button
                  variant="outline"
                  disabled={tn.logoId === null}
                  size="sm"
                  render={
                    <Route.Link
                      to="/dashboard/teamnames/logos/$teamlogoId/edit"
                      params={{
                        teamlogoId:
                          tn.logo?.teamlogoId ?? 'null',
                      }}
                      search={(prev) => ({ ...prev })}
                      disabled={tn.logoId === null}
                    >
                      {tn.logoId ? tn.logoId : 'Null'}
                    </Route.Link>
                  }
                  nativeButton={false}
                />
              </li>
              <li className="flex flex-row justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <Route.Link
                      to="/dashboard/teamnames/$teamnameId"
                      params={{ teamnameId: tn.teamnameId }}
                      search={(prev) => ({ ...prev })}
                    >
                      Ändra
                    </Route.Link>
                  }
                  nativeButton={false}
                />
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <Route.Link
                      to="/dashboard/teams/add/$teamnameId"
                      params={{ teamnameId: tn.teamnameId }}
                      search={(prev) => ({ ...prev })}
                    >
                      Lägg till lag
                    </Route.Link>
                  }
                  nativeButton={false}
                />
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}
