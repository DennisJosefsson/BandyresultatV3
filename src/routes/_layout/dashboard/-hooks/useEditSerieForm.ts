import { categoryEnum, editSeriesObject } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editSerieInput } from '../-functions/SerieFunctions/editSerie'

type Data = { status: 200; message: string } | undefined

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

export const useEditSerieForm = () => {
  const serie = route.useLoaderData({ select: (s) => s.serie })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: editSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<typeof editSeriesObject> = {
    serieId: serie.serieId,
    seasonId: serie.seasonId,
    group: serie.group,
    category: serie.category as zd.infer<typeof categoryEnum>,
    serieName: serie.serieName,
    serieStructure: serie.serieStructure ?? [],
    comment: serie.comment ?? '',
    level: serie.level,
    hasMix: serie.hasMix ?? false,
    hasParent: serie.hasParent ?? false,
    allParentGames: serie.allParentGames ?? false,
    hasStatic: serie.hasStatic ?? false,
    uefaSorting: serie.uefaSorting ?? false,
  }
  const form = useForm({
    validators: { onBlur: editSeriesObject, onSubmit: editSeriesObject },
    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (route) =>
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

  return form
}
