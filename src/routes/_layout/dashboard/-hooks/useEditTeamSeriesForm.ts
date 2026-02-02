import { editTeamSeriesArray } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { editTeamSerie } from '../-functions/SerieFunctions/editTeamSeries'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

type Data = { status: 200; message: string } | undefined

export const useEditTeamSeriesForm = () => {
  const router = useRouter()
  const teamsInSerie = route.useLoaderData({ select: (s) => s.teamsInSerie })

  const mutation = useMutation({
    mutationFn: editTeamSerie,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<typeof editTeamSeriesArray> = {
    teamserie: teamsInSerie.map((s) => {
      return {
        teamseriesId: s.teamseriesId,
        bonusPoints: s.bonusPoints ?? 0,
      }
    }),
  }
  const form = useForm({
    validators: {
      onChange: editTeamSeriesArray,
      onSubmit: editTeamSeriesArray,
    },
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
        route.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
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
