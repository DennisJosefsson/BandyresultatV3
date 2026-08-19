import { newCupOrSeriesObject } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useNavigate,
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { newSerieInput } from '../-functions/SerieFunctions/newSerie'

type Data = Awaited<ReturnType<typeof newSerieInput>>

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/newSerie',
)

export const useNewSerieForm = ({
  seasonId,
  isCup,
  division,
}: {
  seasonId: number
  isCup: boolean | null
  division: number
}) => {
  const router = useRouter()
  const navigate = useNavigate({
    from: '/dashboard/season/$seasonId/info/competition/$competitionId/newSerie',
  })
  const women = useSearch({
    from: '__root__',
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

  const serieDefaultValues: zd.input<
    typeof newCupOrSeriesObject
  > = {
    type: 'serie',
    seasonId,
    group: '',
    category: 'regular',
    serieName: '',
    serieStructure: [],
    comment: '',
    level: 200,
    division: division,
    hasMix: false,
    hasParent: false,
    allParentGames: false,
    hasStatic: false,
    competitionId: competitionId,
  }

  const cupDefaultValues: zd.input<
    typeof newCupOrSeriesObject
  > = {
    type: 'cup',
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

  const defaultValues = isCup
    ? cupDefaultValues
    : serieDefaultValues

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: newCupOrSeriesObject,
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
        search: { women },
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
