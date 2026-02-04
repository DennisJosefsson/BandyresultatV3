import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

const route = getRouteApi('/_layout/dashboard/teams/')

const TeamsList = () => {
  const teams = route.useLoaderData({ select: (s) => s.teams })
  const [filter, setFilter] = useState('')

  const mensTeam = teams
    .filter((t) => t.women === false)
    .filter((t) => t.casualName.includes(filter))
  const womensTeam = teams
    .filter((t) => t.women === true)
    .filter((t) => t.casualName.includes(filter))

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <div>
            <Input
              type="text"
              placeholder="Filter"
              value={filter}
              name="teamFilter"
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-20">
            <div className="grid grid-cols-4 gap-x-3 gap-y-2 place-self-start">
              {mensTeam.map((team) => {
                return (
                  <Button key={team.teamId.toString()} asChild>
                    <route.Link
                      to="/dashboard/team/$teamId"
                      search={(prev) => ({ women: prev.women })}
                      params={{ teamId: team.teamId }}
                    >
                      {team.name}
                    </route.Link>
                  </Button>
                )
              })}
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-2 place-self-start">
              {womensTeam.map((team) => {
                return (
                  <Button key={team.teamId.toString()} asChild>
                    <route.Link
                      to="/dashboard/team/$teamId"
                      search={(prev) => ({ women: prev.women })}
                      params={{ teamId: team.teamId }}
                    >
                      {team.name}
                    </route.Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamsList
