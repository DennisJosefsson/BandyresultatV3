import type {
  categoryEnum,
  cupCategoryEnum,
} from '@/lib/types/serie'
import { editCupOrSeriesObject } from '@/lib/types/serie'

import type { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { editSerieInput } from '../-functions/SerieFunctions/editSerie'

type Data = { status: 200; message: string } | undefined

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

export const useEditSerieForm = () => {
  const serie = route.useLoaderData({
    select: (s) => s.serie,
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: editSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const serieDefaultValues: zd.input<
    typeof editCupOrSeriesObject
  > = {
    type: 'serie',
    serieId: serie.serieId,
    seasonId: serie.seasonId,
    group: serie.group,
    category: serie.category as zd.infer<
      typeof categoryEnum
    >,
    serieName: serie.serieName,
    serieStructure: serie.serieStructure ?? [],
    comment: serie.comment ?? '',
    level: serie.level,
    hasMix: serie.hasMix ?? false,
    hasParent: serie.hasParent ?? false,
    allParentGames: serie.allParentGames ?? false,
    hasStatic: serie.hasStatic ?? false,
    uefaSorting: serie.uefaSorting ?? false,
    competitionId: serie.competitionId,
    division: serie.division,
  }

  const cupDefaultValues: zd.input<
    typeof editCupOrSeriesObject
  > = {
    type: 'cup',
    serieId: serie.serieId,
    seasonId: serie.seasonId,
    group: serie.group,
    category: serie.category as zd.infer<
      typeof cupCategoryEnum
    >,
    serieName: serie.serieName,
    serieStructure: serie.serieStructure ?? [],
    comment: serie.comment ?? '',
    level: serie.level,
    hasMix: serie.hasMix ?? false,
    hasParent: serie.hasParent ?? false,
    allParentGames: serie.allParentGames ?? false,
    hasStatic: serie.hasStatic ?? false,
    uefaSorting: serie.uefaSorting ?? false,
    competitionId: serie.competitionId,
    division: serie.division,
  }

  const defaultValues = serie.competition.isCup
    ? cupDefaultValues
    : serieDefaultValues

  const form = useForm({
    validators: {
      onBlur: editCupOrSeriesObject,
      onSubmit: editCupOrSeriesObject,
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
    }
    router.invalidate({
      filter: (r) =>
        r.routeId === '/_layout/dashboard/season/$seasonId',
    })
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
