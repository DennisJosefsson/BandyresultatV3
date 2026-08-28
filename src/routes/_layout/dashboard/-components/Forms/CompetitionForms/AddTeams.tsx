import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { Input } from '@/components/base/ui/input'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { addTeamToCompetitionMutation } from '../../../-hooks/addTeamToCompetitionMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/teamcompetition',
)

const AddTeams = () => {
  const competitionId = route.useParams({
    select: (s) => s.competitionId,
  })
  const data = route.useLoaderData()
  const mutation = addTeamToCompetitionMutation()
  const [teamFilter, setTeamFilter] = useState('')

  const onClickTeamButton = (teamId: number) => {
    mutation.mutate({ data: { competitionId, teamId } })
  }

  if (data.status === 404) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Lägg till lag</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-row justify-center">
          <span className="text-sm">{data.message}</span>
        </CardContent>
      </Card>
    )
  }

  const competitionTeams = data.teamsInCompetition.map(
    (t) => t.team.teamId,
  )

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
              onChange={(event) =>
                setTeamFilter(event.target.value)
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-8 place-self-start px-10">
        {data.teamsInSeason
          .filter((team) =>
            team.team.casualName.includes(teamFilter),
          )
          .filter(
            (team) =>
              !competitionTeams.includes(team.teamId),
          )
          .map((team) => {
            return (
              <Button
                key={team.teamId.toString()}
                variant="outline"
                size="sm"
                onClick={() =>
                  onClickTeamButton(team.teamId)
                }
              >
                {team.team.casualName}
              </Button>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default AddTeams
