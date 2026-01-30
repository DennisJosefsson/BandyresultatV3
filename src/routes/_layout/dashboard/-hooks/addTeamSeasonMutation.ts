import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { addTeamSeason } from '../-functions/SeasonFunctions/addTeamSeason'

type Data = { status: 200; message: string } | undefined

export const useAddTeamSeasonMutation = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: addTeamSeason,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (route) =>
        route.routeId === '/_layout/dashboard/season/$seasonId/teamseason_/' ||
        route.routeId === '/_layout/dashboard/season/$seasonId',
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
  }

  return mutation
}
