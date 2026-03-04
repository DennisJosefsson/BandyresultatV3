import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'

import { editParentSerieObjectArray } from '@/lib/types/serie'
import type { zd } from '@/lib/utils/zod'

import { editParentSerieInput } from '../-functions/SerieFunctions/editParentSerie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

type Data = { status: 200; message: string } | undefined

export const useEditParentSerieForm = () => {
  const router = useRouter()
  const parentSeries = route.useLoaderData({
    select: (s) => s.parentSeries,
  })

  const mutation = useMutation({
    mutationFn: editParentSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<
    typeof editParentSerieObjectArray
  > = {
    parentSeries: parentSeries.map((s) => {
      return {
        parentId: s.parentId,
        childId: s.childId,
        id: s.id,
      }
    }),
  }
  const form = useForm({
    validators: {
      onChange: editParentSerieObjectArray,
      onSubmit: editParentSerieObjectArray,
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
        r.routeId ===
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
