import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { useAddTeamSeasonMutation } from '../../../-hooks/addTeamSeasonMutation'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/teamseason_/')

const TeamSeasonAddition = () => {
  const { allTeams, teamSeasons } = route.useLoaderData()
  const women = route.useSearch({ select: (s) => s.women })
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const addTeamSeasonMutation = useAddTeamSeasonMutation()

  const [teamFilter, setTeamFilter] = useState('')
  const teamSelection = allTeams
    .filter((team) => team.women === women)
    .map((team) => {
      return {
        value: team.teamId,
        label: team.name,
      }
    })

  const onClickTeamButton = (teamId: number) => {
    const exist = teamSeasons.find((team) => team.teamId === teamId)
    if (exist) return

    addTeamSeasonMutation.mutate({ data: { seasonId, teamId } })
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Lägg till lag</h3>
        </div>
        <div className="flex items-start justify-between p-5">
          <div className="flex items-center justify-end gap-2 p-6">
            <Button asChild>
              <route.Link
                to="/dashboard/season/$seasonId"
                params={{ seasonId }}
                search={{ women }}
              >
                Tillbaka
              </route.Link>
            </Button>
            <Input
              type="text"
              placeholder="Filter"
              value={teamFilter}
              name="teamFilter"
              onChange={(event) => setTeamFilter(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-3 gap-8 place-self-start px-10">
          {teamSelection
            .filter((team) => team.label.includes(teamFilter))
            .map((team) => {
              return (
                <Button
                  key={team.value}
                  size="sm"
                  onClick={() => onClickTeamButton(team.value)}
                >
                  {team.label}
                </Button>
              )
            })}
        </div>

        <div className="flex flex-col gap-2">
          <h6>Inlagda lag</h6>
          <div className="grid grid-cols-2">
            {teamSeasons.map((team) => {
              return <div key={team.teamId}>{team.team.name}</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSeasonAddition
