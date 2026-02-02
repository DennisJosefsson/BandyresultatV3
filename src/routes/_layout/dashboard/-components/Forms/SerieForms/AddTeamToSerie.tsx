import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { addTeamToSerieMutation } from '../../../-hooks/addTeamToSerieMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const AddTeamToSerie = () => {
  const serieId = route.useParams({ select: (s) => s.serieId })
  const teams = route.useLoaderData({ select: (s) => s.teamsInSeason })
  const teamInSerie = route
    .useLoaderData({ select: (s) => s.teamsInSerie })
    .map((team) => team.teamId)
  const mutation = addTeamToSerieMutation()
  const [teamFilter, setTeamFilter] = useState('')

  const onClickTeamButton = (teamId: number) => {
    mutation.mutate({ data: { serieId, teamId } })
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Lägg till lag</CardTitle>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-end gap-2">
            <Input
              type="text"
              placeholder="Filter"
              value={teamFilter}
              name="teamFilter"
              onChange={(event) => setTeamFilter(event.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-8 place-self-start px-10">
        {teams
          .filter((team) => team.team.casualName.includes(teamFilter))
          .filter((team) => !teamInSerie.includes(team.teamId))
          .map((team) => {
            return (
              <Button
                key={team.teamId.toString()}
                size="sm"
                onClick={() => onClickTeamButton(team.teamId)}
              >
                {team.team.casualName}
              </Button>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default AddTeamToSerie
