import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { addGeneratedCupSeries } from '../-functions/SerieFunctions/addGeneratedCupSeries'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/generateCupSerie',
)

type Data = { status: 200; message: string } | undefined

export const useAddGeneratedCupSeriesMutation = () => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const mutation = useMutation({
    mutationFn: addGeneratedCupSeries,
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

    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId },
      search: (prev) => ({ ...prev }),
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
