import { newCupSeriesObject } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { newSerieInput } from '../-functions/SerieFunctions/newSerie'

type Data = Awaited<ReturnType<typeof newSerieInput>>

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/newCupSerie',
)

export const useNewCupSerieForm = ({
  seasonId,
  division,
}: {
  seasonId: number
  division: number
}) => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({
    select: (s) => s.women,
  })

  const competitionId = route.useParams({
    select: (s) => s.competitionId,
  })
  const mutation = useMutation({
    mutationFn: newSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<typeof newCupSeriesObject> =
    {
      seasonId,
      group: '',
      category: 'cup-regular',
      serieName: '',
      serieStructure: [],
      comment: '',
      level: 1000,
      division: division,
      hasMix: false,
      hasParent: false,
      allParentGames: false,
      hasStatic: false,
      competitionId: competitionId,
    }

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: newCupSeriesObject,
    },

    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
      router.invalidate({
        filter: (routeToInvalidate) =>
          routeToInvalidate.routeId ===
          '/_layout/dashboard/season/$seasonId',
      })
      navigate({
        to: '/dashboard/season/$seasonId/info/serie/$serieId/edit',
        search: { women, form: 'cup' },
        params: { serieId: data.serieId },
      })
    }
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
  }

  return form
}
