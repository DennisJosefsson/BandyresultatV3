import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { addCompetition } from '../-functions/CompetitionFunctions/addCompetition'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/newCompetition',
)
type Data =
  | { status: 200; message: string; competitionId: number }
  | undefined

export const useAddCompetitionMutation = () => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const mutation = useMutation({
    mutationFn: addCompetition,
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
      filter: (r) =>
        r.routeId === '/_layout/dashboard/season/$seasonId',
    })

    data?.competitionId &&
      navigate({
        to: '/dashboard/season/$seasonId/info/competition/$competitionId/teamcompetition',
        search: (prev) => ({ ...prev }),
        params: (prev) => ({
          ...prev,
          competitionId: data?.competitionId,
        }),
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
