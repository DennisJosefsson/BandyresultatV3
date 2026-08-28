import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { addTeamToCompetition } from '../-functions/CompetitionFunctions/addTeamToCompetition'

type Data = { status: 200; message: string } | undefined

export const addTeamToCompetitionMutation = () => {
  const mutation = useMutation({
    mutationFn: addTeamToCompetition,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onErrorFunction(error),
  })

  const router = useRouter()

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.error('Något gick fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (route) =>
        route.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/teamcompetition',
    })
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
  }

  return mutation
}
