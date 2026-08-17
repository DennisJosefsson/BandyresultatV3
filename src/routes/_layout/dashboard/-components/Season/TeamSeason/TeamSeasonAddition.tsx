import { Button } from '@/components/base/ui/button'
import { Input } from '@/components/base/ui/input'
import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { getRouteApi } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useAddTeamSeasonMutation } from '../../../-hooks/addTeamSeasonMutation'
import { deleteTeamseasonMutation } from '../../../-hooks/deleteTeamseasonMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/teamseason_/',
)

const TeamSeasonAddition = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [teamseasonId, setTeamseasonId] = useState<
    number | null
  >(null)
  const [teamName, setTeamName] = useState<string | null>(
    null,
  )
  const mutation = deleteTeamseasonMutation(dialogRef)
  const { allTeams, teamSeasons } = route.useLoaderData()
  const women = route.useSearch({ select: (s) => s.women })
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const addTeamSeasonMutation = useAddTeamSeasonMutation()

  const [teamFilter, setTeamFilter] = useState('')
  const teamSelection = allTeams
    .filter((team) => team.women === women)
    .filter(
      (team) =>
        teamSeasons.findIndex(
          (t) => t.teamId === team.teamId,
        ) === -1,
    )
    .map((team) => {
      return {
        value: team.teamId,
        label: team.name,
      }
    })

  const onClickTeamButton = (teamId: number) => {
    const exist = teamSeasons.find(
      (team) => team.teamId === teamId,
    )
    if (exist) return

    addTeamSeasonMutation.mutate({
      data: { seasonId, teamId },
    })
  }

  const openDialog = (id: number) => {
    setTeamseasonId(id)
    dialogRef.current?.showModal()
  }

  const deleteTeamSeasonFunction = () => {
    if (!teamseasonId) return
    mutation.mutate({ data: { teamseasonId } })
  }

  return (
    <div className="flex flex-col">
      <ConfirmDialog
        dialogRef={dialogRef}
        onClose={() => {
          setTeamName(null)
          setTeamseasonId(null)
        }}
        confirmFunction={deleteTeamSeasonFunction}
        confirmButtonText="Ja, ta bort"
        closeButtonText="Nej,stäng"
        confirmTitle={`Är du säker på att du vill ta bort teamSeason för ${teamName}?`}
      />
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Lägg till lag
          </h3>
        </div>
        <div className="flex items-start justify-between p-5">
          <div className="flex items-center justify-end gap-2 p-6">
            <Button
              render={
                <route.Link
                  to="/dashboard/season/$seasonId"
                  params={{ seasonId }}
                  search={{ women }}
                >
                  Tillbaka
                </route.Link>
              }
              nativeButton={false}
            />

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
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-3 gap-8 place-self-start px-10">
          {teamSelection
            .filter((team) =>
              team.label.includes(teamFilter),
            )
            .map((team) => {
              return (
                <Button
                  key={team.value}
                  size="sm"
                  onClick={() =>
                    onClickTeamButton(team.value)
                  }
                >
                  {team.label}
                </Button>
              )
            })}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h6>Inlagda lag</h6>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {teamSeasons.map((team) => {
              return (
                <Button
                  key={`${team.teamId.toString()}-added`}
                  onClick={() => {
                    setTeamName(team.team.name)
                    openDialog(team.teamseasonId)
                  }}
                  size="sm"
                  variant="destructive"
                >
                  {team.team.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSeasonAddition
