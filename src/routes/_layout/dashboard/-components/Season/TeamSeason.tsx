import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { getRouteApi } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { deleteTeamseasonMutation } from '../../-hooks/deleteTeamseasonMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/',
)

const TeamSeason = () => {
  const teams = route.useLoaderData({
    select: (s) => s.teams,
  })
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [teamseasonId, setTeamseasonId] = useState<
    number | null
  >(null)
  const [teamName, setTeamName] = useState<string | null>(
    null,
  )
  const mutation = deleteTeamseasonMutation(dialogRef)

  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const openDialog = (id: number) => {
    setTeamseasonId(id)
    dialogRef.current?.showModal()
  }

  const deleteTeamSeasonFunction = () => {
    if (!teamseasonId) return
    mutation.mutate({ data: { teamseasonId } })
  }

  return (
    <>
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
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="xl:text-lg">
              Lag
            </CardTitle>
            <div className="flex flex-row gap-2">
              <Button
                render={
                  <route.Link
                    to="/dashboard/season/$seasonId/teamseason"
                    params={{ seasonId }}
                    search={{ women }}
                  >
                    Lägg till lag
                  </route.Link>
                }
                size="sm"
                nativeButton={false}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm">
            <div>
              {teams.map((team) => {
                return (
                  <div
                    key={team.teamId}
                    className="mb-1 flex flex-row justify-between"
                  >
                    <div className="xl:text-lg">
                      {team.team.casualName}
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        onClick={() => {
                          setTeamName(team.team.name)
                          openDialog(team.teamseasonId)
                        }}
                        size="sm"
                        variant="destructive"
                      >
                        Ta bort
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TeamSeason
