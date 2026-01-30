import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { deleteTeamSeason } from '../../-functions/SeasonFunctions/deleteTeamSeason'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

type Data = { status: 200; message: string } | undefined

const TeamSeason = () => {
  const teams = route.useLoaderData({ select: (s) => s.teams })
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [teamseasonId, setTeamseasonId] = useState<number | null>(null)
  const deleteTeamSeasonMutation = useMutation({
    mutationFn: deleteTeamSeason,
    onSuccess: (data) => onSuccessDeleteMutation(data),
    onError: (error) => onErrorFunction(error),
  })
  const router = useRouter()
  const navigate = route.useNavigate()
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const women = route.useSearch({ select: (search) => search.women })

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const openDialog = (id: number) => {
    setTeamseasonId(id)
    dialogRef.current?.showModal()
  }

  const onSuccessDeleteMutation = (data: Data) => {
    if (!data) {
      toast.error('Något gick fel.')
    } else {
      toast.success(data.message)
    }
    closeDialog()
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
    closeDialog()
  }

  const deleteTeamSeasonFunction = () => {
    if (!teamseasonId) return
    deleteTeamSeasonMutation.mutate({ data: { teamseasonId } })
    router.invalidate({
      filter: (route) =>
        route.routeId === '/_layout/dashboard/season/$seasonId',
    })
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-accent/50"
        onClose={() => setTeamseasonId(null)}
      >
        <div className="fixed inset-y-80 z-50 m-2 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
          <div className="fixed inset-2 mx-auto my-60 h-50 w-80">
            <Card>
              <CardContent className="mb-8 flex flex-row justify-center">
                <span className="text-base font-bold">
                  Är du säker på att du vill ta bort?
                </span>
              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <Button onClick={() => closeDialog()} autoFocus>
                  Nej, stäng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteTeamSeasonFunction()}
                >
                  Ja, ta bort
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </dialog>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="xl:text-lg">Lag</CardTitle>
            <div className="flex flex-row gap-2">
              {/* <Button asChild size="sm">
                <route.Link
                  to="/dashboard/season/$seasonId/teamseason"
                  params={{ seasonId }}
                  search={{ women }}
                >
                  Lägg till lag
                </route.Link>
              </Button> */}
              <Button
                onClick={() => {
                  navigate({
                    to: '/dashboard/season/$seasonId/teamseason',
                    params: { seasonId: seasonId },
                    search: { women: women },
                  })
                }}
                size="sm"
              >
                Lägg till lag
              </Button>
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
                    <div className="xl:text-lg">{team.team.casualName}</div>
                    <div className="flex flex-row gap-2">
                      <Button
                        onClick={() => openDialog(team.teamseasonId)}
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
