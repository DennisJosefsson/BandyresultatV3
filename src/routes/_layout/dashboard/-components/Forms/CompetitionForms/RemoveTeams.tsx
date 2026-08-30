import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { getRouteApi } from '@tanstack/react-router'
import { Fragment, useRef, useState } from 'react'

import { Button } from '@/components/base/ui/button'
import { deleteTeamcompetitionMutation } from '../../../-hooks/deleteTeamcompetitionMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/teamcompetition',
)

const RemoveTeams = () => {
  const teamcompetitionDialogRef =
    useRef<HTMLDialogElement | null>(null)
  const [teamCompetitionId, setTeamCompetitionId] =
    useState<number | null>(null)
  const [teamName, setTeamName] = useState<string | null>(
    null,
  )

  const data = route.useLoaderData()

  const mutation = deleteTeamcompetitionMutation(
    teamcompetitionDialogRef,
  )
  const openDialog = (id: number) => {
    setTeamCompetitionId(id)
    teamcompetitionDialogRef.current?.showModal()
  }

  const deleteTeamFunction = () => {
    if (!teamCompetitionId) return
    mutation.mutate({
      data: { teamCompetitionId: teamCompetitionId },
    })
  }

  if (data.status === 404) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Lag i turneringen</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      <ConfirmDialog
        dialogRef={teamcompetitionDialogRef}
        confirmTitle={`Vill du ta bort ${teamName}?`}
        onClose={() => setTeamName(null)}
        confirmFunction={deleteTeamFunction}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-20 items-center">
              <CardTitle>Lag i turneringen</CardTitle>
              <div className="flex flex-row gap-6">
                <Button
                  render={
                    <route.Link
                      to="/dashboard/season/$seasonId"
                      params={(prev) => ({
                        seasonId: prev.seasonId,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                    >
                      Tillbaka till säsongen
                    </route.Link>
                  }
                  nativeButton={false}
                />
                {data.competition.isCup ? (
                  <Button
                    render={
                      <route.Link
                        to="/dashboard/season/$seasonId/info/competition/$competitionId/generateCupSerie"
                        params={(prev) => ({
                          seasonId: prev.seasonId,
                        })}
                        search={(prev) => ({
                          women: prev.women,
                        })}
                      >
                        Generera serier
                      </route.Link>
                    }
                    nativeButton={false}
                  />
                ) : (
                  <Button
                    render={
                      <route.Link
                        to="/dashboard/season/$seasonId/info/competition/$competitionId/generateSerie"
                        params={(prev) => ({
                          seasonId: prev.seasonId,
                        })}
                        search={(prev) => ({
                          women: prev.women,
                        })}
                      >
                        Generera serier
                      </route.Link>
                    }
                    nativeButton={false}
                  />
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm grid grid-cols-2 gap-x-10 gap-y-2">
            {data.teamsInCompetition.map((team, index) => {
              return (
                <Fragment key={team.teamCompetitionId}>
                  <div>
                    <span>{team.team.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setTeamName(
                        team.team.casualName ?? 'Okänt lag',
                      )
                      openDialog(team.teamCompetitionId)
                    }}
                    aria-label={`Ta bort lag ${index + 1}`}
                  >
                    Ta bort lag
                  </Button>
                </Fragment>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default RemoveTeams
